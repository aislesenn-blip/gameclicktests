import { Howl, Howler } from "howler";

const CLICK_SOUND_URL = "/sounds/click.mp3";

// Singleton instance
export const clickSound = new Howl({
  src: [CLICK_SOUND_URL],
  preload: true,
  volume: 0.6,
  html5: false, // Force Web Audio API
});

let unlocked = false;

export function unlockSound() {
  if (unlocked) return;
  // Unlock AudioContext on mobile
  if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume().then(() => {
          unlocked = true;
      });
  } else {
      // Play silent buffer as fallback
      clickSound.volume(0);
      clickSound.play();
      setTimeout(() => {
          clickSound.stop();
          clickSound.volume(0.6);
      }, 10);
      unlocked = true;
  }
}

export function setGlobalVolume(vol: number) {
    Howler.volume(vol);
}