function createBalloon(emoji, left) {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.textContent = emoji;
  const safeLeft = Math.max(5, Math.min(95, left));
  balloon.style.left = safeLeft + '%';
  balloon.style.animationDuration = (6 + Math.random() * 6) + 's';

  function popBalloon(event) {
    event.stopPropagation();
    event.preventDefault();
    const original = document.getElementById('pop-sound');
    if (original) {
      const popClone = original.cloneNode(true);
      popClone.play().catch(e => console.warn("Pop sound error:", e));
    }

    // Stop animation and trigger reflow
    const computed = window.getComputedStyle(balloon);
    const matrix = new DOMMatrixReadOnly(computed.transform);
    const currentY = matrix.m42;

    balloon.style.animation = 'none';
    balloon.style.transform = `translateY(${currentY}px)`;

    // Ensure scaling happens at current position
    requestAnimationFrame(() => {
      balloon.classList.add('popped');
      balloon.style.transform += ' scale(2)';
      balloon.style.opacity = '0';
    });
    
    setTimeout(() => balloon.remove(), 300);
  }

  ['click', 'touchstart'].forEach(eventType => {
    balloon.addEventListener(eventType, popBalloon, { passive: false });
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
    const left = 5 + Math.random() * 90;
    createBalloon(emoji, left);
  }

  setInterval(() => {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const left = 5 + Math.random() * 90;
    createBalloon(emoji, left);
  }, 400);
}

window.addEventListener('DOMContentLoaded', () => {
  launchBalloons();

  const contentSection = document.querySelector('.content-section');
  if (contentSection) {
    contentSection.style.minHeight = '100vh';
  }
});
