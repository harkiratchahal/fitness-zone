from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import auth, admin, users, complaints, attendance
from src.database import Base, engine


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind = engine)


@app.get("/healthy")
def health_check():
    return {'status' : 'healthy'}

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(complaints.router)
app.include_router(attendance.router)