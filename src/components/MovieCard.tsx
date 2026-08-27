import React, { useState } from 'react';
import type { Movie } from '../types/movie';
import { Play, Bookmark, BookmarkCheck, Sparkles, Star, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  isInWatchlist: boolean;
  onToggleWatchlist: (movie: Movie) => void;
  onOpenTrailer: (movie: Movie) => void;
  onFindSimilar: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isInWatchlist,
  onToggleWatchlist,
  onOpenTrailer,
  onFindSimilar,
}) => {
  const [showFullRationale, setShowFullRationale] = useState(false);

  return (
    <div className="group relative rounded-2xl bg-[#0f0f12] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1">
      
      {/* Top Banner / Backdrop image */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90 grayscale-[40%] group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-[#0f0f12]/50 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Match Score */}
          <div className="px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-white" />
            <span>{movie.matchScore}% Match</span>
          </div>

          {/* Quick Watchlist Bookmark */}
          <button
            onClick={() => onToggleWatchlist(movie)}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all ${
              isInWatchlist
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black/70 text-zinc-300 hover:text-white border-white/15 hover:bg-black/90'
            }`}
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {isInWatchlist ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Play Trailer Overlay Button */}
        <button
          onClick={() => onOpenTrailer(movie)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-[2px]"
          aria-label={`Play trailer for ${movie.title}`}
        >
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </button>

        {/* Bottom image overlay metadata */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="text-[11px] font-mono text-zinc-300 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
            {movie.year} &bull; {movie.runtime}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
              <Star className="w-3 h-3 fill-current text-white" />
              {movie.imdbRating}
            </span>
            <span className="text-[11px] font-semibold text-zinc-300 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10">
              🍅 {movie.rottenTomatoes}%
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Title and Director */}
          <div className="mb-2">
            <h3 className="font-display font-bold text-lg text-white group-hover:text-zinc-200 transition-colors line-clamp-1">
              {movie.title}
            </h3>
            <p className="text-xs text-zinc-400 font-light">
              Dir. <span className="text-zinc-200 font-medium">{movie.director}</span>
            </p>
          </div>

          {/* AI Rationale */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 mb-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-200 font-medium mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-white" />
                GPT-4o Agent Rationale:
              </span>
            </div>
            <p className={`text-zinc-300 text-xs leading-relaxed font-light ${!showFullRationale ? 'line-clamp-2' : ''}`}>
              {movie.aiRationale}
            </p>
            {movie.aiRationale.length > 100 && (
              <button
                onClick={() => setShowFullRationale(!showFullRationale)}
                className="mt-1 text-[10px] text-zinc-300 hover:text-white hover:underline flex items-center gap-0.5"
              >
                <span>{showFullRationale ? 'Show less' : 'Read full thought'}</span>
                {showFullRationale ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Genres & Thematic Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded-md bg-white/[0.05] text-zinc-300 text-[10px] font-medium border border-white/5"
              >
                {g}
              </span>
            ))}
            {movie.vibeKeywords.slice(0, 2).map((v) => (
              <span
                key={v}
                className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-zinc-700"
              >
                #{v}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Streaming badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-zinc-500 font-mono">Stream:</span>
            {movie.streamingPlatforms.slice(0, 2).map((plat) => (
              <span
                key={plat}
                className="text-[10px] font-medium text-zinc-300 px-1.5 py-0.5 rounded bg-white/5 border border-white/5"
              >
                {plat}
              </span>
            ))}
            {movie.streamingPlatforms.length > 2 && (
              <span className="text-[10px] text-zinc-500">
                +{movie.streamingPlatforms.length - 2}
              </span>
            )}
          </div>

          {/* Similar Vibe action */}
          <button
            onClick={() => onFindSimilar(movie)}
            className="text-[11px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
            title={`Find movies with similar tone to ${movie.title}`}
          >
            <span>Similar</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
};
