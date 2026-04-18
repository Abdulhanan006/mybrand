const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const header = document.getElementById('navbar');
const navMenu = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const scrollProgress = document.getElementById('scrollProgress');

const updateActiveLink = () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.4;
  let activeSection = sections[0];

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      activeSection = section;
      navLinks.forEach(link => link.classList.remove('active'));
      navLink?.classList.add('active');
    }
  });

  document.body.dataset.section = activeSection.getAttribute('id');
};

const updateHeaderStyle = () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
};

const handleScroll = () => {
  updateHeaderStyle();
  updateActiveLink();
  updateScrollProgress();
};

const debounce = (fn, delay = 15) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

window.addEventListener('scroll', debounce(handleScroll, 20));

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);

    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    navLinks.forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
    }
  });
});

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    navMenu.classList.remove('open');
  }
});

// Initialize state on load
handleScroll();
