import { GameShell } from './GameShell';
import { charAming } from '../../assets/images/characters';
import { game7Hero } from '../../assets/images/games';
import { QuizPanel, useQuizEngine, type QuizQuestion } from './QuizPanel';

const QUESTIONS: QuizQuestion[] = [
  {
    prompt: '你欲去金門出差，愛先去佗位辦理登機手續？',
    subPrompt: 'Lí beh khì Kim-mûn tshut-tsha, ài siann khì tò-uī pán-lí tang-ki khì-sok?',
    options: [
      { label: '行李提領處', tailo: 'Khìnn-lí thi-líng tshù', correct: false },
      { label: '安檢口', tailo: 'An-kiám-kháu', correct: false },
      { label: '報到櫃檯', tailo: 'Pò-tò kuī-tâi', correct: true },
      { label: '登機門口', tailo: 'Tang-ki mn̂g-kháu', correct: false },
    ],
  },
  {
    prompt: '落機了後，欲提行李，應該去佗位？',
    options: [
      { label: '行李提領處', tailo: 'Khìnn-lí thi-líng tshù', correct: true },
      { label: '報到櫃檯', correct: false },
      { label: '登機門口', correct: false },
      { label: '安檢口', correct: false },
    ],
  },
  {
    prompt: '欲入去管制區進前，愛先過佗位？',
    options: [
      { label: '登機門口', correct: false },
      { label: '安檢口', tailo: 'An-kiám-kháu', correct: true },
      { label: '行李提領處', correct: false },
      { label: '報到櫃檯', correct: false },
    ],
  },
  {
    prompt: '飛行機欲起飛矣，愛去佗位等待上機？',
    options: [
      { label: '報到櫃檯', correct: false },
      { label: '安檢口', correct: false },
      { label: '行李提領處', correct: false },
      { label: '登機門口', tailo: 'Tang-ki mn̂g-kháu', correct: true },
    ],
  },
];

export default function Game7Airport({ onNext, onHome, onGamesHub, onPhonics }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void; onPhonics?: () => void }) {
  const engine = useQuizEngine(QUESTIONS, 90);

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} onPhonics={onPhonics} mascotSrc={charAming}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game7Hero} alt="第7款 機場台語問答" className="w-full h-auto block" />
      </div>
      <QuizPanel engine={engine} onFinish={onNext} accentColor="#3E6FA8" progressLabel="配對進度" />
    </GameShell>
  );
}
