from sqlalchemy import String, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from .user import Base


class FocusSession(Base):
    __tablename__ = "focus_sessions"

    id:             Mapped[str]   = mapped_column(String(128), primary_key=True)
    user_id:        Mapped[str]   = mapped_column(String(128), ForeignKey("users.id"), index=True)
    subject:        Mapped[str]   = mapped_column(String(128))
    elapsed_s:      Mapped[int]   = mapped_column(Integer, default=0)
    xp_earned:      Mapped[int]   = mapped_column(Integer, default=0)
    xp_lost:        Mapped[int]   = mapped_column(Integer, default=0)
    meltdowns:      Mapped[int]   = mapped_column(Integer, default=0)
    voided:         Mapped[bool]  = mapped_column(Boolean, default=False)
    started_at:     Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    ended_at:       Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
