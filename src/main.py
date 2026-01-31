from fastapi import FastAPI
from src.routers import auth, admin, users, complaints
from src.database import Base, engine


app = FastAPI()

Base.metadata.create_all(bind = engine)


@app.get("/healthy")
def health_check():
    return {'status' : 'healthy'}

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(users.router)
app.include_router(complaints.router)