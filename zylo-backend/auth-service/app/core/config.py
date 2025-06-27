from functools import lru_cache
import os

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    ALGORITHM: str = "HS256"
    SECRET_KEY: str
    DATABASE_URL: str = "mysql://root:1234@localhost:3306"
    TOKEN_ISSUER = "zylo"
    env: dict
    
    def __init__(self, profile:str):
        if (profile == "dev"):
            self.env = SettingsConfigDict(env_file=".env-dev")
        elif(profile == "prod"):
            self.env = SettingsConfigDict(env_file=".env-prod")
        else:
            self.env = SettingsConfigDict(env_file=".env-prod")


@lru_cache # 싱글톤
def get_settings():
    app_env = os.getenv("APP_ENV")
    return Settings(app_env)

