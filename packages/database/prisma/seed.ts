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
