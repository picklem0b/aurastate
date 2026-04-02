import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  region: string;
  province: string;
  grade: number;
  stream: string;
  subjects: string[];
  avatarUrl?: string;
}

interface OnboardingData {
  region?: string;
  province?: string;
  school?: string;
  grade?: number;
  stream?: string;
  subjects?: string[];
  goals?: string[];
  studyStyle?: string;
  weakPoints?: string[];
  focusMode?: string;
  auraColor?: string;
  notifications?: boolean;
}

interface UserStore {
  profile: UserProfile | null;
  onboardingData: OnboardingData;
  isOnboarded: boolean;
  setProfile: (profile: UserProfile) => void;
  setOnboardingData: (data: OnboardingData) => void;
  markOnboarded: () => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      onboardingData: {},
      isOnboarded: false,
      setProfile: (profile) => set({ profile }),
      setOnboardingData: (data) =>
        set((s) => ({ onboardingData: { ...s.onboardingData, ...data } })),
      markOnboarded: () => set({ isOnboarded: true }),
      reset: () => set({ profile: null, onboardingData: {}, isOnboarded: false }),
    }),
    { name: "aurastate:user" }
  )
);
