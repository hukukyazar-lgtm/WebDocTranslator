import { memo, useMemo } from 'react';

interface LuminaGridProps {
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

export const LuminaGrid = memo<LuminaGridProps>(({ word, guesses, currentGuess, maxGuesses, isGameOver }) => {
  const wordLength = word.length;
  const gridWidth = wordLength; // Kelime uzunluğuna eşit kutu sayısı
  
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
    const guessWord = guess.toUpperCase();
    const result: LetterState[] = [];

    // İlk önce exact matches'ı bul
    const targetLetters = targetWord.split('');
    const usedTargetIndices = new Set<number>();

    // Sabit grid genişliği kadar döngü
    for (let i = 0; i < gridWidth; i++) {
      const guessLetter = i < guessWord.length ? guessWord[i] : '';
      const targetLetter = i < targetLetters.length ? targetLetters[i] : '';

      if (i < wordLength && guessLetter === targetLetter && guessLetter !== '') {
        result[i] = { letter: guessLetter, state: 'correct' };
        usedTargetIndices.add(i);
      } else if (i < wordLength && guessLetter !== '') {
        result[i] = { letter: guessLetter, state: 'absent' };
      } else {
        result[i] = { letter: guessLetter, state: 'empty' };
      }
    }

    // Sonra present letters'ı bul
    for (let i = 0; i < gridWidth; i++) {
      if (i < wordLength && result[i].state === 'absent' && result[i].letter !== '') {
        // Bu harfin target word'de başka bir yerde olup olmadığını kontrol et
        for (let j = 0; j < targetLetters.length; j++) {
          if (!usedTargetIndices.has(j) && targetLetters[j] === result[i].letter) {
            result[i].state = 'present';
            usedTargetIndices.add(j);
            break;
          }
        }
      }
    }

    return result;
  };

  // Tek satır grid - sadece mevcut tahmin
  const currentRow = useMemo(() => {
    const currentGuessStates: LetterState[] = [];
    const currentGuessUpper = (currentGuess || '').toUpperCase();
    
    for (let i = 0; i < gridWidth; i++) {
      currentGuessStates.push({
        letter: i < currentGuessUpper.length ? currentGuessUpper[i] : '',
        state: 'empty'
      });
    }
    
    return currentGuessStates;
  }, [currentGuess, gridWidth]);

  // Sabit grid boyutlandırması - 8 kutucuk
  const getCellSize = () => {
    return 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'; // Sabit boyut
  };

  const getTextSize = () => {
    return 'text-base sm:text-lg md:text-xl'; // Sabit metin boyutu
  };

  const getSpacing = () => {
    return 'space-x-1.5'; // Sabit aralık
  };

  return (
    <div className="flex flex-col items-center" data-testid="lumina-grid">
      <div className={`flex ${getSpacing()}`}>
        {currentRow.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={`
              ${getCellSize()}
              ${getLetterStateClass(cell.state, cell.letter !== '')}
              ${getTextSize()}
              font-bold uppercase border-2 rounded-lg
              flex items-center justify-center
              transition-all duration-300 ease-in-out
              select-none
              ${cell.letter ? 'animate-flip-in' : ''}
            `}
            data-testid={`grid-cell-${cellIndex}`}
          >
            {cell.letter}
          </div>
        ))}
      </div>
    </div>
  );
});

LuminaGrid.displayName = 'LuminaGrid';