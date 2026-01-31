from fastapi import  Depends, HTTPException, Path, APIRouter, status
from pydantic import BaseModel, Field
from starlette import status
from src.models import Complaints
from src.database import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from .auth import get_current_user


router = APIRouter(
    prefix = '/complaints',
    tags = ['complaints']
)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class ComplaintRequest(BaseModel):
    title : str = Field(min_length = 3)
    description : str = Field(min_length= 3, max_length = 200)



@router.get("/", status_code = status.HTTP_200_OK)
async def read_all(user : user_dependency, db : db_dependency):
    if user is None:
        raise HTTPException(status_code = 401, detail = "Authentication Failed")
    return db.query(Complaints).filter(Complaints.owner_id == user.get('id')).all()



@router.get("/complaint/{complaint_id}", status_code = status.HTTP_200_OK)
async def read_complaint(user : user_dependency, db : db_dependency, complaint_id : int = Path(gt = 0)):
    if user is None:
        raise HTTPException(status_code = 401, detail = "Authentication Failed")
    complaint_model = db.query(Complaints).filter(Complaints.id == complaint_id).first()
    if complaint_model is not None:
        return complaint_model
    raise HTTPException(status_code = 404, detail = "Complaint Not Found")


@router.post("/complaint", status_code = status.HTTP_201_CREATED)
async def create_complaint(user : user_dependency,
                           db : db_dependency,
                           complaint_request : ComplaintRequest):
    if user is None:
        raise HTTPException(status_code = 401, detail = "Authentication Failed")
    complaint_model = Complaints(**complaint_request.model_dump(), owner_id = user.get('id'))

    db.add(complaint_model)
    db.commit()

@router.put("/complaint/{complaint_id}", status_code = status.HTTP_201_CREATED)
async def update_complaint(user : user_dependency,
                           db : db_dependency,
                           complaint_request : ComplaintRequest,
                           complaint_id : int = Path(gt = 0)):
    if user is None:
        raise HTTPException(status_code = 401, detail = "Authentication Failed")
    
    complaint_model = db.query(Complaints).filter(Complaints.id == complaint_id)\
    .filter(Complaints.owner_id == user.get("id")).first()

    if complaint_model is None:
        raise HTTPException(status_code = 404, detail = "Complaint Not Found")
    
    complaint_model.title = complaint_request.title
    complaint_model.description = complaint_request.description

    db.add(complaint_model)
    db.commit()


@router.delete("/complaint/{complaint_id}", status_code = status.HTTP_204_NO_CONTENT)
async def delete_complaint(user : user_dependency,
                      db : db_dependency,
                      complaint_id : int = Path(gt = 0)):

    if user is None:
        raise HTTPException(status_code = 401, detail = "Authentication Failed")


    complaint_model = db.query(Complaints).filter(Complaints.id == complaint_id)\
        .filter(Complaints.owner_id == user.get('id')).first()
    if complaint_model is None:
        raise HTTPException(status_code = 404, detail = "Complaint not Found")
    (db.query(Complaints).filter(Complaints.id == complaint_id)\
     .filter(Complaints.owner_id == user.get('id')).delete())
    db.commit()