import React from 'react';
import type { Movie } from '../types/movie';
import { X, Trash2, Download, Play, Bookmark, Film } from 'lucide-react';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Movie[];
  onRemove: (movie: Movie) => void;
  onClear: () => void;
  onOpenTrailer: (movie: Movie) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onRemove,
  onClear,
  onOpenTrailer,
}) => {
  if (!isOpen) return null;

  const exportAsMarkdown = () => {
    let md = `# 🎬 My CineAgent Movie Watchlist\n\nCurated with CineAgent AI (by Ishant6565)\n\n`;
    watchlist.forEach((m, idx) => {
      md += `### ${idx + 1}. ${m.title} (${m.year})\n`;
      md += `- **Director**: ${m.director}\n`;
      md += `- **Genres**: ${m.genres.join(', ')}\n`;
      md += `- **Rating**: ⭐ ${m.imdbRating}/10 | 🍅 ${m.rottenTomatoes}%\n`;
      md += `- **Streaming**: ${m.streamingPlatforms.join(', ')}\n`;
      md += `- **AI Rationale**: ${m.aiRationale}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cineagent-watchlist-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e11] border-l border-white/15 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#141418] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-white" />
              <h3 className="font-display font-bold text-lg text-white">
                Saved Watchlist
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
                {watchlist.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <div
                  key={movie.id}
                  className="p-3 rounded-xl bg-[#16161a] border border-white/10 hover:border-white/20 transition-all flex items-center gap-3.5 group"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-14 h-20 object-cover rounded-lg bg-zinc-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-sm text-white truncate group-hover:text-zinc-200 transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono mb-1.5">
                      {movie.year} &bull; {movie.runtime} &bull; ⭐ {movie.imdbRating}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenTrailer(movie)}
                        className="text-[11px] text-zinc-300 hover:text-white hover:underline flex items-center gap-1 font-medium"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        Trailer
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemove(movie)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-all shrink-0"
                    title="Remove from list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <Film className="w-10 h-10 text-zinc-600 mx-auto" />
                <p className="text-sm text-zinc-400 font-medium">
                  Your watchlist is empty
                </p>
                <p className="text-xs text-zinc-500 font-light max-w-xs mx-auto">
                  Click the bookmark icon on any movie recommendation to save it for later.
                </p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {watchlist.length > 0 && (
            <div className="p-6 bg-[#141418] border-t border-white/10 space-y-3">
              <button
                onClick={exportAsMarkdown}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <Download className="w-4 h-4" />
                Export Watchlist (.md)
              </button>

              <button
                onClick={onClear}
                className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-medium text-xs flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
