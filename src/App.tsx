import { useState } from 'react';
import HomePage from './components/HomePage';
import GamesHub from './components/games/GamesHub';
import Game1FoodMatch from './components/games/Game1FoodMatch';
import GamePlaceholder from './components/games/GamePlaceholder';
import { getNextGameKey } from './components/games/gamesData';

type View = 'home' | 'gamesHub' | `game${number}`;

function App() {
  const [view, setView] = useState<View>('home');

  const goToGame = (key: string) => setView(key as View);

  const goHome = () => setView('home');

  if (view === 'gamesHub') {
    return <GamesHub onSelectGame={goToGame} onHome={goHome} />;
  }

  if (view === 'game1') {
    return (
      <Game1FoodMatch
        onHome={goHome}
        onNext={() => {
          const next = getNextGameKey('game1');
          setView(next ? (next as View) : 'gamesHub');
        }}
      />
    );
  }

  const gameMatch = /^game(\d+)$/.exec(view);
  if (gameMatch) {
    const id = Number(gameMatch[1]);
    return (
      <GamePlaceholder
        gameId={id}
        onHome={goHome}
        onNext={() => {
          const next = getNextGameKey(`game${id}`);
          setView(next ? (next as View) : 'gamesHub');
        }}
      />
    );
  }

  return <HomePage onNavigateGames={() => setView('gamesHub')} />;
}

export default App;
