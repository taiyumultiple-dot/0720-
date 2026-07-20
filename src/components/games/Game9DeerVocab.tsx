import { useState } from 'react';
import { Trophy, Search, Lightbulb, RotateCcw, ChevronRight, Volume2 } from 'lucide-react';
import { GameShell } from './GameShell';
import { charGrandpa } from '../../assets/images/characters';
import { game9Hero, deerLandscape } from '../../assets/images/games';

interface Spot {
  id: string;
  name: string;
  tailo: string;
  x: number;
  y: number;
}

const SPOTS: Spot[] = [
  { id: 'deer', name: '鹿仔', tailo: 'lo̍k-á', x: 10, y: 60 },
  { id: 'grass', name: '草仔', tailo: 'tsháu-á', x: 29, y: 68 },
  { id: 'mountain', name: '山頭', tailo: 'suann-thâu', x: 17, y: 21 },
  { id: 'flower', name: '花仔', tailo: 'hue-á', x: 88, y: 86 },
  { id: 'rock', name: '石頭', tailo: 'tsio̍h-thâu', x: 47, y: 87 },
  { id: 'sky', name: '天空', tailo: 'thiⁿ-khong', x: 82, y: 7 },
  { id: 'sea', name: '海邊', tailo: 'hái-pinn', x: 52, y: 15 },
  { id: 'tree', name: '樹仔', tailo: 'tshiū-á', x: 88, y: 38 },
];

export default function Game9DeerVocab({ onNext, onHome, onGamesHub }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void }) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [wrongClick, setWrongClick] = useState<{ x: number; y: number } | null>(null);
  const [hints, setHints] = useState(3);
  const [hintId, setHintId] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const remaining = SPOTS.filter((s) => !found.has(s.id));
  const current = SPOTS[activeIdx] && !found.has(SPOTS[activeIdx].id) ? SPOTS[activeIdx] : remaining[0];
  const done = found.size === SPOTS.length;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    const dist = Math.hypot(clickX - current.x, clickY - current.y);
    if (dist < 8) {
      setFound((prev) => new Set(prev).add(current.id));
    } else {
      setWrongClick({ x: clickX, y: clickY });
      setTimeout(() => setWrongClick(null), 400);
    }
  };

  const restart = () => {
    setFound(new Set());
    setHints(3);
    setHintId(null);
    setActiveIdx(0);
  };

  const useHint = () => {
    if (hints <= 0 || !current) return;
    setHints((h) => h - 1);
    setHintId(current.id);
    setTimeout(() => setHintId(null), 1500);
  };

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} mascotSrc={charGrandpa}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game9Hero} alt="第9款 鹿野觀察詞彙配對" className="w-full h-auto block" />
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#4E9B5D]" /> 目前分數{' '}
          <span className="text-[#2D2A26]">{found.size * 45} 分</span>
        </span>
        <span className="flex items-center gap-2">
          配對進度
          <span className="w-40 h-2 rounded-full bg-[#EFE8D8] overflow-hidden inline-block">
            <span className="h-full block bg-[#4E9B5D]" style={{ width: `${(found.size / SPOTS.length) * 100}%` }} />
          </span>
          <span className="text-[#2D2A26]">{found.size} / {SPOTS.length}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 flex-1">
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          {!done ? (
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#2D2A26]">
              <Search className="w-4 h-4 text-[#4E9B5D]" />
              請找出：「{current?.name}」（{current?.tailo}）
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#4E9B5D]">
              <Trophy className="w-4 h-4" /> 全部配對完成！準備前往下一關吧！
            </div>
          )}
          <div className="relative rounded-2xl overflow-hidden cursor-crosshair select-none" onClick={handleClick}>
            <img src={deerLandscape} alt="鹿野高台景觀" className="w-full h-auto block" draggable={false} />
            {SPOTS.map((s) =>
              found.has(s.id) || hintId === s.id ? (
                <div
                  key={s.id}
                  className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#4E9B5D] bg-[#4E9B5D]/20 flex items-center justify-center text-xs"
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                >
                  ✓
                </div>
              ) : null
            )}
            {wrongClick && (
              <div
                className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-red-400 bg-red-400/20"
                style={{ left: `${wrongClick.x}%`, top: `${wrongClick.y}%` }}
              />
            )}
          </div>
        </div>

        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 flex flex-col">
          <div className="font-black text-[#2D2A26] mb-3">台語詞彙清單</div>
          <ul className="flex flex-col gap-2 text-sm">
            {SPOTS.map((s, i) => (
              <li
                key={s.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer ${
                  found.has(s.id)
                    ? 'bg-[#EAF6EC] text-[#4E9B5D]'
                    : current?.id === s.id
                    ? 'bg-[#FFF3E8] text-[#2D2A26]'
                    : 'bg-white text-[#3E2723]'
                }`}
              >
                <span className="flex-1">
                  <div className="font-bold">{s.name}</div>
                  <div className="text-[11px] opacity-70">{s.tailo}</div>
                </span>
                <Volume2 className="w-3.5 h-3.5 opacity-60" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={useHint}
          disabled={hints <= 0 || done}
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
          下一關 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
}
