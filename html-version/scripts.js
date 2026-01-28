// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = menuToggle.querySelector('.menu-icon');
const closeIcon = menuToggle.querySelector('.close-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

function closeMobileMenu() {
  mobileMenu.classList.add('hidden');
  menuIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
}

menuToggle.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.contains('hidden');
  if (isHidden) {
    mobileMenu.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  } else {
    closeMobileMenu();
  }
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Smooth scroll mejorado con offset y animación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      // Offset para el header fijo
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight - 20;
      
      // Animación suave
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Actualizar clase activa en los enlaces de navegación
      updateActiveNavLink(targetId);
    }
  });
});

// Función para actualizar el enlace activo
function updateActiveNavLink(targetId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Actualizar enlace activo al hacer scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = `#${section.id}`;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavLink(sectionId);
    }
  });
});

// Al cargar la página, establecer el enlace activo según la sección actual
window.addEventListener('load', () => {
  const currentHash = window.location.hash;
  if (currentHash) {
    updateActiveNavLink(currentHash);
  } else {
    updateActiveNavLink('#inicio');
  }
});

// Asegurar que el logo también tenga scroll suave
document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector('#inicio');
  if (target) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    updateActiveNavLink('#inicio');
  }
});

// Testimonials Carousel
const testimonials = [
  {
    text: "La implementación de SAP con Innology Services transformó completamente nuestra operación. Redujimos tiempos de cierre contable de 15 días a solo 3.",
    name: "Carlos Mendoza",
    role: "Director de Finanzas - Grupo Industrial del Norte",
    initials: "CM"
  },
  {
    text: "El equipo de Innology Services entendió perfectamente nuestras necesidades del sector retail. La integración omnicanal que logramos nos posicionó como líderes en experiencia de cliente.",
    name: "Ana García",
    role: "CEO - Cadena Comercial del Bajío",
    initials: "AG"
  },
  {
    text: "Migramos de un sistema legacy de más de 20 años sin perder un solo día de operación. La planificación meticulosa y la ejecución impecable del equipo de Innology Services hicieron posible lo que creíamos imposible.",
    name: "Roberto Hernández",
    role: "CTO - Manufactura Avanzada S.A.",
    initials: "RH"
  },
  {
    text: "La capacitación que recibió nuestro equipo fue excepcional. Hoy operamos el sistema de forma autónoma y seguimos descubriendo funcionalidades que mejoran nuestra eficiencia.",
    name: "María Fernández",
    role: "Directora de Operaciones - Logística Express",
    initials: "MF"
  },
  {
    text: "El ROI de nuestra implementación superó las expectativas en el primer año. La inversión se recuperó en 8 meses gracias a la optimización de procesos.",
    name: "Jorge Ramírez",
    role: "CFO - Distribuidora Nacional",
    initials: "JR"
  }
];

let currentIndex = 0;
let autoplayInterval;

const testimonialText = document.getElementById('testimonialText');
const authorName = document.getElementById('authorName');
const authorRole = document.getElementById('authorRole');
const authorAvatar = document.getElementById('authorAvatar');
const carouselDots = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Create dots
testimonials.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
  dot.setAttribute('aria-label', `Ir al testimonio ${index + 1}`);
  dot.addEventListener('click', () => goToSlide(index));
  carouselDots.appendChild(dot);
});

function updateTestimonial() {
  const testimonial = testimonials[currentIndex];
  
  testimonialText.style.opacity = '0';
  authorName.style.opacity = '0';
  authorRole.style.opacity = '0';
  authorAvatar.style.opacity = '0';
  
  setTimeout(() => {
    testimonialText.textContent = testimonial.text;
    authorName.textContent = testimonial.name;
    authorRole.textContent = testimonial.role;
    authorAvatar.textContent = testimonial.initials;
    
    testimonialText.style.opacity = '1';
    authorName.style.opacity = '1';
    authorRole.style.opacity = '1';
    authorAvatar.style.opacity = '1';
  }, 200);
  
  // Update dots
  const dots = carouselDots.querySelectorAll('.carousel-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateTestimonial();
  resetAutoplay();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial();
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoplay();
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoplay();
});

// Add transition styles
testimonialText.style.transition = 'opacity 0.2s ease';
authorName.style.transition = 'opacity 0.2s ease';
authorRole.style.transition = 'opacity 0.2s ease';
authorAvatar.style.transition = 'opacity 0.2s ease';

// Start autoplay
startAutoplay();

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  console.log('Form submitted:', data);
  
  alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  contactForm.reset();
});

// Infinite Carousel para Industrias
class InfiniteCarousel {
  constructor() {
    this.track = document.getElementById('infiniteCarouselTrack');
    
    this.industriesData = [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
        </svg>`,
        title: "Manufactura",
        description: "Optimización de producción",
        clients: "+45 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>`,
        title: "Retail",
        description: "Gestión omnicanal",
        clients: "+30 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>`,
        title: "Salud",
        description: "Cumplimiento normativo",
        clients: "+25 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>`,
        title: "Finanzas",
        description: "Control y compliance",
        clients: "+20 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>`,
        title: "Logística",
        description: "Trazabilidad completa",
        clients: "+35 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m7.5 4.27 9 5.15"></path>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>`,
        title: "Distribución",
        description: "Cadena de suministro",
        clients: "+28 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
          <path d="M12 12 2.1 9.1"></path>
        </svg>`,
        title: "Agroindustria",
        description: "Gestión de cultivos",
        clients: "+18 clientes"
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>`,
        title: "Turismo",
        description: "Experiencia del cliente",
        clients: "+15 clientes"
      }
    ];
    
    this.init();
  }
  
  init() {
    this.createCarousel();
    this.setupEventListeners();
  }
  
  createCarousel() {
    this.track.innerHTML = '';
    
    // Duplicar los slides para crear el efecto infinito
    const slidesToShow = [...this.industriesData, ...this.industriesData];
    
    slidesToShow.forEach((industry, index) => {
      const slide = document.createElement('div');
      slide.className = 'infinite-carousel-slide';
      
      slide.innerHTML = `
        <div class="industry-icon">${industry.icon}</div>
        <h3>${industry.title}</h3>
        <p>${industry.description}</p>
        <span class="industry-clients">${industry.clients}</span>
      `;
      
      this.track.appendChild(slide);
    });
    
    // Aplicar animación inicial
    this.track.style.animation = `infinite-scroll 40s linear infinite`;
  }
  
  setupEventListeners() {
    // Pausar animación al hacer hover
    this.track.addEventListener('mouseenter', () => {
      this.track.style.animationPlayState = 'paused';
    });
    
    this.track.addEventListener('mouseleave', () => {
      this.track.style.animationPlayState = 'running';
    });
    
    // Touch events para móvil
    this.track.addEventListener('touchstart', () => {
      this.track.style.animationPlayState = 'paused';
    });
    
    this.track.addEventListener('touchend', () => {
      setTimeout(() => {
        this.track.style.animationPlayState = 'running';
      }, 1000);
    });
  }
}

// Reveal animation for parallax section
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  });
});

// Counter animation for stats
function animateCounter(element, target, suffix = '') {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, stepTime);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statValues = entry.target.querySelectorAll('.stat-value[data-target]');
      statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe the results section
const resultsSection = document.querySelector('.results-section');
if (resultsSection) {
  statsObserver.observe(resultsSection);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteCarousel();
  
  // Add loaded class for animations
  document.body.classList.add('loaded');
  
  console.log('Innology Services - Sitio cargado correctamente');
});
