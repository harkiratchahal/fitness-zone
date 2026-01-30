from fastapi import Depends, HTTPException, Path, APIRouter
from starlette import status
from src.models import Users, Membership
from src.database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from .auth import get_current_user


router = APIRouter(
    prefix = "/admin",
    tags = ["admin"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.get("/membership", status_code = status.HTTP_200_OK)
async def read_all_memberships(user : user_dependency, db : db_dependency):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    return db.query(Membership).all()

@router.get("/user", status_code = status.HTTP_200_OK)
async def read_all_users(user : user_dependency, db : db_dependency):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    return db.query(Users).all()

@router.delete("/membership/{membership_id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_membership(user :  user_dependency,
                            db : db_dependency, 
                            membership_id  : int = Path(gt = 0)):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    membership_model = db.query(Membership).filter(Membership.id == membership_id).first()
    if membership_model is None:
        raise HTTPException(status_code = 404, detail = "Membership Not Found")
    db.query(Membership).filter(Membership.id == membership_id).delete()
    db.commit()


@router.delete("/user/{user_id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_user(user :  user_dependency,
                      db : db_dependency, 
                      user_id  : int = Path(gt = 0)):
    if user is None or user.get("role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    user_model = db.query(Membership).filter(Membership.id == user_id).first()
    if user_model is None:
        raise HTTPException(status_code = 404, detail = "Membership Not Found")
    db.query(Users).filter(Users.id == user_id).delete()
    db.commit()

