import { ReactNode } from 'react';
import { Home, BookOpen, Gamepad2, ClipboardList, MessageCircle, Bell, ChevronRight } from 'lucide-react';

import {
  iconPhonics,
  iconInitials,
  iconFinals,
  iconPractice,
  iconTone,
  iconGame,
  iconLinks,
  logoMark,
} from '../../assets/images/homepage';
import { decorPottery, decorFlowers } from '../../assets/images/games';

const NAV_ITEMS = [
  { label: '首頁', icon: Home, key: 'home' },
  { label: '拼音學習', icon: BookOpen, key: 'phonics' },
  { label: '互動遊戲', icon: Gamepad2, key: 'games' },
  { label: '學習記錄', icon: ClipboardList, key: 'record' },
  { label: '最新消息', icon: MessageCircle, key: 'news' },
];

const SIDEBAR_ITEMS = [
  { icon: iconPhonics, title: '拼音方案', subtitle: '認識聲母、韻母', key: 'plan' },
  { icon: iconInitials, title: '聲母學習', subtitle: '掌握聲母發音', key: 'initials' },
  { icon: iconFinals, title: '韻母學習', subtitle: '單元韻母練習', key: 'finals' },
  { icon: iconPractice, title: '拼音練習', subtitle: '綜合拼音練習', key: 'practice' },
  { icon: iconTone, title: '聲調練習', subtitle: '四聲調辨識', key: 'tone' },
  { icon: iconGame, title: '拼音遊戲', subtitle: '遊戲中學拼音', key: 'game' },
  { icon: iconLinks, title: '相關連結', subtitle: '更多學習資源', key: 'links' },
];

function TopNav({ onHome, onGamesHub }: { onHome?: () => void; onGamesHub?: () => void }) {
  return (
    <header className="flex items-center justify-between px-2 md:px-3 py-3 bg-white/60 backdrop-blur-sm">
      <div className="flex items-center cursor-pointer" onClick={onHome}>
        <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ label, icon: Icon, key }) => {
          const active = key === 'games';
          const handlers: Record<string, (() => void) | undefined> = {
            home: onHome,
            games: onGamesHub,
          };
          return (
            <button
              key={key}
              onClick={handlers[key]}
              className={`flex flex-col items-center gap-1 text-sm font-medium transition-colors ${
                active ? 'text-[#4E9B5D]' : 'text-[#8A8378] hover:text-[#4E9B5D]'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Icon className="w-4 h-4" strokeWidth={2.2} />
                {label}
              </span>
              <span
                className={`h-0.5 w-full rounded-full transition-opacity ${
                  active ? 'bg-[#4E9B5D] opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <button className="px-5 py-2 rounded-full border-2 border-[#4E9B5D] text-[#4E9B5D] font-bold text-sm hover:bg-[#4E9B5D] hover:text-white transition-colors">
          登入 / 註冊
        </button>
        <button className="w-10 h-10 rounded-full bg-[#F1ECE0] flex items-center justify-center text-[#5C5548] hover:bg-[#E7E0D0] transition-colors">
          <Bell className="w-5 h-5" strokeWidth={2.2} />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="bg-[#F5F0E4] rounded-3xl p-4 w-56 shrink-0 h-fit">
      <ul className="flex flex-col gap-2.5">
        {SIDEBAR_ITEMS.map((item) => {
          const active = item.key === 'game';
          return (
            <li
              key={item.key}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 cursor-pointer transition-colors ${
                active ? 'bg-[#4E9B5D] text-white' : 'bg-white hover:bg-[#FFF9EC]'
              }`}
            >
              <img src={item.icon} alt="" className="w-9 h-9 rounded-lg object-contain shrink-0" />
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm truncate ${active ? 'text-white' : 'text-[#3E2723]'}`}>
                  {item.title}
                </div>
                <div className={`text-[11px] truncate ${active ? 'text-white/80' : 'text-[#8A8378]'}`}>
                  {item.subtitle}
                </div>
              </div>
              {active && <ChevronRight className="w-4 h-4 text-white shrink-0" strokeWidth={2.5} />}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/** Full layout used by every game sub-page: nav + left sidebar + content area. */
export function GameShell({
  children,
  onHome,
  onGamesHub,
  mascotSrc,
}: {
  children: ReactNode;
  onHome?: () => void;
  onGamesHub?: () => void;
  mascotSrc?: string;
}) {
  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-3 md:gap-4 relative">
      <TopNav onHome={onHome} onGamesHub={onGamesHub} />
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">{children}</div>
      </div>
      {mascotSrc && (
        <img
          src={mascotSrc}
          alt="陪讀角色"
          className="hidden xl:block fixed bottom-2 right-2 w-24 2xl:w-28 drop-shadow-md pointer-events-none select-none z-10"
        />
      )}
    </div>
  );
}

/** Layout used only by the hub page: nav, full width, no sidebar. */
export function HubShell({ children, onHome }: { children: ReactNode; onHome?: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FCEFD8] via-[#F7E6C8] to-[#F3DFC0] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      {/* Corner decorations matching the reference design */}
      <img
        src={decorPottery}
        alt=""
        className="pointer-events-none select-none hidden lg:block absolute left-0 bottom-0 w-40 xl:w-52 opacity-90 z-0"
      />
      <img
        src={decorFlowers}
        alt=""
        className="pointer-events-none select-none hidden lg:block absolute right-0 bottom-0 w-44 xl:w-56 opacity-90 z-0"
      />
      <div className="relative z-10 flex flex-col gap-3 md:gap-4">
        <TopNav onHome={onHome} />
        {children}
      </div>
    </div>
  );
}
