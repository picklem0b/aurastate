from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List
from core.security import CurrentUser
from services.regional_config import REGION_MAP, get_region_config
from services.mastery_logic import build_mastery_tree

router = APIRouter()


class OnboardingPayload(BaseModel):
    region: str
    province: str
    grade: int
    stream: str
    subjects: List[str]
    goals: List[str]
    study_style: str
    weak_points: List[str]


@router.post("/complete")
async def complete_onboarding(payload: OnboardingPayload, user=CurrentUser):
    """
    Final onboarding card submission.
    Builds the user's MasteryTree and persists regional config.
    """
    region_key = f"{payload.region}_{payload.province}"
    config = get_region_config(region_key)
    mastery_tree = build_mastery_tree(
        subjects=payload.subjects,
        weak_points=payload.weak_points,
        region_config=config,
    )
    # TODO: Persist to DB
    return {
        "status": "onboarded",
        "region_config": config,
        "mastery_tree": mastery_tree,
    }


@router.get("/region/{region_code}")
async def get_region(region_code: str):
    config = get_region_config(region_code)
    return config
