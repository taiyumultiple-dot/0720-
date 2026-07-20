import { useState } from 'react';
import { ChevronRight, Star, Flag, Leaf, MessageCircle } from 'lucide-react';
import { HubShell } from './GameShell';
import { GAMES, type GameCategory } from './gamesData';
import {
  hubHero,
  hubDish,
  tabIconHot,
  tabIconSituational,
  tabIconOutdoor,
  tabIconLife,
} from '../../assets/images/games';

type TabKey = 'all' | GameCategory;

const TABS = [
  { key: 'all', label: '熱門推薦', icon: Star, color: 'text-[#E4772E]' },
  { key: 'situational', label: '情境任務', icon: Flag, color: 'text-[#4E9B5D]' },
  { key: 'outdoor', label: '戶外探索', icon: Leaf, color: 'text-[#4E9B5D]' },
  { key: 'life', label: '生活台語', icon: MessageCircle, color: 'text-[#4E9B5D]' },
] as const;

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

      {/* 2. Beautiful contiguous filter tab bar with vertical dividers */}
      <div className="flex items-center bg-white/95 backdrop-blur-sm border border-[#FFEADA] rounded-full p-2 shadow-md max-w-full overflow-x-auto select-none gap-1.5 shrink-0 w-fit">
        {TABS.map(({ key, label, icon: Icon, color }, index) => {
          const isActive = activeTab === key;
          return (
            <div key={key} className="flex items-center shrink-0">
              {index > 0 && (
                <div className="h-6 w-[1px] bg-[#EFE3C8] mx-2.5 shrink-0" />
              )}
              <button
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-black text-base transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E4772E] text-white shadow-md scale-[1.03]'
                    : 'text-[#5C4033] hover:text-[#E4772E] hover:bg-white/50'
                }`}
              >
                <Icon
                  className={`w-5.5 h-5.5 ${
                    isActive ? 'text-white' : color
                  }`}
                  strokeWidth={2.5}
                  fill={isActive && key === 'all' ? 'white' : 'none'}
                />
                {label}
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. Main Panel holding featured cards and standard cards list */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 flex-1 border border-[#FFF0D7]">
        <div className={`grid grid-cols-1 gap-5 ${showFeatured ? 'lg:grid-cols-4' : ''}`}>
          
          {/* Featured Game card: Meatball Bawan matching design exactly (only on '熱門推薦' tab) */}
          {showFeatured && (
            <div className="lg:col-span-1 bg-[#FFFDF9] border border-[#FFE7C4] rounded-3xl p-6 flex flex-col items-center text-center shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#E4772E]/15 to-transparent rounded-br-full pointer-events-none" />
              <div className="self-start px-3.5 py-1 rounded-full bg-[#E4772E] text-white text-sm font-black mb-4 relative z-10">
                01
              </div>
              <h3 className="font-black text-[#2D2A26] text-2xl mb-4 tracking-tight">{featured.title}</h3>
              <div className="relative w-full h-44 rounded-2xl flex items-center justify-center overflow-hidden mb-4 filter drop-shadow(4px 4px 6px rgba(0,0,0,0.12))">
                <img src={hubDish} alt={featured.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-base md:text-lg text-[#5C4033] font-black leading-relaxed mb-6">
                配對台語、美食名字，
                <br />
                完成老街美味挑戰！
              </p>
              <button
                onClick={() => onSelectGame(featured.key)}
                className="w-full py-4 rounded-full bg-[#E4772E] text-white font-black text-base shadow-md hover:bg-[#CC6620] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                進入遊戲 <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <div className="flex items-center justify-center gap-2.5 mt-5 text-xs md:text-sm text-[#8A8378] font-black flex-wrap">
                <span className="px-2.5 py-1 bg-[#FFF2E0] rounded-full text-[#E4772E]">😊 詞彙學習</span>
                <span className="px-2.5 py-1 bg-[#FFF2E0] rounded-full text-[#E4772E]">🔊 聽說練習</span>
                <span className="px-2.5 py-1 bg-[#FFF2E0] rounded-full text-[#E4772E]">🧩 配對挑戰</span>
              </div>
            </div>
          )}

          {/* Standard Games Grid (Cards 2 to 10 with responsive layouts) */}
          {rest.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 ${
                showFeatured ? 'lg:col-span-3' : 'lg:grid-cols-4'
              }`}
            >
              {rest.map((g) => (
                <div key={g.key} className="bg-[#FFFDF9] border border-[#FFF0D7] hover:border-[#FFE7C4] rounded-2xl p-5 flex gap-4.5 hover:shadow-lg transition-all duration-300 group">
                  <div className="shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden filter drop-shadow(1px 2px 3px rgba(0,0,0,0.08)) group-hover:scale-105 transition-all duration-300">
                    <img src={g.icon} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#4E9B5D] text-white text-xs md:text-sm font-black">
                          {String(g.id).padStart(2, '0')}
                        </span>
                        <span className="font-black text-[#2D2A26] text-lg md:text-xl truncate">{g.title}</span>
                      </div>
                      <p className="text-xs md:text-sm text-[#8A8378] font-bold leading-relaxed mb-3 line-clamp-2">{g.desc}</p>
                    </div>
                    <button
                      onClick={() => onSelectGame(g.key)}
                      className="self-start px-5 py-2.5 rounded-full bg-[#E4772E] text-white text-sm font-black hover:bg-[#CC6620] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      進入遊戲 <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-[#8A8378] font-bold text-base py-12">這個分類目前沒有遊戲。</p>
          )}
        </div>
      </div>

      {/* 4. Beautiful Hand-crafted Wooden sign with text "用心學台語・生活更有趣" (Replicates input_file_14.png) */}
      <div className="flex justify-center select-none py-2 relative z-10">
        <div className="relative px-12 py-3 rounded-2xl bg-gradient-to-r from-[#D5A173] via-[#E6C19D] to-[#D5A173] border-4 border-[#8B5A2B] shadow-lg flex items-center gap-4">
          {/* Leaves on the Left */}
          <div className="absolute -left-4 -top-3">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M5 20 Q15 5 25 10 Q20 25 10 25 Z" fill="#529E3F" />
              <path d="M12 12 Q20 2 28 8" stroke="#2D5A37" strokeWidth="2.2" fill="none" />
            </svg>
          </div>

          <h2 className="font-black text-[#3E1F07] text-lg md:text-xl tracking-widest text-center">
            用心學台語・生活更有趣
          </h2>

          {/* Leaves on the Right */}
          <div className="absolute -right-4 -top-3">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" transform="scale(-1, 1)">
              <path d="M5 20 Q15 5 25 10 Q20 25 10 25 Z" fill="#529E3F" />
              <path d="M12 12 Q20 2 28 8" stroke="#2D5A37" strokeWidth="2.2" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </HubShell>
  );
}
