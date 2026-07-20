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
  { label: '學習紀錄', icon: ClipboardList, key: 'record' },
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

const sidebarTabMap: Record<string, string> = {
  plan: 'phonics_scheme',
  initials: 'initials_learn',
  finals: 'finals_learn',
  practice: 'phonics_practice',
  tone: 'tone_practice',
  game: 'phonics_games',
  links: 'related_links',
};

// Global navigation helper
const triggerGlobalNavigate = (key: string, tabId?: string) => {
  if (typeof (window as any).globalNavigate === 'function') {
    const targetView = key === 'games' ? 'gamesHub' : key;
    (window as any).globalNavigate(targetView, tabId);
  }
};

function TopNav({ onHome }: { onHome?: () => void }) {
  const handleNavClick = (key: string) => {
    if (key === 'home' && !((window as any).globalNavigate)) {
      onHome?.();
    } else {
      triggerGlobalNavigate(key);
    }
  };

  return (
    <header className="flex items-center justify-between px-2 md:px-3 py-3 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#F1ECE0]">
      <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
        <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map(({ label, key }) => {
          const active = key === 'games';
          return (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`flex flex-col items-center gap-1 text-[15px] font-black transition-colors tracking-wide cursor-pointer ${
                active ? 'text-[#4E9B5D]' : 'text-[#8A8378] hover:text-[#4E9B5D]'
              }`}
            >
              <span className="flex items-center gap-1.5 h-6">
                {label}
              </span>
              <span
                className={`h-[3px] w-full rounded-full transition-opacity ${
                  active ? 'bg-[#4E9B5D] opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 rounded-full bg-[#4E9B5D] text-white font-bold text-sm hover:bg-[#3E8552] active:scale-95 transition-all shadow-sm cursor-pointer">
          登入 / 註冊
        </button>
        <button className="relative w-10 h-10 rounded-full bg-[#F1ECE0] flex items-center justify-center text-[#5C5548] hover:bg-[#E7E0D0] active:scale-95 transition-all cursor-pointer">
          <Bell className="w-5 h-5" strokeWidth={2.2} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E14D2A] rounded-full border border-[#F1ECE0] animate-pulse" />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const handleItemClick = (key: string) => {
    const tabId = sidebarTabMap[key];
    if (tabId) {
      triggerGlobalNavigate('phonics', tabId);
    }
  };

  return (
    <aside className="bg-[#F5F0E4] rounded-3xl p-4 w-56 shrink-0 h-fit border border-[#EFE8D8] shadow-xs">
      <ul className="flex flex-col gap-2.5">
        {SIDEBAR_ITEMS.map((item) => {
          const active = item.key === 'game';
          return (
            <li
              key={item.key}
              onClick={() => handleItemClick(item.key)}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 cursor-pointer transition-colors ${
                active ? 'bg-[#4E9B5D] text-white shadow-xs' : 'bg-white hover:bg-[#FFF9EC] border border-transparent hover:border-[#EFE8D8]'
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
export function GameShell({ children, onHome }: { children: ReactNode; onHome?: () => void }) {
  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      <TopNav onHome={onHome} />
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">{children}</div>
      </div>
    </div>
  );
}

/** Layout used only by the hub page: nav, full width, no sidebar. */
export function HubShell({ children, onHome }: { children: ReactNode; onHome?: () => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FCEFD8] via-[#F7E6C8] to-[#F3DFC0] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
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
