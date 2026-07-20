import { motion } from 'motion/react';
import { Volume2 } from 'lucide-react';
import {
  charDad,
  charAming,
  charAhui,
  charMom,
  charGrandpa,
} from '../../assets/images/characters';

interface GameHeaderProps {
  stageNumber: number;
  title: string;
  subtitle: string;
  onSpeakQuestion?: () => void;
}

export function GameHeader({
  stageNumber,
  title,
  subtitle,
  onSpeakQuestion,
}: GameHeaderProps) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#FFFDF6] via-[#FCEAD4] to-[#F7D2AF] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 overflow-visible border border-[#FFE7C4] shadow-sm select-none mb-2">
      
      {/* Left Peeking Characters: Dad & Ahui */}
      <div className="hidden lg:flex items-end gap-1 select-none absolute left-2 bottom-0 h-44 pointer-events-none">
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          src={charDad}
          alt="爸爸"
          className="h-32 object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"
        />
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          src={charAhui}
          alt="阿輝"
          className="h-28 object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) -ml-4"
        />
      </div>

      {/* Center Wooden Sign Board */}
      <div className="flex-1 max-w-2xl mx-auto flex flex-col items-center justify-center relative z-10 w-full md:px-32 lg:px-40">
        <div className="w-full bg-gradient-to-b from-[#8B5A2B] to-[#5C3A21] border-4 border-[#3E1F07] rounded-2xl py-3 px-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md relative">
          <div className="flex items-center gap-3">
            {/* Badge */}
            <div className="w-10 h-10 rounded-full bg-[#E4772E] border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
              第{stageNumber}關
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-black text-[#F4D03F] text-xl md:text-2xl tracking-wide drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]">
                {title}
              </h2>
              <p className="text-[#FFFDF6] text-[11px] md:text-xs font-bold mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Click to play target word button (聽題目) */}
          {onSpeakQuestion && (
            <button
              onClick={onSpeakQuestion}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E4772E] text-white font-black text-xs border border-white hover:bg-[#CC6620] active:scale-95 transition-all shadow-sm shrink-0"
            >
              <Volume2 className="w-4 h-4" /> 聽題目
            </button>
          )}
        </div>
      </div>

      {/* Right Peeking Characters: Aming, Mom & Grandpa */}
      <div className="hidden lg:flex items-end gap-1 select-none absolute right-2 bottom-0 h-44 pointer-events-none">
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          src={charAming}
          alt="阿明"
          className="h-32 object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15))"
        />
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          src={charMom}
          alt="媽媽"
          className="h-[110px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) -ml-3"
        />
        <motion.img
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          src={charGrandpa}
          alt="阿公"
          className="h-[115px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) -ml-3"
        />
      </div>
    </div>
  );
}
