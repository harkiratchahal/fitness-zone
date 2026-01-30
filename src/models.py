from database import Base
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

class Membership(Base):
    __tablename__ = "membership"

    id = Column(Integer, primary_key = True)
    name = Column(String)
    start_date = Column(String)
    end_date = Column(String)
    fee = Column(String)
    is_active = Column(Boolean, default = True)
    owner_id = Column(Integer, ForeignKey('users.id'))

