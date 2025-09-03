// Web Audio API kullanarak oyun ses efektleri
class AudioManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isEnabled: boolean = true;
  private volume: number = 0.7;
  public isInitialized: boolean = false;

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported:', error);
    }
  }

  // Programmatik ses üretimi - indirme gerektirmez
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<AudioBuffer> {
    return new Promise((resolve) => {
      if (!this.audioContext) throw new Error('Audio context not available');

      const sampleRate = this.audioContext.sampleRate;
      const frameCount = sampleRate * duration;
      const audioBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
      const channelData = audioBuffer.getChannelData(0);

      for (let i = 0; i < frameCount; i++) {
        const time = i / sampleRate;
        let sample = 0;

        switch (type) {
          case 'sine':
            sample = Math.sin(2 * Math.PI * frequency * time);
            break;
          case 'square':
            sample = Math.sin(2 * Math.PI * frequency * time) > 0 ? 1 : -1;
            break;
          case 'triangle':
            sample = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * time));
            break;
          case 'sawtooth':
            sample = 2 * (time * frequency - Math.floor(time * frequency + 0.5));
            break;
        }

        // Envelope (fade in/out) ekle
        const fadeTime = 0.01; // 10ms fade
        const fadeFrames = sampleRate * fadeTime;
        
        if (i < fadeFrames) {
          sample *= i / fadeFrames; // Fade in
        } else if (i > frameCount - fadeFrames) {
          sample *= (frameCount - i) / fadeFrames; // Fade out
        }

        channelData[i] = sample * 0.3; // Volume düşür
      }

      resolve(audioBuffer);
    });
  }

  // Karmaşık ses efektleri
  private async createComplexSound(config: {
    frequencies: number[];
    durations: number[];
    types?: OscillatorType[];
    effects?: string[];
  }): Promise<AudioBuffer> {
    if (!this.audioContext) throw new Error('Audio context not available');

    const totalDuration = config.durations.reduce((sum, dur) => sum + dur, 0);
    const sampleRate = this.audioContext.sampleRate;
    const frameCount = sampleRate * totalDuration;
    const audioBuffer = this.audioContext.createBuffer(1, frameCount, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    let currentFrame = 0;

    for (let i = 0; i < config.frequencies.length; i++) {
      const frequency = config.frequencies[i];
      const duration = config.durations[i];
      const type = config.types?.[i] || 'sine';
      const segmentFrames = sampleRate * duration;

      for (let j = 0; j < segmentFrames; j++) {
        if (currentFrame + j >= frameCount) break;

        const time = j / sampleRate;
        let sample = Math.sin(2 * Math.PI * frequency * time);

        // Efektler uygula
        if (config.effects?.includes('vibrato')) {
          sample *= (1 + 0.1 * Math.sin(2 * Math.PI * 5 * time)); // 5Hz vibrato
        }

        if (config.effects?.includes('decay')) {
          sample *= Math.exp(-time * 3); // Exponential decay
        }

        channelData[currentFrame + j] = sample * 0.2;
      }

      currentFrame += segmentFrames;
    }

    return audioBuffer;
  }

  async initialize() {
    if (!this.audioContext) return;

    try {
      // Kullanıcı etkileşimi sonrası audio context'i resume et
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Ses efektlerini oluştur
      await this.createGameSounds();
      this.isInitialized = true;
      console.log('Audio system initialized successfully');
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  private async createGameSounds() {
    if (!this.audioContext) return;

    // Klavye tıklama sesi - kısa yüksek ton
    this.sounds.set('keyPress', await this.createTone(800, 0.05, 'square'));

    // Doğru cevap - yükselen melodi
    this.sounds.set('success', await this.createComplexSound({
      frequencies: [523, 659, 784, 1047], // C-E-G-C major chord
      durations: [0.2, 0.2, 0.2, 0.4],
      types: ['sine', 'sine', 'sine', 'sine'],
      effects: ['vibrato']
    }));

    // Yanlış cevap - düşük buzzer
    this.sounds.set('error', await this.createComplexSound({
      frequencies: [200, 150, 100],
      durations: [0.15, 0.15, 0.3],
      types: ['square', 'square', 'square'],
      effects: ['decay']
    }));

    // Süre uyarısı - hızlı tik tak
    this.sounds.set('warning', await this.createTone(1000, 0.1, 'triangle'));

    // Süre bitti - uzun düşük ton
    this.sounds.set('timeUp', await this.createComplexSound({
      frequencies: [150, 120, 100],
      durations: [0.3, 0.3, 0.6],
      types: ['sawtooth', 'sawtooth', 'sawtooth'],
      effects: ['decay']
    }));

    // Kelime tamamlandı - kısa çan sesi
    this.sounds.set('wordComplete', await this.createComplexSound({
      frequencies: [1047, 1319, 1568], // C-E-G oktav üzeri
      durations: [0.1, 0.1, 0.3],
      types: ['sine', 'sine', 'sine'],
      effects: ['vibrato', 'decay']
    }));

    // Oyun başlangıcı - yükselen arpej
    this.sounds.set('gameStart', await this.createComplexSound({
      frequencies: [261, 329, 392, 523], // C-E-G-C arpej
      durations: [0.1, 0.1, 0.1, 0.3],
      types: ['sine', 'sine', 'sine', 'sine']
    }));

    // Seviye atlama - zafer fanfarı
    this.sounds.set('levelUp', await this.createComplexSound({
      frequencies: [523, 659, 784, 1047, 1319], // Zafer melodisi
      durations: [0.15, 0.15, 0.15, 0.15, 0.4],
      types: ['sine', 'sine', 'sine', 'sine', 'sine'],
      effects: ['vibrato']
    }));
  }

  async playSound(soundName: string, volumeMultiplier: number = 1) {
    if (!this.isEnabled || !this.audioContext || !this.sounds.has(soundName)) {
      return;
    }

    try {
      const audioBuffer = this.sounds.get(soundName)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = audioBuffer;
      gainNode.gain.value = this.volume * volumeMultiplier;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error);
    }
  }

  // Sesli geri bildirim
  async playKeyPress() {
    await this.playSound('keyPress', 0.3);
  }

  async playSuccess() {
    await this.playSound('success', 0.8);
  }

  async playError() {
    await this.playSound('error', 0.6);
  }

  async playWarning() {
    await this.playSound('warning', 0.5);
  }

  async playTimeUp() {
    await this.playSound('timeUp', 0.9);
  }

  async playWordComplete() {
    await this.playSound('wordComplete', 0.7);
  }

  async playGameStart() {
    await this.playSound('gameStart', 0.6);
  }

  async playLevelUp() {
    await this.playSound('levelUp', 0.8);
  }

  // Ayarlar
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  isAudioEnabled(): boolean {
    return this.isEnabled && !!this.audioContext;
  }
}

// Singleton instance
export const audioManager = new AudioManager();

// Kullanıcı etkileşimi sonrası başlatma helper'ı
export const initializeAudio = async () => {
  await audioManager.initialize();
};