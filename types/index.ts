export interface User {
  id: string;
  email: string | null;
  createdAt: string;
}

export interface Profile {
  userId: string;
  displayName: string | null;
  timezone: string | null;
  onboardingStep: number;
  completionPercent: number;
  updatedAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  cadence: string;
  createdAt: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
}

export interface MoodLog {
  id: string;
  userId: string;
  date: string;
  score: number;
  note: string | null;
}

export interface BrainDump {
  id: string;
  userId: string;
  transcript: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  status: string;
  tier: string;
  currentPeriodEnd: string | null;
}
