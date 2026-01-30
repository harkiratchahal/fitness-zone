from fastapi import Depends, HTTPException, APIRouter
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from starlette import status
from src.database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from auth import get_current_user
from src.models import Users

router = APIRouter(
    prefix = ['/users'],
    tags = ['users']
)

#To build session to the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Password Encription
bcrypt_context = CryptContext( schemes = ['bcrypt'], deprecated = 'auto')

#Dependency Injection
db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

# Request Models
class UserVerification(BaseModel):
    password : str
    new_password : str = Field(min_length = 6)

class UpdateUser(BaseModel):
    username : str  
    email : str 
    phone_number : str
    first_name : str
    last_name : str


###Endpoints###



@router.get("/", status_code= status.HTTP_200_OK)
async def get_user(db : db_dependency,
                   user : user_dependency):
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    return db.query(Users).filter(Users.id == user.get('id')).first()



@router.put("/password", status_code = status.HTTP_204_NO_CONTENT)
async def change_password(db : db_dependency,
                          user : user_dependency,
                          user_verification : UserVerification):
    if user is None:
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    
    user_model = db.query(Users).filter(Users.id == user.get('id')).first()
    if  not bcrypt_context.verify(user_verification.password == user_model.hashed_password) :
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Error on password Change")
    
    user_model.hashed_password = bcrypt_context.hash(user_verification.new_password)
    db.add(user_model)
    db.commit() 


@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
async def update_details(db : db_dependency,
                         user : user_dependency,
                         update_user : UpdateUser):
    if user is None:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, 
                            detail = "Authentication Failed")
    
    user_model = db.query(Users).filter(Users.id == user.get('id')).first()

    user_model.username = update_user.username
    user_model.email = update_user.emailemail
    user_model.first_name = update_user.first_name
    user_model.last_name = update_user.last_name
    user_model.phone_number = update_user.phone_number

    db.add(user_model)
    db.commit()
        


    
