const typedText = document.getElementById('typedText');
const themeToggle = document.getElementById('themeToggle');
const htmlRoot = document.documentElement;
const parallaxItems = document.querySelectorAll('.parallax');
const progressSpans = document.querySelectorAll('.progress-bar span');
const fadeElements = document.querySelectorAll('.fade-up');
const lines = ['Creative Digital Artist'];
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentText = lines[lineIndex];
  typedText.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex < currentText.length) {
    charIndex += 1;
    setTimeout(typeLoop, 110);
  } else if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1400);
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 60);
  } else {
    isDeleting = false;
    lineIndex = (lineIndex + 1) % lines.length;
    setTimeout(typeLoop, 700);
  }
}

typeLoop();

function updateTheme(theme) {
  htmlRoot.setAttribute('data-theme', theme);
  localStorage.setItem('portfolioTheme', theme);
}

const savedTheme = localStorage.getItem('portfolioTheme') || 'light';
updateTheme(savedTheme);

function refreshThemeLabel() {
  if (htmlRoot.getAttribute('data-theme') === 'dark') {
    themeToggle.title = 'Chế độ tối';
  } else {
    themeToggle.title = 'Chế độ sáng';
  }
}

themeToggle.addEventListener('click', () => {
  const nextTheme = htmlRoot.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  updateTheme(nextTheme);
  refreshThemeLabel();
});

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('skill-card')) {
        const span = entry.target.querySelector('.progress-bar span');
        if (span && span.dataset.value) {
          span.style.width = `${span.dataset.value}%`;
        }
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

fadeElements.forEach((el) => intersectionObserver.observe(el));
document.querySelectorAll('.skill-card').forEach((card) => intersectionObserver.observe(card));

function updateParallax() {
  const scrollY = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.dataset.speed) || 0.1;
    item.style.transform = `translate3d(0, ${scrollY * speed * 0.15}px, 0)`;
  });
}

window.addEventListener('scroll', updateParallax, { passive: true });

window.addEventListener('load', () => {
  if (htmlRoot.getAttribute('data-theme') === 'dark') {
    themeToggle.title = 'Chế độ tối';
  } else {
    themeToggle.title = 'Chế độ sáng';
  }
});
