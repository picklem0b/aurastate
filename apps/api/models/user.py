from sqlalchemy import String, Boolean, DateTime, Integer, Enum as PgEnum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from datetime import datetime
import enum


class Base(DeclarativeBase):
    pass


class AuraColor(str, enum.Enum):
    BLUE   = "blue"
    PURPLE = "purple"
    GREEN  = "green"
    SOLAR  = "solar"


class User(Base):
    __tablename__ = "users"

    id:           Mapped[str]      = mapped_column(String(128), primary_key=True)  # Clerk user ID
    full_name:    Mapped[str]      = mapped_column(String(255))
    username:     Mapped[str]      = mapped_column(String(64), unique=True, index=True)
    email:        Mapped[str]      = mapped_column(String(255), unique=True, index=True)
    region:       Mapped[str]      = mapped_column(String(16), default="ZA_WC")
    province:     Mapped[str]      = mapped_column(String(8), default="WC")
    grade:        Mapped[int]      = mapped_column(Integer, default=10)
    stream:       Mapped[str]      = mapped_column(String(64), default="science")
    is_onboarded: Mapped[bool]     = mapped_column(Boolean, default=False)
    aura_color:   Mapped[AuraColor]= mapped_column(PgEnum(AuraColor), default=AuraColor.BLUE)
    created_at:   Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at:   Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
