from fastapi import APIRouter, UploadFile, File, Depends
from pydantic import BaseModel
from typing import List, Literal
from core.security import CurrentUser
from services.socratic_ai import generate_question
from services.syllabus_parser import parse_syllabus

router = APIRouter()


class SocraticRequest(BaseModel):
    topic: str
    subject: str
    mode: Literal["full_detail", "exam_summary"]
    history: List[dict]
    response: str
    clerk_user_id: str


@router.post("/socratic/respond")
async def socratic_respond(payload: SocraticRequest):
    """
    The Interviewer endpoint.
    Generates the next Socratic question based on student response.
    """
    question = await generate_question(
        topic=payload.topic,
        subject=payload.subject,
        mode=payload.mode,
        history=payload.history,
        student_response=payload.response,
    )
    return {"question": question}


@router.post("/syllabus/parse")
async def upload_syllabus(file: UploadFile = File(...), user=CurrentUser):
    """Parse a PDF/image syllabus and extract exam dates + topics."""
    contents = await file.read()
    result = parse_syllabus(contents, filename=file.filename or "")
    return result
