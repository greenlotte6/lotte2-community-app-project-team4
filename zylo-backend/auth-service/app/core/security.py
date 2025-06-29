from datetime import timedelta
import datetime
import uuid
from fastapi import HTTPException
from jose import ExpiredSignatureError, JWTError, jwt 
from passlib.context import CryptContext

from app.core.config import Settings, settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    pwd_context: CryptContext
    settings: Settings 

    def __init__(self, pwd_context: CryptContext, settings: Settings):
        self.pwd_context = pwd_context
        self.settings = settings

    def verify_password(plain, hashed):
        return pwd_context.verify(plain, hashed)

    def hash_password(plain):
        return pwd_context.hash(plain)

    def create_access_toekn(data: dict):
        to_encode = data.copy(); # data를 수정하면 원본도 수정되므로 copy 
        now = datetime.utcnow()
        delta = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        expiry = now + delta
        to_encode.update({"exp": expiry})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    def create_refresh_token():
        return uuid.uuid4()

    def validate_token(access_token: str) -> dict:
        try:
            jwt.decode(access_token=access_token, 
                                    key=settings.SECRET_KEY, 
                                    issuer=settings.TOKEN_ISSUER, 
                                    options={
                                        "required_sub": True, 
                                        "required_exp": True
                                        }
                                    )
        except ExpiredSignatureError: 
            raise HTTPException(status_code = 401, detail="만료된 토큰입니다.")
        except JWTError:
            raise HTTPException(status_code = 400, detail="JWT 검증에 실패했습니다")

        

auth_service = AuthService()