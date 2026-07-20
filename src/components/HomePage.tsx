import {
  Home,
  BookOpen,
  Gamepad2,
  ClipboardList,
  MessageCircle,
  Bell,
  ChevronRight,
} from 'lucide-react';

import {
  heroFull,
  iconPhonics,
  iconInitials,
  iconFinals,
  iconPractice,
  iconTone,
  iconGame,
  iconLinks,
  featureIconPhonics,
  featureIconGame,
  featureIconTone,
  featureIconRecord,
  frogDecor,
  bearDecor,
  logoMark,
} from '../assets/images/homepage';

const NAV_ITEMS = [
  { label: '首頁', icon: Home, active: true },
  { label: '拼音學習', icon: BookOpen, active: false },
  { label: '互動遊戲', icon: Gamepad2, active: false },
  { label: '學習紀錄', icon: ClipboardList, active: false },
  { label: '最新消息', icon: MessageCircle, active: false },
];

const SIDEBAR_ITEMS = [
  { icon: iconPhonics, title: '拼音方案', subtitle: '認識聲母、韻母', active: false },
  { icon: iconInitials, title: '聲母學習', subtitle: '掌握聲母發音', active: false },
  { icon: iconFinals, title: '韻母學習', subtitle: '單元韻母練習', active: true },
  { icon: iconPractice, title: '拼音練習', subtitle: '綜合拼音練習', active: false },
  { icon: iconTone, title: '動畫專區', subtitle: '台語精彩動畫影片', active: false },
  { icon: iconGame, title: '拼音遊戲', subtitle: '遊戲中學拼音', active: false },
  { icon: iconLinks, title: '相關連結', subtitle: '更多學習資源', active: false },
];

const FEATURE_CARDS = [
  {
    title: '拼音學習',
    desc: '從聲母韻母開始，打好台語發音基礎！',
    button: '去學習',
    icon: featureIconPhonics,
  },
  {
    title: '互動遊戲',
    desc: '玩遊戲學拼音，寓教於樂更有趣！',
    button: '去遊戲',
    icon: featureIconGame,
  },
  {
    title: '動畫專區',
    desc: '觀看精彩台語動畫，輕鬆學習道地台語發音！',
    button: '去觀看',
    icon: featureIconTone,
  },
  {
    title: '學習紀錄',
    desc: '記錄你的學習進度，見證成長',
    button: '看記錄',
    icon: featureIconRecord,
  },
];

const MAP_SIDEBAR_TABS: Record<string, string> = {
  '拼音方案': 'phonics_scheme',
  '聲母學習': 'initials_learn',
  '韻母學習': 'finals_learn',
  '拼音練習': 'phonics_practice',
  '動畫專區': 'tone_practice',
  '拼音遊戲': 'phonics_games',
  '相關連結': 'related_links',
};

export default function HomePage({ onNavigate }: { onNavigate: (view: string, tabId?: string) => void }) {
  const handleNavClick = (label: string) => {
    if (label === '首頁') onNavigate('home');
    else if (label === '拼音學習') onNavigate('phonics', 'phonics_scheme');
    else if (label === '互動遊戲') onNavigate('gamesHub');
    else if (label === '學習紀錄') onNavigate('record');
    else if (label === '最新消息') onNavigate('news');
  };

  const handleSidebarClick = (title: string) => {
    const tabId = MAP_SIDEBAR_TABS[title];
    if (tabId) {
      onNavigate('phonics', tabId);
    }
  };

  const handleFeatureClick = (title: string) => {
    if (title === '拼音學習') onNavigate('phonics', 'phonics_scheme');
    else if (title === '互動遊戲') onNavigate('gamesHub');
    else if (title === '動畫專區') onNavigate('phonics', 'tone_practice');
    else if (title === '學習紀錄') onNavigate('record');
  };

  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      {/* ---------------- Top Nav (Synchronized with game pages) ---------------- */}
      <header className="flex items-center justify-between px-2 md:px-3 py-3 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#F1ECE0]">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, active }) => (
            <button
              key={label}
              onClick={() => handleNavClick(label)}
              className={`flex flex-col items-center gap-1 text-[15px] font-black transition-colors tracking-wide ${
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
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-full bg-[#4E9B5D] text-white font-bold text-sm hover:bg-[#3E8552] active:scale-95 transition-all shadow-sm">
            登入 / 註冊
          </button>
          <button className="relative w-10 h-10 rounded-full bg-[#F1ECE0] flex items-center justify-center text-[#5C5548] hover:bg-[#E7E0D0] active:scale-95 transition-all">
            <Bell className="w-5 h-5" strokeWidth={2.2} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#E14D2A] rounded-full border border-[#F1ECE0] animate-pulse" />
          </button>
        </div>
      </header>

      {/* ---------------- Main Row: Sidebar + Hero ---------------- */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1">
        {/* Left column: Sidebar + frog decoration */}
        <div className="lg:w-72 shrink-0 flex flex-col">
          <aside className="bg-[#F5F0E4] rounded-3xl p-4">
            <div className="mb-4 flex justify-center">
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#5CAD6E] to-[#4C9960] text-white font-bold text-sm shadow-sm flex items-center gap-2">
                <span>🌿</span> 學習主題 <span>🌿</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5">
              {SIDEBAR_ITEMS.map((item) => (
                <li
                  key={item.title}
                  onClick={() => handleSidebarClick(item.title)}
                  className="flex items-center gap-4 rounded-2xl px-4 py-3.5 cursor-pointer transition-colors bg-white hover:bg-[#FFF9EC] border border-[#F1ECE0]/40 shadow-sm"
                >
                  <img src={item.icon} alt="" className="w-12 h-12 rounded-lg object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[#3E2723] text-base truncate">{item.title}</div>
                    <div className="text-xs text-[#8A8378] font-bold truncate mt-0.5">{item.subtitle}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#B8791A] shrink-0" strokeWidth={2.5} />
                </li>
              ))}
            </ul>
          </aside>

          {/* Frog decoration below sidebar (desktop only, matches template's page-margin placement) */}
          <div className="hidden lg:block mt-auto pt-3 rounded-3xl overflow-hidden">
            <img src={frogDecor} alt="" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Hero + Feature cards column */}
        <div className="flex-1 flex flex-col">
          {/* Hero banner: exact crop of the official template artwork */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-sm">
            <img src={heroFull} alt="歡迎來學台語！用遊戲、互動學習，快樂開口說台語！" className="w-full h-auto block" />
            {/* Invisible click target over the baked-in "開始學習" button, positioned by % to stay aligned at any width */}
            <button
              onClick={() => onNavigate('phonics', 'phonics_scheme')}
              aria-label="開始學習"
              className="absolute cursor-pointer"
              style={{ left: '34.5%', top: '68%', width: '15%', height: '13%' }}
            />
          </div>

          {/* ---------------- Feature Cards + bear decoration ---------------- */}
          <div className="relative z-10 -mt-8 md:-mt-10 flex items-end gap-3 md:gap-4 px-2 md:px-0">
            <div className="flex-1 bg-[#FDFBF6] rounded-3xl shadow-lg p-5 md:p-7">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🌿</span>
                <h2 className="font-black text-[#2D2A26] text-lg">探索四大功能</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {FEATURE_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl bg-[#FBF3E4] p-4 flex flex-col items-center text-center gap-3 border border-[#EFE8D8]/50 shadow-sm"
                  >
                    <img src={card.icon} alt="" className="w-full h-auto rounded-xl hover:scale-105 transition-transform" />
                    <div className="font-black text-[#2D2A26] text-base flex items-center gap-1">
                      {card.title} <span className="text-xs">🌿</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#8A8378] font-bold leading-relaxed min-h-[3rem]">{card.desc}</p>
                    <button
                      onClick={() => handleFeatureClick(card.title)}
                      className="mt-1 w-full py-2.5 rounded-full bg-[#4E9B5D] text-white text-sm font-black hover:bg-[#458752] transition-colors shadow-sm"
                    >
                      {card.button} ▶
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#EFE8D8] flex items-center gap-3 text-sm md:text-base text-[#8A8378] font-bold">
                <span className="text-lg">💡</span>
                <span className="font-extrabold text-[#5C5548]">學習小提醒：</span>
                <span>每天學習 15 分鐘，持續練習，台語會越來越流利！</span>
              </div>
            </div>

            {/* Bear + lavender decoration beside the card (desktop only) */}
            <div className="hidden md:block w-40 shrink-0 rounded-3xl overflow-hidden self-end">
              <img src={bearDecor} alt="" className="w-full h-auto object-contain block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
