from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import Attendance, Users
from src.routers.auth import get_current_user
from src.schemas import AttendanceResponse
from typing import Annotated, List

router = APIRouter(
    prefix="/attendance",
    tags=['attendance']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class AttendanceRequest(BaseModel):
    date: str

@router.post("/checkin", status_code=status.HTTP_201_CREATED)
async def checkin(user: user_dependency, request: AttendanceRequest, db: db_dependency):
    existing = db.query(Attendance).filter(
        Attendance.user_id == user.get('id'),
        Attendance.date == request.date
    ).first()
    
    if existing:
        return {"message": "Attendance already marked for this date."}
        
    attendance_record = Attendance(
        user_id = user.get('id'),
        date = request.date,
        status = 'Present'
    )
    db.add(attendance_record)
    db.commit()
    return {"message": "Attendance marked successfully."}

@router.get("/my-attendance", status_code=status.HTTP_200_OK, response_model=List[AttendanceResponse])
async def get_my_attendance(user: user_dependency, db: db_dependency):
    records = db.query(Attendance).filter(Attendance.user_id == user.get('id')).all()
    return records

@router.get("/admin", status_code=status.HTTP_200_OK)
async def get_all_attendance(user: user_dependency, db: db_dependency):
    if user.get('user_role') != 'admin':
        raise HTTPException(status_code=403, detail="Admin only")
    
    records = db.query(Attendance, Users).join(Users, Attendance.user_id == Users.id).all()
    
    result = []
    for att, u in records:
        result.append({
            "id": att.id,
            "date": att.date,
            "status": att.status,
            "user_id": u.id,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "username": u.username
        })
    return result
