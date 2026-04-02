import pytest
from services.mastery_logic import build_mastery_tree, update_mastery, MASTERY_THRESHOLD
from services.regional_config import get_region_config, REGION_MAP


# ── Regional Config Tests ─────────────────────────────────────────────────

def test_za_wc_has_four_mandatory():
    config = get_region_config("ZA_WC")
    assert len(config["mandatory"]) == 4


def test_za_wc_has_three_elective_slots():
    config = get_region_config("ZA_WC")
    assert config["electives_limit"] == 3


def test_unknown_region_falls_back_to_default():
    config = get_region_config("XX_UNKNOWN")
    assert config["code"] == "DEFAULT"


def test_all_registered_regions_have_mandatory_subjects():
    for code, region in REGION_MAP.items():
        assert len(region.mandatory) > 0, f"{code} has no mandatory subjects"


# ── Mastery Logic Tests ───────────────────────────────────────────────────

def test_weak_point_starts_below_threshold():
    config = get_region_config("ZA_WC")
    tree = build_mastery_tree(
        subjects=["Mathematics"],
        weak_points=["Algebra"],
        region_config=config,
    )
    algebra = next(
        c for c in tree["Mathematics"]["concepts"] if "Algebra" in c["concept"]
    )
    assert algebra["mastery_pct"] < MASTERY_THRESHOLD


def test_non_weak_point_starts_above_threshold():
    config = get_region_config("ZA_WC")
    tree = build_mastery_tree(
        subjects=["Mathematics"],
        weak_points=[],
        region_config=config,
    )
    first_concept = tree["Mathematics"]["concepts"][0]
    assert first_concept["mastery_pct"] >= MASTERY_THRESHOLD


def test_mastery_update_rolling_average():
    config = get_region_config("ZA_WC")
    tree = build_mastery_tree(["Mathematics"], [], config)
    concept = tree["Mathematics"]["concepts"][0]["concept"]

    updated = update_mastery(tree, "Mathematics", concept, correct=10, total=10)
    updated_concept = next(
        c for c in updated["Mathematics"]["concepts"] if c["concept"] == concept
    )
    # Should be weighted up toward 100%
    assert updated_concept["mastery_pct"] > 50.0


def test_full_score_removes_flag():
    config = get_region_config("ZA_WC")
    tree = build_mastery_tree(["Mathematics"], ["Algebra"], config)
    # Simulate multiple perfect scores to clear the flag
    for _ in range(5):
        tree = update_mastery(tree, "Mathematics", "Algebra", 10, 10)
    algebra = next(c for c in tree["Mathematics"]["concepts"] if "Algebra" in c["concept"])
    assert not algebra["is_flagged"]
