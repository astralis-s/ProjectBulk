export type ActivityLevel = 'low' | 'moderate' | 'high';
export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export interface UserProfile {
  height: number;
  weight: number;
  age: number;
  goalWeight: number;
  appetite: 'low' | 'moderate' | 'high';
  budget: 'low' | 'medium';
  trainingTimeMinutes: number;
  sleepHours: number;
  confidence: ConfidenceLevel;
  isInitialOnboardingComplete: boolean;
}

export interface DailyStats {
  date: string;
  weight: number;
  calories: number;
  protein: number;
  water: number;
  sleep: number;
  workoutDone: boolean;
  appetiteLevel: number;
  confidenceLevel: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  priceEstimate: number;
  isLazy: boolean;
  ingredients: string[];
}

export interface WorkoutExercise {
  id: string;
  name: string;
  reps?: string;
  duration?: string;
  target?: string;
  description: string;
  isLowEnergy?: boolean;
}

export interface WorkoutSession {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string;
  icon: string;
}
