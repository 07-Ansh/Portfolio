document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

async function initializeApp() {
  try {
    await Promise.all([
      initializeTheme(),
      initializeNavigation(),
      initializeAnimations(),
      initializePageSpecificFeatures()
    ]);
    
    // Hide loader after everything is ready
    hideLoader();
    
  } catch (error) {
    console.error('Initialization error:', error);
    hideLoader(); // Still hide loader on error
  }
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', savedTheme === 'light');
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const moonIcon = document.querySelector('.fa-moon');
  const sunIcon = document.querySelector('.fa-sun');
  
  if (moonIcon && sunIcon) {
    moonIcon.style.display = theme === 'light' ? 'none' : 'block';
    sunIcon.style.display = theme === 'light' ? 'block' : 'none';
  }
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const theme = isLight ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function initializeNavigation() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navbar = document.getElementById('navbar');
  
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', function() {
      navbar.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar?.classList.remove('active');
      mobileToggle?.classList.remove('active');
    });
  });

  // Set active navigation link
  setActiveNavLink();
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    fadeObserver.observe(el);
  });

  // Header scroll effect
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
  }
}

function initializePageSpecificFeatures() {
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('index.html') || currentPage === '/') {
    initTypingAnimation();
    initParallax();
    initMagneticButtons();
  }
  
  if (currentPage.includes('resume.html') || currentPage.includes('index.html')) {
    initSkillBars();
  }
}

function initTypingAnimation() {
  const typedTextSpan = document.querySelector('.typed-text');
  if (!typedTextSpan) return;

  const textArray = ['Front-End Developer', 'App Developer', 'UI/UX Enthusiast'];
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newTextDelay = 1500;

  function type() {
    const currentText = textArray[textArrayIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = erasingDelay;
    } else {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  // Start animation
  setTimeout(type, newTextDelay);
}

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

function initParallax() {
  const shapes = document.querySelectorAll('.bg-shape');
  if (!shapes.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });
}

function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX * 10;
      const deltaY = (y - centerY) / centerY * 10;
      
      this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    
    // Remove from DOM after animation
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSJ3aGl0ZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
      this.alt = 'Image not available';
    });
  });
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize smooth scrolling
initSmoothScrolling();

// Export functions for global access
window.toggleTheme = toggleTheme;