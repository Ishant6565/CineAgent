import { useState, useEffect, useCallback } from 'react';
import type { Movie, FilterOptions, AgentReasoningStep, ApiSettings } from './types/movie';
import { agentEngine } from './services/agentEngine';
import { Navbar } from './components/Navbar';
import { HeroAgentPrompt } from './components/HeroAgentPrompt';
import { MoodMatrix } from './components/MoodMatrix';
import { AgentVisualizer } from './components/AgentVisualizer';
import { MovieGrid } from './components/MovieGrid';
import { TrailerModal } from './components/TrailerModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';

const DEFAULT_FILTERS: FilterOptions = {
  selectedMood: null,
  selectedEra: 'All',
  selectedPacing: 'Any',
  selectedPlatform: 'All',
  minRating: 0,
  sortBy: 'match',
};

const DEFAULT_SETTINGS: ApiSettings = {
  model: 'gpt-4o',
  useLiveApi: false,
};

export function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [agentSteps, setAgentSteps] = useState<AgentReasoningStep[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [extractedVibes, setExtractedVibes] = useState<string[]>([]);
  
  // Watchlist state (persisted in localStorage)
  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('cineagent_watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings state (persisted in localStorage)
  const [settings, setSettings] = useState<ApiSettings>(() => {
    try {
      const saved = localStorage.getItem('cineagent_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Modals & Drawers state
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState<Movie | null>(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync watchlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cineagent_watchlist', JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to persist watchlist', e);
    }
  }, [watchlist]);

  // Execute Agent Recommendation
  const runAgent = useCallback(async (currentQuery: string, currentFilters: FilterOptions) => {
    setIsExecuting(true);
    setAgentSteps([]);

    try {
      const result = await agentEngine.runAgent(
        currentQuery,
        currentFilters,
        settings,
        (step) => {
          setAgentSteps((prev) => {
            const index = prev.findIndex((s) => s.id === step.id);
            if (index >= 0) {
              const updated = [...prev];
              updated[index] = step;
              return updated;
            }
            return [...prev, step];
          });
        }
      );

      setMovies(result.movies);
      setExtractedVibes(result.extractedVibes);
    } catch (error) {
      console.error('Agent execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  }, [settings]);

  // Initial load
  useEffect(() => {
    runAgent('', DEFAULT_FILTERS);
  }, []);

  // Search handler from prompt bar
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    runAgent(newQuery, filters);
  };

  // Filter change handler
  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    runAgent(query, newFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    runAgent(query, DEFAULT_FILTERS);
  };

  // Sort change handler
  const handleSortChange = (sortBy: 'match' | 'rating' | 'year') => {
    const updatedFilters = { ...filters, sortBy };
    setFilters(updatedFilters);
    runAgent(query, updatedFilters);
  };

  // Watchlist toggle
  const handleToggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  // Clear watchlist
  const handleClearWatchlist = () => {
    setWatchlist([]);
  };

  // Find similar movies action
  const handleFindSimilar = (movie: Movie) => {
    const prompt = `Atmospheric movies similar to ${movie.title} with ${movie.vibeKeywords.slice(0, 2).join(' and ')} vibes`;
    setQuery(prompt);
    runAgent(prompt, filters);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save settings
  const handleSaveSettings = (newSettings: ApiSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('cineagent_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  return (
    <div className="min-h-screen bg-mesh-gradient text-white flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* 1. Header / Navbar */}
      <Navbar
        watchlistCount={watchlist.length}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full">
        
        {/* 2. Hero & Agent Prompt Bar */}
        <HeroAgentPrompt
          onSearch={handleSearch}
          isLoading={isExecuting}
        />

        {/* 3. Mood & Aesthetic Matrix */}
        <MoodMatrix
          filters={filters}
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        {/* 4. Live Agent Reasoning Visualizer */}
        <AgentVisualizer
          steps={agentSteps}
          isExecuting={isExecuting}
          extractedVibes={extractedVibes}
        />

        {/* 5. Movie Recommendations Grid */}
        <MovieGrid
          movies={movies}
          watchlist={watchlist}
          filters={filters}
          onToggleWatchlist={handleToggleWatchlist}
          onOpenTrailer={(m) => setSelectedTrailerMovie(m)}
          onFindSimilar={handleFindSimilar}
          onSortChange={handleSortChange}
          onResetFilters={handleResetFilters}
        />

      </main>

      {/* 6. Footer with Ishant6565 Credits */}
      <Footer />

      {/* Modals & Drawers */}
      <TrailerModal
        movie={selectedTrailerMovie}
        onClose={() => setSelectedTrailerMovie(null)}
        isInWatchlist={selectedTrailerMovie ? watchlist.some((m) => m.id === selectedTrailerMovie.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onRemove={handleToggleWatchlist}
        onClear={handleClearWatchlist}
        onOpenTrailer={(m) => {
          setIsWatchlistOpen(false);
          setSelectedTrailerMovie(m);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />

    </div>
  );
}

export default App;
