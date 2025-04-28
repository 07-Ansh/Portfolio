// Toggle Mobile Menu
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

// Toggle Light / Dark Theme
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const icon = document.querySelector('.theme-toggle i');
  if (document.body.classList.contains('light-theme')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
}

// On page load, set theme and animate
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

  // Animate sections smoothly
  const faders = document.querySelectorAll('.fade-in');
  faders.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 150);
  });
});

// Smooth Page Fade-Out
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const target = link.getAttribute('target');
      if (!target && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:') && !link.href.includes('#')) {
        e.preventDefault();
        document.body.style.animation = 'fadeOutPage 0.5s ease forwards';
        setTimeout(() => {
          window.location.href = link.href;
        }, 400);
      }
    });
  });
});

function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

// Auto-hide navbar when scrolling
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.classList.add('header-hidden');
    } else {
        // Scrolling up
        header.classList.remove('header-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Safari compatibility
});
