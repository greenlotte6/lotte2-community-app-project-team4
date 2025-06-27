from fastapi import FastAPI
from .core.config import settings
from sqlmodel import SQLModel

async def lifespan(app: FastAPI):
    if settings.DEBUG:
        print("Creating DB tables if not exist...") 