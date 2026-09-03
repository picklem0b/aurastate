import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding AuraState database...");

  // ── War Rooms ──────────────────────────────────────────
  const generalRoom = await prisma.warRoom.upsert({
    where: { id: "room_matric_2026" },
    update: {},
    create: {
      id: "room_matric_2026",
      name: "Matric 2026 - General",
      description: "The main hub for Matric 2026 students across South Africa.",
      isPublic: true,
    },
  });

  const mathRoom = await prisma.warRoom.upsert({
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

  const scienceRoom = await prisma.warRoom.upsert({
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

  const lifeSciRoom = await prisma.warRoom.upsert({
    where: { id: "room_life_sciences" },
    update: {},
    create: {
      id: "room_life_sciences",
      name: "Life Sciences War Room",
      description: "Cell biology, genetics, and exam prep.",
      isPublic: true,
      subjectCode: "LIFE_SCI",
    },
  });

  const accountingRoom = await prisma.warRoom.upsert({
    where: { id: "room_accounting" },
    update: {},
    create: {
      id: "room_accounting",
      name: "Accounting War Room",
      description: "Financial statements, journals, and reconciliations.",
      isPublic: true,
      subjectCode: "ACCT",
    },
  });

  console.log("War rooms seeded:");
  console.log(`  - ${generalRoom.name}`);
  console.log(`  - ${mathRoom.name}`);
  console.log(`  - ${scienceRoom.name}`);
  console.log(`  - ${lifeSciRoom.name}`);
  console.log(`  - ${accountingRoom.name}`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
