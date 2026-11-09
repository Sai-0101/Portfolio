// DOM Element References
const introVideo = document.getElementById('intro-video');
const introOverlay = document.getElementById('intro-overlay');
const portfolioContent = document.getElementById('portfolio-content');
const skipBtn = document.getElementById('skip-btn');
const bgLoop = document.getElementById('bg-loop');

let transitionTriggered = false;

function completeIntroAndReveal() {
  if (transitionTriggered) return;
  transitionTriggered = true;

  // 1. Crossfade out the intro overlay
  introOverlay.classList.add('dismissed');

  // 2. Ensure ambient background video is playing in sync
  if (bgLoop.paused) {
    bgLoop.play().catch(() => {});
  }

  // 3. Reveal interactive stage & trigger avatar slide-up + gem orbit
  portfolioContent.classList.remove('hidden');
  portfolioContent.classList.add('visible');

  // 4. Pause the heavy intro video after fade-out to free system resources
  setTimeout(() => {
    introVideo.pause();
    introVideo.removeAttribute('src'); // Unload intro stream from memory
  }, 1300);
}

// Automatically reveal when intro video ends
introVideo.addEventListener('ended', completeIntroAndReveal);

// Allow instantaneous skip via button
skipBtn.addEventListener('click', completeIntroAndReveal);

// Fallback: If autoplay is restricted by browser policy, reveal on first click
window.addEventListener('click', () => {
  if (introVideo.paused && !transitionTriggered) {
    introVideo.play().catch(() => completeIntroAndReveal());
  }
}, { once: true });
