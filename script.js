function createBalloon(emoji, left) {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.textContent = emoji;
  const safeLeft = Math.max(5, Math.min(95, left)); // Prevent edge touching
  balloon.style.left = safeLeft + '%';
  balloon.style.animationDuration = (6 + Math.random() * 6) + 's';

  balloon.addEventListener('click', () => {
    const original = document.getElementById('pop-sound');
    if (original) {
      const popClone = original.cloneNode(true);
      popClone.play();
    }
    balloon.remove();
  });

  document.getElementById('hero-section').appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, 12000);
}

function launchBalloons() {
  const emojis = ['🎈','🎉','🎊','💙','🩵'];
  for (let i = 0; i < 10; i++) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = 5 + Math.random() * 90; // Safe horizontal range
    createBalloon(emoji, left);
  }

  setInterval(() => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = 5 + Math.random() * 90; // Safe horizontal range
    createBalloon(emoji, left);
  }, 400);
}

window.addEventListener('DOMContentLoaded', () => {
  launchBalloons();

  // Ensure content-section appears on full height pages
  const contentSection = document.querySelector('.content-section');
  if (contentSection) {
    contentSection.style.minHeight = '100vh';
  }
});
