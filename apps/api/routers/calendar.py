from fastapi import APIRouter, Depends
from pydantic import BaseModel
from datetime import date
from typing import List
from core.security import CurrentUser

router = APIRouter()


class CalendarBlock(BaseModel):
    date: date
    subject: str
    topic: str
    duration_minutes: int
    type: str  # "study" | "review_sprint" | "exam"
    flagged: bool = False


@router.get("/schedule")
async def get_schedule(user=CurrentUser):
    """Return the Chronos-generated study schedule."""
    # TODO: Query DB for user schedule
    return {"blocks": []}


@router.post("/generate")
async def generate_schedule(user=CurrentUser):
    """
    Trigger Chronos to regenerate the schedule based on
    current mastery data and upcoming exam dates.
    """
    # TODO: Invoke ChronosEngine
    return {"status": "generating"}
