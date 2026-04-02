"use client";

import { useState, useRef, useCallback } from "react";

interface UseSocraticAudioReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

/**
 * useSocraticAudio
 * Web Speech API wrapper for the Socratic Interviewer voice input.
 */
export function useSocraticAudio(): UseSocraticAudioReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRec =
      window.SpeechRecognition || (window as Window & { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-ZA"; // South African English

    recognition.onresult = (event) => {
      const interim = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setTranscript(interim);
    };

    recognition.onerror = (event) => {
      setError(`Recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setError(null);
  }, [isSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, isSupported, transcript, startListening, stopListening, error };
}
