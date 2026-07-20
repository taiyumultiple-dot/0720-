import { useState } from 'react';
import HomePage from './components/HomePage';
import GamesHub from './components/games/GamesHub';
import Game1FoodMatch from './components/games/Game1FoodMatch';
import Game2NightMarket from './components/games/Game2NightMarket';
import Game3BlueField from './components/games/Game3BlueField';
import Game4BeachHunt from './components/games/Game4BeachHunt';
import Game5TransportPuzzle from './components/games/Game5TransportPuzzle';
import Game6HotSpring from './components/games/Game6HotSpring';
import Game7Airport from './components/games/Game7Airport';
import Game8StoryOrder from './components/games/Game8StoryOrder';
import Game9DeerVocab from './components/games/Game9DeerVocab';
import Game10Souvenirs from './components/games/Game10Souvenirs';
import PhonicsInitials from './components/phonics/PhonicsInitials';
import { getNextGameKey } from './components/games/gamesData';

type View = 'home' | 'gamesHub' | 'phonics' | `game${number}`;

function App() {
  const [view, setView] = useState<View>('home');

  const goToGame = (key: string) => setView(key as View);
  const goHome = () => setView('home');
  const goHub = () => setView('gamesHub');
  const goPhonics = () => setView('phonics');
  const goNext = (fromKey: string) => {
    const next = getNextGameKey(fromKey);
    setView(next ? (next as View) : 'gamesHub');
  };

  if (view === 'gamesHub') return <GamesHub onSelectGame={goToGame} onHome={goHome} onPhonics={goPhonics} />;
  if (view === 'phonics') return <PhonicsInitials onHome={goHome} />;

  if (view === 'game1') return <Game1FoodMatch onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game1')} />;
  if (view === 'game2') return <Game2NightMarket onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game2')} />;
  if (view === 'game3') return <Game3BlueField onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game3')} />;
  if (view === 'game4') return <Game4BeachHunt onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game4')} />;
  if (view === 'game5') return <Game5TransportPuzzle onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game5')} />;
  if (view === 'game6') return <Game6HotSpring onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game6')} />;
  if (view === 'game7') return <Game7Airport onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game7')} />;
  if (view === 'game8') return <Game8StoryOrder onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game8')} />;
  if (view === 'game9') return <Game9DeerVocab onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game9')} />;
  if (view === 'game10') return <Game10Souvenirs onHome={goHome} onGamesHub={goHub} onPhonics={goPhonics} onNext={() => goNext('game10')} />;

  return <HomePage onNavigateGames={goHub} onNavigatePhonics={goPhonics} />;
}

export default App;
