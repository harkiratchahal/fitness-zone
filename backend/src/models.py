from src.database import Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key = True)
    email = Column(String, unique = True)
    username = Column(String, unique = True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default = True)
    role = Column(String, default='user')
    phone_number = Column(String)
    membership = Column(String, default = "Monthly")
    start_date = Column(String)
    last_date = Column(String)


class Complaints(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key = True)
    title = Column(String)
    description = Column(String)
    is_resolved = Column(Boolean, default = False)
    admin_note = Column(String, default = "")
    owner_id = Column(Integer, ForeignKey('users.id'))


