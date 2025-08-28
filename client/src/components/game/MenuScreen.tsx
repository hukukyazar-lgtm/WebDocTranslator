import { memo, useState } from 'react';
import { wordLists } from '@/lib/wordLists';

export interface GameSettings {
  category: string;
  difficulty: number;
}

interface MenuScreenProps {
  onStartGame: (settings: GameSettings) => void;
}

export const MenuScreen = memo(({ onStartGame }: MenuScreenProps) => {
  const [category, setCategory] = useState("Hayvanlar");
  const [difficulty, setDifficulty] = useState(3);

  const handleStartGame = () => {
    onStartGame({ category, difficulty });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6 p-6 text-center game-card rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          WordSpin Pro
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Kelimeyi 30 saniyede yakala!
        </p>
        
        <div className="w-full">
          <div className="w-full p-4 mt-4 bg-muted/30 rounded-lg">
            <h3 className="mb-4 text-2xl font-bold text-foreground">Oyun Ayarları</h3>
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <label htmlFor="category" className="block mb-2 font-medium text-muted-foreground">
                  Kategori
                </label>
                <select 
                  id="category" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  className="w-full p-2 text-foreground bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="select-category"
                >
                  {Object.keys(wordLists).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="difficulty" className="block mb-2 font-medium text-muted-foreground">
                  Zorluk: <span className="font-bold text-accent">{difficulty}</span>
                </label>
                <input 
                  id="difficulty" 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={difficulty} 
                  onChange={e => setDifficulty(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  data-testid="slider-difficulty"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full px-8 py-4 mt-6 text-lg font-bold text-primary-foreground transition-transform transform bg-primary rounded-lg shadow-xl hover:bg-primary/90 hover:scale-105"
            data-testid="button-start-game"
          >
            Oyuna Başla
          </button>
        </div>
      </div>
    </div>
  );
});

MenuScreen.displayName = 'MenuScreen';
