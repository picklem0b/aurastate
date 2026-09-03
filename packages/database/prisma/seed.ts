import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding AuraState database...");

  // ── War Rooms ──────────────────────────────────────────
  await prisma.warRoom.upsert({
    where: { id: "room_matric_2026" },
    update: {},
    create: {
      id: "room_matric_2026",
      name: "Matric 2026 - General",
      description: "The main hub for Matric 2026 students across South Africa.",
      isPublic: true,
    },
  });

  await prisma.warRoom.upsert({
    where: { id: "room_mathematics" },
    update: {},
    create: {
      id: "room_mathematics",
      name: "Mathematics War Room",
      description: "Functions, calculus, and exam prep. No fluff.",
      isPublic: true,
      subjectCode: "MATH",
    },
  });

  await prisma.warRoom.upsert({
    where: { id: "room_physical_sciences" },
    update: {},
    create: {
      id: "room_physical_sciences",
      name: "Physical Sciences War Room",
      description: "Mechanics, electricity, and chemical reactions.",
      isPublic: true,
      subjectCode: "PHY_SCI",
    },
  });

  // ── Mathematics Topics ─────────────────────────────────
  const mathTopics = [
    // Grade 10
    { subjectCode: "MATH", grade: 10, topicName: "Algebraic Expressions", topicIndex: 1, examWeight: 1.0, description: "Simplifying, factorizing, and manipulating algebraic expressions" },
    { subjectCode: "MATH", grade: 10, topicName: "Equations and Inequalities", topicIndex: 2, examWeight: 1.0, description: "Solving linear equations, simultaneous equations, and inequalities" },
    { subjectCode: "MATH", grade: 10, topicName: "Number Patterns", topicIndex: 3, examWeight: 1.0, description: "Arithmetic and geometric sequences, quadratic patterns" },
    { subjectCode: "MATH", grade: 10, topicName: "Functions and Graphs", topicIndex: 4, examWeight: 1.5, description: "Linear, quadratic, and exponential functions" },
    { subjectCode: "MATH", grade: 10, topicName: "Finance, Growth and Decay", topicIndex: 5, examWeight: 1.0, description: "Simple and compound interest, depreciation, inflation" },
    { subjectCode: "MATH", grade: 10, topicName: "Trigonometry", topicIndex: 6, examWeight: 1.5, description: "Trigonometric ratios, identities, and equations" },
    { subjectCode: "MATH", grade: 10, topicName: "Euclidean Geometry", topicIndex: 7, examWeight: 1.0, description: "Lines, angles, triangles, and circle geometry" },
    { subjectCode: "MATH", grade: 10, topicName: "Analytical Geometry", topicIndex: 8, examWeight: 1.0, description: "Distance, midpoint, gradient, and equation of lines" },
    { subjectCode: "MATH", grade: 10, topicName: "Statistics and Probability", topicIndex: 9, examWeight: 1.0, description: "Data handling, measures of central tendency, probability" },
    // Grade 11
    { subjectCode: "MATH", grade: 11, topicName: "Exponents and Surds", topicIndex: 1, examWeight: 1.0, description: "Laws of exponents, simplifying surds, rationalizing denominators" },
    { subjectCode: "MATH", grade: 11, topicName: "Polynomials", topicIndex: 2, examWeight: 1.5, description: "Factor and remainder theorem, cubic equations" },
    { subjectCode: "MATH", grade: 11, topicName: "Functions", topicIndex: 3, examWeight: 1.5, description: "Parabolas, hyperbolas, exponential and logarithmic functions" },
    { subjectCode: "MATH", grade: 11, topicName: "Trigonometry", topicIndex: 4, examWeight: 1.5, description: "Compound angles, reduction formulae, identities" },
    { subjectCode: "MATH", grade: 11, topicName: "Analytical Geometry", topicIndex: 5, examWeight: 1.0, description: "Circles, tangents, and analytical proofs" },
    { subjectCode: "MATH", grade: 11, topicName: "Calculus", topicIndex: 6, examWeight: 2.0, description: "Limits, differentiation from first principles, applications" },
    { subjectCode: "MATH", grade: 11, topicName: "Euclidean Geometry and Probability", topicIndex: 7, examWeight: 1.0, description: "Circle theorems, probability rules" },
    // Grade 12
    { subjectCode: "MATH", grade: 12, topicName: "Functions and Inverses", topicIndex: 1, examWeight: 1.5, description: "Function notation, inverses, transformations" },
    { subjectCode: "MATH", grade: 12, topicName: "Polynomials", topicIndex: 2, examWeight: 1.5, description: "Cubic and quartic equations, complex roots" },
    { subjectCode: "MATH", grade: 12, topicName: "Differential Calculus", topicIndex: 3, examWeight: 2.5, description: "First and second derivatives, curve sketching, optimisation" },
    { subjectCode: "MATH", grade: 12, topicName: "Analytical Geometry", topicIndex: 4, examWeight: 1.5, description: "Conic sections, ellipse, hyperbola, parabola" },
    { subjectCode: "MATH", grade: 12, topicName: "Trigonometry", topicIndex: 5, examWeight: 1.5, description: "Trig equations, identities, and applications" },
    { subjectCode: "MATH", grade: 12, topicName: "Euclidean Geometry", topicIndex: 6, examWeight: 1.0, description: "Advanced circle theorems and geometric proofs" },
    { subjectCode: "MATH", grade: 12, topicName: "Statistics and Probability", topicIndex: 7, examWeight: 1.0, description: "Normal distribution, regression, probability distributions" },
    { subjectCode: "MATH", grade: 12, topicName: "Sequences and Series", topicIndex: 8, examWeight: 1.0, description: "Arithmetic and geometric sequences, summation" },
  ];

  for (const topic of mathTopics) {
    await prisma.curriculumTopic.upsert({
      where: {
        subjectCode_grade_topicName: {
          subjectCode: topic.subjectCode,
          grade: topic.grade,
          topicName: topic.topicName,
        },
      },
      update: {},
      create: topic,
    });
  }

  console.log(`Mathematics: ${mathTopics.length} topics seeded`);
  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

  // ── Physical Sciences Topics ──────────────────────────
  const phySciTopics = [
    // Grade 10
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Matter and Classification", topicIndex: 1, examWeight: 1.0, description: "States of matter, classification of matter, mixtures and pure substances" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Mechanics: Motion in One Dimension", topicIndex: 2, examWeight: 1.5, description: "Distance, displacement, velocity, acceleration, equations of motion" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Mechanics: Forces", topicIndex: 3, examWeight: 1.5, description: "Newton's laws, friction, resultant forces, free body diagrams" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Energy and Energy Transfer", topicIndex: 4, examWeight: 1.5, description: "Kinetic and potential energy, work, power, conservation of energy" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Matter and Materials", topicIndex: 5, examWeight: 1.0, description: "Physical properties of materials, density, solids and liquids" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Waves and Sound", topicIndex: 6, examWeight: 1.0, description: "Properties of waves, sound waves, electromagnetic radiation" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Electric Circuits", topicIndex: 7, examWeight: 1.5, description: "Current, voltage, resistance, Ohm's law, series and parallel circuits" },
    { subjectCode: "PHY_SCI", grade: 10, topicName: "Chemical Changes", topicIndex: 8, examWeight: 1.0, description: "Physical and chemical changes, mixtures, separation techniques" },
    // Grade 11
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Mechanics: Momentum and Impulse", topicIndex: 1, examWeight: 1.5, description: "Momentum, impulse, conservation of momentum, collisions" },
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Mechanics: Newton's Laws", topicIndex: 2, examWeight: 1.5, description: "Newton's laws in detail, inclined planes, connected bodies" },
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Work, Energy and Power", topicIndex: 3, examWeight: 1.5, description: "Work-energy theorem, potential energy, power calculations" },
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Magnetism", topicIndex: 4, examWeight: 1.0, description: "Magnetic fields, electromagnetism, Faraday's law" },
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Mechanical Waves and Sound", topicIndex: 5, examWeight: 1.0, description: "Transverse and longitudinal waves, Doppler effect, standing waves" },
    { subjectCode: "PHY_SCI", grade: 11, topicName: "Electric Circuits and Electromagnetism", topicIndex: 6, examWeight: 1.5, description: "AC and DC circuits, transformers, generators" },
    // Grade 12
    { subjectCode: "PHY_SCI", grade: 12, topicName: "Vertical Projectile Motion", topicIndex: 1, examWeight: 1.5, description: "Free fall, equations of motion, graphs" },
    { subjectCode: "PHY_SCI", grade: 12, topicName: "Momentum and Impulse", topicIndex: 2, examWeight: 1.5, description: "Impulse-momentum theorem, 2D collisions" },
    { subjectCode: "PHY_SCI", grade: 12, topicName: "Energy and Energy Change", topicIndex: 3, examWeight: 1.5, description: "Conservation of energy, dissipation, efficiency" },
    { subjectCode: "PHY_SCI", grade: 12, topicName: "Electric Circuits", topicIndex: 4, examWeight: 2.0, description: "Internal resistance, Kirchhoff's laws, network analysis" },
    { subjectCode: "PHY_SCI", grade: 12, topicName: "Electromagnetism", topicIndex: 5, examWeight: 1.5, description: "Electromagnetic induction, Faraday's law, Lenz's law" },
  ];
  for (const topic of phySciTopics) {
    await prisma.curriculumTopic.upsert({
      where: { subjectCode_grade_topicName: { subjectCode: topic.subjectCode, grade: topic.grade, topicName: topic.topicName } },
      update: {},
      create: topic,
    });
  }
  console.log(`Physical Sciences: ${phySciTopics.length} topics seeded`);

  // ── Life Sciences Topics ──────────────────────────────
  const lifeSciTopics = [
    { subjectCode: "LIFE_SCI", grade: 10, topicName: "Life at the Molecular, Cellular and Tissue Level", topicIndex: 1, examWeight: 1.5, description: "Cell structure, organelles, cell division, tissues" },
    { subjectCode: "LIFE_SCI", grade: 10, topicName: "From Molecules to Organisms: Structures and Life Processes", topicIndex: 2, examWeight: 1.5, description: "Nutrition, gas exchange, transport in plants and animals" },
    { subjectCode: "LIFE_SCI", grade: 10, topicName: "Biodiversity and the Succession of Ecosystems", topicIndex: 3, examWeight: 1.0, description: "Classification, biodiversity, ecosystem succession" },
    { subjectCode: "LIFE_SCI", grade: 11, topicName: "Molecular Basis of Heredity", topicIndex: 1, examWeight: 2.0, description: "DNA, RNA, protein synthesis, genetic inheritance" },
    { subjectCode: "LIFE_SCI", grade: 11, topicName: "Evolution and Human Impact", topicIndex: 2, examWeight: 1.5, description: "Evidence for evolution, human evolution, environmental impact" },
    { subjectCode: "LIFE_SCI", grade: 12, topicName: "Nervous System", topicIndex: 1, examWeight: 2.0, description: "Neurons, reflex arcs, brain structure, synapses" },
    { subjectCode: "LIFE_SCI", grade: 12, topicName: "Endocrine System", topicIndex: 2, examWeight: 1.5, description: "Hormones, feedback mechanisms, homeostasis" },
    { subjectCode: "LIFE_SCI", grade: 12, topicName: "Reproduction", topicIndex: 3, examWeight: 1.5, description: "Human reproduction, reproductive strategies" },
    { subjectCode: "LIFE_SCI", grade: 12, topicName: "Responding to the Environment", topicIndex: 4, examWeight: 1.5, description: "Immune system, behaviour, ecology" },
  ];
  for (const topic of lifeSciTopics) {
    await prisma.curriculumTopic.upsert({
      where: { subjectCode_grade_topicName: { subjectCode: topic.subjectCode, grade: topic.grade, topicName: topic.topicName } },
      update: {}, create: topic,
    });
  }
  console.log(`Life Sciences: ${lifeSciTopics.length} topics seeded`);

  // ── Accounting Topics ──────────────────────────────────
  const acctTopics = [
    { subjectCode: "ACCT", grade: 10, topicName: "Introduction to Financial Accounting", topicIndex: 1, examWeight: 1.5, description: "Accounting principles, source documents, journals" },
    { subjectCode: "ACCT", grade: 10, topicName: "Ledgers and Trial Balance", topicIndex: 2, examWeight: 1.5, description: "General ledger, subsidiary ledgers, trial balance" },
    { subjectCode: "ACCT", grade: 10, topicName: "Bank Reconciliation", topicIndex: 3, examWeight: 1.0, description: "Bank statement reconciliation, adjustments" },
    { subjectCode: "ACCT", grade: 10, topicName: "Cash Transactions and Petty Cash", topicIndex: 4, examWeight: 1.0, description: "Cash journals, petty cash system" },
    { subjectCode: "ACCT", grade: 11, topicName: "Inventory", topicIndex: 1, examWeight: 1.5, description: "Inventory valuation, stocktaking, adjustments" },
    { subjectCode: "ACCT", grade: 11, topicName: "Fixed Assets", topicIndex: 2, examWeight: 1.5, description: "Depreciation methods, asset disposal" },
    { subjectCode: "ACCT", grade: 11, topicName: "Control Accounts", topicIndex: 3, examWeight: 1.5, description: "Debtors and creditors control, reconciliation" },
    { subjectCode: "ACCT", grade: 12, topicName: "Financial Statements", topicIndex: 1, examWeight: 2.5, description: "Income statement, balance sheet, notes" },
    { subjectCode: "ACCT", grade: 12, topicName: "Cash Flow Statement", topicIndex: 2, examWeight: 2.0, description: "Operating, investing, financing activities" },
    { subjectCode: "ACCT", grade: 12, topicName: "Analysis and Interpretation", topicIndex: 3, examWeight: 1.5, description: "Ratios, trend analysis, interpretation" },
  ];
  for (const topic of acctTopics) {
    await prisma.curriculumTopic.upsert({
      where: { subjectCode_grade_topicName: { subjectCode: topic.subjectCode, grade: topic.grade, topicName: topic.topicName } },
      update: {}, create: topic,
    });
  }
  console.log(`Accounting: ${acctTopics.length} topics seeded`);

  // ── Commerce Subjects ──────────────────────────────────
  const bizTopics = [
    { subjectCode: "BIZ_STUD", grade: 10, topicName: "Business Sectors and Stakeholders", topicIndex: 1, examWeight: 1.0, description: "Primary, secondary, tertiary sectors, stakeholders" },
    { subjectCode: "BIZ_STUD", grade: 11, topicName: "Entrepreneurship and Business Roles", topicIndex: 1, examWeight: 1.5, description: "Qualities of entrepreneurs, business planning" },
    { subjectCode: "BIZ_STUD", grade: 12, topicName: "Business Operations", topicIndex: 1, examWeight: 2.0, description: "Production, quality, stock, purchasing, sales" },
  ];
  const econTopics = [
    { subjectCode: "ECON", grade: 10, topicName: "Scarcity and Choice", topicIndex: 1, examWeight: 1.0, description: "Opportunity cost, production possibilities" },
    { subjectCode: "ECON", grade: 11, topicName: "Demand and Supply", topicIndex: 1, examWeight: 2.0, description: "Market equilibrium, elasticity, government intervention" },
    { subjectCode: "ECON", grade: 12, topicName: "Macroeconomics", topicIndex: 1, examWeight: 2.5, description: "GDP, inflation, unemployment, fiscal and monetary policy" },
  ];
  for (const topic of [...bizTopics, ...econTopics]) {
    await prisma.curriculumTopic.upsert({
      where: { subjectCode_grade_topicName: { subjectCode: topic.subjectCode, grade: topic.grade, topicName: topic.topicName } },
      update: {}, create: topic,
    });
  }
  console.log(`Commerce: ${bizTopics.length + econTopics.length} topics seeded`);

  // ── Language Subjects ──────────────────────────────────
  const langTopics = [
    { subjectCode: "ENG_HL", grade: 10, topicName: "Comprehension and Language Use", topicIndex: 1, examWeight: 1.5, description: "Reading comprehension, language structures" },
    { subjectCode: "ENG_HL", grade: 11, topicName: "Essay Writing and Analysis", topicIndex: 1, examWeight: 2.0, description: "Narrative, descriptive, discursive essays" },
    { subjectCode: "ENG_HL", grade: 12, topicName: "Visual and Media Literacy", topicIndex: 1, examWeight: 1.5, description: "Analysing visual texts, media texts" },
    { subjectCode: "AFRI_FAL", grade: 10, topicName: "Leesbegrip en Taalgebruik", topicIndex: 1, examWeight: 1.5, description: "Reading comprehension, language structures" },
    { subjectCode: "AFRI_FAL", grade: 11, topicName: "Opstel Skryf en Analise", topicIndex: 1, examWeight: 2.0, description: "Essay writing, text analysis" },
    { subjectCode: "AFRI_FAL", grade: 12, topicName: "Visuele en Medialiteratuur", topicIndex: 1, examWeight: 1.5, description: "Analysing visual and media texts" },
  ];
  for (const topic of langTopics) {
    await prisma.curriculumTopic.upsert({
      where: { subjectCode_grade_topicName: { subjectCode: topic.subjectCode, grade: topic.grade, topicName: topic.topicName } },
      update: {}, create: topic,
    });
  }
  console.log(`Languages: ${langTopics.length} topics seeded`);
