from pydantic import BaseModel, ConfigDict
from typing import Optional, List

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    phone_number: str
    role: str
    is_active: bool
    membership: Optional[str] = None
    start_date: Optional[str] = None
    last_date: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class ComplaintResponse(BaseModel):
    id: int
    title: str
    description: str
    is_resolved: bool
    admin_note: Optional[str] = ""
    owner_id: int
    
    model_config = ConfigDict(from_attributes=True)

class AttendanceResponse(BaseModel):
    id: int
    user_id: int
    date: str
    status: str
    
    model_config = ConfigDict(from_attributes=True)
