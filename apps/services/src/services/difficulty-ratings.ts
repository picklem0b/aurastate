import { prisma } from "../lib/prisma.js";

export interface DifficultyRating {
  topicId: string;
  avgRating: number;
  totalVotes: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
}

export async function getDifficultyRating(topicId: string): Promise<DifficultyRating> {
  const material = await prisma.studyMaterial.findUnique({
    where: { id: topicId },
    select: { difficultyRating: true },
  });

  return {
    topicId,
    avgRating: material?.difficultyRating ?? 0,
    totalVotes: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
}

export async function submitRating(
  topicId: string,
  rating: number
): Promise<{ success: boolean; newAvg: number }> {
  if (rating < 1 || rating > 5) {
    return { success: false, newAvg: 0 };
  }

  const material = await prisma.studyMaterial.findUnique({
    where: { id: topicId },
    select: { difficultyRating: true },
  });

  const currentAvg = material?.difficultyRating ?? 0;
  const newAvg = currentAvg === 0 ? rating : Math.round(((currentAvg + rating) / 2) * 10) / 10;

  await prisma.studyMaterial.update({
    where: { id: topicId },
    data: { difficultyRating: newAvg },
  });

  return { success: true, newAvg };
}

export async function getTopicRatings(
  subjectCode: string,
  grade: number
): Promise<DifficultyRating[]> {
  const topics = await prisma.curriculumTopic.findMany({
    where: { subjectCode, grade },
    select: { id: true },
  });

  const ratings = await Promise.all(
    topics.map(async (topic) => {
      const rating = await getDifficultyRating(topic.id);
      return rating;
    })
  );

  return ratings;
}
