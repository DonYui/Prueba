// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = menuToggle.querySelector('.menu-icon');
const closeIcon = menuToggle.querySelector('.close-icon');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
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
  
  // Here you would typically send the data to a server
  console.log('Form submitted:', data);
  
  // Show success message
  alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  contactForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
