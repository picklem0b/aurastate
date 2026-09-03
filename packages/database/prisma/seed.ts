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
