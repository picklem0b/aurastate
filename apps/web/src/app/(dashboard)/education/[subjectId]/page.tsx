import type { Metadata } from "next";

interface Props {
  params: Promise<{ subjectId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subjectId } = await params;
  return { title: `Subject · ${subjectId}` };
}

export default async function SubjectPage({ params }: Props) {
  const { subjectId } = await params;
  return (
    <section className="p-4">
      <h1 className="font-display text-2xl font-bold text-ink-primary capitalize">
        {subjectId.replace(/-/g, " ")}
      </h1>
    </section>
  );
}
