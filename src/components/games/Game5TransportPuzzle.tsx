import { useState } from 'react';
import { Trophy, Lightbulb, RotateCcw, ChevronRight, Volume2 } from 'lucide-react';
import { GameShell } from './GameShell';
import {
  game5Hero,
  vehicleTrain,
  vehicleBike,
  vehiclePlane,
  vehicleShip,
  vehicleCar,
  vehicleMoto,
} from '../../assets/images/games';

interface Vehicle {
  id: string;
  name: string;
  img: string;
  syllables: [string, string];
}

const VEHICLES: Vehicle[] = [
  { id: 'train', name: '火車', img: vehicleTrain, syllables: ['hóo', 'chhia'] },
  { id: 'bike', name: '腳踏車', img: vehicleBike, syllables: ['kha', 'tsiâ'] },
  { id: 'plane', name: '飛機', img: vehiclePlane, syllables: ['ki', 'kì'] },
  { id: 'ship', name: '船', img: vehicleShip, syllables: ['tsūn', 'chá'] },
  { id: 'car', name: '汽車', img: vehicleCar, syllables: ['kha', 'sya'] },
  { id: 'moto', name: '機車', img: vehicleMoto, syllables: ['bái', 'tshi'] },
];

interface Tile {
  key: string;
  text: string;
}

function buildTilePool(): Tile[] {
  const tiles: Tile[] = [];
  VEHICLES.forEach((v) => {
    v.syllables.forEach((s, i) => tiles.push({ key: `${v.id}-${i}`, text: s }));
  });
  // shuffle
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  return tiles;
}

export default function Game5TransportPuzzle({ onNext, onHome, onGamesHub }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void }) {
  const [pool, setPool] = useState<Tile[]>(() => buildTilePool());
  const [picked, setPicked] = useState<Tile[]>([]);
  const [matched, setMatched] = useState<Record<string, [string, string]>>({});
  const [wrong, setWrong] = useState(false);
  const [hints, setHints] = useState(3);
  const [hintVehicle, setHintVehicle] = useState<string | null>(null);

  const done = Object.keys(matched).length === VEHICLES.length;

  const pickTile = (tile: Tile) => {
    if (picked.find((t) => t.key === tile.key)) return;
    const next = [...picked, tile];
    if (next.length < 2) {
      setPicked(next);
      return;
    }
    // check match
    const combo = next.map((t) => t.text) as [string, string];
    const match = VEHICLES.find(
      (v) => !matched[v.id] && v.syllables[0] === combo[0] && v.syllables[1] === combo[1]
    );
    if (match) {
      setMatched((prev) => ({ ...prev, [match.id]: combo }));
      setPool((prev) => prev.filter((t) => !next.find((n) => n.key === t.key)));
      setPicked([]);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setPicked([]);
      }, 500);
    }
  };

  const restart = () => {
    setPool(buildTilePool());
    setPicked([]);
    setMatched({});
    setHints(3);
  };

  const useHint = () => {
    if (hints <= 0) return;
    const remaining = VEHICLES.find((v) => !matched[v.id]);
    if (!remaining) return;
    setHints((h) => h - 1);
    setHintVehicle(remaining.id);
    setTimeout(() => setHintVehicle(null), 1800);
  };

  const score = Object.keys(matched).length * 60;

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game5Hero} alt="第5款 交通工具拼拼樂" className="w-full h-auto block" />
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#C6501F]" /> 目前分數 <span className="text-[#2D2A26]">{score} 分</span>
        </span>
        <span className="flex items-center gap-2">
          拼對數量
          <span className="text-[#2D2A26]">{Object.keys(matched).length} / {VEHICLES.length}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          <div className="text-sm font-bold text-white bg-[#3E6FA8] rounded-full px-4 py-1.5 inline-block mb-3">
            交通工具卡
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {VEHICLES.map((v) => {
              const isMatched = !!matched[v.id];
              const isHint = hintVehicle === v.id;
              return (
                <div
                  key={v.id}
                  className={`rounded-xl border-2 p-1.5 flex flex-col items-center gap-1 ${
                    isMatched ? 'border-[#4E9B5D] bg-[#EAF6EC]' : isHint ? 'border-[#F2B84B] bg-[#FFF7E0]' : 'border-[#EFE8D8] bg-white'
                  }`}
                >
                  <img src={v.img} alt={v.name} className="w-full aspect-square object-cover rounded-lg" />
                  <span className="text-xs font-bold text-[#3E2723] flex items-center gap-1">
                    {v.name} <Volume2 className="w-3 h-3 text-[#3E6FA8]" />
                  </span>
                  <span className="text-[10px] text-[#8A8378]">
                    {isMatched ? matched[v.id].join('-') : isHint ? v.syllables.join('-') : '？-？'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4">
          <div className="text-sm font-bold text-white bg-[#4E9B5D] rounded-full px-4 py-1.5 inline-block mb-3">
            音節拼圖塊（依序點兩塊拼出台語名稱）
          </div>
          <div className="grid grid-cols-4 gap-2.5 mb-4">
            {pool.map((t) => {
              const isSel = picked.find((p) => p.key === t.key);
              return (
                <button
                  key={t.key}
                  onClick={() => pickTile(t)}
                  disabled={!!isSel}
                  className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                    isSel
                      ? wrong
                        ? 'border-red-400 bg-red-50 text-red-500'
                        : 'border-[#4E9B5D] bg-[#EAF6EC] text-[#4E9B5D]'
                      : 'border-[#EFE8D8] bg-white text-[#3E2723] hover:border-[#4E9B5D]'
                  }`}
                >
                  {t.text}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#8A8378]">聽發音、選出正確的音節，拼成台語名稱！</p>
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
          <RotateCcw className="w-4 h-4" /> 重玩
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
