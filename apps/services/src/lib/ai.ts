const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  model?: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
}

const FREE_MODELS = {
  socratic: "meta-llama/llama-3-8b-instruct:free",
  flashcards: "meta-llama/llama-3-8b-instruct:free",
  quiz: "meta-llama/llama-3-8b-instruct:free",
  general: "meta-llama/llama-3-8b-instruct:free",
} as const;

export async function chatCompletion(options: ChatOptions): Promise<string> {
  const {
    model = FREE_MODELS.general,
    messages,
    maxTokens = 512,
    temperature = 0.7,
  } = options;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "https://aurastate.app",
      "X-Title": "AuraState",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content ?? "";
}

export { FREE_MODELS };
