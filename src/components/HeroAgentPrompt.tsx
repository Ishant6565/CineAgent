import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface HeroAgentPromptProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const PRESET_PROMPTS = [
  'Mind-bending psychological thrillers with rain aesthetic',
  'Neon-drenched cyberpunk neo-noir like Blade Runner 2049',
  'Cozy wholesome animated fantasies for a quiet evening',
  'High-intensity intellectual dramas with shocking twists',
  'Poetic melancholic romances about destiny and missed paths',
];

export const HeroAgentPrompt: React.FC<HeroAgentPromptProps> = ({
  onSearch,
  isLoading,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSelectPreset = (preset: string) => {
    setQuery(preset);
    onSearch(preset);
  };

  return (
    <section className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-center px-4">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Minimalist Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 mb-6 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>Exa Neural Web Agent &bull; GPT-4o Multi-Step Architecture</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
          Describe your vibe. <br />
          <span className="text-gradient-mono">Let AI find your masterpiece.</span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Deep semantic film discovery using Exa neural search and multi-step GPT-4o reasoning to match your emotional state, pacing, and visual aesthetic.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center rounded-2xl bg-[#111114] border border-white/10 p-2 sm:p-2.5 shadow-2xl focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10 transition-all">
            <Search className="w-5 h-5 text-zinc-500 ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'A slow-burn existential mystery with gloomy rain aesthetics and high tension'..."
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shrink-0 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Reasoning...</span>
                </>
              ) : (
                <>
                  <span>Ask Agent</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="text-xs text-zinc-500 font-mono mr-1">Suggestions:</span>
          {PRESET_PROMPTS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(preset)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 transition-all text-left truncate max-w-[280px] sm:max-w-none"
            >
              "{preset}"
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
