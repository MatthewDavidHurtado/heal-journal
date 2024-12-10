export interface JournalEntry {
  id: string;
  threadTitle: string;
  color: ColorOption;
  number: number;
  content: string;
  beliefs: Belief[];
  victories?: Victory[];
  dailyActions: DailyAction[];
  createdAt: string;
  updatedAt: string;
}

export interface Belief {
  id: string;
  belief: string;
  howIsItALie: string;
}

export interface Victory {
  id: string;
  title: string;
  description: string;
  date: string;
  category: VictoryCategory;
}

export interface DailyAction {
  id: string;
  content: string;
  results: string;
  createdAt: string;
  updatedAt: string;
}

export type VictoryCategory = 
  | 'spiritual'
  | 'personal'
  | 'relationships'
  | 'health'
  | 'career'
  | 'other';

export type ColorOption =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'black'
  | 'white'
  | 'brown'
  | 'grey';

export interface SaveResult {
  success: boolean;
  id: string;
  error?: string;
}