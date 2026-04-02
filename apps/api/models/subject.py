from sqlalchemy import String, Integer, Float, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from .user import Base


class UserSubject(Base):
    __tablename__ = "user_subjects"

    id:             Mapped[int]   = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id:        Mapped[str]   = mapped_column(String(128), ForeignKey("users.id"), index=True)
    subject_name:   Mapped[str]   = mapped_column(String(128))
    mastery_pct:    Mapped[float] = mapped_column(Float, default=0.0)
    is_mandatory:   Mapped[bool]  = mapped_column(default=False)
    created_at:     Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class WeakPoint(Base):
    __tablename__ = "weak_points"

    id:           Mapped[int]   = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id:      Mapped[str]   = mapped_column(String(128), ForeignKey("users.id"), index=True)
    subject:      Mapped[str]   = mapped_column(String(128))
    concept:      Mapped[str]   = mapped_column(String(256))
    mastery_pct:  Mapped[float] = mapped_column(Float, default=0.0)
    flagged_at:   Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    resolved:     Mapped[bool]  = mapped_column(default=False)
