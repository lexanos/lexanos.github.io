document.addEventListener('DOMContentLoaded', () => {

  let PROJECTS = [];

  const projectsGrid = document.getElementById('projectsGrid');
  const sections = document.querySelectorAll('main .section');
  const navLinks = document.querySelectorAll('header nav a[data-target]');

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  /* -------------------------------------------------------
     CARGA REAL DE PROJECTS DESDE JSON (CLAVE)
  ------------------------------------------------------- */
  async function loadProjects() {
    try {
      const res = await fetch('./projects/index.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('index.json not found');

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('index.json is not an array');

      PROJECTS = data;
      window.PROJECTS = data;

      console.info('script: PROJECTS loaded from JSON:', PROJECTS.length);
      renderProjects();

    } catch (err) {
      console.error('script: FAILED to load projects/index.json', err);
      renderEmptyState();
    }
  }

  /* -------------------------------------------------------
     RENDER CARDS (NO BLOQUEANTE)
  ------------------------------------------------------- */
  function renderProjects() {
    projectsGrid.innerHTML = '';

    if (!PROJECTS.length) {
      renderEmptyState();
      return;
    }

    PROJECTS.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = project.id;

      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.innerHTML = `<div class="thumb-spinner"></div>`;

      const img = document.createElement('img');
      img.alt = project.title || '';
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      thumb.appendChild(img);

      const poster = `projects/${project.id}/poster.jpg`;
      loadImageAsync(poster, img, thumb.querySelector('.thumb-spinner'));

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `
        <h4>${project.title} <span style="color:var(--muted)">(${project.year || ''})</span></h4>
        <p>${project.desc?.es || ''}</p>
        <div class="tags">${(project.tags || []).map(t=>`<span>${t}</span>`).join('')}</div>
        <div class="tags platform">${project.platform || ''}</div>
      `;

      card.appendChild(thumb);
      card.appendChild(meta);

      card.addEventListener('click', () => {
        if (typeof window.openDetail === 'function') {
          window.openDetail(project.id);
        }
      });

      projectsGrid.appendChild(card);
    });

    console.info('renderProjects completed. cards:', PROJECTS.length);
  }

  function renderEmptyState() {
    projectsGrid.innerHTML = `
      <div class="card">
        <div class="meta">
          <h4>No projects loaded</h4>
          <p>No se pudo cargar <code>projects/index.json</code></p>
        </div>
      </div>
    `;
  }

  /* -------------------------------------------------------
     ASYNC IMAGE LOADER (NO BLOQUEA)
  ------------------------------------------------------- */
  function loadImageAsync(src, img, spinner){
    const loader = new Image();
    loader.onload = () => {
      img.src = src;
      spinner?.remove();
    };
    loader.onerror = () => {
      img.src = 'projects/placeholder.png';
      spinner?.remove();
    };
    loader.src = src;
  }

  /* -------------------------------------------------------
     INIT
  ------------------------------------------------------- */
  loadProjects();
  showSection('home');
});
