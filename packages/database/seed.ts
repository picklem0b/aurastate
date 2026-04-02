import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding AuraState database...");

  // Create a test room
  const room = await prisma.room.upsert({
    where: { id: "room_matric_2026" },
    update: {},
    create: {
      id: "room_matric_2026",
      name: "Matric 2026 · General",
      description: "The main hub for Matric 2026 students across South Africa.",
      isPublic: true,
    },
  });

  const mathRoom = await prisma.room.upsert({
    where: { id: "room_mathematics" },
    update: {},
    create: {
      id: "room_mathematics",
      name: "Mathematics War Room",
      description: "Functions, calculus, and exam prep. No fluff.",
      isPublic: true,
      subject: "Mathematics",
    },
  });

  console.log("✓ Rooms seeded:", room.name, "|", mathRoom.name);
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
