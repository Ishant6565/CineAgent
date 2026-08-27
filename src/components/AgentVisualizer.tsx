import React, { useState } from 'react';
import type { AgentReasoningStep } from '../types/movie';
import { CheckCircle2, Circle, Loader2, ChevronDown, ChevronUp, Cpu } from 'lucide-react';

interface AgentVisualizerProps {
  steps: AgentReasoningStep[];
  isExecuting: boolean;
  extractedVibes?: string[];
}

export const AgentVisualizer: React.FC<AgentVisualizerProps> = ({
  steps,
  isExecuting,
  extractedVibes,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (steps.length === 0 && !isExecuting) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="rounded-2xl bg-[#09090b] border border-white/15 overflow-hidden shadow-2xl transition-all">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#121215] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-mono font-medium text-zinc-200">
                Agent Reasoning Pipeline
              </span>
            </div>
            {isExecuting && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 text-[10px] font-mono animate-pulse">
                <Loader2 className="w-2.5 h-2.5 animate-spin" />
                Live Trace
              </span>
            )}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-xs flex items-center gap-1 font-mono"
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Terminal Body */}
        {isExpanded && (
          <div className="p-4 sm:p-5 font-mono text-xs space-y-3 max-h-72 overflow-y-auto">
            {steps.map((step) => {
              const isDone = step.status === 'done';
              const isRunning = step.status === 'running';

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all ${
                    isRunning
                      ? 'bg-white/[0.06] border-white/30 text-white'
                      : isDone
                      ? 'bg-white/[0.02] border-white/5 text-zinc-300'
                      : 'border-transparent text-zinc-600 opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isRunning ? (
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                    ) : isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-200" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-zinc-700" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={`font-semibold ${isRunning ? 'text-white' : isDone ? 'text-zinc-200' : 'text-zinc-500'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 shrink-0">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed break-words">
                      {step.detail}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Extracted Vibe Tags */}
            {extractedVibes && extractedVibes.length > 0 && (
              <div className="pt-2 border-t border-white/5 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-zinc-500 font-mono">Matched Vector Embeddings:</span>
                {extractedVibes.map((vibe, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/15 text-[10px]"
                  >
                    #{vibe}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
