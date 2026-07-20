import { useEffect, useState } from 'react';
import { speakTaiyu } from '../../lib/speech';
import { Lightbulb, RotateCcw, ChevronRight, Volume2, Trophy, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { GameShell } from './GameShell';
import { GameHeader } from './GameHeader';
import {
  food_baw,
  food_tauhue,
  food_bemtsuk,
  food_junbiann,
  food_gerpiann,
  food_tsuanntsa,
  food_uaakue,
  food_tshangyupiann,
} from '../../assets/images/games';
import {
  charDad,
  charAming,
  charAhui,
  charMom,
  charGrandpa,
} from '../../assets/images/characters';

interface FoodItem {
  id: string;
  name: string;
  img: string;
  tailo: string;
}

interface NameItem {
  id: string;
  name: string;
  tailo: string;
}

const FOODS: FoodItem[] = [
  { id: 'baw', name: '肉圓', img: food_baw, tailo: 'gû-ùnn' },
  { id: 'tauhue', name: '豆花', img: food_tauhue, tailo: 'tāu-huā' },
  { id: 'bemtsuk', name: '鹹粥', img: food_bemtsuk, tailo: 'bē-ûn' },
  { id: 'junbiann', name: '潤餅', img: food_junbiann, tailo: 'bûn-piánn' },
  { id: 'gerpiann', name: '月餅', img: food_gerpiann, tailo: 'gōeh-piánn' },
  { id: 'tsuanntsa', name: '串炸', img: food_tsuanntsa, tailo: 'gē-chià' },
  { id: 'uaakue', name: '碗粿', img: food_uaakue, tailo: 'guán-kuí' },
  { id: 'tshangyupiann', name: '蔥油餅', img: food_tshangyupiann, tailo: 'chiân-phiaⁿ' },
];

// Deliberately shown in a different order than FOODS, matching the shuffled layout of the template.
const NAMES: NameItem[] = [
  { id: 'junbiann', name: '潤餅', tailo: 'bûn-piánn' },
  { id: 'bemtsuk', name: '鹹粥', tailo: 'bē-ûn' },
  { id: 'baw', name: '肉圓', tailo: 'gû-ùnn' },
  { id: 'tauhue', name: '豆花', tailo: 'tāu-huā' },
  { id: 'uaakue', name: '碗粿', tailo: 'guán-kuí' },
  { id: 'tshangyupiann', name: '蔥油餅', tailo: 'chiân-phiaⁿ' },
  { id: 'tsuanntsa', name: '串炸', tailo: 'gē-chià' },
  { id: 'gerpiann', name: '月餅', tailo: 'gōeh-piánn' },
];

const TOTAL_TIME = 96; // seconds, matches "01:36" starting point shown in template

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Game1FoodMatch({
  onNext,
  onHome,
}: {
  onNext: () => void;
  onHome?: () => void;
}) {
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selLeft, setSelLeft] = useState<string | null>(null);
  const [selRight, setSelRight] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState<{ left: string | null; right: string | null }>({
    left: null,
    right: null,
  });
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [hints, setHints] = useState(3);
  const [hintTarget, setHintTarget] = useState<string | null>(null);

  const done = matched.size === FOODS.length;

  useEffect(() => {
    if (done || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [done, timeLeft]);

  useEffect(() => {
    if (selLeft && selRight) {
      if (selLeft === selRight) {
        setMatched((prev) => new Set(prev).add(selLeft));
        // Synthesize successful match announcement in Taiwanese
        const matchedFood = FOODS.find(f => f.id === selLeft);
        if (matchedFood) {
          playTaiyu(matchedFood.name);
        }
        setSelLeft(null);
        setSelRight(null);
      } else {
        setWrongFlash({ left: selLeft, right: selRight });
        setTimeout(() => {
          setWrongFlash({ left: null, right: null });
          setSelLeft(null);
          setSelRight(null);
        }, 500);
      }
    }
  }, [selLeft, selRight]);

  // Taiwanese Min Nan Audio synthesis function using centralized speakTaiyu
  const playTaiyu = (text: string) => {
    speakTaiyu(text);
  };

  const speakSelected = (id: string) => {
    const food = FOODS.find(f => f.id === id);
    if (food) {
      playTaiyu(food.name);
    }
  };

  const playQuestion = () => {
    const remaining = FOODS.filter((f) => !matched.has(f.id));
    if (remaining.length > 0) {
      // Pick next food to teach
      playTaiyu(remaining[0].name);
    } else {
      playTaiyu("全部配對成功！");
    }
  };

  const score = matched.size * 50;
  const stars = matched.size >= 7 ? 3 : matched.size >= 4 ? 2 : matched.size >= 1 ? 1 : 0;

  const restart = () => {
    setMatched(new Set());
    setSelLeft(null);
    setSelRight(null);
    setTimeLeft(TOTAL_TIME);
    setHints(3);
    setHintTarget(null);
  };

  const useHint = () => {
    if (hints <= 0) return;
    const remaining = FOODS.filter((f) => !matched.has(f.id));
    if (remaining.length === 0) return;
    setHints((h) => h - 1);
    setHintTarget(remaining[0].id);
    playTaiyu(remaining[0].name);
    setTimeout(() => setHintTarget(null), 1500);
  };

  return (
    <GameShell onHome={onHome}>
      {/* 1. Centralized consistent wooden header banner */}
      <GameHeader
        stageNumber={1}
        title="老街台語美食配對"
        subtitle="聽台語、認美食，完成老街尋味挑戰！"
        onSpeakQuestion={playQuestion}
      />

      {/* Stats Panel */}
      <div className="bg-[#FDFBF6]/95 backdrop-blur-sm rounded-3xl shadow-md p-4 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548] border border-[#EFE8D8]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#E4772E]" /> 目前分數 <span className="text-[#2D2A26]">{score} 分</span>
        </span>
        <span className="flex items-center gap-2">
          配對進度
          <span className="w-32 md:w-40 h-2.5 rounded-full bg-[#EFE8D8] overflow-hidden inline-block border border-gray-200">
            <span
              className="h-full block bg-[#4E9B5D] transition-all"
              style={{ width: `${(matched.size / FOODS.length) * 100}%` }}
            />
          </span>
          <span className="text-[#2D2A26]">{matched.size} / {FOODS.length}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-[#E4772E]" /> 剩餘時間 <span className="text-[#2D2A26]">{formatTime(timeLeft)}</span>
        </span>
        <span className="flex items-center gap-0.5 ml-auto">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`text-lg ${i < stars ? 'text-[#F2B84B]' : 'text-[#E5DFD0]'}`}>★</span>
          ))}
        </span>
      </div>

      {/* Main Matching Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_260px] gap-4 flex-1">
        {/* Left: Food cards (Grid of 8 foods matching Image 1) */}
        <div className="bg-[#FDFBF6]/95 backdrop-blur-sm rounded-3xl shadow-md p-4 border border-[#EFE8D8] flex flex-col">
          <div className="text-sm font-bold text-white bg-[#4E9B5D] rounded-full px-4 py-1.5 inline-block mb-3 shadow-sm w-fit">
            美食小吃（點擊發音與配對）
          </div>
          <div className="grid grid-cols-4 gap-2.5 flex-1 items-stretch">
            {FOODS.map((f) => {
              const isMatched = matched.has(f.id);
              const isSel = selLeft === f.id;
              const isWrong = wrongFlash.left === f.id;
              return (
                <button
                  key={f.id}
                  disabled={isMatched}
                  onClick={() => {
                    if (!isMatched) {
                      setSelLeft(f.id);
                      speakSelected(f.id);
                    }
                  }}
                  className={`rounded-2xl border-2 p-1.5 flex flex-col items-center justify-between gap-1 transition-all shadow-sm ${
                    isMatched
                      ? 'border-[#4E9B5D] bg-[#EAF6EC]/80 opacity-60'
                      : isWrong
                      ? 'border-red-400 bg-red-50 animate-pulse'
                      : isSel
                      ? 'border-[#E4772E] bg-[#FFF3E8] scale-98 shadow-inner ring-2 ring-[#E4772E]/30'
                      : 'border-[#8B5A2B]/40 bg-white hover:border-[#4E9B5D] hover:scale-102 hover:shadow-md'
                  }`}
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {isMatched && (
                      <div className="absolute inset-0 bg-[#4E9B5D]/20 flex items-center justify-center backdrop-blur-3xs">
                        <CheckCircle2 className="w-8 h-8 text-[#4E9B5D] drop-shadow-md" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-black text-[#3E2723] flex items-center gap-1 mt-1 shrink-0">
                    {f.name} <Volume2 className="w-3.5 h-3.5 text-[#4E9B5D] hover:scale-110" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Tai-lo Romanization names */}
        <div className="bg-[#FDFBF6]/95 backdrop-blur-sm rounded-3xl shadow-md p-4 border border-[#EFE8D8] flex flex-col">
          <div className="text-sm font-bold text-white bg-[#3E6FA8] rounded-full px-4 py-1.5 inline-block mb-3 shadow-sm w-fit">
            台語名稱（聽音配對）
          </div>
          <div className="grid grid-cols-2 gap-2.5 flex-1 items-stretch">
            {NAMES.map((n) => {
              const isMatched = matched.has(n.id);
              const isSel = selRight === n.id;
              const isWrong = wrongFlash.right === n.id;
              const isHint = hintTarget === n.id;
              return (
                <button
                  key={n.id}
                  disabled={isMatched}
                  onClick={() => {
                    if (!isMatched) {
                      setSelRight(n.id);
                      playTaiyu(n.name);
                    }
                  }}
                  className={`rounded-2xl border-2 px-3.5 py-2 flex items-center justify-between transition-all shadow-sm ${
                    isMatched
                      ? 'border-[#4E9B5D] bg-[#EAF6EC]/80 opacity-60'
                      : isWrong
                      ? 'border-red-400 bg-red-50 animate-pulse'
                      : isHint
                      ? 'border-[#F2B84B] bg-[#FFF7E0] animate-bounce'
                      : isSel
                      ? 'border-[#3E6FA8] bg-[#EAF1FB] scale-98 shadow-inner ring-2 ring-[#3E6FA8]/30'
                      : 'border-[#8B5A2B]/40 bg-white hover:border-[#3E6FA8] hover:scale-102 hover:shadow-md'
                  }`}
                >
                  <span className="text-left">
                    <div className="text-[10px] md:text-[11px] font-bold text-[#8A8378] tracking-wide font-mono">{n.tailo}</div>
                    <div className="text-sm md:text-base font-black text-[#2D2A26] mt-0.5">{n.name}</div>
                  </span>
                  <Volume2 className="w-4 h-4 text-[#3E6FA8] shrink-0 hover:scale-110" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="bg-[#FDFBF6]/95 backdrop-blur-sm rounded-3xl shadow-md p-4 flex flex-col border border-[#EFE8D8]">
          <div className="font-black text-[#2D2A26] mb-3 text-base flex items-center gap-1.5">
            <span>🎮</span> 遊戲說明
          </div>
          <ol className="text-xs text-[#5C5548] leading-relaxed space-y-2.5 list-decimal list-inside font-bold">
            <li>找對應美食：在左側選擇正確的美食圖片，卡片會發出台語發音喔！</li>
            <li>配對台語名稱：點擊右側對應的台語名稱與拼音。</li>
            <li>完成配對：兩邊都選對就會連上並標記綠色打勾。</li>
            <li>挑戰好成績：配對越快越準，分數和星星就越高喔！</li>
          </ol>
          <div className="mt-auto pt-4 text-xs text-[#8A8378] bg-[#F5F0E4] rounded-2xl p-3 border border-[#E6DFD0] font-bold flex items-start gap-1">
            <span>💡</span>
            <div>小提示：不會的時候可以先點「聽題目」或「提示」喔！</div>
          </div>
        </div>
      </div>

      {/* Control Buttons Panel */}
      <div className="flex items-center justify-between gap-3 px-1 relative z-10">
        <button
          onClick={useHint}
          disabled={hints <= 0}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4E9B5D] text-white font-black text-sm disabled:opacity-40 hover:bg-[#458752] active:scale-95 transition-all shadow-md"
        >
          <Lightbulb className="w-4 h-4" /> 提示 <span className="bg-white/25 rounded-full px-1.5 font-mono">{hints}</span>
        </button>
        <button
          onClick={restart}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8A8378] text-white font-black text-sm hover:bg-[#736C60] active:scale-95 transition-all shadow-md"
        >
          <RotateCcw className="w-4 h-4" /> 重新開始
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#E4772E] text-white font-black text-sm hover:bg-[#CC6620] active:scale-95 transition-all shadow-md"
        >
          {done ? '下一關' : '下一題'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
}
