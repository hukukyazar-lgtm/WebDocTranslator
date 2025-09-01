import { memo, useMemo } from 'react';

interface LingoGridProps {
  word: string;
  guesses: string[];
  currentGuess: string;
  maxGuesses: number;
  isGameOver: boolean;
}

interface LetterState {
  letter: string;
  state: 'correct' | 'present' | 'absent' | 'empty';
}

export const LingoGrid = memo<LingoGridProps>(({ word, guesses, currentGuess, maxGuesses, isGameOver }) => {
  const wordLength = word.length;
  
  // Lingo renk kodlaması ve animasyonlar
  const getLetterStateClass = (state: LetterState['state'], hasLetter: boolean) => {
    const baseClasses = hasLetter 
      ? 'transform scale-110 shadow-lg' 
      : '';
      
    switch (state) {
      case 'correct':
        return `bg-green-500 text-white border-green-600 animate-pulse shadow-green-500/50 ${baseClasses}`; // Doğru pozisyon
      case 'present':
        return `bg-yellow-500 text-white border-yellow-600 animate-pulse shadow-yellow-500/50 ${baseClasses}`; // Yanlış pozisyon ama kelimede var
      case 'absent':
        return `bg-gray-500 text-white border-gray-600 shadow-gray-500/30 ${baseClasses}`; // Kelimede yok
      case 'empty':
        return `bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/40 ${baseClasses}`; // Boş
      default:
        return `bg-white/10 text-white border-white/20 ${baseClasses}`;
    }
  };

  // Bir tahminin harflerinin durumunu hesapla
  const getGuessStates = (guess: string): LetterState[] => {
    const targetWord = word.toUpperCase();
    const guessWord = guess.toUpperCase().padEnd(wordLength, ' ');
    const result: LetterState[] = [];

    // İlk önce exact matches'ı bul
    const targetLetters = targetWord.split('');
    const usedTargetIndices = new Set<number>();

    for (let i = 0; i < wordLength; i++) {
      if (guessWord[i] === targetLetters[i]) {
        result[i] = { letter: guessWord[i], state: 'correct' };
        usedTargetIndices.add(i);
      } else {
        result[i] = { letter: guessWord[i], state: 'absent' };
      }
    }

    // Sonra present letters'ı bul
    for (let i = 0; i < wordLength; i++) {
      if (result[i].state === 'absent' && guessWord[i] !== ' ') {
        // Bu harfin target word'de başka bir yerde olup olmadığını kontrol et
        for (let j = 0; j < targetLetters.length; j++) {
          if (!usedTargetIndices.has(j) && targetLetters[j] === guessWord[i]) {
            result[i].state = 'present';
            usedTargetIndices.add(j);
            break;
          }
        }
      }
    }

    return result;
  };

  // Grid'i oluştur
  const gridRows = useMemo(() => {
    const rows: LetterState[][] = [];
    
    // Yapılan tahminler
    for (const guess of guesses) {
      rows.push(getGuessStates(guess));
    }
    
    // Mevcut tahmin (eğer oyun devam ediyorsa)
    if (!isGameOver && currentGuess !== undefined && guesses.length < maxGuesses) {
      const currentGuessStates: LetterState[] = [];
      const paddedCurrentGuess = currentGuess.toUpperCase().padEnd(wordLength, ' ');
      
      for (let i = 0; i < wordLength; i++) {
        currentGuessStates.push({
          letter: paddedCurrentGuess[i] === ' ' ? '' : paddedCurrentGuess[i],
          state: 'empty'
        });
      }
      rows.push(currentGuessStates);
    }
    
    // Boş satırlar
    while (rows.length < maxGuesses) {
      const emptyRow: LetterState[] = [];
      for (let i = 0; i < wordLength; i++) {
        emptyRow.push({ letter: '', state: 'empty' });
      }
      rows.push(emptyRow);
    }
    
    return rows;
  }, [word, guesses, currentGuess, maxGuesses, isGameOver]);

  return (
    <div className="flex flex-col items-center space-y-2" data-testid="lingo-grid">
      {gridRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((cell, cellIndex) => {
            const isCurrentRow = rowIndex === guesses.length && !isGameOver;
            const hasLetter = cell.letter !== '';
            const isRevealed = rowIndex < guesses.length;
            
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`
                  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
                  border-2 rounded-lg 
                  flex items-center justify-center 
                  text-lg sm:text-xl md:text-2xl font-black
                  transition-all duration-500 ease-in-out
                  ${getLetterStateClass(cell.state, hasLetter)}
                  ${isCurrentRow && hasLetter ? 'animate-bounce' : ''}
                  ${isRevealed ? 'animate-flip-in' : ''}
                  ${isCurrentRow ? 'ring-2 ring-white/30 ring-opacity-50' : ''}
                `}
                data-testid={`lingo-cell-${rowIndex}-${cellIndex}`}
                style={{
                  animationDelay: isRevealed ? `${cellIndex * 100}ms` : '0ms'
                }}
              >
                <span className={`${isCurrentRow && hasLetter ? 'animate-pulse' : ''}`}>
                  {cell.letter}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

LingoGrid.displayName = 'LingoGrid';