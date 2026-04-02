"""
Mastery Logic
Builds a MasteryTree from quiz data and detects weak points.
The 34.85% threshold triggers red flags in the Chronos calendar.
"""
from typing import List, Dict
from dataclasses import dataclass, field

MASTERY_THRESHOLD = 34.85  # Below this → inject Review Sprints


@dataclass
class ConceptNode:
    concept: str
    mastery_pct: float = 0.0
    attempts: int = 0
    is_flagged: bool = False

    @property
    def needs_review(self) -> bool:
        return self.mastery_pct < MASTERY_THRESHOLD


@dataclass
class SubjectTree:
    subject: str
    concepts: List[ConceptNode] = field(default_factory=list)

    @property
    def overall_mastery(self) -> float:
        if not self.concepts:
            return 0.0
        return sum(c.mastery_pct for c in self.concepts) / len(self.concepts)

    @property
    def weak_concepts(self) -> List[ConceptNode]:
        return [c for c in self.concepts if c.needs_review]


def build_mastery_tree(
    subjects: List[str],
    weak_points: List[str],
    region_config: dict,
) -> Dict[str, dict]:
    """
    Initialize a MasteryTree for a new user.
    Weak points from onboarding start at 20% mastery.
    All other concepts start at 50% (neutral).
    """
    tree = {}
    for subject in subjects:
        concepts = _get_subject_concepts(subject, region_config)
        nodes = []
        for concept in concepts:
            is_weak = any(wp.lower() in concept.lower() for wp in weak_points)
            nodes.append(ConceptNode(
                concept=concept,
                mastery_pct=20.0 if is_weak else 50.0,
                is_flagged=is_weak,
            ))
        tree[subject] = {
            "concepts": [
                {
                    "concept": n.concept,
                    "mastery_pct": n.mastery_pct,
                    "is_flagged": n.is_flagged,
                    "needs_review": n.needs_review,
                }
                for n in nodes
            ],
            "overall_mastery": sum(n.mastery_pct for n in nodes) / max(len(nodes), 1),
        }
    return tree


def update_mastery(
    tree: Dict[str, dict],
    subject: str,
    concept: str,
    correct: int,
    total: int,
) -> Dict[str, dict]:
    """Update mastery after a quiz attempt using weighted rolling average."""
    if subject not in tree:
        return tree

    new_pct = (correct / total) * 100 if total > 0 else 0.0

    for c in tree[subject]["concepts"]:
        if c["concept"] == concept:
            # Weighted rolling average: 70% new score, 30% historical
            c["mastery_pct"] = round(0.3 * c["mastery_pct"] + 0.7 * new_pct, 2)
            c["is_flagged"] = c["mastery_pct"] < MASTERY_THRESHOLD
            c["needs_review"] = c["is_flagged"]

    pcts = [c["mastery_pct"] for c in tree[subject]["concepts"]]
    tree[subject]["overall_mastery"] = round(sum(pcts) / max(len(pcts), 1), 2)
    return tree


def _get_subject_concepts(subject: str, region_config: dict) -> List[str]:
    """Returns default concept list for a subject. Extend with curriculum data."""
    defaults: Dict[str, List[str]] = {
        "Mathematics": [
            "Algebra", "Functions & Graphs", "Number Patterns",
            "Finance, Growth & Decay", "Trigonometry",
            "Euclidean Geometry", "Statistics", "Probability", "Calculus",
        ],
        "Physical Sciences": [
            "Mechanics", "Waves & Sound", "Electricity & Magnetism",
            "Optics", "Thermodynamics", "Chemical Bonding",
            "Stoichiometry", "Acids & Bases", "Electrochemistry",
        ],
        "Life Sciences": [
            "Cell Biology", "Genetics & Heredity", "Evolution",
            "Human Impact on Environment", "Photosynthesis & Respiration",
            "Nervous System", "Endocrine System",
        ],
        "Accounting": [
            "Financial Accounting", "Cost Accounting", "Budgets",
            "Cash Flow Statements", "Companies Act", "Audit & Internal Control",
        ],
    }
    return defaults.get(subject, ["Core Concepts", "Theory", "Application", "Analysis"])
