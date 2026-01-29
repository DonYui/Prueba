// Servicios Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Video Player Functionality
  const playButton = document.querySelector('.play-button');
  const video = document.getElementById('service-video');
  const videoOverlay = document.querySelector('.video-overlay');
  
  if (playButton && video) {
    playButton.addEventListener('click', function() {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoOverlay.style.opacity = '0';
          videoOverlay.style.pointerEvents = 'none';
        }).catch(error => {
          console.error('Error al reproducir video:', error);
        });
      } else {
        videoOverlay.style.opacity = '0';
        videoOverlay.style.pointerEvents = 'none';
      }
    });
  }
  
  // Parallax Effect for Services Page
  const parallaxBg = document.querySelector('.parallax-servicios .parallax-bg');
  
  if (parallaxBg) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSection = document.querySelector('.parallax-servicios');
      const sectionTop = parallaxSection.offsetTop;
      const sectionHeight = parallaxSection.offsetHeight;
      
      if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
        const yPos = (scrolled - sectionTop) * 0.5;
        parallaxBg.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
  
  // 3D Image Effect
  const image3dContainer = document.querySelector('.image-3d-container');
  const image3d = document.querySelector('.image-3d');
  
  if (image3dContainer && image3d) {
    image3dContainer.addEventListener('mousemove', function(e) {
      const rect = image3dContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      image3d.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    image3dContainer.addEventListener('mouseleave', function() {
      image3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  }
  
  // Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer for Stats Animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
          if (!stat.classList.contains('animated')) {
            stat.classList.add('animated');
            animateCounter(stat);
          }
        });
      }
    });
  }, { threshold: 0.5 });
  
  const statsContainers = document.querySelectorAll('.servicio-stats');
  statsContainers.forEach(container => {
    statsObserver.observe(container);
  });
  
  // Smooth scroll to section on page load if hash exists
  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
  
  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.servicio-detalle, .companies-section, .parallax-section, .image-3d-section');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    el.classList.add('fade-in-element');
    fadeObserver.observe(el);
  });
});
