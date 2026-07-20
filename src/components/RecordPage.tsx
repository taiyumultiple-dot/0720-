import { useState, useEffect } from 'react';
import {
  Home,
  BookOpen,
  Gamepad2,
  ClipboardList,
  MessageCircle,
  Bell,
  Trash2,
  Award,
  TrendingUp,
  Clock,
  Flame,
  Calendar
} from 'lucide-react';
import { logoMark } from '../assets/images/homepage';
import { motion } from 'motion/react';

interface GameRecord {
  date: string;
  gameName: string;
  score: number;
  stars: number;
}

export default function RecordPage({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [records, setRecords] = useState<GameRecord[]>([]);

  // Default mock records to populate if local storage is empty
  const DEFAULT_RECORDS: GameRecord[] = [
    { date: '2026/07/19', gameName: '台南夜市美食對對碰', score: 90, stars: 5 },
    { date: '2026/07/18', gameName: '聽力練習拼音挑戰', score: 80, stars: 4 },
    { date: '2026/07/15', gameName: '恆春半島海灘尋寶', score: 100, stars: 5 }
  ];

  useEffect(() => {
    const stored = localStorage.getItem('tai_lo_records');
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (e) {
        setRecords(DEFAULT_RECORDS);
      }
    } else {
      setRecords(DEFAULT_RECORDS);
      localStorage.setItem('tai_lo_records', JSON.stringify(DEFAULT_RECORDS));
    }
  }, []);

  const handleClearRecords = () => {
    if (window.confirm('確定要清除所有的學習紀錄嗎？')) {
      localStorage.removeItem('tai_lo_records');
      setRecords([]);
    }
  };

  const totalStars = records.reduce((sum, r) => sum + r.stars, 0);
  const averageScore = records.length > 0 ? Math.round(records.reduce((sum, r) => sum + r.score, 0) / records.length) : 0;

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
                key === 'record' ? 'text-[#4E9B5D]' : 'text-[#8A8378] hover:text-[#4E9B5D]'
              }`}
            >
              <span className="flex items-center gap-1.5 h-6">{label}</span>
              <span
                className={`h-[3px] w-full rounded-full transition-opacity ${
                  key === 'record' ? 'bg-[#4E9B5D] opacity-100' : 'opacity-0'
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

      {/* ---------------- Main Column Layout ---------------- */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 p-2 flex-1">
        
        {/* Banner Headers */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F1ECE0] pb-5">
          <div>
            <h1 className="font-black text-[#2D2A26] text-3xl mb-1.5 flex items-center gap-2">
              <span>📊</span> 我的台語學習紀錄
            </h1>
            <p className="text-[#8A8378] text-base font-bold">統計您的作答成效、遊戲通關成績與學習進度</p>
          </div>

          {records.length > 0 && (
            <button
              onClick={handleClearRecords}
              className="px-5 py-2.5 rounded-xl text-sm font-black text-[#E14D2A] border-2 border-[#E14D2A] hover:bg-[#E14D2A]/5 active:scale-95 transition-all flex items-center gap-1.5 self-start"
            >
              <Trash2 className="w-4 h-4" /> 清除紀錄
            </button>
          )}
        </div>

        {/* --- Stats Dashboard --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4.5">
          <div className="p-5 md:p-6 rounded-3xl bg-white border border-[#F1ECE0] shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#4E9B5D]/10 flex items-center justify-center text-[#4E9B5D] shrink-0 border border-[#4E9B5D]/20">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-[#8A8378] font-black">獲得星星</div>
              <div className="text-2xl md:text-3xl font-black text-[#2D2A26] mt-1">{totalStars} ★</div>
            </div>
          </div>

          <div className="p-5 md:p-6 rounded-3xl bg-white border border-[#F1ECE0] shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F2A93B]/10 flex items-center justify-center text-[#F2A93B] shrink-0 border border-[#F2A93B]/20">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-[#8A8378] font-black">平均答對率</div>
              <div className="text-2xl md:text-3xl font-black text-[#2D2A26] mt-1">{averageScore}%</div>
            </div>
          </div>

          <div className="p-5 md:p-6 rounded-3xl bg-white border border-[#F1ECE0] shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E14D2A]/10 flex items-center justify-center text-[#E14D2A] shrink-0 border border-[#E14D2A]/20">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-[#8A8378] font-black">學習時長</div>
              <div className="text-2xl md:text-3xl font-black text-[#2D2A26] mt-1">{records.length * 10} 分鐘</div>
            </div>
          </div>

          <div className="p-5 md:p-6 rounded-3xl bg-white border border-[#F1ECE0] shadow-md flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#B8791A]/10 flex items-center justify-center text-[#B8791A] shrink-0 border border-[#B8791A]/20">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs md:text-sm text-[#8A8378] font-black">連續學習</div>
              <div className="text-2xl md:text-3xl font-black text-[#2D2A26] mt-1">{Math.min(records.length, 3)} 天</div>
            </div>
          </div>
        </div>

        {/* --- History Records Log --- */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#F1ECE0] shadow-md flex-1">
          <h2 className="font-black text-[#2D2A26] text-xl mb-5 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#4E9B5D]" /> 歷史通關紀錄明細
          </h2>

          {records.length === 0 ? (
            <div className="py-12 flex flex-col items-center text-center gap-3">
              <span className="text-4xl">📭</span>
              <div className="font-black text-[#8A8378] text-base">目前尚無挑戰與通關紀錄</div>
              <p className="text-xs md:text-sm text-[#8A8378] max-w-xs font-bold">快去「互動遊戲」或是「拼音學習」中挑戰聽力測試吧！</p>
              <button
                onClick={() => onNavigate('phonics')}
                className="mt-3 px-6 py-3 rounded-full bg-[#4E9B5D] text-white font-black text-sm hover:bg-[#3E8552]"
              >
                前往拼音學習 ▶
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F1ECE0] text-sm md:text-base font-black text-[#3E2723]">
                    <th className="py-4 px-4">挑戰日期</th>
                    <th className="py-4 px-4">學習單元/遊戲名稱</th>
                    <th className="py-4 px-4 text-center">單次得分</th>
                    <th className="py-4 px-4 text-center">榮譽星等</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1ECE0]">
                  {records.map((record, index) => (
                    <tr key={index} className="hover:bg-[#FDFBF6] transition-colors text-sm md:text-base text-[#5C5548] font-bold">
                      <td className="py-4 px-4 font-mono text-sm">{record.date}</td>
                      <td className="py-4 px-4 font-black text-[#2D2A26] text-base md:text-lg">{record.gameName}</td>
                      <td className="py-4 px-4 text-center font-black font-mono text-[#E4772E] text-base md:text-lg">{record.score} 分</td>
                      <td className="py-4 px-4 text-center text-[#F2A93B] text-base md:text-lg">
                        {'★'.repeat(record.stars)}
                        {'☆'.repeat(5 - record.stars)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
