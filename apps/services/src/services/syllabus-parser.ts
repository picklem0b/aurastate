interface ParsedResult {
  topics: string[];
  exams: { date: string; description: string }[];
  rawText: string;
  pageCount: number;
}

export function parseSyllabus(content: Buffer, filename: string): ParsedResult {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "pdf";

  if (ext === "txt") {
    const text = content.toString("utf-8");
    return extractFromText(text, 1);
  }

  // For PDF/image parsing, we'd use external services in production
  // For now, return a basic structure
  return {
    topics: [],
    exams: [],
    rawText: `[${ext.toUpperCase()} file: ${filename}]`,
    pageCount: 1,
  };
}

function extractFromText(text: string, pageCount: number): ParsedResult {
  const topics: string[] = [];
  const exams: { date: string; description: string }[] = [];

  const datePatterns = [
    /(\d{1,2}[\s/-](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[\w]*[\s/-]\d{2,4})/gi,
    /(\d{4}-\d{2}-\d{2})/g,
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/g,
  ];

  for (const line of text.split("\n")) {
    const trimmed = line.trim();

    // Extract topic lines (heuristic: starts with number or bullet)
    if (/^[\d]+[.\)\s]|^[•\-\*]/.test(trimmed) && trimmed.length > 5) {
      topics.push(trimmed);
    }

    // Extract dates
    for (const pattern of datePatterns) {
      const matches = trimmed.match(pattern);
      if (matches) {
        for (const match of matches) {
          exams.push({ date: match, description: trimmed });
        }
      }
    }
  }

  return {
    topics,
    exams,
    rawText: text,
    pageCount,
  };
}
