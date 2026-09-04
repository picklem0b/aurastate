import { MASTERY_THRESHOLD } from "@aurastate/shared";

interface ConceptNode {
  concept: string;
  masteryPct: number;
  attempts: number;
  isFlagged: boolean;
}

interface SubjectMastery {
  concepts: ConceptNode[];
  overallMastery: number;
}

export function buildMasteryTree(
  subjects: string[],
  weakPoints: string[],
  subjectConcepts: Record<string, string[]>
): Record<string, SubjectMastery> {
  const tree: Record<string, SubjectMastery> = {};

  for (const subject of subjects) {
    const concepts = subjectConcepts[subject] ?? ["Core Concepts", "Theory", "Application", "Analysis"];

    const nodes: ConceptNode[] = concepts.map((concept) => {
      const isWeak = weakPoints.some(
        (wp) => wp.toLowerCase() in concept.toLowerCase() || concept.toLowerCase().includes(wp.toLowerCase())
      );

      return {
        concept,
        masteryPct: isWeak ? 20.0 : 50.0,
        attempts: 0,
        isFlagged: isWeak,
      };
    });

    tree[subject] = {
      concepts: nodes,
      overallMastery: nodes.reduce((sum, n) => sum + n.masteryPct, 0) / Math.max(nodes.length, 1),
    };
  }

  return tree;
}

export function updateMastery(
  tree: Record<string, SubjectMastery>,
  subject: string,
  concept: string,
  correct: number,
  total: number
): Record<string, SubjectMastery> {
  if (!tree[subject]) return tree;

  const newPct = total > 0 ? (correct / total) * 100 : 0;

  for (const c of tree[subject].concepts) {
    if (c.concept === concept) {
      // Weighted rolling average: 70% new score, 30% historical
      c.masteryPct = Math.round((0.3 * c.masteryPct + 0.7 * newPct) * 100) / 100;
      c.isFlagged = c.masteryPct < MASTERY_THRESHOLD;
      c.attempts += 1;
    }
  }

  const pcts = tree[subject].concepts.map((c) => c.masteryPct);
  tree[subject].overallMastery =
    Math.round((pcts.reduce((a, b) => a + b, 0) / Math.max(pcts.length, 1)) * 100) / 100;

  return tree;
}

export function getWeakConcepts(tree: Record<string, SubjectMastery>): string[] {
  const weak: string[] = [];

  for (const [subject, data] of Object.entries(tree)) {
    for (const c of data.concepts) {
      if (c.masteryPct < MASTERY_THRESHOLD) {
        weak.push(`${subject}: ${c.concept}`);
      }
    }
  }

  return weak;
}

// Default concept lists per subject (ported from Python)
export const SUBJECT_CONCEPTS: Record<string, string[]> = {
  MATH: [
    "Algebra",
    "Functions & Graphs",
    "Number Patterns",
    "Finance, Growth & Decay",
    "Trigonometry",
    "Euclidean Geometry",
    "Statistics",
    "Probability",
    "Calculus",
  ],
  PHY_SCI: [
    "Mechanics",
    "Waves & Sound",
    "Electricity & Magnetism",
    "Optics",
    "Thermodynamics",
    "Chemical Bonding",
    "Stoichiometry",
    "Acids & Bases",
    "Electrochemistry",
  ],
  LIFE_SCI: [
    "Cell Biology",
    "Genetics & Heredity",
    "Evolution",
    "Human Impact on Environment",
    "Photosynthesis & Respiration",
    "Nervous System",
    "Endocrine System",
  ],
  ACCT: [
    "Financial Accounting",
    "Cost Accounting",
    "Budgets",
    "Cash Flow Statements",
    "Companies Act",
    "Audit & Internal Control",
  ],
};
