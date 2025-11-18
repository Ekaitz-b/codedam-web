// ========================================
// NAVIGATION & MOBILE MENU
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Mobile dropdown handling
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

// Search data - All content indexed for search
const searchData = [
    // 1º DAM - Programación
    {
        title: 'Programación (Java)',
        category: '1º DAM',
        keywords: ['java', 'programacion', 'poo', 'objetos', 'clases', 'herencia', 'polimorfismo', 'encapsulacion', 'abstraccion', 'interfaces', 'arrays', 'colecciones', 'excepciones', 'hilos', 'threads'],
        url: 'pages/1dam/programacion.html',
        description: 'Fundamentos de programación orientada a objetos con Java'
    },
    // 1º DAM - Bases de Datos
    {
        title: 'Bases de Datos',
        category: '1º DAM',
        keywords: ['sql', 'mysql', 'base de datos', 'bd', 'select', 'insert', 'update', 'delete', 'join', 'normalizacion', 'entidad-relacion', 'claves', 'tablas', 'consultas'],
        url: 'pages/1dam/bases-datos.html',
        description: 'SQL, MySQL, diseño y gestión de bases de datos'
    },
    // 1º DAM - Lenguajes de Marcas
    {
        title: 'Lenguajes de Marcas',
        category: '1º DAM',
        keywords: ['html', 'css', 'xml', 'json', 'html5', 'css3', 'web', 'flexbox', 'grid', 'responsive', 'etiquetas', 'estilos', 'javascript'],
        url: 'pages/1dam/lenguajes-marcas.html',
        description: 'HTML5, CSS3, XML, JSON y tecnologías web'
    },
    // 1º DAM - Entornos de Desarrollo
    {
        title: 'Entornos de Desarrollo',
        category: '1º DAM',
        keywords: ['git', 'github', 'ide', 'eclipse', 'intellij', 'netbeans', 'control versiones', 'testing', 'junit', 'maven', 'gradle', 'debugging', 'refactoring'],
        url: 'pages/1dam/entornos-desarrollo.html',
        description: 'IDEs, control de versiones, testing y metodologías'
    },
    // 1º DAM - Sistemas Informáticos
    {
        title: 'Sistemas Informáticos',
        category: '1º DAM',
        keywords: ['linux', 'windows', 'sistemas operativos', 'redes', 'tcp ip', 'comandos', 'bash', 'terminal', 'hardware', 'arquitectura', 'servidor'],
        url: 'pages/1dam/sistemas-informaticos.html',
        description: 'Sistemas operativos, redes y administración'
    },
    // 2º DAM - Acceso a Datos
    {
        title: 'Acceso a Datos',
        category: '2º DAM',
        keywords: ['jdbc', 'hibernate', 'jpa', 'mongodb', 'nosql', 'orm', 'ficheros', 'serializacion', 'xml', 'json', 'persistencia', 'dao'],
        url: 'pages/2dam/acceso-datos.html',
        description: 'Gestión y persistencia de datos en aplicaciones'
    },
    // 2º DAM - Desarrollo de Interfaces
    {
        title: 'Desarrollo de Interfaces',
        category: '2º DAM',
        keywords: ['javafx', 'swing', 'ui', 'ux', 'interfaz', 'diseño', 'fxml', 'css', 'scene builder', 'eventos', 'layouts', 'componentes'],
        url: 'pages/2dam/desarrollo-interfaces.html',
        description: 'Creación de interfaces gráficas de usuario'
    },
    // 2º DAM - Programación Multimedia
    {
        title: 'Programación Multimedia',
        category: '2º DAM',
        keywords: ['android', 'kotlin', 'java android', 'movil', 'mobile', 'app', 'aplicaciones', 'activities', 'fragments', 'intents', 'layouts', 'material design'],
        url: 'pages/2dam/programacion-multimedia.html',
        description: 'Desarrollo de aplicaciones móviles con Android'
    },
    // 2º DAM - Programación de Servicios
    {
        title: 'Programación de Servicios',
        category: '2º DAM',
        keywords: ['spring boot', 'rest api', 'microservicios', 'servicios web', 'api', 'json', 'http', 'sockets', 'hilos', 'concurrencia', 'servidor'],
        url: 'pages/2dam/programacion-servicios.html',
        description: 'APIs REST, microservicios y programación concurrente'
    },
    // 2º DAM - Sistemas de Gestión
    {
        title: 'Sistemas de Gestión Empresarial',
        category: '2º DAM',
        keywords: ['erp', 'crm', 'odoo', 'gestion', 'empresa', 'procesos', 'negocio', 'python', 'modulos'],
        url: 'pages/2dam/sistemas-gestion.html',
        description: 'ERP, CRM y sistemas empresariales'
    },
    // Inglés Técnico
    {
        title: 'Inglés Técnico',
        category: 'Recursos',
        keywords: ['ingles', 'english', 'technical english', 'vocabulario', 'programacion', 'errores', 'documentation', 'traduccion'],
        url: 'pages/ingles/index.html',
        description: 'Vocabulario técnico y recursos en inglés'
    }
];

// Perform search from main page
function performSearch() {
    const searchInput = document.getElementById('main-search');
    const query = searchInput.value.trim();

    if (query) {
        // Redirect to search page with query parameter
        window.location.href = `pages/buscar.html?q=${encodeURIComponent(query)}`;
    }
}

// Handle Enter key in search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Search function for search page
function searchContent(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    query = query.toLowerCase().trim();
    const results = [];

    searchData.forEach(item => {
        let score = 0;

        // Check title match
        if (item.title.toLowerCase().includes(query)) {
            score += 10;
        }

        // Check keywords match
        const matchedKeywords = item.keywords.filter(keyword =>
            keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
        );
        score += matchedKeywords.length * 5;

        // Check description match
        if (item.description.toLowerCase().includes(query)) {
            score += 3;
        }

        // Check category match
        if (item.category.toLowerCase().includes(query)) {
            score += 5;
        }

        if (score > 0) {
            results.push({
                ...item,
                score: score
            });
        }
    });

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    return results;
}

// Display search results (for search page)
function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const searchInput = document.getElementById('search-input');
    const searchQuery = document.getElementById('search-query');
    const resultsContainer = document.getElementById('results-container');
    const resultsCount = document.getElementById('results-count');

    if (!query) {
        if (searchQuery) searchQuery.textContent = '';
        if (resultsCount) resultsCount.textContent = 'Introduce un término de búsqueda';
        if (resultsContainer) resultsContainer.innerHTML = '';
        return;
    }

    if (searchInput) {
        searchInput.value = query;
    }

    if (searchQuery) {
        searchQuery.textContent = `"${query}"`;
    }

    const results = searchContent(query);

    if (resultsCount) {
        resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;
    }

    if (resultsContainer) {
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <article class="result-card">
                    <div class="result-category">${result.category}</div>
                    <h3 class="result-title">
                        <a href="../${result.url}">${result.title}</a>
                    </h3>
                    <p class="result-description">${result.description}</p>
                    <div class="result-keywords">
                        ${result.keywords.slice(0, 5).map(keyword =>
                            `<span class="keyword-tag">${keyword}</span>`
                        ).join('')}
                    </div>
                    <a href="../${result.url}" class="result-link">Ver contenido →</a>
                </article>
            `).join('');
        }
    }
}

// Execute search on search page load
if (window.location.pathname.includes('buscar.html')) {
    document.addEventListener('DOMContentLoaded', displaySearchResults);
}

// Handle search from search page
function performSearchFromPage() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `buscar.html?q=${encodeURIComponent(query)}`;
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ========================================

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// COPY CODE FUNCTIONALITY (for content pages)
// ========================================

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copiar';
        button.addEventListener('click', function() {
            const code = block.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = '¡Copiado!';
                setTimeout(() => {
                    button.textContent = 'Copiar';
                }, 2000);
            });
        });
        block.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', addCopyButtons);

// ========================================
// TABLE OF CONTENTS GENERATOR
// ========================================

function generateTableOfContents() {
    const toc = document.querySelector('.toc ul');
    if (!toc) return;

    const headings = document.querySelectorAll('.content-section h2, .content-section h3');

    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            li.style.marginLeft = '1rem';
        }

        li.appendChild(a);
        toc.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', generateTableOfContents);

// ========================================
// PERFORMANCE - LAZY LOADING IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}
