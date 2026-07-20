import { useEffect, useState } from 'react';
import { Lightbulb, RotateCcw, ChevronRight, Volume2, Trophy, Clock } from 'lucide-react';
import { GameShell } from './GameShell';
import { charDad } from '../../assets/images/characters';
import {
  game1Hero,
  food_baw,
  food_tauhue,
  food_bemtsuk,
  food_junbiann,
  food_gerpiann,
  food_tsuanntsa,
  food_uaakue,
  food_tshangyupiann,
} from '../../assets/images/games';

interface FoodItem {
  id: string;
  name: string;
  img: string;
}
interface NameItem {
  id: string;
  name: string;
  tailo: string;
}

const FOODS: FoodItem[] = [
  { id: 'baw', name: '肉圓', img: food_baw },
  { id: 'tauhue', name: '豆花', img: food_tauhue },
  { id: 'bemtsuk', name: '鹹粥', img: food_bemtsuk },
  { id: 'junbiann', name: '潤餅', img: food_junbiann },
  { id: 'gerpiann', name: '月餅', img: food_gerpiann },
  { id: 'tsuanntsa', name: '串炸', img: food_tsuanntsa },
  { id: 'uaakue', name: '碗粿', img: food_uaakue },
  { id: 'tshangyupiann', name: '蔥油餅', img: food_tshangyupiann },
];

// 資料來源：教育部臺灣台語常用詞辭典 / 維基詞典 逐筆核對修正
const NAMES: NameItem[] = [
  { id: 'junbiann', name: '潤餅', tailo: 'lūn-piánn' },
  { id: 'bemtsuk', name: '鹹粥', tailo: 'kiâm-muê' },
  { id: 'baw', name: '肉圓', tailo: 'bah-uân' },
  { id: 'tauhue', name: '豆花', tailo: 'tāu-hue' },
  { id: 'uaakue', name: '碗粿', tailo: 'uánn-kué' },
  { id: 'tshangyupiann', name: '蔥油餅', tailo: 'tshang-iû-piánn' },
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
  onGamesHub,
  onPhonics,
}: {
  onNext: () => void;
  onHome?: () => void;
  onGamesHub?: () => void;
  onPhonics?: () => void;
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
    setTimeout(() => setHintTarget(null), 1500);
  };

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} onPhonics={onPhonics} mascotSrc={charDad}>
      <div className="rounded-3xl overflow-hidden shadow-sm relative">
        <img src={game1Hero} alt="第1關 老街台語美食配對" className="w-full h-auto block" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="inline-block px-3 py-1 rounded-full bg-[#E4772E] text-white text-xs font-black mb-2 shadow-sm">
            第 1 關
          </div>
          <h2 className="font-black text-[#5C4A2E] text-2xl md:text-4xl tracking-wide drop-shadow-sm">
            老街台語美食配對
          </h2>
          <p className="text-[#8A7355] text-xs md:text-sm font-bold mt-1">
            聽台語、認美食，完成老街尋味挑戰！
          </p>
        </div>
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#E4772E]" /> 目前分數 <span className="text-[#2D2A26]">{score} 分</span>
        </span>
        <span className="flex items-center gap-2">
          配對進度
          <span className="w-40 h-2 rounded-full bg-[#EFE8D8] overflow-hidden inline-block">
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
            <span key={i} className={i < stars ? 'text-[#F2B84B]' : 'text-[#E5DFD0]'}>★</span>
          ))}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_260px] gap-4 flex-1">
        {/* Left: food cards */}
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          <div className="text-sm font-bold text-white bg-[#4E9B5D] rounded-full px-4 py-1.5 inline-block mb-3">
            美食小吃（點擊配對）
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {FOODS.map((f) => {
              const isMatched = matched.has(f.id);
              const isSel = selLeft === f.id;
              const isWrong = wrongFlash.left === f.id;
              return (
                <button
                  key={f.id}
                  disabled={isMatched}
                  onClick={() => !isMatched && setSelLeft(f.id)}
                  className={`rounded-xl border-2 p-1.5 flex flex-col items-center gap-1 transition-all ${
                    isMatched
                      ? 'border-[#4E9B5D] bg-[#EAF6EC] opacity-60'
                      : isWrong
                      ? 'border-red-400 bg-red-50 animate-pulse'
                      : isSel
                      ? 'border-[#E4772E] bg-[#FFF3E8]'
                      : 'border-[#EFE8D8] bg-white hover:border-[#4E9B5D]'
                  }`}
                >
                  <img src={f.img} alt={f.name} className="w-full aspect-square object-cover rounded-lg" />
                  <span className="text-xs font-bold text-[#3E2723] flex items-center gap-1">
                    {f.name} <Volume2 className="w-3 h-3 text-[#4E9B5D]" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: tai-lo names */}
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          <div className="text-sm font-bold text-white bg-[#3E6FA8] rounded-full px-4 py-1.5 inline-block mb-3">
            台語名稱（點擊配對）
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {NAMES.map((n) => {
              const isMatched = matched.has(n.id);
              const isSel = selRight === n.id;
              const isWrong = wrongFlash.right === n.id;
              const isHint = hintTarget === n.id;
              return (
                <button
                  key={n.id}
                  disabled={isMatched}
                  onClick={() => !isMatched && setSelRight(n.id)}
                  className={`rounded-xl border-2 px-3 py-2 flex items-center justify-between transition-all ${
                    isMatched
                      ? 'border-[#4E9B5D] bg-[#EAF6EC] opacity-60'
                      : isWrong
                      ? 'border-red-400 bg-red-50 animate-pulse'
                      : isHint
                      ? 'border-[#F2B84B] bg-[#FFF7E0]'
                      : isSel
                      ? 'border-[#3E6FA8] bg-[#EAF1FB]'
                      : 'border-[#EFE8D8] bg-white hover:border-[#3E6FA8]'
                  }`}
                >
                  <span className="text-left">
                    <div className="text-[11px] text-[#8A8378]">{n.tailo}</div>
                    <div className="text-sm font-bold text-[#2D2A26]">{n.name}</div>
                  </span>
                  <Volume2 className="w-4 h-4 text-[#3E6FA8] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions panel */}
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 flex flex-col">
          <div className="font-black text-[#2D2A26] mb-3">🎮 遊戲說明</div>
          <ol className="text-xs text-[#5C5548] leading-relaxed space-y-2 list-decimal list-inside">
            <li>找對應美食：在左側選擇正確的美食圖片。</li>
            <li>配對台語名稱：點擊右側對應的台語名稱。</li>
            <li>完成配對：兩邊都選對就會自動連上。</li>
            <li>累積分數：配對越快越準，分數越高喔！</li>
          </ol>
          <div className="mt-auto pt-4 text-xs text-[#8A8378] bg-[#F5F0E4] rounded-2xl p-3">
            💡 小提示：不會的時候可以先點聽發音喔！
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={useHint}
          disabled={hints <= 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4E9B5D] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#458752] transition-colors"
        >
          <Lightbulb className="w-4 h-4" /> 提示 <span className="bg-white/25 rounded-full px-1.5">{hints}</span>
        </button>
        <button
          onClick={restart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8A8378] text-white font-bold text-sm hover:bg-[#736C60] transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> 重新開始
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E4772E] text-white font-bold text-sm hover:bg-[#CC6620] transition-colors"
        >
          {done ? '下一關' : '下一題'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
}
