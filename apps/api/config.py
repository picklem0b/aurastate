from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import list as List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # App
    ENVIRONMENT: str = "development"
    API_SECRET_KEY: str = "change_me"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://aurastate:password@localhost:5432/aurastate"

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "https://aurastate.app"]

    # Clerk
    CLERK_SECRET_KEY: str = ""
    CLERK_PUBLISHABLE_KEY: str = ""

    # AI
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""

    # AWS / Storage
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "af-south-1"
    S3_BUCKET_NAME: str = ""


settings = Settings()
