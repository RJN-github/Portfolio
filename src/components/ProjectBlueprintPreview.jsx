import React from 'react';
import { CheckCircle2, Play, Terminal } from 'lucide-react';

const ProjectBlueprintPreview = ({ type, compact = false }) => {
  if (type === 'blueprint-video') {
    return (
      <div
        className={`w-full h-full bg-[#141418] text-[#FAFAF9] flex flex-col justify-between ${
          compact ? 'p-4' : 'p-6 sm:p-7'
        }`}
      >
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
          <p className="text-[11px] font-mono text-[#FB7185]">Interactive UI Preview · Next.js</p>
          <span className="text-[11px] font-mono text-[#A1A1AA]">NullClass Ltd.</span>
        </div>

        <div className="my-4 rounded-lg border border-white/10 bg-[#0B0B0E] p-4 flex flex-col justify-between gap-4">
          <div className="h-24 rounded-md bg-gradient-to-br from-[#1C1C24] to-[#09090B] border border-white/10 flex items-center justify-center">
            <span className="w-10 h-10 rounded-full bg-[#E11D48] flex items-center justify-center text-white">
              <Play className="w-4 h-4 fill-current ml-0.5" aria-hidden="true" />
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
            <span>Upload · Stream · Auth</span>
            <span>MongoDB · Express</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A]">
          <span>next.config.ts · src/</span>
          <span>TypeScript · Tailwind</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-[#141418] text-[#FAFAF9] flex flex-col justify-between ${
        compact ? 'p-4' : 'p-6 sm:p-7'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
        <p className="text-[11px] font-mono text-[#FB7185]">Interactive UI Preview · quiz.php</p>
        <Terminal className="w-3.5 h-3.5 text-[#A1A1AA]" aria-hidden="true" />
      </div>

      <div className="my-4 rounded-lg border border-white/10 bg-[#0B0B0E] p-4 space-y-2.5 text-xs font-mono">
        <p className="text-[#FAFAF9] font-sans font-medium text-sm">
          MCQ Evaluation &amp; Score Persistence
        </p>
        <div className="flex items-center gap-2 text-[#A1A1AA]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D48] shrink-0" aria-hidden="true" />
          <span>Auth (login.php, register.php)</span>
        </div>
        <div className="flex items-center gap-2 text-[#A1A1AA]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#E11D48] shrink-0" aria-hidden="true" />
          <span>Score History (setscore.php, history.php)</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A]">
        <span>code_crafters.sql</span>
        <span>PHP · MySQL · JS</span>
      </div>
    </div>
  );
};

export default ProjectBlueprintPreview;
