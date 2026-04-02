from fastapi import APIRouter, Depends
from core.security import CurrentUser

router = APIRouter()


@router.get("/me")
async def get_me(user=CurrentUser):
    return {"user": user}
