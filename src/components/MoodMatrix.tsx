import React from 'react';
import type { FilterOptions, MoodType, EraType, PacingType, StreamingPlatform } from '../types/movie';
import { SlidersHorizontal, Compass, Clock, Film, Tv, Star, RotateCcw } from 'lucide-react';

interface MoodMatrixProps {
  filters: FilterOptions;
  onChange: (newFilters: FilterOptions) => void;
  onReset: () => void;
}

const MOODS: MoodType[] = [
  'Mind-Bending',
  'Dark & Gritty',
  'Cozy & Wholesome',
  'Adrenaline Rush',
  'Melancholic & Deep',
  'Uplifting & Inspiring',
  'Eerie & Mysterious',
  'Cyberpunk / Futuristic',
];

const ERAS: EraType[] = ['All', '2020s', '2010s', '2000s', '90s', 'Classics'];
const PACING_OPTIONS: PacingType[] = ['Any', 'Slow Burn', 'Balanced', 'Fast-Paced'];
const PLATFORMS: (StreamingPlatform | 'All')[] = [
  'All',
  'Netflix',
  'Amazon Prime',
  'Max',
  'Apple TV+',
  'Hulu',
  'Paramount+',
  'Criterion Channel',
];

export const MoodMatrix: React.FC<MoodMatrixProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const handleMoodToggle = (mood: MoodType) => {
    onChange({
      ...filters,
      selectedMood: filters.selectedMood === mood ? null : mood,
    });
  };

  const isFiltered = filters.selectedMood !== null ||
    filters.selectedEra !== 'All' ||
    filters.selectedPacing !== 'Any' ||
    filters.selectedPlatform !== 'All' ||
    filters.minRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="rounded-2xl bg-[#0e0e11] border border-white/10 p-4 sm:p-6 backdrop-blur-xl shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-zinc-300 font-semibold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
            <span>Taste & Aesthetic Matrix</span>
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* 1. Mood Buttons */}
        <div className="mb-5">
          <label className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-2.5">
            <Compass className="w-3.5 h-3.5 text-zinc-300" />
            <span>Atmospheric & Emotional Tone:</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((mood) => {
              const isSelected = filters.selectedMood === mood;
              return (
                <button
                  key={mood}
                  onClick={() => handleMoodToggle(mood)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-white/[0.04] hover:bg-white/10 text-zinc-300 border border-white/5'
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid for Era, Pacing, Platform, Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Era */}
          <div>
            <label className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-2">
              <Film className="w-3.5 h-3.5 text-zinc-300" />
              <span>Release Era:</span>
            </label>
            <select
              value={filters.selectedEra}
              onChange={(e) => onChange({ ...filters, selectedEra: e.target.value as EraType })}
              className="w-full bg-[#16161a] text-xs text-zinc-200 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-white/40"
            >
              {ERAS.map((era) => (
                <option key={era} value={era}>
                  {era === 'All' ? 'All Eras' : era}
                </option>
              ))}
            </select>
          </div>

          {/* Pacing */}
          <div>
            <label className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-2">
              <Clock className="w-3.5 h-3.5 text-zinc-300" />
              <span>Narrative Pacing:</span>
            </label>
            <select
              value={filters.selectedPacing}
              onChange={(e) => onChange({ ...filters, selectedPacing: e.target.value as PacingType })}
              className="w-full bg-[#16161a] text-xs text-zinc-200 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-white/40"
            >
              {PACING_OPTIONS.map((pace) => (
                <option key={pace} value={pace}>
                  {pace === 'Any' ? 'Any Pacing' : pace}
                </option>
              ))}
            </select>
          </div>

          {/* Streaming Platform */}
          <div>
            <label className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-2">
              <Tv className="w-3.5 h-3.5 text-zinc-300" />
              <span>Streaming Service:</span>
            </label>
            <select
              value={filters.selectedPlatform}
              onChange={(e) => onChange({ ...filters, selectedPlatform: e.target.value as any })}
              className="w-full bg-[#16161a] text-xs text-zinc-200 rounded-xl px-3 py-2 border border-white/10 focus:outline-none focus:border-white/40"
            >
              {PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>
                  {plat === 'All' ? 'All Streaming Services' : plat}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <label className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 mb-2">
              <Star className="w-3.5 h-3.5 text-white" />
              <span>Min IMDb ({filters.minRating > 0 ? filters.minRating.toFixed(1) : 'Any'}):</span>
            </label>
            <input
              type="range"
              min="0"
              max="8.5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => onChange({ ...filters, minRating: parseFloat(e.target.value) })}
              className="w-full accent-white bg-zinc-800 h-1.5 rounded-lg appearance-none cursor-pointer mt-2"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
