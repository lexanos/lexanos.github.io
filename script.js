document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // 1. DATOS Y ESTADO GLOBAL
  // -------------------------
  let currentLang = 'es';
  let projectsData = [];

  const PROJECTS_FALLBACK = [
    { 
      id: 'piratepenguin', 
      title: 'Pirate Penguin / Forja de Almas', 
      year: 2024,
      desc: { es: 'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en: 'Action game focused on combat, cartoon aesthetics and skill progression.' },
      longDesc: { es: 'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en: 'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links: { itch: '#', download: '#' },
      media: [ 
        { type: 'image', src: 'images/pirate_thumb.jpg' }, 
        { type: 'video', src: 'PLACEHOLDER_VIDEO', poster: 'images/pirate_poster.jpg' } 
      ],
      tags: ['Action', 'Unity'],
      devlog: ['Inicio del proyecto', 'Primer prototipo de combate', 'Iteraciones de UI y shaders']
    },
    { 
      id: 'axiebrawl', 
      title: 'Pirate Penguin (Axie Brawl)', 
      year: 2023,
      desc: { es: 'MOBA competitivo con énfasis en partidas rápidas y juego en equipo.', en: 'Competitive MOBA focused on fast matches and team play.' },
      longDesc: { es: 'Participación en desarrollo MOBA con foco en C#, gameplay y sistemas multiplayer.', en: 'MOBA development with focus on C#, gameplay and multiplayer systems.' },
      links: { itch: '#', download: '#' },
      media: [ 
        { type: 'image', src: 'images/axie_thumb.jpg' } 
      ],
      tags: ['MOBA', 'Multiplayer'],
      devlog: []
    },
    { 
      id: 'creepydolls', 
      title: 'Creepy Dolls (GGJ 2020)', 
      year: 2020,
      desc: { es: 'Juego de puzzle/terror desarrollado en 48hs. Mecánicas de luz y sombra.', en: 'Puzzle/horror game developed in 48h. Light and shadow mechanics.' },
      longDesc: { es: 'Global Game Jam 2020. Lead Programmer. Implementación de IA básica y mecánicas de entorno.', en: 'Global Game Jam 2020. Lead Programmer. Basic AI implementation and environment mechanics.' },
      links: { itch: 'https://lexanos.itch.io/creepy-dolls', download: '' },
      media: [ 
        { type: 'image', src: 'images/creepy_thumb.jpg' } 
      ],
      tags: ['Puzzle', 'GGJ'],
      devlog: []
    }
  ];

  // -------------------------
  // 2. LÓGICA DE PROYECTOS (CORE FIX)
  // -------------------------

  /**
   * Intenta cargar proyectos externos, si falla usa el fallback.
   */
  async function loadProjects() {
    try {
      // Intentamos buscar un archivo JSON externo (simulado)
      // Si no tienes un backend o json real, esto saltará al catch inmediatamente.
      const response = await fetch('projects/data.json'); 
      if (!response.ok) throw new Error('No external data found');
      const data = await response.json();
      projectsData = data;
    } catch (err) {
      console.warn('Usando datos locales (Fallback):', err.message);
      projectsData = PROJECTS_FALLBACK;
    }
  }

  /**
   * Genera el HTML de las cards e inyecta en el DOM.
   * IMPORTANTE: No pone 'src' real todavía, usa 'data-src' para carga asíncrona.
   */
  function renderProjects() {
    const projectsContainer = document.getElementById('projects');
    if (!projectsContainer) return;

    // Limpiamos contenido previo (ej: "Cargando...")
    projectsContainer.innerHTML = '';

    // Creamos el contenedor Grid definido en CSS
    const grid = document.createElement('div');
    grid.className = 'grid';

    projectsData.forEach(p => {
      // Selección de media principal (primera imagen o poster)
      let mediaHtml = '';
      const firstMedia = p.media && p.media.length > 0 ? p.media[0] : null;

      if (firstMedia) {
        if (firstMedia.type === 'video') {
          // Video: data-poster y data-src para lazy loading
          mediaHtml = `
            <video 
              class="lazy-media" 
              data-poster="${firstMedia.poster}" 
              muted loop playsinline 
              onmouseover="this.play()" 
              onmouseout="this.pause()">
              <source data-src="${firstMedia.src}" type="video/mp4">
            </video>
          `;
        } else {
          // Imagen: data-src
          mediaHtml = `<img class="lazy-media" data-src="${firstMedia.src}" alt="${p.title}" />`;
        }
      } else {
        // Fallback visual si no hay media
        mediaHtml = `<div style="width:100%;height:100%;background:#222;"></div>`;
      }

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card thumb">
          ${mediaHtml}
        </div>
        <div class="card meta">
          <h4>${p.title} <span style="font-size:0.8em;opacity:0.6">(${p.year})</span></h4>
          <p>${p.desc[currentLang] || p.desc['es']}</p>
          <div style="margin-top:8px;font-size:12px;color:var(--accent)">
            ${p.tags.join(' · ')}
          </div>
        </div>
      `;
      
      // Evento click para abrir detalles (placeholder logic)
      card.addEventListener('click', () => {
        console.log('Abrir detalle proyecto:', p.id);
        // Aquí podrías expandir la lógica para abrir un modal
      });

      grid.appendChild(card);
    });

    projectsContainer.appendChild(grid);

    // Una vez generado el DOM, iniciamos la carga asíncrona de imágenes
    initLazyLoader();
  }

  /**
   * Carga asíncrona: Observa cuando los elementos entran en pantalla
   * y recién ahí asigna el 'src' real.
   */
  function initLazyLoader() {
    const lazyItems = document.querySelectorAll('.lazy-media');
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Lógica para IMAGEN
          if (el.tagName === 'IMG') {
            const src = el.getAttribute('data-src');
            if (src) {
              el.src = src;
              el.removeAttribute('data-src');
            }
          }
          
          // Lógica para VIDEO
          if (el.tagName === 'VIDEO') {
            const poster = el.getAttribute('data-poster');
            if (poster) {
              el.poster = poster;
              el.removeAttribute('data-poster');
            }
            // Buscar sources hijos
            const sources = el.querySelectorAll('source');
            sources.forEach(s => {
              const vSrc = s.getAttribute('data-src');
              if (vSrc) {
                s.src = vSrc;
                s.removeAttribute('data-src');
              }
            });
            el.load(); // Necesario para refrescar el video tras cambiar source
          }

          el.classList.add('loaded'); // Opcional: para CSS fade-in
          obs.unobserve(el);
        }
      });
    }, { rootMargin: "100px" }); // Carga 100px antes de aparecer

    lazyItems.forEach(item => observer.observe(item));
  }

  // -------------------------
  // 3. NAVEGACIÓN Y UI
  // -------------------------
  
  function showSection(targetId) {
    // Ocultar todas
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));

    // Mostrar target
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add('active');

    const activeLink = document.querySelector(`nav a[data-target="${targetId}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  // Event Listeners de Navegación
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      showSection(target);
    });
  });

  // Selector de Idioma
  const langSelector = document.getElementById('lang');
  if (langSelector) {
    langSelector.addEventListener('change', (e) => {
      currentLang = e.target.value;
      renderProjects(); // Re-renderizar para actualizar textos
      // Aquí se podría agregar lógica para actualizar textos estáticos del HTML si fuera necesario
    });
  }

  // -------------------------
  // 4. FORMULARIO CONTACTO
  // -------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const contactStatus = document.getElementById('contactStatus');
      const formData = new FormData(contactForm);
      
      // Convertir FormData a JSON simple
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      try {
        contactStatus.innerText = 'Enviando mensaje...';
        contactStatus.style.color = 'var(--muted)';
        
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          contactStatus.innerText = 'Mensaje enviado correctamente. ¡Gracias!';
          contactStatus.style.color = '#4ade80'; // Green
          contactForm.reset();
        } else {
          contactStatus.innerText = 'Error al enviar. Inténtalo más tarde.';
          contactStatus.style.color = '#ff6b6b'; // Red
        }
      } catch (err) {
        contactStatus.innerText = 'Error de conexión.';
        contactStatus.style.color = '#ff6b6b';
      }
    });
  }

  // -------------------------
  // 5. INICIALIZACIÓN
  // -------------------------
  (async function init() {
    await loadProjects(); // Carga datos (o fallback)
    renderProjects();     // Genera DOM
    // Si la URL tiene un hash, navegar ahí, si no, ir a home
    // (Opcional, pero buena práctica. Por defecto dejamos 'home' activo según HTML)
    
    console.info('Sistema inicializado. Assets cargando asincrónicamente.');
  })();

});