from pydantic import BaseModel
from datetime import datetime


class RoomCreate(BaseModel):
    name: str

class RoomOut(BaseModel):
    id: int
    name: str
    class Config:
       from_attributes = True

class BookingCreate(BaseModel):
    room_id: int
    booked_by: str
    start_time: datetime
    end_time: datetime

class BookingOut(BookingCreate):
    id: int
    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True
        
        
