// Basit HTML5 Audio API ses sistemi
class SimpleAudioManager {
  private isEnabled = true;
  private volume = 0.5;

  // Programmatik ses oluşturma
  private createBeep(frequency: number = 440, duration: number = 100): HTMLAudioElement {
    // Data URL ile ses oluştur
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);

    // HTML Audio element döndür
    const audio = new Audio();
    audio.volume = this.volume;
    return audio;
  }

  // Basit click sesi
  playClick() {
    if (!this.isEnabled) return;
    
    try {
      // Kısa beep sesi
      const audio = new Audio();
      audio.volume = 0.3;
      
      // Data URL ile tek frekanslı ses
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'square';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
      
      console.log('🔊 Click sound played');
    } catch (error) {
      // Sessizce başarısız ol
      console.warn('Audio not available');
    }
  }

  // Başarı sesi
  playSuccess() {
    if (!this.isEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // C-E-G arpeji
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      
      frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);
        gain.gain.setValueAtTime(0.15, audioContext.currentTime + index * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.3);
        
        osc.start(audioContext.currentTime + index * 0.15);
        osc.stop(audioContext.currentTime + index * 0.15 + 0.3);
      });
      
      console.log('🎵 Success sound played');
    } catch (error) {
      console.warn('Audio not available');
    }
  }

  // Hata sesi
  playError() {
    if (!this.isEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.frequency.setValueAtTime(200, audioContext.currentTime);
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      osc.start();
      osc.stop(audioContext.currentTime + 0.5);
      
      console.log('❌ Error sound played');
    } catch (error) {
      console.warn('Audio not available');
    }
  }

  // Uyarı sesi
  playWarning() {
    if (!this.isEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Titreşimli uyarı
      for (let i = 0; i < 3; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(600, audioContext.currentTime + i * 0.2);
        gain.gain.setValueAtTime(0.1, audioContext.currentTime + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.2 + 0.1);
        
        osc.start(audioContext.currentTime + i * 0.2);
        osc.stop(audioContext.currentTime + i * 0.2 + 0.1);
      }
      
      console.log('⚠️ Warning sound played');
    } catch (error) {
      console.warn('Audio not available');
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

export const simpleAudio = new SimpleAudioManager();