import { ChevronRight, Construction } from 'lucide-react';
import { GameShell } from './GameShell';
import {
  game2Hero,
  game3Hero,
  game4Hero,
  game5Hero,
  game6Hero,
  game7Hero,
  game8Hero,
  game9Hero,
  game10Hero,
} from '../../assets/images/games';
import { GAMES } from './gamesData';

const HEROES: Record<number, string> = {
  2: game2Hero,
  3: game3Hero,
  4: game4Hero,
  5: game5Hero,
  6: game6Hero,
  7: game7Hero,
  8: game8Hero,
  9: game9Hero,
  10: game10Hero,
};

/** Placeholder page for games 2-10: exact banner art from the template, full nav flow works,
 *  but the interactive game body itself is still being built out game-by-game. */
export default function GamePlaceholder({
  gameId,
  onNext,
  onHome,
}: {
  gameId: number;
  onNext: () => void;
  onHome?: () => void;
}) {
  const meta = GAMES.find((g) => g.id === gameId)!;
  const isLast = gameId === GAMES.length;

  return (
    <GameShell onHome={onHome}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={HEROES[gameId]} alt={meta.title} className="w-full h-auto block" />
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-10 flex-1 flex flex-col items-center justify-center text-center gap-3">
        <Construction className="w-10 h-10 text-[#E4772E]" />
        <h3 className="font-black text-[#2D2A26] text-lg">「{meta.title}」互動邏輯開發中</h3>
        <p className="text-sm text-[#8A8378] max-w-md">
          版面跟橫幅已經照樣板做好了，遊戲的實際互動玩法（配對／問答／拖曳等）還在依序製作，敬請期待！
        </p>
      </div>

      <div className="flex items-center justify-end px-1">
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E4772E] text-white font-bold text-sm hover:bg-[#CC6620] transition-colors"
        >
          {isLast ? '返回總覽' : '下一關'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </GameShell>
  );
}
