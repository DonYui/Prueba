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

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

// Servicios detallados
const serviciosDetallados = {
  'implementacion-erp': {
    nombre: 'Implementación ERP',
    descripcion: 'Instalación, configuración y personalización de sistemas ERP líderes del mercado.',
    detalles: [
      {
        titulo: 'Análisis y Planificación',
        descripcion: 'Evaluamos tus procesos actuales y diseñamos una estrategia personalizada de implementación.'
      },
      {
        titulo: 'Instalación y Configuración',
        descripcion: 'Instalamos el sistema en tu entorno, configuramos módulos y personalizamos funcionalidades.'
      },
      {
        titulo: 'Pruebas Integrales',
        descripcion: 'Realizamos pruebas exhaustivas para garantizar que el sistema funcione según tus requisitos.'
      },
      {
        titulo: 'Capacitación de Usuarios',
        descripcion: 'Proporcionamos capacitación completa a tus equipos para asegurar la adopción exitosa.'
      },
      {
        titulo: 'Puesta en Marcha y Soporte',
        descripcion: 'Gestionamos el go-live con soporte continuo para asegurar una transición sin problemas.'
      }
    ]
  },
  'desarrollo-medida': {
    nombre: 'Desarrollo a la Medida',
    descripcion: 'Soluciones personalizadas de software, aplicaciones móviles y tecnologías emergentes.',
    detalles: [
      {
        titulo: 'Fábrica de Software',
        descripcion: 'Desarrollamos aplicaciones y sistemas personalizados adaptados completamente a tus necesidades específicas.'
      },
      {
        titulo: 'Legacy Support',
        descripcion: 'Mantenemos, actualizamos y mejoramos sistemas legacy existentes para garantizar su continuidad operativa.'
      },
      {
        titulo: 'Diseño UX/UI',
        descripcion: 'Creamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario y la adopción de sistemas.'
      },
      {
        titulo: 'Desarrollo de Aplicaciones Móviles',
        descripcion: 'Desarrollamos apps nativas e híbridas para iOS y Android con funcionalidad empresarial completa.'
      },
      {
        titulo: 'IoT',
        descripcion: 'Implementamos soluciones de Internet de las Cosas para conectar y automatizar tus procesos empresariales.'
      },
      {
        titulo: 'Cyberseguridad',
        descripcion: 'Integramos medidas de seguridad avanzadas en todas nuestras soluciones de desarrollo personalizado.'
      }
    ]
  },
  'servicios-web': {
    nombre: 'Servicios Web',
    descripcion: 'Diseño y desarrollo de sitios web modernos, responsivos y optimizados para resultados.',
    detalles: [
      {
        titulo: 'Diseño Web Responsivo',
        descripcion: 'Creamos sitios web que se adaptan perfectamente a todos los dispositivos y tamaños de pantalla.'
      },
      {
        titulo: 'E-Commerce',
        descripcion: 'Desarrollamos plataformas de comercio electrónico con sistemas de pago seguros y carrito de compras intuitivo.'
      },
      {
        titulo: 'SEO y Optimización',
        descripcion: 'Optimizamos tu sitio para buscadores asegurando mejor visibilidad y tráfico orgánico de calidad.'
      },
      {
        titulo: 'Integración de Sistemas',
        descripcion: 'Conectamos tu sitio web con tus sistemas ERP, CRM y bases de datos para una operación seamless.'
      },
      {
        titulo: 'Performance y Velocidad',
        descripcion: 'Optimizamos la velocidad de carga y rendimiento para una experiencia de usuario superior.'
      },
      {
        titulo: 'Mantenimiento y Soporte',
        descripcion: 'Proporcionamos mantenimiento continuo, actualizaciones de seguridad y soporte técnico dedicado.'
      }
    ]
  }
};

// Obtener el parámetro de URL
function getServiceFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('servicio') || 'implementacion-erp';
}

// Cargar detalles del servicio
function loadServiceDetails() {
  const serviceKey = getServiceFromUrl();
  const service = serviciosDetallados[serviceKey];
  
  if (!service) {
    window.location.href = 'index.html#servicios';
    return;
  }

  // Actualizar títulos
  document.getElementById('serviceName').textContent = service.nombre;
  document.getElementById('serviceDescription').textContent = service.descripcion;
  
  // Cargar detalles
  const contentDiv = document.getElementById('serviceDetailContent');
  let html = '<h2 style="font-size: 2rem; margin-bottom: 2rem; color: #1a1a1a;">Características Principales</h2>';
  html += '<div class="service-features">';
  
  service.detalles.forEach(detalle => {
    html += `
      <div class="feature-card">
        <h3>${detalle.titulo}</h3>
        <p>${detalle.descripcion}</p>
      </div>
    `;
  });
  
  html += '</div>';
  html += `
    <div class="cta-section">
      <h2>¿Listo para transformar tu negocio?</h2>
      <p>Contáctanos hoy para una consulta gratuita sobre cómo ${service.nombre.toLowerCase()} puede beneficiar a tu empresa.</p>
      <a href="index.html#contacto" class="btn btn-primary" style="margin-top: 1rem;">Agendar Consulta</a>
    </div>
  `;
  
  contentDiv.innerHTML = html;
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    contactForm.reset();
  });
}

// Cargar servicios cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  loadServiceDetails();
});
