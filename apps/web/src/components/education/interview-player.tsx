"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, MessageSquare, Loader2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewMessage {
  role: "interviewer" | "student";
  content: string;
  timestamp: Date;
}

interface InterviewPlayerProps {
  topic: string;
  subject: string;
  mode: "full_detail" | "exam_summary";
  onModeChange?: (mode: "full_detail" | "exam_summary") => void;
  className?: string;
}

/**
 * AuraState Socratic Interviewer
 * AI-driven dialogue engine. Converts notes → questions.
 * Supports voice + text responses.
 */
export function InterviewPlayer({
  topic,
  subject,
  mode,
  onModeChange,
  className,
}: InterviewPlayerProps) {
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: InterviewMessage = {
      role: "student",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/socratic/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          subject,
          mode,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          response: content,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "interviewer", content: data.question, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "interviewer", content: "Connection interrupted. Please retry.", timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    setListening((v) => !v);
    // TODO: Web Speech API integration
  };

  return (
    <div className={cn("flex flex-col h-[600px] rounded-2xl border border-border bg-surface overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-elevated">
        <div>
          <p className="font-mono text-xs text-solar-400 uppercase tracking-widest">{subject}</p>
          <p className="font-display text-sm font-semibold text-ink-primary mt-0.5">{topic}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onModeChange?.(mode === "full_detail" ? "exam_summary" : "full_detail")}
            className={cn(
              "text-xs px-2.5 py-1 rounded-lg border font-mono transition-colors",
              mode === "full_detail"
                ? "border-aura-blue text-aura-blue"
                : "border-solar-400 text-solar-400"
            )}
          >
            {mode === "full_detail" ? "FULL" : "EXAM"}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-ink-muted text-sm py-8">
            <MessageSquare size={24} className="mx-auto mb-2 opacity-30" />
            The Interviewer is ready. What do you know about {topic}?
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-2.5",
              msg.role === "student" && "flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                msg.role === "interviewer"
                  ? "bg-elevated text-ink-primary rounded-tl-sm"
                  : "bg-solar-400/10 border border-solar-400/30 text-solar-200 rounded-tr-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <div className="bg-elevated rounded-2xl rounded-tl-sm px-4 py-3">
              <Loader2 size={14} className="animate-spin text-solar-400" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 flex gap-2">
        <button
          onClick={toggleVoice}
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
            listening
              ? "bg-aura-red/20 border border-aura-red text-aura-red"
              : "bg-elevated border border-border text-ink-muted hover:text-ink-primary"
          )}
          aria-label="Toggle voice input"
        >
          {listening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          placeholder="Answer the question…"
          className="flex-1 bg-elevated border border-border rounded-xl px-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-solar-400/50 transition-colors"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="w-10 h-10 rounded-xl bg-solar-400 text-void flex items-center justify-center flex-shrink-0 hover:bg-solar-300 transition-colors disabled:opacity-30"
          aria-label="Send"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
