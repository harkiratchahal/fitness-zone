from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from src.database import SessionLocal
from src.models import Users
from passlib.context import CryptContext
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm, OAuth2AuthorizationCodeBearer
from jose import jwt, JWTError
from datetime import timedelta, datetime, timezone

router = APIRouter(
    prefix = "/auth",
    tags = ['auth']
)

SECRET_KEY = "e02eb9f54272214cba8b0f74513fe3e86c013c82ea8e5aeb7c7db50d7f66910e"
ALGORITHM = 'HS256'

bcrypt_context = CryptContext(schemes = ['bcrypt'], deprecated = 'auto')

oauth2_bearer = OAuth2AuthorizationCodeBearer(token_utl = 'auth/token')

class CreateUserRequest(BaseModel):
    username : str
    email : str
    first_name : str
    last_name : str
    password : str
    phone_number : str

class Token(BaseModel):
    access_token : str
    token_type : str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]


def authenticate_user(username : str, password : str, db):
    user = db.query(Users).filter(Users.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username : str, user_id: int, role : str, expires_delta: timedelta):
    expires = datetime.now(timezone.utc) + expires_delta
    encode = {
        'sub' : username,
        'id' : user_id,
        'exp' : expires,
        'role' : role
    }
    return jwt.encode(encode, SECRET_KEY, algorithm = ALGORITHM)

async def get_current_user(token : Annotated[str, Depends(oauth2_bearer)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.sub
        user_id = payload.id
        user_role = payload.role
        if username is None or user_id is None:
            raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED,
                                detail = "Could not validate user")
        return {'username': username, 'id' : user_id, 'user_role' : user_role}
    except:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED,
                                detail = "Could not validate user")

##Endpoints##

@router.post('/', status_code = status.HTTP_201_CREATED)
async def create_user(user_request : CreateUserRequest,
                      db : db_dependency):
    create_user_model = Users(
        email = user_request.email,
        username = user_request.username,
        first_name = user_request.first_name,
        last_name = user_request.last_name,
        phone_number = user_request.phone_number,
        is_active = True,
        hashed_password = bcrypt_context.hash(user_request.password)
    )

    db.add(create_user_model)
    db.commit()


@router.post('/token', response_model= Token)
async def login_for_access_token(form_data : Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db : db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, 
                            detail = 'Could not validate user')
    token = create_access_token(user.username, user.id, user.role, timedelta(minutes = 30))
    return {'access_token' : token, 'token_type' : 'bearer'}
    