interface Workout {
  user_id: string;
  workout_id: string;
  workout_name: string;
  workout_description: string;
  position: number;
  created_at: string | Date;
}

interface Day {
  day_id: string;
  day_name: string;
  day_description: string;
  position: number;
  created_at: string | Date;
  workout_id: string;
}

interface Result {
  resultId: string;
  resultDate: string;
  sets: ResultSet[];
}

interface ResultSet {
  resultId: string;
  setId: string;
  setNumber: number;
  reps: number;
  weightAmount: number;
  weightUnit: string;
  totalSets?: number;
  setAmount?: number;
  isFirstSet?: boolean;
  isLastSet?: boolean;
  resultDate?: string;
}

interface ExternalLink {
  label: string;
  href: string;
}

interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseDescription: string;
  exerciseExternalLinks: ExternalLink[];
  position: number;
  created_at: string | Date;
  exerciseType?: 'no type' | 'compound' | 'cardio' | 'isolation' | 'stretching';
  previousTrainingWasEasy: boolean;
  exerciseLastUpdated: string;
  exerciseResults: Result[];
}

interface Content {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  parentId?: string;
  optimistic?: boolean;
}

interface ExerciseNormalised {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string | Date;
  exerciseType: 'compound' | 'cardio' | 'isolation' | 'stretching';
  previousTrainingWasEasy: boolean;
  exerciseExternalLinks: ExternalLink[];
  exerciseLastUpdated: string;
  optimistic?: boolean;
  exerciseResults: Result[];
}

type Entity = 'workout' | 'day' | 'exercise';
type Operation = 'create' | 'edit' | 'duplicate' | 'delete';
