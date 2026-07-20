import { GameShell } from './GameShell';
import { GameHeader } from './GameHeader';
import { QuizPanel, useQuizEngine, type QuizQuestion } from './QuizPanel';
import { speakTaiyu } from '../../lib/speech';

const QUESTIONS: QuizQuestion[] = [
  {
    prompt: '「鹽酥雞，一包三十，卡緊來喔！」聽起來是咧賣啥物？',
    subPrompt: '聽叫賣，選出正確的商品',
    options: [
      { label: '鹽酥雞', correct: true },
      { label: '香腸', correct: false },
      { label: '珍珠奶茶', correct: false },
      { label: '地瓜球', correct: false },
    ],
  },
  {
    prompt: '「香腸頭，香腸頭，一支二十喔！」是咧賣啥物？',
    options: [
      { label: '雞排', correct: false },
      { label: '香腸', correct: true },
      { label: '地瓜球', correct: false },
      { label: '蚵仔煎', correct: false },
    ],
  },
  {
    prompt: '「珍珠奶茶，真濃真好喝，來一杯喔！」是咧賣啥物？',
    options: [
      { label: '青草茶', correct: false },
      { label: '豆花', correct: false },
      { label: '珍珠奶茶', correct: true },
      { label: '甘蔗汁', correct: false },
    ],
  },
  {
    prompt: '「地瓜球，QQ甜甜，一包二十五！」是咧賣啥物？',
    options: [
      { label: '雞蛋糕', correct: false },
      { label: '地瓜球', correct: true },
      { label: '麻糬', correct: false },
      { label: '車輪餅', correct: false },
    ],
  },
  {
    prompt: '「大腸包小腸，澎湃夠味，欲食無？」是咧賣啥物？',
    options: [
      { label: '大腸包小腸', correct: true },
      { label: '筒仔米糕', correct: false },
      { label: '肉圓', correct: false },
      { label: '蔥油餅', correct: false },
    ],
  },
  {
    prompt: '「臭豆腐，外酥內軟，燒燙燙上桌！」是咧賣啥物？',
    options: [
      { label: '鹹酥雞', correct: false },
      { label: '蚵仔煎', correct: false },
      { label: '臭豆腐', correct: true },
      { label: '碳烤玉米', correct: false },
    ],
  },
];

export default function Game2NightMarket({ onNext, onHome }: { onNext: () => void; onHome?: () => void }) {
  const engine = useQuizEngine(QUESTIONS, 120);

  return (
    <GameShell onHome={onHome}>
      <GameHeader
        stageNumber={2}
        title="夜市叫賣大挑戰"
        subtitle="聽夜市叫賣台語，成為最強叫賣高手！"
        onSpeakQuestion={() => {
          if (engine.q) {
            speakTaiyu(engine.q.prompt);
          }
        }}
      />
      <QuizPanel engine={engine} onFinish={onNext} accentColor="#C6501F" progressLabel="關卡進度" />
    </GameShell>
  );
}
