"""
AuraState FastAPI — The Brain
Entry point. All routes mounted here.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from core.logging import configure_logging
from core.middleware import RequestIDMiddleware
from routers import auth, onboarding, calendar, education, focus, social
from config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    # Startup: init DB pool, Redis, etc.
    yield
    # Shutdown: close connections


app = FastAPI(
    title="AuraState API",
    description="The Brain — Student OS Backend",
    version="1.0.0-alpha",
    docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url=None,
    lifespan=lifespan,
)

# ── Middleware ────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(RequestIDMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────
app.include_router(auth.router,        prefix="/auth",        tags=["auth"])
app.include_router(onboarding.router,  prefix="/onboarding",  tags=["onboarding"])
app.include_router(calendar.router,    prefix="/calendar",    tags=["calendar"])
app.include_router(education.router,   prefix="/education",   tags=["education"])
app.include_router(focus.router,       prefix="/focus",       tags=["focus"])
app.include_router(social.router,      prefix="/social",      tags=["social"])


@app.get("/health", include_in_schema=False)
async def health():
    return {"status": "ok", "version": "1.0.0-alpha"}
