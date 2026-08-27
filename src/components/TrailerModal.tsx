import React, { useEffect } from 'react';
import type { Movie } from '../types/movie';
import { X, Star, Sparkles, Tv, Bookmark, BookmarkCheck } from 'lucide-react';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  onClose,
  isInWatchlist,
  onToggleWatchlist,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#0e0e11] border border-white/15 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#141418] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg text-white">
              {movie.title}
            </span>
            <span className="text-xs font-mono text-zinc-400">
              ({movie.year})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(movie)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                isInWatchlist
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-zinc-300 hover:text-white border-white/15 hover:bg-white/10'
              }`}
            >
              {isInWatchlist ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isInWatchlist ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* YouTube Video Player Embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0`}
              title={`${movie.title} Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Synopsis & AI Analysis */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  Synopsis
                </h4>
                <p className="text-sm text-zinc-200 leading-relaxed font-light">
                  {movie.overview}
                </p>
              </div>

              {/* AI Agent Deep Breakdown */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-mono text-white font-semibold mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Agent Deep Reasoning Profile</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light mb-3">
                  {movie.aiRationale}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {movie.thematicTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15 text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Metadata & Stream */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Director</span>
                  <span className="font-medium text-zinc-200">{movie.director}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Starring</span>
                  <span className="font-medium text-zinc-200">{movie.cast.join(', ')}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Ratings</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current text-white" />
                      {movie.imdbRating} / 10
                    </span>
                    <span className="text-zinc-300 font-semibold">
                      🍅 {movie.rottenTomatoes}% RT
                    </span>
                  </div>
                </div>
              </div>

              {/* Streaming Platform availability */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-400 font-mono flex items-center gap-1 mb-2">
                  <Tv className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Available on:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {movie.streamingPlatforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200 text-[11px] font-medium"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
