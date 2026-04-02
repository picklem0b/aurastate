"""
Socratic AI — The Interviewer
Generates follow-up questions using Anthropic Claude.
Adapts depth based on mode: full_detail vs exam_summary.
"""
from typing import List
import anthropic
from config import settings

client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

SYSTEM_FULL_DETAIL = """You are the AuraState Socratic Interviewer.
Your job is to deeply probe a student's understanding of a topic through targeted questions.
- Ask ONE focused question at a time.
- Build on their previous answer.
- If they are wrong, do not correct — ask a guiding follow-up question.
- Use real exam-level language for the subject.
- Never give away the answer directly.
"""

SYSTEM_EXAM_SUMMARY = """You are the AuraState Exam Prep Interviewer.
Your job is to rapidly test key facts and definitions.
- Ask ONE short, direct exam-style question.
- Focus on the most likely exam content.
- Keep questions under 30 words.
"""


async def generate_question(
    topic: str,
    subject: str,
    mode: str,
    history: List[dict],
    student_response: str,
) -> str:
    system = SYSTEM_FULL_DETAIL if mode == "full_detail" else SYSTEM_EXAM_SUMMARY

    messages = [
        *[{"role": m["role"] if m["role"] in ("user", "assistant") else "user",
           "content": m["content"]} for m in history],
        {"role": "user", "content": f"[Topic: {topic} | Subject: {subject}]
Student: {student_response}"},
    ]

    response = await client.messages.create(
        model="claude-opus-4-5",
        max_tokens=256,
        system=system,
        messages=messages,
    )

    return response.content[0].text.strip()
