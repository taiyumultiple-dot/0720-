import { useState } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  ClipboardList,
  MessageCircle,
  Bell,
  X,
  Sparkles,
  Calendar
} from 'lucide-react';
import { logoMark } from '../assets/images/homepage';
import { motion, AnimatePresence } from 'motion/react';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  icon: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: '泰宇台語課本多媒體互動學習網隆重上線！',
    date: '2026/07/19',
    category: '系統公告',
    summary: '泰宇出版社為了提供學童更完美的台語學習環境，開發出包含台羅發音、合成語音、繪本闖關在內的全功能學習平台。',
    content: '親愛的老師、家長與同學們：泰宇教育出版社正式推出「台語互動多媒體學習網」！本站結合教育部最新標準「台灣閩南語拼音方案（台羅）」，規劃了全套符合國小、國中與高中學程的聲母學習、韻母學習、聲調曲線及十款具有精美本土化手繪美術插畫的拼音繪本闖關遊戲。歡迎大家多加利用，快樂學習！',
    icon: '🎉'
  },
  {
    id: '2',
    title: '新增 10 款本土插畫風格拼音繪本遊戲！',
    date: '2026/07/18',
    category: '遊戲更新',
    summary: '在「互動遊戲」專區，全新實裝台南夜市、屏東熱帶植物、恆春半島海灘、故事排列等10款極具教育與在地特色的小遊戲。',
    content: '本次更新在「互動遊戲」專區，上線了 10 款全新多媒體互動探索遊戲：\n1. 台南夜市美食對對碰：認識地道台灣小吃！\n2. 瑞穗溫泉：尋找保暖與日用品詞彙。\n3. 花蓮七星潭：探尋美麗的海生動植物與交通工具拼圖！\n4. 太魯閣故事排列：用傳統神話卡牌拼湊故事與句型。\n每款遊戲皆結合真人台語語音、標準台羅發音比對與高畫質手繪插圖，歡迎立即進入「互動遊戲」專區開玩！',
    icon: '🎮'
  },
  {
    id: '3',
    title: '台語八聲調學習秘笈：如何掌握 3-3-5 的音樂節奏',
    date: '2026/07/15',
    category: '教學資源',
    summary: '掌握台語「聲調變調」與「八聲調」的發音秘密，看這篇就能輕鬆融入台語歌謠般的日常對話。',
    content: '台語俗話說：「君、滾、棍、骨、群、郡、滑」，剛好代表完整的 1, 2, 3, 4, 5, 7, 8 聲調。要講出流利的台語口音，關鍵在於掌握「變調（Tone Sandhi）」。當兩個台語詞彙連著發音時，前字往往需要變調，其規律為「5變3，3變2，2變1，1變7，7變3」。透過我們的「聲調練習」五度對照曲線圖與實時音頻，能幫助您快速建立台語的純正腔調感！',
    icon: '💡'
  }
];

export default function NewsPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-3 md:gap-4">
      {/* ---------------- Top Nav ---------------- */}
      <header className="flex items-center justify-between px-2 md:px-3 py-3 bg-white/60 backdrop-blur-sm rounded-3xl border border-[#F1ECE0]">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
          <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: '首頁', key: 'home', icon: Home },
            { label: '拼音學習', key: 'phonics', icon: BookOpen },
            { label: '互動遊戲', key: 'gamesHub', icon: Gamepad2 },
            { label: '學習紀錄', key: 'record', icon: ClipboardList },
            { label: '最新消息', key: 'news', icon: MessageCircle },
          ].map(({ label, key }) => (
            <button
              key={label}
              onClick={() => onNavigate(key)}
              className={`flex flex-col items-center gap-1 text-[15px] font-black transition-colors tracking-wide ${
                key === 'news' ? 'text-[#4E9B5D]' : 'text-[#8A8378] hover:text-[#4E9B5D]'
              }`}
            >
              <span className="flex items-center gap-1.5 h-6">{label}</span>
              <span
                className={`h-[3px] w-full rounded-full transition-opacity ${
                  key === 'news' ? 'bg-[#4E9B5D] opacity-100' : 'opacity-0'
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

      {/* ---------------- Main Layout Column ---------------- */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 p-2 flex-1">
        
        <div className="border-b border-[#F1ECE0] pb-5">
          <h1 className="font-black text-[#2D2A26] text-3xl mb-1.5 flex items-center gap-2">
            <span>📢</span> 平台最新消息與活動公告
          </h1>
          <p className="text-[#8A8378] text-base font-bold">提供第一手課程教材更新、系統維護及台語學習乾貨秘笈</p>
        </div>

        {/* --- News Article Grid --- */}
        <div className="grid grid-cols-1 gap-5 flex-1">
          {NEWS_DATA.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="p-6 md:p-7 rounded-3xl bg-white border border-[#F1ECE0] hover:border-[#F2A93B] hover:shadow-xl cursor-pointer transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
            >
              <div className="flex items-start md:items-center gap-5 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF4E8] flex items-center justify-center text-4xl shrink-0 border border-[#F1ECE0]/45">
                  {article.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-xs md:text-sm font-black px-3 py-1 bg-[#4E9B5D]/10 text-[#4E9B5D] rounded-full border border-[#4E9B5D]/20">
                      {article.category}
                    </span>
                    <span className="text-xs md:text-sm text-[#8A8378] font-black flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {article.date}
                    </span>
                  </div>
                  <h2 className="font-black text-[#2D2A26] text-lg md:text-xl leading-snug group-hover:text-[#B8791A] truncate">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#8A8378] leading-relaxed mt-2 truncate font-semibold">
                    {article.summary}
                  </p>
                </div>
              </div>

              <span className="text-sm font-black text-[#4E9B5D] flex items-center gap-1 shrink-0 self-end md:self-center bg-[#4E9B5D]/5 px-4 py-2 rounded-xl border border-[#4E9B5D]/15 hover:bg-[#4E9B5D] hover:text-white transition-all">
                閱讀全文 ▶
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Article Detail Popup Modal --- */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden border border-[#F1ECE0]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#F1ECE0]/50 hover:bg-[#F1ECE0] flex items-center justify-center text-[#5C5548] transition-colors shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto pr-2 flex flex-col gap-5">
                <div className="flex items-center gap-3 flex-wrap mt-2">
                  <span className="text-xs md:text-sm font-black px-3 py-1 bg-[#4E9B5D]/10 text-[#4E9B5D] rounded-full border border-[#4E9B5D]/20">
                    {selectedArticle.category}
                  </span>
                  <span className="text-xs md:text-sm text-[#8A8378] font-black flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {selectedArticle.date}
                  </span>
                </div>

                <h2 className="font-black text-[#2D2A26] text-2xl leading-snug pr-8">
                  {selectedArticle.title}
                </h2>

                <div className="border-t border-[#F1ECE0] pt-5 text-sm md:text-base text-[#423D33] font-semibold leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>

                <div className="p-5 bg-[#FBF7EE] rounded-2xl border border-[#F1ECE0] mt-5 flex items-center gap-2.5 text-xs md:text-sm text-[#B8791A] font-black shadow-inner">
                  <Sparkles className="w-5 h-5 shrink-0" /> 泰宇台語學習網，陪伴您一同體驗語言之美！
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
