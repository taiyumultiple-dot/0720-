import { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import {
  iconPhonics,
  iconInitials,
  iconFinals,
  iconPractice,
  iconTone,
  iconGame,
  iconLinks,
  logoMark,
  bearDecor,
} from '../../assets/images/homepage';
import { charAhui } from '../../assets/images/characters';

// 簡化嘴型示意圖（依發音部位分組），p 有官方真實照片，其餘用這組簡化示意圖代替
function MouthShapeSvg({ group }: { group: string }) {
  const face = (
    <>
      <ellipse cx="50" cy="50" rx="42" ry="46" fill="#F6D2B8" />
      <ellipse cx="30" cy="42" rx="4" ry="5" fill="#3A2E22" />
      <ellipse cx="70" cy="42" rx="4" ry="5" fill="#3A2E22" />
    </>
  );
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {face}
      {group === '唇音' && <rect x="34" y="66" width="32" height="6" rx="3" fill="#C1685A" />}
      {group === '舌尖音' && (
        <>
          <ellipse cx="50" cy="70" rx="18" ry="10" fill="#7A362E" />
          <rect x="40" y="66" width="20" height="6" rx="3" fill="#E8897A" />
        </>
      )}
      {group === '舌根音' && (
        <>
          <ellipse cx="50" cy="72" rx="20" ry="13" fill="#7A362E" />
          <ellipse cx="50" cy="66" rx="10" ry="5" fill="#E8897A" />
        </>
      )}
      {group === '喉音' && <ellipse cx="50" cy="72" rx="14" ry="14" fill="#5E241D" />}
      {group === '齒音' && (
        <>
          <rect x="36" y="66" width="28" height="8" rx="2" fill="#7A362E" />
          <rect x="38" y="66" width="24" height="3" fill="white" />
        </>
      )}
    </svg>
  );
}

// 資料來源：教育部《臺灣台語羅馬字拼音教學網》官方聲母表 https://tailo.moe.edu.tw/pin1.html
type Row = {
  group: string;
  initial: string;
  bopomofo: string; // 官方對照，無對應則為空字串
  example: string; // 台羅語詞
  hanzi: string;
  mouthImg?: string; // 官方嘴型示意圖網址（目前只確認 p 這一個）
};

const ROWS: Row[] = [
  { group: '唇音', initial: 'p', bopomofo: 'ㄅ', example: 'po-lê', hanzi: '玻璃', mouthImg: 'https://tailo.moe.edu.tw/sam/sam1/2-1png/p.png' },
  { group: '唇音', initial: 'ph', bopomofo: 'ㄆ', example: 'phú-phú', hanzi: '殕殕', mouthImg: 'https://tailo.moe.edu.tw/sam/sam1/2-1_ph.png' },
  { group: '唇音', initial: 'b', bopomofo: '', example: 'a-bó', hanzi: '阿母', mouthImg: 'https://tailo.moe.edu.tw/sam/sam1/2-1_b.png' },
  { group: '唇音', initial: 'm', bopomofo: 'ㄇ', example: 'má-mah', hanzi: '媽媽', mouthImg: 'https://tailo.moe.edu.tw/sam/sam1/2-1_m.png' },
  { group: '舌尖音', initial: 't', bopomofo: 'ㄉ', example: 'to-á', hanzi: '刀仔', mouthImg: 'https://tailo.moe.edu.tw/sam/sam2/2-2_t.png' },
  { group: '舌尖音', initial: 'th', bopomofo: 'ㄊ', example: 'thô-á', hanzi: '桃仔', mouthImg: 'https://tailo.moe.edu.tw/sam/sam2/2-2_th.png' },
  { group: '舌尖音', initial: 'n', bopomofo: 'ㄋ', example: 'niau-á', hanzi: '貓仔', mouthImg: 'https://tailo.moe.edu.tw/sam/sam2/2-2_n.png' },
  { group: '舌尖音', initial: 'l', bopomofo: 'ㄌ', example: 'lo-so', hanzi: '囉嗦', mouthImg: 'https://tailo.moe.edu.tw/sam/sam2/2-2_l.png' },
  { group: '舌根音', initial: 'k', bopomofo: 'ㄍ', example: 'kî-kuài', hanzi: '奇怪', mouthImg: 'https://tailo.moe.edu.tw/sam/sam3/2-3_k.png' },
  { group: '舌根音', initial: 'kh', bopomofo: 'ㄎ', example: 'khe-kháu', hanzi: '溪口', mouthImg: 'https://tailo.moe.edu.tw/sam/sam3/2-3_kh.png' },
  { group: '舌根音', initial: 'g', bopomofo: '', example: 'gí-giân', hanzi: '語言', mouthImg: 'https://tailo.moe.edu.tw/sam/sam3/2-3_g.png' },
  { group: '舌根音', initial: 'ng', bopomofo: '', example: 'ngá-khì', hanzi: '雅氣', mouthImg: 'https://tailo.moe.edu.tw/sam/sam3/2-3_ng.png' },
  { group: '喉音', initial: 'h', bopomofo: 'ㄏ', example: 'hi-hua', hanzi: '虛華', mouthImg: 'https://tailo.moe.edu.tw/sam/sam4/2-4_h.png' },
  { group: '齒音', initial: 'ts', bopomofo: 'ㄗ', example: 'tsá-tsá', hanzi: '早早', mouthImg: 'https://tailo.moe.edu.tw/sam/sam5/2-5_ts.png' },
  { group: '齒音', initial: 'tsh', bopomofo: 'ㄘ', example: 'tsha-tshò', hanzi: '差錯', mouthImg: 'https://tailo.moe.edu.tw/sam/sam5/2-5_tsh.png' },
  { group: '齒音', initial: 's', bopomofo: 'ㄙ', example: 'só-sî', hanzi: '鎖匙', mouthImg: 'https://tailo.moe.edu.tw/sam/sam5/2-5_s.png' },
  { group: '齒音', initial: 'j', bopomofo: '', example: 'jû-hô', hanzi: '如何', mouthImg: 'https://tailo.moe.edu.tw/sam/sam5/2-5_j.png' },
];

const GROUPS = [
  { key: '唇音', color: '#E96B5A', soft: '#FBE4E0' },
  { key: '舌尖音', color: '#E8A93A', soft: '#FCEFD9' },
  { key: '舌根音', color: '#4E9B5D', soft: '#E4F1E6' },
  { key: '喉音', color: '#4A8FD1', soft: '#E1EEFB' },
  { key: '齒音', color: '#8A6FC9', soft: '#EBE4F7' },
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

const SIDEBAR_ITEMS = [
  { icon: iconPhonics, title: '拼音方案', key: 'plan' },
  { icon: iconInitials, title: '聲母學習', key: 'initials' },
  { icon: iconFinals, title: '韻母學習', key: 'finals' },
  { icon: iconPractice, title: '拼音練習', key: 'practice' },
  { icon: iconTone, title: '聲調練習', key: 'tone' },
  { icon: iconGame, title: '拼音遊戲', key: 'game' },
  { icon: iconLinks, title: '相關連結', key: 'links' },
];

type Mode = 'grid' | 'detail' | 'practice';

export default function PhonicsInitials({ onHome }: { onHome?: () => void }) {
  const [group, setGroup] = useState('唇音');
  const [mode, setMode] = useState<Mode>('grid');
  const [rowIndex, setRowIndex] = useState(0);

  const groupRows = ROWS.filter((r) => r.group === group);
  const activeColor = GROUPS.find((g) => g.key === group)!.color;
  const row = groupRows[rowIndex];

  function openLetter(idx: number) {
    setRowIndex(idx);
    setMode('detail');
  }

  function changeGroup(key: string) {
    setGroup(key);
    setRowIndex(0);
    setMode('grid');
  }

  const distractors = ROWS.filter((r) => r.initial !== row?.initial)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const practiceOptions = row ? [row, ...distractors].sort(() => Math.random() - 0.5) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EAF4EC] to-[#F3EFDD] p-3 md:p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between px-3 py-3 bg-white/70 backdrop-blur-sm rounded-2xl">
        <div className="flex items-center cursor-pointer" onClick={onHome}>
          <img src={logoMark} alt="泰宇出版｜台語互動學習網" className="h-8 w-auto" />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C5548]">
          <span className="cursor-pointer" onClick={onHome}>首頁</span>
          <span>互動遊戲</span>
          <span>學習記錄</span>
          <span>最新消息</span>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="w-full lg:w-56 shrink-0 bg-white/70 rounded-2xl p-3 flex flex-col gap-1.5">
          {SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                item.key === 'initials' ? 'bg-[#4E9B5D] text-white' : 'text-[#5C5548] hover:bg-[#F0EBDD]'
              }`}
            >
              <img src={item.icon} alt="" className="w-5 h-5 object-contain" />
              {item.title}
            </div>
          ))}
        </aside>

        <div className="flex-1 relative pb-24">
          <div className="flex items-end gap-2 mb-0 flex-wrap">
            <div className="bg-[#B98A55] text-white font-black text-lg px-6 py-3 rounded-t-2xl rounded-br-2xl shadow-sm">
              聲母學習
            </div>
            {GROUPS.map((g) => (
              <button
                key={g.key}
                onClick={() => changeGroup(g.key)}
                className="font-black text-sm px-5 py-2.5 rounded-t-xl transition-transform"
                style={{
                  background: g.key === group ? g.color : g.soft,
                  color: g.key === group ? 'white' : g.color,
                  transform: g.key === group ? 'translateY(0)' : 'translateY(4px)',
                }}
              >
                {g.key}
              </button>
            ))}
          </div>

          <div className="bg-[#FBF3E4] border-4 border-[#D8C49C] rounded-3xl rounded-tl-none p-6 md:p-10 min-h-[420px] relative">
            {mode === 'grid' && (
              <>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span style={{ color: activeColor }}>★</span>
                  <h2 className="font-black text-xl" style={{ color: activeColor }}>
                    {group}
                  </h2>
                  <span style={{ color: activeColor }}>★</span>
                </div>
                <div className="grid grid-cols-2 gap-5 max-w-xl mx-auto">
                  {groupRows.map((r, i) => (
                    <button
                      key={r.initial}
                      onClick={() => openLetter(i)}
                      className="bg-[#F1E4C8] hover:bg-[#EAD9B4] border-2 border-[#D8C49C] rounded-full py-6 text-3xl font-black text-[#5C4A2E] shadow-sm transition-colors"
                    >
                      {r.initial}
                    </button>
                  ))}
                </div>
                <p className="text-center text-xs text-[#8A7355] mt-8">
                  💡 小提示：點擊上方發音按鈕，開始學習聲母的正確發音與口訣！
                </p>
              </>
            )}

            {mode === 'detail' && row && (
              <div>
                <div className="flex items-start justify-between flex-wrap gap-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => speak(row.initial)}
                      className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center text-[#5C5548]"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    <div className="text-7xl font-black" style={{ color: activeColor }}>
                      {row.initial}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {row.bopomofo && (
                      <div className="text-center">
                        <div className="text-xs text-[#8A7355] mb-1">發音近似注意符號</div>
                        <div className="w-16 h-16 rounded-xl bg-white shadow flex items-center justify-center text-2xl font-black text-[#5C4A2E]">
                          {row.bopomofo}
                        </div>
                      </div>
                    )}
                    {row.mouthImg ? (
                      <img
                        src={row.mouthImg}
                        alt={`${row.initial} 嘴型示意圖`}
                        className="w-28 h-28 object-contain rounded-xl bg-white shadow p-1"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-28 h-28 rounded-xl bg-white shadow p-2">
                          <MouthShapeSvg group={row.group} />
                        </div>
                        <div className="text-[10px] text-[#8A7355] mt-1">簡化示意圖</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-[#D8C49C] my-6" />

                <div className="mb-2 text-sm font-black" style={{ color: activeColor }}>
                  ★ 口訣練習
                </div>
                <button
                  onClick={() => speak(`${row.initial} ${row.initial} ${row.initial} ${row.example}`)}
                  className="w-full text-left bg-white rounded-2xl px-6 py-5 text-2xl font-black text-[#5C4A2E] shadow-sm hover:shadow transition-shadow"
                >
                  {row.initial} {row.initial} {row.initial}　{row.hanzi}的 {row.initial}
                  <span className="text-sm font-normal text-[#8A7355] ml-3">（{row.example}）</span>
                </button>

                <div className="flex items-center justify-between mt-10 flex-wrap gap-3">
                  <button
                    disabled={rowIndex === 0}
                    onClick={() => setRowIndex((i) => i - 1)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" /> 上一個
                  </button>
                  <button
                    onClick={() => setMode('grid')}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> 回上層
                  </button>
                  <button
                    onClick={() => setMode('practice')}
                    className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-[#4A8FD1] text-white font-bold text-sm"
                  >
                    <Zap className="w-4 h-4" /> 小練習
                  </button>
                  <button
                    disabled={rowIndex === groupRows.length - 1}
                    onClick={() => setRowIndex((i) => i + 1)}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm disabled:opacity-40"
                  >
                    下一個 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {mode === 'practice' && row && (
              <div>
                <div className="inline-block bg-[#E96B5A] text-white text-xs font-black px-4 py-1.5 rounded-full mb-6">
                  聲母小練習
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center shrink-0">
                    <div className="text-6xl font-black text-[#5C4A2E]">{row.initial}</div>
                    <div className="text-sm text-[#8A7355] mt-1">（{row.group}）</div>
                  </div>
                  <div className="flex-1 w-full flex flex-col gap-3">
                    <div className="text-xs text-[#8A7355] mb-1">聽聽看，哪一個才是 {row.initial} 開頭？</div>
                    {practiceOptions.map((opt) => (
                      <button
                        key={opt.initial + opt.example}
                        onClick={() => speak(opt.example)}
                        className="flex items-center gap-3 border-2 border-dashed border-[#D8C49C] rounded-full px-5 py-3 font-black text-[#5C4A2E] hover:bg-white transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-[#8A7355]" />
                        {opt.example}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={() => setMode('detail')}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> 上一題
                  </button>
                  <button
                    onClick={() => setMode('grid')}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> 回上層
                  </button>
                  <button
                    disabled={rowIndex === groupRows.length - 1}
                    onClick={() => {
                      setRowIndex((i) => i + 1);
                      setMode('practice');
                    }}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-[#F1E4C8] text-[#5C4A2E] font-bold text-sm disabled:opacity-40"
                  >
                    下一題 <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <img
            src={charAhui}
            alt="陪讀角色"
            className="hidden md:block absolute -bottom-6 left-4 w-28 lg:w-36 drop-shadow-md pointer-events-none select-none"
          />
          <img
            src={bearDecor}
            alt="小老師熊"
            className="hidden md:block absolute -bottom-6 right-4 w-24 lg:w-32 drop-shadow-md pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}
