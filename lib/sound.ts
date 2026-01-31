import { Howl, Howler } from "howler";

const CLICK_SOUND_URL = "/sounds/click.mp3";

class AudioController {
  private static instance: AudioController;
  private sound: Howl;
  private unlocked: boolean = false;
  private muted: boolean = false;
  private globalVolume: number = 0.6;

  private constructor() {
    this.sound = new Howl({
      src: [CLICK_SOUND_URL],
      preload: true,
      volume: 0.6,
      html5: false,
      autoplay: false,
      pool: 10,
    });
  }

  public static getInstance(): AudioController {
    if (!AudioController.instance) {
      AudioController.instance = new AudioController();
    }
    return AudioController.instance;
  }

  public unlock() {
    if (this.unlocked) return;

    // Try to unlock immediately (if we are in a user gesture)
    this.attemptUnlock();

    // Also attach global listeners in case we aren't yet
    const unlockHandler = () => {
      this.attemptUnlock();
      if (this.unlocked) {
          this.removeListeners(unlockHandler);
      }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('touchstart', unlockHandler, { passive: false });
        window.addEventListener('click', unlockHandler);
        window.addEventListener('keydown', unlockHandler);
    }
  }

  private attemptUnlock() {
      if (this.unlocked) return;

      if (Howler.ctx && Howler.ctx.state !== 'running') {
        Howler.ctx.resume().then(() => {
          this.unlocked = true;
          this.playSilent();
        });
      } else if (!Howler.ctx) {
          // If no context yet (not initialized), playing a sound usually initializes it
          this.playSilent();
          this.unlocked = true;
      } else if (Howler.ctx.state === 'running') {
          this.unlocked = true;
      }
  }

  private removeListeners(handler: () => void) {
      if (typeof window !== 'undefined') {
          window.removeEventListener('touchstart', handler);
          window.removeEventListener('click', handler);
          window.removeEventListener('keydown', handler);
      }
  }

  private playSilent() {
      // Play a silent sound to warm up the buffer
      const id = this.sound.play();
      this.sound.volume(0, id);
      setTimeout(() => {
          this.sound.stop(id);
      }, 50);
  }

  public play() {
    if (this.muted) return;

    // Safety check
    if (!this.unlocked) this.attemptUnlock();

    const id = this.sound.play();
    this.sound.volume(this.globalVolume, id);
  }

  public setVolume(vol: number) {
    this.globalVolume = vol;
    Howler.volume(vol);
    this.muted = vol === 0;
  }

  public isMuted() {
      return this.muted;
  }
}

export const audioController = AudioController.getInstance();

export const unlockSound = () => audioController.unlock();
export const clickSound = {
    play: () => audioController.play(),
    volume: (v: number) => audioController.setVolume(v) // compat
};
export const setGlobalVolume = (v: number) => audioController.setVolume(v);
