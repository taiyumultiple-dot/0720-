import { useState, useEffect } from 'react';
import { Trophy, Search, Lightbulb, RotateCcw, ChevronRight, Volume2 } from 'lucide-react';
import { GameShell } from './GameShell';
import { GameHeader } from './GameHeader';
import { oceanScene } from '../../assets/images/games';
import { speakTaiyu } from '../../lib/speech';

interface Spot {
  id: string;
  name: string;
  tailo: string;
  x: number; // % from left
  y: number; // % from top
}

const SPOTS: Spot[] = [
  { id: 'turtle', name: '海龜', tailo: 'hái-ku', x: 17, y: 30 },
  { id: 'crab', name: '貝殼', tailo: 'puè-khak', x: 6, y: 75 },
  { id: 'coral', name: '珊瑚', tailo: 'san-ôo', x: 43, y: 72 },
  { id: 'bottle', name: '浪花', tailo: 'lōng-hue', x: 8, y: 12 },
  { id: 'boat', name: '燈塔', tailo: 'ting-thah', x: 20, y: 10 },
  { id: 'gull', name: '海鷗', tailo: 'hái-oo', x: 67, y: 6 },
];

export default function Game4BeachHunt({ onNext, onHome }: { onNext: () => void; onHome?: () => void }) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [wrongClick, setWrongClick] = useState<{ x: number; y: number } | null>(null);
  const [hints, setHints] = useState(3);
  const [hintId, setHintId] = useState<string | null>(null);

  const done = found.size === SPOTS.length;
  const currentTarget = SPOTS.find((s) => !found.has(s.id));

  useEffect(() => {
    if (currentTarget && !done) {
      speakTaiyu(currentTarget.name);
    }
  }, [currentTarget?.id, done]);

  const handleImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;
    const dist = Math.hypot(clickX - currentTarget.x, clickY - currentTarget.y);
    if (dist < 9) {
      setFound((prev) => new Set(prev).add(currentTarget.id));
    } else {
      setWrongClick({ x: clickX, y: clickY });
      setTimeout(() => setWrongClick(null), 400);
    }
  };

  const restart = () => {
    setFound(new Set());
    setHints(3);
    setHintId(null);
  };

  const useHint = () => {
    if (hints <= 0 || !currentTarget) return;
    setHints((h) => h - 1);
    setHintId(currentTarget.id);
    setTimeout(() => setHintId(null), 1500);
  };

  return (
    <GameShell onHome={onHome}>
      <GameHeader
        stageNumber={4}
        title="海邊生態尋寶"
        subtitle="認識海洋生物，找出隱藏在沙灘的寶物吧！"
        onSpeakQuestion={() => {
          if (currentTarget) {
            speakTaiyu(currentTarget.name);
          }
        }}
      />

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#3E6FA8]" /> 目前分數{' '}
          <span className="text-[#2D2A26]">{found.size * 50} 分</span>
        </span>
        <span className="flex items-center gap-2">
          發現進度
          <span className="w-40 h-2 rounded-full bg-[#EFE8D8] overflow-hidden inline-block">
            <span className="h-full block bg-[#3E6FA8]" style={{ width: `${(found.size / SPOTS.length) * 100}%` }} />
          </span>
          <span className="text-[#2D2A26]">{found.size} / {SPOTS.length}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 flex-1">
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          {!done ? (
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#2D2A26]">
              <Search className="w-4 h-4 text-[#3E6FA8]" />
              請找出：「{currentTarget?.name}」（{currentTarget?.tailo}）
            </div>
          ) : (
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#4E9B5D]">
              <Trophy className="w-4 h-4" /> 全部找到了！準備前往下一關吧！
            </div>
          )}
          <div
            className="relative rounded-2xl overflow-hidden cursor-crosshair select-none"
            onClick={handleImgClick}
          >
            <img src={oceanScene} alt="海邊生態場景" className="w-full h-auto block" draggable={false} />
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
          <div className="font-black text-[#2D2A26] mb-3">任務清單</div>
          <ul className="flex flex-col gap-2 text-sm">
            {SPOTS.map((s, i) => (
              <li
                key={s.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                  found.has(s.id) ? 'bg-[#EAF6EC] text-[#4E9B5D]' : 'bg-white text-[#3E2723]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#3E6FA8] text-white text-[11px] flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <div className="font-bold">{s.name}</div>
                  <div className="text-[11px] opacity-70">{s.tailo}</div>
                </span>
                <Volume2 className="w-3.5 h-3.5 opacity-60" />
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-4 text-xs text-[#8A8378] bg-[#F5F0E4] rounded-2xl p-3">
            💡 仔細看清單，點擊圖片中對應的位置！
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={useHint}
          disabled={hints <= 0 || done}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3E6FA8] text-white font-bold text-sm disabled:opacity-40 hover:bg-[#345D8E] transition-colors"
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
