import { Howl } from "howler";

const CLICK_SOUND_URL = "/sounds/click.mp3";

// Singleton instance
export const clickSound = new Howl({
  src: [CLICK_SOUND_URL],
  preload: true,
  volume: 0.6,
  html5: false, // Force Web Audio API for better timing/mobile support
});

let unlocked = false;

export function unlockSound() {
  if (unlocked) return;
  // Play silent buffer to unlock audio context on mobile
  clickSound.volume(0);
  clickSound.play();
  setTimeout(() => {
      clickSound.stop();
      clickSound.volume(0.6);
  }, 10);
  unlocked = true;
}