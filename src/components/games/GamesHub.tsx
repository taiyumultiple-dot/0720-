import { useState } from 'react';
import { Star, Flag, Leaf, MessageSquare, ChevronRight } from 'lucide-react';
import { HubShell } from './GameShell';
import { GAMES, type GameCategory } from './gamesData';
import { hubHero, hubDish, footerSign } from '../../assets/images/games';

type TabKey = 'all' | GameCategory;

const TABS: { key: TabKey; label: string; icon: typeof Star }[] = [
  { key: 'all', label: '熱門推薦', icon: Star },
  { key: 'situational', label: '情境任務', icon: Flag },
  { key: 'outdoor', label: '戶外探索', icon: Leaf },
  { key: 'life', label: '生活台語', icon: MessageSquare },
];

export default function GamesHub({
  onSelectGame,
  onHome,
}: {
  onSelectGame: (key: string) => void;
  onHome?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const filtered = activeTab === 'all' ? GAMES : GAMES.filter((g) => g.category === activeTab);
  const showFeatured = activeTab === 'all';
  const featured = GAMES[0];
  const rest = showFeatured ? GAMES.slice(1) : filtered;

  return (
    <HubShell onHome={onHome}>
      {/* Hero banner */}
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={hubHero} alt="互動遊戲｜台語學習樂園" className="w-full h-auto block" />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 px-1 flex-wrap">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-colors ${
              activeTab === key
                ? 'bg-[#E4772E] text-white shadow-sm'
                : 'bg-[#F5F0E4] text-[#5C5548] hover:bg-[#EFE6D4]'
            }`}
          >
            <Icon className="w-4 h-4" strokeWidth={2.4} />
            {label}
          </button>
        ))}
      </div>

      {/* Main panel */}
      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-5 md:p-6 flex-1">
        <div className={`grid grid-cols-1 gap-4 ${showFeatured ? 'lg:grid-cols-4' : ''}`}>
          {/* Featured game 1 (only on 熱門推薦 tab) */}
          {showFeatured && (
            <div className="lg:col-span-1 bg-[#F5F0E4] rounded-3xl p-5 flex flex-col items-center text-center">
              <div className="self-start px-3 py-1 rounded-full bg-[#E4772E] text-white text-xs font-black mb-3">
                01
              </div>
              <h3 className="font-black text-[#2D2A26] text-lg mb-4">{featured.title}</h3>
              <img src={hubDish} alt={featured.title} className="w-40 h-auto rounded-2xl mb-4" />
              <p className="text-xs text-[#8A8378] leading-relaxed mb-4">
                配對台語、美食名字，
                <br />
                完成老街美味挑戰！
              </p>
              <button
                onClick={() => onSelectGame(featured.key)}
                className="w-full py-3 rounded-full bg-[#E4772E] text-white font-bold text-sm shadow-md hover:bg-[#CC6620] transition-colors flex items-center justify-center gap-1"
              >
                進入遊戲 <ChevronRight className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-[#8A8378] flex-wrap">
                <span>😊 詞彙學習</span>
                <span>🔊 聽說練習</span>
                <span>🧩 配對挑戰</span>
              </div>
            </div>
          )}

          {/* Games grid: 2-10 on 熱門推薦 tab, or filtered list on category tabs */}
          {rest.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                showFeatured ? 'lg:col-span-3' : 'lg:grid-cols-4'
              }`}
            >
              {rest.map((g) => (
                <div key={g.key} className="bg-[#F5F0E4] rounded-2xl p-4 flex gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-[#FDFBF6] flex items-center justify-center overflow-hidden">
                    <img src={g.icon} alt="" className="w-11 h-11 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#4E9B5D] text-white text-[10px] font-bold">
                        {String(g.id).padStart(2, '0')}
                      </span>
                      <span className="font-bold text-[#2D2A26] text-sm truncate">{g.title}</span>
                    </div>
                    <p className="text-[11px] text-[#8A8378] leading-snug mb-2 line-clamp-2">{g.desc}</p>
                    <button
                      onClick={() => onSelectGame(g.key)}
                      className="mt-auto self-start px-4 py-1.5 rounded-full bg-[#E4772E] text-white text-xs font-bold hover:bg-[#CC6620] transition-colors flex items-center gap-1"
                    >
                      進入遊戲 <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#8A8378] text-sm py-10">這個分類目前沒有遊戲。</p>
          )}
        </div>
      </div>

      {/* Bottom banner */}
      <div className="flex justify-center">
        <img src={footerSign} alt="用心學台語．生活更有趣" className="h-14 w-auto" />
      </div>
    </HubShell>
  );
}
