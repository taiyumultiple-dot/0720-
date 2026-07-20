import { GameShell } from './GameShell';
import { charMom } from '../../assets/images/characters';
import { game3Hero } from '../../assets/images/games';
import { QuizPanel, useQuizEngine, type QuizQuestion } from './QuizPanel';

const QUESTIONS: QuizQuestion[] = [
  {
    prompt: '咱對藍田海邊出發，欲去藍田老街，應該向佗位行？',
    subPrompt: '第 1 站：藍田老街',
    options: [
      { label: '向老街行', tailo: 'ǹg lāu-ke kiânn', correct: true },
      { label: '向海邊行', tailo: 'ǹg hái-pinn kiânn', correct: false },
      { label: '向山頂行', tailo: 'ǹg suann-tíng kiânn', correct: false },
      { label: '向溫泉行', tailo: 'ǹg un-tsuânn kiânn', correct: false },
    ],
  },
  {
    prompt: '離開老街，欲去頂藍田小村，應該向佗位行？',
    subPrompt: '第 2 站：頂藍田小村',
    options: [
      { label: '向海邊行', correct: false },
      { label: '向溫泉行', correct: false },
      { label: '向山頂行', correct: true },
      { label: '向燈塔行', correct: false },
    ],
  },
  {
    prompt: '對小村欲去藍田燈塔，應該向佗位行？',
    subPrompt: '第 3 站：藍田燈塔',
    options: [
      { label: '向燈塔行', correct: true },
      { label: '向老街行', correct: false },
      { label: '向溫泉行', correct: false },
      { label: '向步道行', correct: false },
    ],
  },
  {
    prompt: '咱欲去泡溫泉，應該向佗位行較近？',
    subPrompt: '第 4 站：藍田溫泉',
    options: [
      { label: '向老街行', correct: false },
      { label: '向海邊行', correct: false },
      { label: '向山頂行', correct: false },
      { label: '向溫泉行', correct: true },
    ],
  },
  {
    prompt: '上尾一站欲去觀海步道，應該向佗位行？',
    subPrompt: '第 5 站：觀海步道',
    options: [
      { label: '向步道行', correct: true },
      { label: '向燈塔行', correct: false },
      { label: '向老街行', correct: false },
      { label: '向溫泉行', correct: false },
    ],
  },
];

export default function Game3BlueField({ onNext, onHome, onGamesHub, onPhonics }: { onNext: () => void; onHome?: () => void; onGamesHub?: () => void; onPhonics?: () => void }) {
  const engine = useQuizEngine(QUESTIONS, 150);

  return (
    <GameShell onHome={onHome} onGamesHub={onGamesHub} onPhonics={onPhonics} mascotSrc={charMom}>
      <div className="rounded-3xl overflow-hidden shadow-sm">
        <img src={game3Hero} alt="第3款 藍田小旅行" className="w-full h-auto block" />
      </div>
      <QuizPanel engine={engine} onFinish={onNext} accentColor="#3E6FA8" progressLabel="任務進度" />
    </GameShell>
  );
}
