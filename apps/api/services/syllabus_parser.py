"""
Syllabus Parser
Extracts exam dates, topics, and weightings from PDFs/images.
Uses PyMuPDF for text extraction + Tesseract for scanned images.
"""
import io
import re
from datetime import date
from typing import Optional
import fitz  # PyMuPDF
from dataclasses import dataclass, field
from typing import List


@dataclass
class ExamEntry:
    subject: str
    topic: str
    date: Optional[date]
    weight: float = 1.0
    page: int = 0


@dataclass
class ParsedSyllabus:
    exams: List[ExamEntry] = field(default_factory=list)
    topics: List[str] = field(default_factory=list)
    raw_text: str = ""
    page_count: int = 0


DATE_PATTERNS = [
    r"(\d{1,2}[\s/-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\w]*[\s/-]\d{2,4})",
    r"(\d{4}-\d{2}-\d{2})",
    r"(\d{1,2}/\d{1,2}/\d{2,4})",
]


def parse_syllabus(content: bytes, filename: str = "") -> dict:
    """
    Parse a PDF or image syllabus file.
    Returns structured exam and topic data.
    """
    ext = filename.lower().split(".")[-1] if filename else "pdf"

    if ext in ("pdf",):
        return _parse_pdf(content)
    elif ext in ("png", "jpg", "jpeg", "webp"):
        return _parse_image(content)
    else:
        return {"error": f"Unsupported file type: {ext}"}


def _parse_pdf(content: bytes) -> dict:
    result = ParsedSyllabus()
    try:
        with fitz.open(stream=content, filetype="pdf") as doc:
            result.page_count = len(doc)
            for page_num, page in enumerate(doc):
                text = page.get_text()
                result.raw_text += text
                _extract_from_text(text, page_num, result)
    except Exception as e:
        return {"error": str(e)}

    return {
        "exams": [
            {
                "subject": e.subject,
                "topic": e.topic,
                "date": e.date.isoformat() if e.date else None,
                "weight": e.weight,
                "page": e.page,
            }
            for e in result.exams
        ],
        "topics": result.topics,
        "page_count": result.page_count,
    }


def _parse_image(content: bytes) -> dict:
    try:
        import pytesseract
        from PIL import Image
        img = Image.open(io.BytesIO(content))
        text = pytesseract.image_to_string(img)
        result = ParsedSyllabus()
        _extract_from_text(text, 0, result)
        return {"topics": result.topics, "page_count": 1}
    except ImportError:
        return {"error": "pytesseract not available"}


def _extract_from_text(text: str, page: int, result: ParsedSyllabus):
    # Extract topic lines (heuristic: lines starting with a number or bullet)
    for line in text.splitlines():
        line = line.strip()
        if re.match(r"^[\d]+[\.\)\s]|^[•\-\*]", line) and len(line) > 5:
            result.topics.append(line)
