import {
  Home,
  BookOpen,
  Gamepad2,
  ClipboardList,
  MessageCircle,
  Bell,
  ChevronRight,
  Music2,
  ClipboardCheck,
  Lightbulb,
} from 'lucide-react';

import {
  heroBackground,
  characterDad,
  characterMing,
  characterHui,
  characterMom,
  characterGrandpa,
  iconPhonics,
  iconInitials,
  iconFinals,
  iconPractice,
  iconTone,
  iconGame,
  iconLinks,
} from '../assets/images/homepage';

import { BirdFlock, FrogDuo, BearMascot, LavenderPot, LotusCorner } from './Decorations';

const NAV_ITEMS = [
  { label: '首頁', icon: Home, active: true },
  { label: '拼音學習', icon: BookOpen, active: false },
  { label: '互動遊戲', icon: Gamepad2, active: false },
  { label: '學習記錄', icon: ClipboardList, active: false },
  { label: '最新消息', icon: MessageCircle, active: false },
];

const SIDEBAR_ITEMS = [
  { icon: iconPhonics, title: '拼音方案', subtitle: '認識聲母、韻母', active: false },
  { icon: iconInitials, title: '聲母學習', subtitle: '掌握聲母發音', active: false },
  { icon: iconFinals, title: '韻母學習', subtitle: '單元韻母練習', active: true },
  { icon: iconPractice, title: '拼音練習', subtitle: '綜合拼音練習', active: false },
  { icon: iconTone, title: '聲調練習', subtitle: '四聲調辨識', active: false },
  { icon: iconGame, title: '拼音遊戲', subtitle: '遊戲中學拼音', active: false },
  { icon: iconLinks, title: '相關連結', subtitle: '更多學習資源', active: false },
];

const FEATURE_CARDS = [
  {
    title: '拼音學習',
    desc: '從聲母韻母開始，打好台語發音基礎！',
    button: '去學習',
    kind: 'ab' as const,
    bg: 'bg-[#EAF6EC]',
  },
  {
    title: '互動遊戲',
    desc: '玩遊戲學拼音，寓教於樂更有趣！',
    button: '去遊戲',
    kind: 'game' as const,
    bg: 'bg-[#E9EEF9]',
  },
  {
    title: '聲調練習',
    desc: '四聲調辨識練習，說出台語更自信！',
    button: '去練習',
    kind: 'tone' as const,
    bg: 'bg-[#FBEAEA]',
  },
  {
    title: '學習記錄',
    desc: '記錄你的學習進度，見證成長',
    button: '看記錄',
    kind: 'record' as const,
    bg: 'bg-[#F3EEE3]',
  },
];

function FeatureIcon({ kind }: { kind: 'ab' | 'game' | 'tone' | 'record' }) {
  if (kind === 'ab') {
    return (
      <div className="relative w-16 h-16">
        <div className="absolute left-0 top-2 w-11 h-11 rounded-xl bg-[#4E9B5D] flex items-center justify-center text-white font-black text-xl shadow-sm">
          a
        </div>
        <div className="absolute right-0 bottom-0 w-9 h-9 rounded-lg bg-[#9AD1A2] flex items-center justify-center text-white font-black text-sm shadow-sm">
          b
        </div>
      </div>
    );
  }
  if (kind === 'game') {
    return (
      <div className="w-14 h-14 rounded-2xl bg-[#1F2A44] flex items-center justify-center shadow-sm">
        <Gamepad2 className="w-8 h-8 text-[#F2B84B]" strokeWidth={2.2} />
      </div>
    );
  }
  if (kind === 'tone') {
    return (
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
        <Music2 className="w-8 h-8 text-[#E4574E]" strokeWidth={2.2} />
      </div>
    );
  }
  return (
    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
      <ClipboardCheck className="w-8 h-8 text-[#5C8A3F]" strokeWidth={2.2} />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      {/* ---------------- Top Nav ---------------- */}
      <header className="flex items-center justify-between px-2 md:px-3 py-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#3E8552] flex items-center justify-center shadow-sm shrink-0">
            <BookOpen className="w-6 h-6 text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="font-black text-[#2D2A26] text-lg tracking-wide">泰宇出版</div>
            <div className="text-[11px] text-[#8A8378] tracking-wide">台語互動學習網</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
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
          ))}
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

      {/* ---------------- Main Row: Sidebar + Hero ---------------- */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1">
        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0 bg-[#F5F0E4] rounded-3xl p-4 h-fit">
          <div className="mb-4 flex justify-center">
            <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#5CAD6E] to-[#4C9960] text-white font-bold text-sm shadow-sm flex items-center gap-2">
              <span>🌿</span> 學習主題 <span>🌿</span>
            </div>
          </div>

          <ul className="flex flex-col gap-2.5">
            {SIDEBAR_ITEMS.map((item) => (
              <li
                key={item.title}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 cursor-pointer transition-colors ${
                  item.active
                    ? 'bg-[#FBD675] ring-2 ring-[#F2A93B]'
                    : 'bg-white hover:bg-[#FFF9EC]'
                }`}
              >
                <img src={item.icon} alt="" className="w-10 h-10 rounded-lg object-contain shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#3E2723] text-sm truncate">{item.title}</div>
                  <div className="text-[11px] text-[#8A8378] truncate">{item.subtitle}</div>
                </div>
                {item.active && <ChevronRight className="w-4 h-4 text-[#B8791A] shrink-0" strokeWidth={2.5} />}
              </li>
            ))}
          </ul>
        </aside>

        {/* Hero + Feature cards column */}
        <div className="flex-1 flex flex-col">
          <div
            className="relative w-full aspect-[16/7.6] min-h-[420px] rounded-3xl overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBackground})` }}
          >
            <BirdFlock />

            {/* Decorative critters (behind characters) */}
            <LotusCorner className="absolute left-0 bottom-[4%] w-32 md:w-44 pointer-events-none opacity-95 z-30" />
            <FrogDuo className="absolute left-0 bottom-[6%] w-24 md:w-32 pointer-events-none z-40" />
            <LavenderPot className="absolute right-1 bottom-[4%] w-16 md:w-24 pointer-events-none z-40" />

            {/* sign board */}
            <div className="absolute inset-x-0 top-[7%] flex justify-center px-4 z-20">
              <div className="relative w-full max-w-md">
                <div className="relative rounded-2xl border-[6px] border-[#7A5230] bg-[#F7EDD3]/95 px-5 py-4 md:px-8 md:py-6 shadow-lg text-center">
                  <span className="absolute -top-3 -left-3 text-2xl">🌿</span>
                  <span className="absolute -bottom-3 -left-3 text-2xl rotate-180">🌿</span>
                  <h1 className="text-lg md:text-2xl font-black text-[#2D2A26]">
                    歡迎來學 <span className="text-[#E4772E]">台語</span>！
                  </h1>
                  <p className="mt-2 text-[10px] md:text-xs text-[#5C5548] leading-relaxed">
                    用遊戲、互動學習，快樂開口說台語！
                    <br />
                    一起來探索台語的聲音與妙吧！
                  </p>
                  <button className="mt-3 px-5 py-2 rounded-full bg-[#4E9B5D] text-white font-bold text-xs md:text-sm shadow-md hover:bg-[#458752] transition-colors">
                    開始學習 ▶
                  </button>
                </div>
                {/* signpost legs */}
                <div className="absolute left-8 -bottom-8 w-3 h-10 bg-[#7A5230] rounded-sm" />
                <div className="absolute right-8 -bottom-8 w-3 h-10 bg-[#7A5230] rounded-sm" />
              </div>
            </div>

            {/* Characters */}
            <div className="absolute bottom-0 left-0 right-0 h-[92%] flex items-end justify-between px-2 md:px-6 pointer-events-none select-none z-20">
              <div className="flex items-end -space-x-2 md:-space-x-3 h-full">
                <img src={characterHui} alt="阿慧" className="h-[74%] w-auto object-contain drop-shadow-md" />
                <img src={characterDad} alt="爸爸" className="h-[88%] w-auto object-contain drop-shadow-md" />
              </div>
              <div className="flex items-end -space-x-2 md:-space-x-3 h-full">
                <img src={characterMing} alt="阿明" className="h-[84%] w-auto object-contain drop-shadow-md" />
                <img src={characterMom} alt="媽媽" className="h-[72%] w-auto object-contain drop-shadow-md" />
                <img
                  src={characterGrandpa}
                  alt="爺爺"
                  className="h-[76%] w-auto object-contain drop-shadow-md"
                />
              </div>
            </div>

            {/* Bear mascot in front, bottom-right corner */}
            <BearMascot className="absolute right-1 bottom-[3%] w-16 md:w-24 pointer-events-none z-40" />
          </div>

          {/* ---------------- Feature Cards ---------------- */}
          <div className="relative z-10 -mt-8 md:-mt-10 mx-2 md:mx-6 bg-[#FDFBF6] rounded-3xl shadow-lg p-5 md:p-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🌿</span>
              <h2 className="font-black text-[#2D2A26] text-lg">探索四大功能</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {FEATURE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-2xl ${card.bg} p-4 flex flex-col items-center text-center gap-2`}
                >
                  <FeatureIcon kind={card.kind} />
                  <div className="font-bold text-[#2D2A26] text-sm flex items-center gap-1">
                    {card.title} <span className="text-xs">🌿</span>
                  </div>
                  <p className="text-[11px] text-[#8A8378] leading-relaxed min-h-[2.2rem]">{card.desc}</p>
                  <button className="mt-1 w-full py-2 rounded-full bg-[#4E9B5D] text-white text-xs font-bold hover:bg-[#458752] transition-colors">
                    {card.button} ▶
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#EFE8D8] flex items-center gap-2 text-xs text-[#8A8378]">
              <Lightbulb className="w-4 h-4 text-[#F2B84B]" strokeWidth={2.2} />
              <span className="font-bold text-[#5C5548]">學習小提醒</span>
              <span>每天學習15分鐘，持續練習，台語會越來越流利！</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
