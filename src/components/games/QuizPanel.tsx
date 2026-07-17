import { useEffect, useState } from 'react';
import { Lightbulb, RotateCcw, ChevronRight, Trophy, Clock, Volume2 } from 'lucide-react';

export interface QuizQuestion {
  prompt: string;
  subPrompt?: string;
  options: { label: string; tailo?: string; correct?: boolean }[];
}

export function useQuizEngine(questions: QuizQuestion[], totalTime: number) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctFlash, setCorrectFlash] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [hints, setHints] = useState(3);

  const q = questions[step];
  const done = step >= questions.length;

  useEffect(() => {
    if (done || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [done, timeLeft]);

  const pick = (idx: number) => {
    if (picked !== null || done) return;
    setPicked(idx);
    const isCorrect = q.options[idx].correct;
    if (isCorrect) {
      setScore((s) => s + 50 + combo * 10);
      setCombo((c) => c + 1);
      setCorrectFlash(idx);
    } else {
      setCombo(0);
    }
    setTimeout(() => {
      setPicked(null);
      setCorrectFlash(null);
      if (isCorrect) setStep((s) => s + 1);
    }, 700);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setCombo(0);
    setPicked(null);
    setTimeLeft(totalTime);
    setHints(3);
  };

  const useHint = (onReveal: (correctIdx: number) => void) => {
    if (hints <= 0 || done) return;
    setHints((h) => h - 1);
    onReveal(q.options.findIndex((o) => o.correct));
  };

  return { step, q, done, score, combo, picked, correctFlash, timeLeft, hints, pick, restart, useHint, total: questions.length };
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export function QuizPanel({
  engine,
  onFinish,
  accentColor = '#4E9B5D',
  progressLabel = '關卡進度',
}: {
  engine: ReturnType<typeof useQuizEngine>;
  onFinish: () => void;
  accentColor?: string;
  progressLabel?: string;
}) {
  const { step, q, done, score, timeLeft, hints, picked, correctFlash, pick, restart, useHint, total } = engine;
  const [hintIdx, setHintIdx] = useState<number | null>(null);

  if (done) {
    return (
      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-10 flex-1 flex flex-col items-center justify-center text-center gap-3">
        <Trophy className="w-10 h-10 text-[#F2B84B]" />
        <h3 className="font-black text-[#2D2A26] text-xl">全部答對啦！目前分數 {score} 分</h3>
        <p className="text-sm text-[#8A8378]">準備好就前往下一關吧！</p>
        <button
          onClick={onFinish}
          className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E4772E] text-white font-bold text-sm hover:bg-[#CC6620] transition-colors"
        >
          下一關 <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-4 md:p-5 flex items-center gap-6 flex-wrap text-sm font-bold text-[#5C5548]">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4" style={{ color: accentColor }} /> 目前分數{' '}
          <span className="text-[#2D2A26]">{score} 分</span>
        </span>
        <span className="flex items-center gap-2">
          {progressLabel}
          <span className="w-40 h-2 rounded-full bg-[#EFE8D8] overflow-hidden inline-block">
            <span
              className="h-full block transition-all"
              style={{ width: `${(step / total) * 100}%`, backgroundColor: accentColor }}
            />
          </span>
          <span className="text-[#2D2A26]">{step} / {total}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" style={{ color: accentColor }} /> 剩餘時間{' '}
          <span className="text-[#2D2A26]">{formatTime(timeLeft)}</span>
        </span>
      </div>

      <div className="bg-[#FDFBF6] rounded-3xl shadow-lg p-5 md:p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="text-lg font-black text-[#2D2A26] flex items-center gap-2">
            <Volume2 className="w-5 h-5" style={{ color: accentColor }} />
            {q.prompt}
          </div>
          {q.subPrompt && <div className="text-sm text-[#8A8378] mt-1">{q.subPrompt}</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {q.options.map((opt, idx) => {
            const isPicked = picked === idx;
            const isCorrectFlash = correctFlash === idx;
            const isWrongPicked = isPicked && !opt.correct;
            const isHinted = hintIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => pick(idx)}
                disabled={picked !== null}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  isCorrectFlash
                    ? 'border-[#4E9B5D] bg-[#EAF6EC]'
                    : isWrongPicked
                    ? 'border-red-400 bg-red-50'
                    : isHinted
                    ? 'border-[#F2B84B] bg-[#FFF7E0]'
                    : 'border-[#EFE8D8] bg-white hover:border-[#4E9B5D]'
                }`}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: accentColor }}
                >
                  {LETTERS[idx]}
                </span>
                <span className="flex-1">
                  <div className="font-bold text-[#2D2A26] text-sm">{opt.label}</div>
                  {opt.tailo && <div className="text-xs text-[#8A8378]">{opt.tailo}</div>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <button
          onClick={() =>
            useHint((idx) => {
              setHintIdx(idx);
              setTimeout(() => setHintIdx(null), 1500);
            })
          }
          disabled={hints <= 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-bold text-sm disabled:opacity-40 transition-colors"
          style={{ backgroundColor: accentColor }}
        >
          <Lightbulb className="w-4 h-4" /> 提示 <span className="bg-white/25 rounded-full px-1.5">{hints}</span>
        </button>
        <button
          onClick={restart}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8A8378] text-white font-bold text-sm hover:bg-[#736C60] transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> 重新開始
        </button>
      </div>
    </>
  );
}
