from fastapi import APIRouter, Depends
from pydantic import BaseModel
from core.security import CurrentUser

router = APIRouter()


class SessionStart(BaseModel):
    subject: str
    planned_duration_minutes: int


class SessionEnd(BaseModel):
    session_id: str
    elapsed_s: int
    xp_earned: int
    xp_lost: int
    meltdowns: int
    voided: bool


@router.post("/session/start")
async def start_session(body: SessionStart, user=CurrentUser):
    # TODO: Create FocusSession in DB
    import uuid
    return {"session_id": str(uuid.uuid4()), "status": "active"}


@router.post("/session/end")
async def end_session(body: SessionEnd, user=CurrentUser):
    # TODO: Persist session + award XP/CP
    return {"status": "saved", "xp_net": body.xp_earned - body.xp_lost}
