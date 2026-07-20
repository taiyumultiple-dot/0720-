import { useState } from 'react';
import { ChevronRight, Gamepad2, Star, Flag, Leaf, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { HubShell } from './GameShell';
import { GAMES, type GameCategory } from './gamesData';
import bgImage from '../../assets/images/regenerated_image_1784512474999.webp';
import {
  hubDish,
  tabIconHot,
  tabIconSituational,
  tabIconOutdoor,
  tabIconLife,
} from '../../assets/images/games';
import {
  charDad,
  charAming,
  charAhui,
  charMom,
  charGrandpa,
} from '../../assets/images/characters';

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
      {/* 1. Styled Hero Banner with hanging sign, titles, and 5 main characters (Matches reference image perfectly) */}
      <div className="relative rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden border border-[#FFE7C4] shadow-md bg-[#FFFDF6]">
        
        {/* Real Watercolor Old Street Background Image */}
        <img
          src={bgImage}
          alt="Watercolor Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none z-0"
          referrerPolicy="no-referrer"
        />

        {/* Soft Warm Gradient Overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF6]/95 via-[#FCEAD4]/80 to-[#F7D2AF]/50 pointer-events-none z-0" />

        {/* Watercolor Paper Texture Overlay */}
        <div 
          className="absolute inset-0 w-full h-full opacity-[0.09] mix-blend-multiply z-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cfilter id='paper-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23paper-noise)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Traditional Minnan Building Eave (Swallowtail roof) on the right background */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] opacity-[0.18] pointer-events-none select-none z-0 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Curved swallowtail roof */}
            <path d="M300 30 C220 50 140 50 110 20 C118 40 160 70 300 70 Z" fill="#9C4A2F" />
            <path d="M300 70 L140 70 L140 200 L300 200 Z" fill="#C57A60" />
            <rect x="180" y="100" width="80" height="100" fill="#E6C29E" />
            {/* Window */}
            <rect x="195" y="110" width="40" height="60" fill="#9C6B43" rx="2" />
            {/* Hanging Lanterns */}
            <line x1="160" y1="70" x2="160" y2="105" stroke="#4A3B32" strokeWidth="2" />
            <rect x="148" y="105" width="24" height="34" rx="12" fill="#E74C3C" />
            <rect x="152" y="101" width="16" height="4" fill="#F1C40F" />
            <rect x="152" y="139" width="16" height="4" fill="#F1C40F" />
          </svg>
        </div>

        {/* Left Side: Hanging Sign with Green Controller and Vines (SVG Art) */}
        <div className="hidden lg:flex flex-col items-center select-none shrink-0 relative -top-3 z-10">
          {/* Chains */}
          <div className="flex gap-14 h-8">
            <div className="w-1.5 h-full bg-gradient-to-b from-[#8A7968] to-[#4A3B32]" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} />
            <div className="w-1.5 h-full bg-gradient-to-b from-[#8A7968] to-[#4A3B32]" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} />
          </div>
          {/* Hanging sign board */}
          <div className="relative w-36 h-28 bg-[#E6C29E] rounded-2xl border-4 border-[#8B5A2B] flex flex-col items-center justify-center shadow-lg">
            {/* Green Vines & Leaves */}
            <div className="absolute -top-3 -left-3">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M5 25 Q15 10 30 15 Q25 30 10 35 Z" fill="#4E9B5D" />
                <path d="M15 15 Q25 5 35 12" stroke="#2D5A37" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M5 15 Q15 5 25 10 Q20 20 10 25 Z" fill="#3E8552" />
              </svg>
            </div>

            {/* Inner Controller Icon */}
            <div className="w-16 h-12 bg-[#529E3F] rounded-xl flex items-center justify-center filter drop-shadow(2px 2px 3px rgba(0,0,0,0.25))">
              <Gamepad2 className="w-9 h-9 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Center: Hero Title block */}
        <div className="flex-1 text-center md:text-left relative z-10 select-none">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2.5">
            <h1 className="font-black text-[#3E2723] text-2xl md:text-4xl tracking-tight">
              互動遊戲 <span className="text-[#8B5A2B] font-light">|</span> 台語學習樂園
            </h1>
            <span className="text-xl md:text-2xl">🍃</span>
          </div>
          <p className="text-sm md:text-base text-[#5C4033] font-medium leading-relaxed max-w-xl">
            用遊戲學台語，玩中學、學中玩，輕鬆提升聽、說、拼、讀能力！
          </p>
        </div>

        {/* Right Side: Overlay Group of 5 Main Characters scaled up and cropped beautifully at bottom edge */}
        <div className="relative h-32 md:h-44 w-full md:w-[380px] lg:w-[440px] shrink-0 overflow-visible mt-2 md:mt-0 flex items-end justify-center md:justify-end z-10">
          <div className="flex items-end gap-1 select-none relative h-full">
            {/* 1. Dad */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              src={charDad}
              alt="爸爸"
              className="h-32 md:h-[165px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) relative z-10 hover:scale-105 transition-transform duration-200"
            />
            {/* 2. Ahui (Girl with headphones) */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={charAhui}
              alt="阿輝"
              className="h-[120px] md:h-[155px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) relative -ml-6 z-20 hover:scale-105 transition-transform duration-200"
            />
            {/* 3. Aming (Boy in center) */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              src={charAming}
              alt="阿明"
              className="h-[130px] md:h-[172px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.2)) relative -ml-6 z-30 hover:scale-105 transition-transform duration-200"
            />
            {/* 4. Mom */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              src={charMom}
              alt="媽媽"
              className="h-[118px] md:h-[150px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) relative -ml-6 z-20 hover:scale-105 transition-transform duration-200"
            />
            {/* 5. Grandpa */}
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              src={charGrandpa}
              alt="阿公"
              className="h-28 md:h-[138px] object-contain filter drop-shadow(2px 2px 4px rgba(0,0,0,0.15)) relative -ml-6 z-10 hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
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
