import React from 'react';
import { Bookmark, Settings, Clapperboard } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

interface NavbarProps {
  watchlistCount: number;
  onOpenWatchlist: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  watchlistCount,
  onOpenWatchlist,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-black/85 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Author */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-md">
            <Clapperboard className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-tight text-white">
                CineAgent<span className="text-zinc-400">.ai</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold rounded-full bg-white/10 text-white border border-white/20">
                GPT-4o + Exa
              </span>
            </div>
            <a
              href="https://github.com/Ishant6565"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
            >
              by <span className="font-medium text-zinc-300 group-hover:text-white group-hover:underline">Ishant6565</span>
            </a>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Watchlist Toggle */}
          <button
            onClick={onOpenWatchlist}
            className="relative px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-white/[0.05] hover:bg-white hover:text-black border border-white/10 transition-all flex items-center gap-2 group shadow-sm"
            aria-label="View Watchlist"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Watchlist</span>
            {watchlistCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-white text-black group-hover:bg-black group-hover:text-white transition-colors">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/[0.05] hover:bg-white/15 border border-white/10 transition-all"
            aria-label="Agent Configuration"
            title="Configure API Keys & LLM"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* GitHub Repo link */}
          <a
            href="https://github.com/Ishant6565/CineAgent"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/15 hover:text-white border border-white/10 transition-all group"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </header>
  );
};
