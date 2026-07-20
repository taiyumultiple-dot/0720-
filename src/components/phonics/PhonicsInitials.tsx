import { useState } from 'react';
import { Home, BookOpen, Gamepad2, ClipboardList, MessageCircle, Volume2 } from 'lucide-react';
import { logoMark } from '../../assets/images/homepage';

// 資料來源：教育部《臺灣台語羅馬字拼音方案》(95年10月14日公告) 聲母表，
// 例詞經與教育部臺灣台語常用詞辭典交叉核對，修正原本「媽媽」誤植的 máh → má。
type Row = {
  group: string;
  groupLabel: string;
  emoji: string;
  initial: string;
  example: string; // 台羅
  hanzi: string;
};

const ROWS: Row[] = [
  { group: 'labial', groupLabel: '唇音', emoji: '👄', initial: 'p', example: 'po-lê', hanzi: '玻璃' },
  { group: 'labial', groupLabel: '唇音', emoji: '👄', initial: 'ph', example: 'phú-phú', hanzi: '碎碎' },
  { group: 'labial', groupLabel: '唇音', emoji: '👄', initial: 'b', example: 'a-bó', hanzi: '阿母' },
  { group: 'labial', groupLabel: '唇音', emoji: '👄', initial: 'm', example: 'má-má', hanzi: '媽媽' },
  { group: 'alveolar', groupLabel: '舌尖音', emoji: '👅', initial: 't', example: 'to-á', hanzi: '刀仔' },
  { group: 'alveolar', groupLabel: '舌尖音', emoji: '👅', initial: 'th', example: 'thô-á', hanzi: '桃仔' },
  { group: 'alveolar', groupLabel: '舌尖音', emoji: '👅', initial: 'n', example: 'niau-á', hanzi: '貓仔' },
  { group: 'alveolar', groupLabel: '舌尖音', emoji: '👅', initial: 'l', example: 'lô-so', hanzi: '囉唆' },
];

function speak(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const zhVoice =
    voices.find((v) => v.lang.toLowerCase().includes('zh')) ||
    voices.find((v) => v.lang.toLowerCase().includes('nan'));
  if (zhVoice) utter.voice = zhVoice;
  utter.rate = 0.75;
  window.speechSynthesis.speak(utter);
}

function AudioButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => speak(text)}
      aria-label={`播放 ${text} 發音`}
      className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#4E9B5D]/10 text-[#4E9B5D] hover:bg-[#4E9B5D]/20 transition-colors shrink-0"
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}

const TABS = [
  { key: 'initials', label: '聲母 (Initials)', icon: Volume2 },
  { key: 'finals', label: '韻母 (Finals)', icon: BookOpen },
  { key: 'tones', label: '聲調 (Tones)', icon: Gamepad2 },
] as const;

export default function PhonicsInitials({ onHome }: { onHome?: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('initials');
  const groups = Array.from(new Set(ROWS.map((r) => r.group)));

  return (
    <div className="min-h-screen bg-[#FBF7EE] p-3 md:p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between px-2 md:px-3 py-3 bg-white/60 backdrop-blur-sm rounded-2xl">
        <div className="flex items-center cursor-pointer" onClick={onHome}>
          <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#8A8378]">
          <span className="flex items-center gap-1.5 cursor-pointer hover:text-[#4E9B5D]" onClick={onHome}>
            <Home className="w-4 h-4" /> 首頁
          </span>
          <span className="flex items-center gap-1.5 text-[#4E9B5D]">
            <BookOpen className="w-4 h-4" /> 拼音學習
          </span>
          <span className="flex items-center gap-1.5">
            <Gamepad2 className="w-4 h-4" /> 互動遊戲
          </span>
          <span className="flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4" /> 學習記錄
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4" /> 最新消息
          </span>
        </nav>
      </header>

      <div className="bg-white rounded-3xl shadow-sm p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-black text-[#2D2A26] mb-1">拼音學習</h1>
        <p className="text-sm text-[#8A8378] mb-5">
          依教育部《臺灣台語羅馬字拼音方案》編寫，點擊喇叭圖示可以聽發音（瀏覽器語音合成，非真人錄音）。
        </p>

        <div className="flex items-center gap-2 mb-6 border-b border-[#EFE8D8]">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold rounded-t-xl transition-colors ${
                tab === key
                  ? 'bg-[#4E9B5D] text-white'
                  : 'text-[#8A8378] hover:bg-[#F5F0E4]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === 'initials' && (
          <div className="overflow-hidden rounded-2xl border border-[#EFE8D8]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#4E9B5D] text-white text-left">
                  <th className="px-4 py-3 font-bold">聲母類型</th>
                  <th className="px-4 py-3 font-bold">羅馬拼音</th>
                  <th className="px-4 py-3 font-bold">語詞（羅馬字）</th>
                  <th className="px-4 py-3 font-bold">語詞（漢字）</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) =>
                  ROWS.filter((r) => r.group === g).map((row, i) => (
                    <tr
                      key={row.initial}
                      className={i % 2 === 0 ? 'bg-[#FBF7EE]' : 'bg-white'}
                    >
                      {i === 0 && (
                        <td
                          rowSpan={ROWS.filter((r) => r.group === g).length}
                          className="px-4 py-3 align-middle text-center border-r border-[#EFE8D8]"
                        >
                          <div className="text-2xl mb-1">{row.emoji}</div>
                          <div className="font-bold text-[#5C5548]">{row.groupLabel}</div>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <AudioButton text={row.initial} />
                          <span className="font-mono font-bold text-[#2D2A26]">{row.initial}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <AudioButton text={row.example} />
                          <span className="font-mono text-[#2D2A26]">{row.example}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#2D2A26]">{row.hanzi}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'finals' && (
          <div className="rounded-2xl border border-dashed border-[#EFE8D8] p-10 text-center text-[#8A8378]">
            韻母學習頁面建置中，敬請期待！
          </div>
        )}

        {tab === 'tones' && (
          <div className="rounded-2xl border border-dashed border-[#EFE8D8] p-10 text-center text-[#8A8378]">
            聲調練習頁面建置中，敬請期待！
          </div>
        )}
      </div>
    </div>
  );
}
