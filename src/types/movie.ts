export type StreamingPlatform = 
  | 'Netflix' 
  | 'Amazon Prime' 
  | 'Max' 
  | 'Disney+' 
  | 'Apple TV+' 
  | 'Hulu' 
  | 'Criterion Channel'
  | 'Paramount+';

export type MoodType = 
  | 'Mind-Bending' 
  | 'Dark & Gritty' 
  | 'Cozy & Wholesome' 
  | 'Adrenaline Rush' 
  | 'Melancholic & Deep' 
  | 'Uplifting & Inspiring' 
  | 'Eerie & Mysterious'
  | 'Cyberpunk / Futuristic';

export type EraType = 'All' | '2020s' | '2010s' | '2000s' | '90s' | 'Classics';
export type PacingType = 'Any' | 'Slow Burn' | 'Balanced' | 'Fast-Paced';

export interface EmotionalVector {
  tension: number; // 0-100
  intellect: number; // 0-100
  moodWeight: number; // 0-100 (light to dark)
  visualSpectacle: number; // 0-100
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: string; // e.g. "2h 28m"
  director: string;
  cast: string[];
  genres: string[];
  imdbRating: number;
  rottenTomatoes: number; // e.g. 94%
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId: string;
  streamingPlatforms: StreamingPlatform[];
  matchScore: number; // 0-100 calculated dynamically
  aiRationale: string; // GPT-4o personalized rationale
  thematicTags: string[];
  vibeKeywords: string[];
  emotionalVector: EmotionalVector;
  pacing: 'Slow Burn' | 'Balanced' | 'Fast-Paced';
  era: EraType;
  primaryMood: MoodType;
  similarTo?: string[];
}

export interface AgentReasoningStep {
  id: string;
  stage: 'intent' | 'exa_search' | 'gpt_eval' | 'curation' | 'completed';
  title: string;
  detail: string;
  timestamp: string;
  status: 'pending' | 'running' | 'done';
}

export interface FilterOptions {
  selectedMood: MoodType | null;
  selectedEra: EraType;
  selectedPacing: PacingType;
  selectedPlatform: StreamingPlatform | 'All';
  minRating: number;
  sortBy: 'match' | 'rating' | 'year';
}

export interface WatchlistItem {
  movie: Movie;
  addedAt: string;
  notes?: string;
}

export interface ApiSettings {
  openaiApiKey?: string;
  exaApiKey?: string;
  model: 'gpt-4o' | 'gpt-4o-mini' | 'claude-3-5-sonnet' | 'gemini-1.5-pro';
  useLiveApi: boolean;
}
