import { GameShell } from './GameShell';
import { charDad } from '../../assets/images/characters';
import { game6Hero } from '../../assets/images/games';
import { QuizPanel, useQuizEngine, type QuizQuestion } from './QuizPanel';

const QUESTIONS: QuizQuestion[] = [
  {
    prompt: '女伴：「遮 ê 溫泉氣氛真好，你欲袂欲來去泡湯？」',
    subPrompt: '請選擇最適合的回應：',
    options: [
      { label: '好啊！我正想欲鬆一下。', correct: true },
      { label: '我嘛欲去食宵夜，你欲食啥物？', correct: false },
      { label: '恁遮是啥物所在？閣有幾遠？', correct: false },
      { label: '我足會曉驚熱，可能毋適合。', correct: false },
    ],
  },
  {
    prompt: '女伴：「你捌泡過海景溫泉無？」',
    subPrompt: '請選擇最適合的回應：',
    options: [
      { label: '毋捌，這是我第一改來。', correct: true },
      { label: '我欲去買東西。', correct: false },
      { label: '這附近有食堂無？', correct: false },
      { label: '我袂曉游泳。', correct: false },
    ],
  },
  {
    prompt: '女伴：「月娘遮爾媠，欲毋欲紮相機來翕相？」',
    subPrompt: '請選擇最適合的回應：',
    options: [
      { label: '我無紮相機，用手機仔翕就好。', correct: true },
      { label: '我肚子枵矣。', correct: false },
      { label: '這馬幾點矣？', correct: false },
      { label: '溫泉遐燒，我驚燙著。', correct: false },
    ],
  },
  {
    prompt: '女伴：「泡了了後，欲毋欲鬥陣去食寡宵夜？」',
    subPrompt: '請選擇最適合的回應：',
    options: [
      { label: '好啊，我嘛有淡薄仔枵矣。', correct: true },
      { label: '我明仔載才欲來。', correct: false },
      { label: '我毋捌聽過遮的代誌。', correct: false },
      { label: '這是啥物聲音？', correct: false },
    ],
  },
];

export default function Game6HotSpring({ onNext, onHome, onGamesHub, onPhonics }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void; onPhonics?: () => void }) {
  const engine = useQuizEngine(QUESTIONS, 100);

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} onPhonics={onPhonics} mascotSrc={charDad}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game6Hero} alt="第6款 月夜溫泉對話任務" className="w-full h-auto block" />
      </div>
      <QuizPanel engine={engine} onFinish={onNext} accentColor="#3E6FA8" progressLabel="章節進度" />
    </GameShell>
  );
}
