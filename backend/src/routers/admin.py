from fastapi import Depends, HTTPException, Path, APIRouter
from starlette import status
from src.models import Users, Complaints
from src.database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from .auth import get_current_user
from pydantic import BaseModel, Field


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

class ComplaintResolution(BaseModel):
    id : int = Field(gt = 0)
    admin_note : str

class Membership(BaseModel):
    user_id : int = Field(gt = 0)
    membership_type : str
    start_date : str
    last_date : str


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.get("/complaints", status_code = status.HTTP_200_OK)
async def read_all_complaints(user : user_dependency, db : db_dependency):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    return db.query(Complaints).all()

@router.get("/user", status_code = status.HTTP_200_OK)
async def read_all_users(user : user_dependency, db : db_dependency):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    return db.query(Users).all()

@router.delete("/complaints/{complaint_id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_complaints(user :  user_dependency,
                            db : db_dependency, 
                            complaint_id  : int = Path(gt = 0)):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    complaint_model = db.query(Complaints).filter(Complaints.id == complaint_id).first()
    if complaint_model is None:
        raise HTTPException(status_code = 404, detail = "Complaint Not Found")
    db.query(Complaints).filter(Complaints.id == complaint_id).delete()
    db.commit()


@router.put("/complaints/", status_code = status.HTTP_204_NO_CONTENT)
async def resolve_complaint(user : user_dependency,
                      db : db_dependency,
                      complaint_resolution : ComplaintResolution
                      ):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    complaint_model = db.query(Complaints).filter(Complaints.id == complaint_resolution.id).first()
    if complaint_model is None:
        raise HTTPException(status_code = 404, detail = "Complaint Not Found")
    
    complaint_model.is_resolved = True
    complaint_model.admin_note = complaint_resolution.admin_note

    db.add(complaint_model)
    db.commit()



@router.delete("/user/{user_id}", status_code= status.HTTP_204_NO_CONTENT)
async def delete_user(user :  user_dependency,
                      db : db_dependency, 
                      user_id  : int = Path(gt = 0)):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    user_model = db.query(Users).filter(Users.id == user_id).first()
    if user_model is None:
        raise HTTPException(status_code = 404, detail = "User Not Found")
    db.query(Users).filter(Users.id == user_id).delete()
    db.commit()


@router.put("/membership", status_code = status.HTTP_204_NO_CONTENT)
async def add_membership(user : user_dependency,
                         db : db_dependency,
                         membership : Membership
                         ):
    if user is None or user.get("user_role") != "admin":
        raise HTTPException(status_code = status.HTTP_401_UNAUTHORIZED,
                            detail = "Authentication Failed")
    user_model = db.query(Users).filter(Users.id == membership.user_id).first()
    if user_model is None:
        raise HTTPException(status_code = 404, detail = "User Not Found")
    
    user_model.membership = membership.membership_type
    user_model.start_date = membership.start_date
    user_model.last_date = membership.last_date

    db.add(user_model)
    db.commit()

