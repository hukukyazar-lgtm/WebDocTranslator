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

    // Kelime uzunluğu kadar döngü - sadece kelime uzunluğu kadar kutu
    for (let i = 0; i < wordLength; i++) {
      const guessLetter = i < guessWord.length ? guessWord[i] : '';
      const targetLetter = targetLetters[i];

      if (guessLetter === targetLetter && guessLetter !== '') {
        result[i] = { letter: guessLetter, state: 'correct' };
        usedTargetIndices.add(i);
      } else {
        result[i] = { letter: guessLetter, state: guessLetter === '' ? 'empty' : 'absent' };
      }
    }

    // Sonra present letters'ı bul
    for (let i = 0; i < wordLength; i++) {
      if (result[i].state === 'absent' && result[i].letter !== '') {
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
      
      for (let i = 0; i < wordLength; i++) {
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
      for (let i = 0; i < wordLength; i++) {
        emptyRow.push({ letter: '', state: 'empty' });
      }
      rows.push(emptyRow);
    }
    
    return rows;
  }, [word, guesses, currentGuess, maxGuesses, isGameOver]);

  // Kelime uzunluğuna göre dinamik boyutlandırma
  const getCellSize = () => {
    if (wordLength <= 4) return 'w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18'; // Küçük kelimeler için büyük kutucuklar
    if (wordLength <= 6) return 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16'; // Orta kelimeler 
    if (wordLength <= 8) return 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'; // Uzun kelimeler
    return 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'; // Çok uzun kelimeler için küçük kutucuklar
  };

  const getTextSize = () => {
    if (wordLength <= 4) return 'text-xl sm:text-2xl md:text-3xl';
    if (wordLength <= 6) return 'text-lg sm:text-xl md:text-2xl';
    if (wordLength <= 8) return 'text-base sm:text-lg md:text-xl';
    return 'text-sm sm:text-base md:text-lg';
  };

  const getSpacing = () => {
    if (wordLength <= 4) return 'space-x-3';
    if (wordLength <= 6) return 'space-x-2';
    if (wordLength <= 8) return 'space-x-1.5';
    return 'space-x-1';
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