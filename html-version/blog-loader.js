// Blog Loader Script
// Carga los artículos desde blog-data.json y los renderiza dinámicamente

let allArticles = [];
let filteredArticles = [];
let currentFilter = 'all';
let currentSearch = '';

// Cargar los datos del blog al iniciar
document.addEventListener('DOMContentLoaded', async () => {
  await loadBlogData();
  renderBlog();
});

/**
 * Cargar datos del blog desde el archivo JSON
 */
async function loadBlogData() {
  try {
    const response = await fetch('blog-data.json');
    if (!response.ok) {
      throw new Error('Error al cargar blog-data.json');
    }
    const data = await response.json();
    allArticles = data.articles;
    filteredArticles = [...allArticles];
    console.log('[v0] Blog data loaded successfully:', allArticles.length, 'articles');
  } catch (error) {
    console.error('[v0] Error loading blog data:', error);
    // Mostrar mensaje de error al usuario
    showEmptyState();
  }
}

/**
 * Renderizar los artículos en la página
 */
function renderBlog() {
  const blogGrid = document.getElementById('blogGrid');
  const emptyState = document.getElementById('emptyState');

  if (!blogGrid) {
    console.error('[v0] Blog grid element not found');
    return;
  }

  // Limpiar el grid
  blogGrid.innerHTML = '';

  // Si no hay artículos, mostrar estado vacío
  if (filteredArticles.length === 0) {
    showEmptyState();
    return;
  }

  // Ocultar estado vacío
  emptyState.classList.add('hidden');

  // Renderizar cada artículo
  filteredArticles.forEach((article) => {
    const articleCard = createArticleCard(article);
    blogGrid.appendChild(articleCard);
  });

  console.log('[v0] Rendered', filteredArticles.length, 'articles');
}

/**
 * Crear la tarjeta de un artículo
 */
function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  
  // Crear contenido de la imagen
  let imageHTML = '';
  if (article.image) {
    imageHTML = `
      <div class="blog-card-image">
        <img src="${article.image}" alt="${article.title}" onerror="this.parentElement.style.backgroundImage='${article.gradient}'; this.style.display='none';">
      </div>
    `;
  } else {
    imageHTML = `
      <div class="blog-card-image">
        <div class="blog-card-gradient" style="background: ${article.gradient};">
          📄
        </div>
      </div>
    `;
  }

  card.innerHTML = `
    ${imageHTML}
    <div class="blog-card-content">
      <div class="blog-meta">
        <span class="blog-date">${article.date}</span>
        <span class="blog-category">${article.category}</span>
      </div>
      <h2>${article.title}</h2>
      <p class="blog-excerpt">${article.excerpt}</p>
      <div class="blog-card-footer">
        <a href="#" class="read-more" data-article-id="${article.id}" onclick="event.preventDefault(); viewArticle('${article.id}')">
          Leer más
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  `;

  return card;
}

/**
 * Filtrar artículos por categoría
 */
function filterByCategory(category) {
  currentFilter = category;
  currentSearch = '';
  
  // Actualizar botones de filtro
  document.querySelectorAll('.filter-tag').forEach((btn) => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Actualizar búsqueda
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }

  // Filtrar artículos
  if (category === 'all') {
    filteredArticles = [...allArticles];
  } else {
    filteredArticles = allArticles.filter((article) => article.category === category);
  }

  console.log('[v0] Filtered by category:', category, '- Found:', filteredArticles.length, 'articles');
  renderBlog();
}

/**
 * Buscar artículos
 */
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  currentSearch = searchInput.value.toLowerCase().trim();
  currentFilter = 'all';

  // Actualizar botones de filtro
  document.querySelectorAll('.filter-tag').forEach((btn) => {
    btn.classList.remove('active');
  });
  document.querySelector('[data-filter="all"]').classList.add('active');

  // Si el campo está vacío, mostrar todos
  if (currentSearch === '') {
    filteredArticles = [...allArticles];
  } else {
    // Buscar en título, extracto y contenido
    filteredArticles = allArticles.filter((article) => {
      const searchableText = `${article.title} ${article.excerpt} ${article.content}`.toLowerCase();
      return searchableText.includes(currentSearch);
    });
  }

  console.log('[v0] Search for:', currentSearch, '- Found:', filteredArticles.length, 'articles');
  renderBlog();
}

/**
 * Permitir búsqueda al presionar Enter
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });
  }
});

/**
 * Ver artículo completo
 */
function viewArticle(articleId) {
  const article = allArticles.find((a) => a.id === articleId);
  if (!article) {
    console.error('[v0] Article not found:', articleId);
    return;
  }

  // Mostrar modal o página con el artículo completo
  showArticleModal(article);
}

/**
 * Mostrar modal con el artículo completo
 */
function showArticleModal(article) {
  // Crear modal
  const modal = document.createElement('div');
  modal.className = 'article-modal';
  modal.innerHTML = `
    <div class="article-modal-content">
      <button class="modal-close" onclick="this.closest('.article-modal').remove()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <article class="blog-article-page">
        <a href="#" class="back-to-blog" onclick="event.preventDefault(); document.querySelector('.article-modal').remove();">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver al Blog
        </a>

        <div class="blog-meta">
          <span class="blog-date">${article.date}</span>
          <span class="blog-category">${article.category}</span>
        </div>

        <h2>${article.title}</h2>

        <div class="article-image-hero">
          <img src="${article.image}" alt="${article.title}" onerror="this.style.display='none';">
        </div>

        <div class="article-full-content">
          ${article.content}
        </div>
      </article>

      <div class="article-modal-footer">
        <p>¿Interesado en implementar soluciones ERP?</p>
        <a href="index.html#contacto" class="btn btn-primary" onclick="document.querySelector('.article-modal').remove();">Contacta con Nosotros</a>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Agregar estilos del modal si no existen
  if (!document.getElementById('article-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'article-modal-styles';
    style.textContent = `
      .article-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        z-index: 1000;
        padding: 2rem 1rem;
        overflow-y: auto;
      }

      .article-modal-content {
        background: white;
        border-radius: 1.5rem;
        max-width: 850px;
        width: 100%;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: none;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background: rgba(255, 2, 15, 0.1);
        color: #ff020f;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 10;
      }

      .modal-close:hover {
        background: rgba(255, 2, 15, 0.2);
        transform: rotate(90deg);
      }

      .article-modal-footer {
        padding: 2rem;
        border-top: 1px solid #e5e5e5;
        text-align: center;
      }

      .article-modal-footer p {
        margin-bottom: 1rem;
        color: #666;
      }

      .article-full-content h3 {
        font-size: 1.25rem !important;
      }

      .article-full-content h4 {
        font-size: 1rem;
        font-weight: 600;
        color: #1a1a1a;
        margin: 1rem 0 0.5rem;
      }

      @media (max-width: 768px) {
        .article-modal {
          padding: 1rem;
        }

        .article-modal-content {
          border-radius: 1rem;
        }

        .modal-close {
          top: 1rem;
          right: 1rem;
        }

        .blog-article-page {
          padding: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Hacer scroll arriba del modal
  setTimeout(() => {
    modal.scrollTop = 0;
  }, 0);
}

/**
 * Mostrar estado vacío
 */
function showEmptyState() {
  const blogGrid = document.getElementById('blogGrid');
  const emptyState = document.getElementById('emptyState');

  if (blogGrid) {
    blogGrid.innerHTML = '';
  }

  if (emptyState) {
    emptyState.classList.remove('hidden');
  }
}

console.log('[v0] Blog loader script initialized');
