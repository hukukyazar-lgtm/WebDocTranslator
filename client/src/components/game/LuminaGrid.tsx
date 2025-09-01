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
  const gridWidth = 8; // Sabit grid genişliği - kelimeleri değiştirmeden kutu sayısını ayarlıyoruz
  
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

  // Grid'i oluştur - sadece gerekli satırları göster
  const gridRows = useMemo(() => {
    const rows: LetterState[][] = [];
    
    // Yapılan tahminler
    for (const guess of guesses) {
      rows.push(getGuessStates(guess));
    }
    
    // Mevcut tahmin (eğer oyun devam ediyorsa)
    if (!isGameOver && currentGuess !== undefined && guesses.length < maxGuesses) {
      const currentGuessStates: LetterState[] = [];
      const currentGuessUpper = currentGuess.toUpperCase();
      
      for (let i = 0; i < gridWidth; i++) {
        currentGuessStates.push({
          letter: i < currentGuessUpper.length ? currentGuessUpper[i] : '',
          state: 'empty'
        });
      }
      rows.push(currentGuessStates);
    }
    
    // Sadece 1-2 boş satır ekle, fazla değil
    const remainingRows = Math.min(2, maxGuesses - rows.length);
    for (let r = 0; r < remainingRows; r++) {
      const emptyRow: LetterState[] = [];
      for (let i = 0; i < gridWidth; i++) {
        emptyRow.push({ letter: '', state: 'empty' });
      }
      rows.push(emptyRow);
    }
    
    return rows;
  }, [word, guesses, currentGuess, maxGuesses, isGameOver]);

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
    <div className="flex flex-col items-center space-y-2" data-testid="lumina-grid">
      {gridRows.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex ${getSpacing()}`}>
          {row.map((cell, cellIndex) => {
            const isCurrentRow = rowIndex === guesses.length && !isGameOver;
            const hasLetter = cell.letter !== '';
            const isRevealed = rowIndex < guesses.length;
            
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`
                  ${getCellSize()}
                  border-2 rounded-lg 
                  flex items-center justify-center 
                  ${getTextSize()} font-black
                  transition-all duration-500 ease-in-out
                  ${getLetterStateClass(cell.state, hasLetter)}
                  ${isCurrentRow && hasLetter ? 'animate-bounce' : ''}
                  ${isRevealed ? 'animate-flip-in' : ''}
                  ${isCurrentRow ? 'ring-2 ring-white/30 ring-opacity-50' : ''}
                `}
                data-testid={`lumina-cell-${rowIndex}-${cellIndex}`}
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

LuminaGrid.displayName = 'LuminaGrid';