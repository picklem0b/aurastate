from fastapi import APIRouter, Depends
from pydantic import BaseModel
from core.security import CurrentUser

router = APIRouter()


@router.get("/rooms")
async def list_rooms(user=CurrentUser):
    """List all War Rooms the user has access to."""
    # TODO: Query DB
    return {"rooms": []}


class MessagePayload(BaseModel):
    room_id: str
    content: str


@router.post("/rooms/{room_id}/message")
async def send_message(room_id: str, body: MessagePayload, user=CurrentUser):
    # TODO: Persist + broadcast via WebSocket
    return {"status": "sent"}
