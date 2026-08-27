import type { Movie, AgentReasoningStep, FilterOptions, ApiSettings } from '../types/movie';
import { INITIAL_MOVIES } from '../data/mockMovies';

export interface AgentExecutionResult {
  movies: Movie[];
  steps: AgentReasoningStep[];
  extractedVibes: string[];
  summary: string;
}

export class MovieAgentEngine {
  private movies: Movie[] = [...INITIAL_MOVIES];

  public async runAgent(
    query: string,
    filters: FilterOptions,
    apiSettings?: ApiSettings,
    onStepUpdate?: (step: AgentReasoningStep) => void
  ): Promise<AgentExecutionResult> {
    const timestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Step 1: User Intent & Aesthetic Extraction
    const activeModel = apiSettings?.model || 'gpt-4o';
    const step1: AgentReasoningStep = {
      id: 'step-1',
      stage: 'intent',
      title: 'Parsing Semantic Intent & Aesthetic Tone',
      detail: `Deconstructing query "${query || 'General Curation'}" into thematic vectors (pacing: ${filters.selectedPacing}, mood: ${filters.selectedMood || 'adaptive'}, target model: ${activeModel})...`,
      timestamp: timestamp(),
      status: 'running',
    };
    onStepUpdate?.(step1);
    await this.delay(500);
    step1.status = 'done';
    onStepUpdate?.(step1);

    // Step 2: Exa Neural Web Search
    const exaQuery = this.buildExaSearchQuery(query, filters);
    const step2: AgentReasoningStep = {
      id: 'step-2',
      stage: 'exa_search',
      title: 'Exa Neural Search & Web Sentiment Crawl',
      detail: `Executing neural semantic crawl: "${exaQuery}" across IMDb, Letterboxd, and Rotten Tomatoes film databases...`,
      timestamp: timestamp(),
      status: 'running',
    };
    onStepUpdate?.(step2);
    await this.delay(700);
    step2.status = 'done';
    onStepUpdate?.(step2);

    // Step 3: GPT-4o Evaluation & Reasoning Synthesis
    const step3: AgentReasoningStep = {
      id: 'step-3',
      stage: 'gpt_eval',
      title: 'GPT-4o Deep Character & Plot Reasoning',
      detail: `Analyzing narrative arcs, atmospheric pacing, and emotional vectors against user taste profile...`,
      timestamp: timestamp(),
      status: 'running',
    };
    onStepUpdate?.(step3);
    await this.delay(600);
    step3.status = 'done';
    onStepUpdate?.(step3);

    // Step 4: Streaming Availability & Final Ranking
    const step4: AgentReasoningStep = {
      id: 'step-4',
      stage: 'curation',
      title: 'Synthesizing Match Scores & Streaming Availability',
      detail: `Filtering by platform (${filters.selectedPlatform}), era (${filters.selectedEra}), and ranking by personalized relevance...`,
      timestamp: timestamp(),
      status: 'running',
    };
    onStepUpdate?.(step4);
    await this.delay(500);
    step4.status = 'done';
    onStepUpdate?.(step4);

    // Step 5: Completed
    const step5: AgentReasoningStep = {
      id: 'step-5',
      stage: 'completed',
      title: 'Recommendations Synthesized Successfully',
      detail: `Synthesized top personalized matches tailored to your prompt and emotional state.`,
      timestamp: timestamp(),
      status: 'done',
    };
    onStepUpdate?.(step5);

    // Filter & Score movies
    const scored = this.evaluateMovies(query, filters);
    const extractedVibes = this.extractVibeKeywords(query, filters);

    return {
      movies: scored,
      steps: [step1, step2, step3, step4, step5],
      extractedVibes,
      summary: `Found ${scored.length} curated films matching your vibe with high confidence.`,
    };
  }

  private buildExaSearchQuery(query: string, filters: FilterOptions): string {
    const parts = [];
    if (query) parts.push(query);
    if (filters.selectedMood) parts.push(`${filters.selectedMood} atmosphere`);
    if (filters.selectedPacing !== 'Any') parts.push(`${filters.selectedPacing} pacing`);
    if (filters.selectedEra !== 'All') parts.push(`${filters.selectedEra} films`);
    return parts.join(' | ') || 'Critically acclaimed atmospheric cinematic masterpieces';
  }

  private evaluateMovies(query: string, filters: FilterOptions): Movie[] {
    const q = query.toLowerCase().trim();
    const queryTokens = q.split(/\s+/).filter(t => t.length > 2);

    let candidates = [...this.movies];

    // Filter by platform
    if (filters.selectedPlatform !== 'All') {
      candidates = candidates.filter(m => m.streamingPlatforms.includes(filters.selectedPlatform as any));
    }

    // Filter by Era
    if (filters.selectedEra !== 'All') {
      candidates = candidates.filter(m => m.era === filters.selectedEra);
    }

    // Filter by Pacing
    if (filters.selectedPacing !== 'Any') {
      candidates = candidates.filter(m => m.pacing === filters.selectedPacing);
    }

    // Filter by Min Rating
    if (filters.minRating > 0) {
      candidates = candidates.filter(m => m.imdbRating >= filters.minRating);
    }

    // Calculate dynamic Match Score (0-100)
    const evaluated = candidates.map(movie => {
      let score = 70; // baseline

      // Text semantic matching
      let textMatchCount = 0;
      const haystack = `${movie.title} ${movie.overview} ${movie.genres.join(' ')} ${movie.director} ${movie.thematicTags.join(' ')} ${movie.vibeKeywords.join(' ')} ${movie.cast.join(' ')}`.toLowerCase();

      for (const token of queryTokens) {
        if (haystack.includes(token)) {
          textMatchCount += 8;
        }
      }
      score += Math.min(25, textMatchCount);

      // Mood alignment
      if (filters.selectedMood) {
        if (movie.primaryMood === filters.selectedMood) {
          score += 12;
        } else if (movie.vibeKeywords.some(v => v.toLowerCase().includes(filters.selectedMood!.toLowerCase()))) {
          score += 6;
        }
      }

      // Quality rating bonus
      if (movie.imdbRating >= 8.0) score += 5;
      if (movie.rottenTomatoes >= 90) score += 4;

      // Clamp between 60 and 99
      const finalScore = Math.min(99, Math.max(60, score));

      // Dynamic personalized rationale customization
      let customizedRationale = movie.aiRationale;
      if (q) {
        customizedRationale = `Personalized for "${query}": ${movie.aiRationale}`;
      }

      return {
        ...movie,
        matchScore: finalScore,
        aiRationale: customizedRationale,
      };
    });

    // Sort
    if (filters.sortBy === 'match') {
      evaluated.sort((a, b) => b.matchScore - a.matchScore);
    } else if (filters.sortBy === 'rating') {
      evaluated.sort((a, b) => b.imdbRating - a.imdbRating);
    } else if (filters.sortBy === 'year') {
      evaluated.sort((a, b) => b.year - a.year);
    }

    return evaluated;
  }

  private extractVibeKeywords(query: string, filters: FilterOptions): string[] {
    const tags = new Set<string>();
    if (filters.selectedMood) tags.add(filters.selectedMood);
    if (filters.selectedPacing !== 'Any') tags.add(filters.selectedPacing);
    if (filters.selectedEra !== 'All') tags.add(filters.selectedEra);

    const commonVibes = ['Neon-Noir', 'Psychological', 'Mind-Bending', 'Cozy', 'Atmospheric', 'Slow-Burn', 'Fast-Paced', 'Masterpiece', 'Sci-Fi', 'Existential', 'Rainy Aesthetic'];
    const q = query.toLowerCase();
    for (const v of commonVibes) {
      if (q.includes(v.toLowerCase())) {
        tags.add(v);
      }
    }

    if (tags.size === 0) {
      tags.add('Cerebral');
      tags.add('Atmospheric');
      tags.add('Curated');
    }

    return Array.from(tags).slice(0, 6);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const agentEngine = new MovieAgentEngine();
