import React from 'react';
import type { Movie, FilterOptions } from '../types/movie';
import { MovieCard } from './MovieCard';
import { Film, ArrowUpDown } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  watchlist: Movie[];
  filters: FilterOptions;
  onToggleWatchlist: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  onFindSimilar: (movie: Movie) => void;
  onSortChange: (sortBy: 'match' | 'rating' | 'year') => void;
  onResetFilters: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  watchlist,
  filters,
  onToggleWatchlist,
  onOpenTrailer,
  onFindSimilar,
  onSortChange,
  onResetFilters,
}) => {
  const isMovieInWatchlist = (id: string) => watchlist.some((m) => m.id === id);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      
      {/* Subheader & Sort Control */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 flex-wrap gap-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
            <span>Agent Recommendations</span>
            <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
              {movies.length} {movies.length === 1 ? 'Film' : 'Films'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-1">
            Ranked by multi-factor neural relevance and GPT-4o semantic evaluation
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs text-zinc-400 font-mono">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="bg-[#121215] text-xs text-zinc-200 rounded-xl px-3 py-1.5 border border-white/10 focus:outline-none focus:border-white/40"
          >
            <option value="match">Match Score (%)</option>
            <option value="rating">IMDb Rating</option>
            <option value="year">Release Year (Newest)</option>
          </select>
        </div>
      </div>

      {/* Movie Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isInWatchlist={isMovieInWatchlist(movie.id)}
              onToggleWatchlist={onToggleWatchlist}
              onOpenTrailer={onOpenTrailer}
              onFindSimilar={onFindSimilar}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl bg-[#0f0f12] border border-white/10 p-12 text-center max-w-lg mx-auto my-8">
          <Film className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="font-display font-semibold text-lg text-white mb-2">
            No Films Found
          </h3>
          <p className="text-xs text-zinc-400 mb-6 font-light leading-relaxed">
            The agent couldn't find any films matching your exact combination of mood, pacing, era, and platform filters.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-lg"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
