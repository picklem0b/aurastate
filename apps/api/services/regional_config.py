"""
Regional Configuration
Maps region codes to curriculum standards, mandatory subjects,
exam boards, and scheduling constraints.
"""
from typing import Dict, List, Optional
from dataclasses import dataclass, field


@dataclass
class RegionConfig:
    code: str
    name: str
    country: str
    mandatory: List[str]
    electives_limit: int
    boards: List[str]
    max_subjects: int = 7
    school_year_start: str = "January"
    school_year_end: str = "November"
    term_count: int = 4
    languages: List[str] = field(default_factory=list)


REGION_MAP: Dict[str, RegionConfig] = {
    "ZA_WC": RegionConfig(
        code="ZA_WC",
        name="Western Cape",
        country="South Africa",
        mandatory=[
            "Life Orientation",
            "Mathematics",
            "English Home Language",
            "Afrikaans First Additional Language",
        ],
        electives_limit=3,
        boards=["CAPS", "IEB"],
        languages=["en", "af", "xh"],
    ),
    "ZA_GP": RegionConfig(
        code="ZA_GP",
        name="Gauteng",
        country="South Africa",
        mandatory=[
            "Life Orientation",
            "Mathematics",
            "English Home Language",
        ],
        electives_limit=4,
        boards=["CAPS", "IEB"],
        languages=["en", "af", "zu"],
    ),
    "ZA_KZN": RegionConfig(
        code="ZA_KZN",
        name="KwaZulu-Natal",
        country="South Africa",
        mandatory=[
            "Life Orientation",
            "Mathematics",
            "English Home Language",
        ],
        electives_limit=4,
        boards=["CAPS"],
        languages=["en", "zu"],
    ),
    "ZA_DEFAULT": RegionConfig(
        code="ZA_DEFAULT",
        name="South Africa (General)",
        country="South Africa",
        mandatory=["Life Orientation", "Mathematics", "English Home Language"],
        electives_limit=4,
        boards=["CAPS"],
        languages=["en"],
    ),
    "DEFAULT": RegionConfig(
        code="DEFAULT",
        name="International",
        country="International",
        mandatory=["Core Subject A", "Core Subject B"],
        electives_limit=5,
        boards=["National Curriculum"],
        languages=["en"],
    ),
}


def get_region_config(region_code: str) -> dict:
    config = REGION_MAP.get(region_code)
    if not config:
        # Fallback: try country-level default
        country = region_code.split("_")[0] if "_" in region_code else ""
        config = REGION_MAP.get(f"{country}_DEFAULT", REGION_MAP["DEFAULT"])

    return {
        "code": config.code,
        "name": config.name,
        "country": config.country,
        "mandatory": config.mandatory,
        "electives_limit": config.electives_limit,
        "max_subjects": config.max_subjects,
        "boards": config.boards,
        "school_year": {
            "start": config.school_year_start,
            "end": config.school_year_end,
            "terms": config.term_count,
        },
        "languages": config.languages,
    }
