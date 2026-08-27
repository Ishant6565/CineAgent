import React, { useState } from 'react';
import type { ApiSettings } from '../types/movie';
import { X, Key, Cpu, ShieldCheck, Sparkles, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApiSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#0e0e11] border border-white/15 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#141418] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-white" />
            <h3 className="font-display font-bold text-base text-white">
              Agent & API Configuration
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-5 text-xs">
          
          {/* Zero-Config Demo Mode Note */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-white font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero-Config High-Fidelity Mode Active</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400 font-light">
              By default, CineAgent AI operates seamlessly with an embedded neural heuristic agent and curated intelligence records. Providing API keys enables live external web crawling.
            </p>
          </div>

          {/* OpenAI API Key */}
          <div className="space-y-1.5">
            <label className="text-zinc-300 font-mono flex items-center justify-between">
              <span>OpenAI API Key (Optional):</span>
              <span className="text-[10px] text-zinc-500 font-sans">sk-...</span>
            </label>
            <input
              type="password"
              value={formData.openaiApiKey || ''}
              onChange={(e) => setFormData({ ...formData, openaiApiKey: e.target.value })}
              placeholder="sk-proj-..."
              className="w-full bg-[#16161a] text-zinc-200 rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-white/40 font-mono text-xs placeholder-zinc-600"
            />
          </div>

          {/* Exa API Key */}
          <div className="space-y-1.5">
            <label className="text-zinc-300 font-mono flex items-center justify-between">
              <span>Exa Neural Search API Key (Optional):</span>
              <span className="text-[10px] text-zinc-500 font-sans">exa-...</span>
            </label>
            <input
              type="password"
              value={formData.exaApiKey || ''}
              onChange={(e) => setFormData({ ...formData, exaApiKey: e.target.value })}
              placeholder="exa-api-key-..."
              className="w-full bg-[#16161a] text-zinc-200 rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-white/40 font-mono text-xs placeholder-zinc-600"
            />
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-zinc-300 font-mono flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-zinc-300" />
              <span>Reasoning LLM Architecture:</span>
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value as any })}
              className="w-full bg-[#16161a] text-zinc-200 rounded-xl px-3.5 py-2.5 border border-white/10 focus:outline-none focus:border-white/40 text-xs font-mono"
            >
              <option value="gpt-4o">GPT-4o (OpenAI Flagship - Recommended)</option>
              <option value="gpt-4o-mini">GPT-4o Mini (Fast & Lightweight)</option>
              <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Nuanced Film Theory)</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Context)</option>
            </select>
          </div>

          {/* Security Assurance */}
          <div className="flex items-start gap-2 text-[11px] text-zinc-500 font-light">
            <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
            <span>
              Your API keys are stored locally in your browser's <code className="text-zinc-400">localStorage</code> and are never transmitted to external third-party servers.
            </span>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Settings!</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
