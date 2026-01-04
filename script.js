document.addEventListener('DOMContentLoaded', () => {

  // --- Obtén la lista de proyectos desde donde exista (no sobrescribimos nada) ---
  let projectsData = null;
  if (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) {
    projectsData = PROJECTS;
  } else if (window.PROJECTS && Array.isArray(window.PROJECTS)) {
    projectsData = window.PROJECTS;
  } else {
    projectsData = null; // fallback: intentaremos cargar index.json más abajo
  }

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main .section');
  const projectsGrid = document.getElementById('projectsGrid');
  const homeProjectsBtn = document.getElementById('homeProjectsBtn');

  const detailTitle = document.getElementById('detailTitle');
  const detailMedia = document.getElementById('detailMedia');
  const detailThumbs = document.getElementById('detailThumbs');
  const detailDesc = document.getElementById('detailDesc');
  const detailLinks = document.getElementById('detailLinks');
  const detailDevlog = document.getElementById('detailDevlog');

  const tabOverview = document.getElementById('tabOverview');
  const tabDevlog = document.getElementById('tabDevlog');
  const overviewWrap = document.getElementById('detailOverview');
  const devlogWrap = document.getElementById('detailDevlogWrap');

  let LANG = 'es';
  const PLACEHOLDER_IMG = 'images/placeholder_thumb.jpg';
  const PLACEHOLDER_DATA_URI = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  // safe fetch helpers
  async function fetchJsonSafe(url) {
    try {
      const r = await fetch(url, {cache: 'no-store'});
      if (!r.ok) return null;
      return await r.json();
    } catch (e) { return null; }
  }

  async function tryLoadIndexJson() {
    const candidates = ['./projects/index.json', 'projects/index.json', '/projects/index.json'];
    for (const c of candidates) {
      try {
        const res = await fetch(c, {cache:'no-store'});
        if (!res.ok) continue;
        const json = await res.json();
        if (Array.isArray(json) && json.length) return {data: json, base: c.replace(/index\.json$/,'')};
      } catch (e) { continue; }
    }
    return null;
  }

  function showSection(id) {
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  // attach nav handlers
  navLinks.forEach(l=>{
    l.addEventListener('click', e=>{
      e.preventDefault();
      const t = l.dataset.target;
      if (t) showSection(t);
    });
  });

  if (homeProjectsBtn) {
    homeProjectsBtn.addEventListener('click', e=>{
      e.preventDefault();
      showSection('projects');
    });
  }

  // If a global openDetail function exists, use it; otherwise provide a non-destructive fallback.
  const externalOpenDetail = (typeof window.openDetail === 'function') ? window.openDetail : null;

  function localOpenDetail(id) {
    // Minimal fallback: show detail section and set title if possible.
    const p = (projectsData || []).find(x => x.id === id);
    if (!p) {
      showSection('detail');
      return;
    }
    if (detailTitle) detailTitle.textContent = p.title || '';
    if (detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';
    if (detailMedia) detailMedia.innerHTML = '';
    if (detailThumbs) detailThumbs.innerHTML = '';
    if (detailLinks) detailLinks.innerHTML = '';
    if (detailDevlog) detailDevlog.innerHTML = '';
    // basic preview
    const main = (p.media && p.media.length) ? p.media[0] : null;
    if (main && main.type === 'image') {
      const im = document.createElement('img'); im.src = main.src || PLACEHOLDER_IMG; im.style.width = '100%'; detailMedia.appendChild(im);
    } else {
      detailMedia.innerHTML = '<div style="height:320px;background:#0b0d12;display:flex;align-items:center;justify-content:center;color:var(--muted)">Preview disponible</div>';
    }
    // devlog list
    (p.devlog || []).forEach(d => {
      const li = document.createElement('li'); li.innerText = d; detailDevlog.appendChild(li);
    });
    if (overviewWrap && devlogWrap) {
      overviewWrap.style.display = 'block';
      devlogWrap.style.display = 'none';
      if (tabOverview) tabOverview.style.background = '';
      if (tabDevlog) tabDevlog.style.background = '#1a2333';
    }
    showSection('detail');
  }

  function openDetailProxy(id) {
    if (externalOpenDetail) {
      try { externalOpenDetail(id); return; } catch (e) { console.error('external openDetail failed, using local fallback', e); }
    }
    localOpenDetail(id);
  }

  window.openDetail = openDetailProxy;

  // --- Render cards immediately (no waiting for images) ---
  function renderProjectsImmediate(list) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    const frag = document.createDocumentFragment();

    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.tabIndex = 0;

      // click/keyboard to open (use proxy to avoid overwriting other function)
      card.addEventListener('click', () => openDetailProxy(p.id));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetailProxy(p.id); } });

      // thumb container
      const thumb = document.createElement('div'); thumb.className = 'thumb';
      thumb.style.position = 'relative';

      const img = document.createElement('img');
      img.alt = p.title || '';
      img.src = PLACEHOLDER_DATA_URI; // tiny placeholder, avoids layout reflow
      img.style.width = '100%';
      thumb.appendChild(img);

      const spinner = document.createElement('div');
      spinner.className = 'thumb-spinner';
      thumb.appendChild(spinner);

      // meta
      const meta = document.createElement('div');
      meta.className = 'meta';
      const titleHtml = `<h4>${p.title || 'Untitled'} <span style="font-weight:600;color:var(--muted);font-size:13px">(${p.year||''})</span></h4>`;
      const descText = (p.desc && p.desc[LANG]) ? p.desc[LANG] : ((p.desc && p.desc.es) ? p.desc.es : '');
      meta.innerHTML = `${titleHtml}<p>${descText || ''}</p><div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>`;

      // title clickable (stopPropagation to avoid double)
      const titleEl = meta.querySelector('h4');
      if (titleEl) {
        titleEl.style.cursor = 'pointer';
        titleEl.addEventListener('click', (e) => { e.stopPropagation(); openDetailProxy(p.id); });
      }

      // append
      card.appendChild(thumb);
      card.appendChild(meta);
      frag.appendChild(card);

      // --- async load image/poster/video AFTER card inserted ---
      (function loadMediaAsync(proj, imgEl, spinnerEl, thumbEl) {
        // determine intended image/poster
        const imageMedia = (proj.media||[]).find(m => m.type === 'image');
        const videoMedia = (proj.media||[]).find(m => m.type === 'video');
        const intended = (videoMedia && videoMedia.poster) ? videoMedia.poster : (imageMedia && imageMedia.src) ? imageMedia.src : null;
        if (intended) {
          const loader = new Image();
          loader.onload = () => {
            imgEl.src = intended;
            if (spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl);
          };
          loader.onerror = () => {
            // keep placeholder and remove spinner
            if (spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl);
          };
          loader.src = intended;
        } else {
          // no poster/image: remove spinner quickly
          if (spinnerEl && spinnerEl.parentNode) setTimeout(()=>spinnerEl.parentNode.removeChild(spinnerEl), 200);
        }

        // if video with real src, create a video element but do not set src yet (to avoid immediate download)
        if (videoMedia && videoMedia.src && videoMedia.src !== 'PLACEHOLDER_VIDEO') {
          const v = document.createElement('video');
          v.muted = true; v.loop = true; v.preload = 'metadata';
          v.style.position = 'absolute'; v.style.top = '0'; v.style.left = '0';
          v.style.width = '100%'; v.style.height = '100%'; v.style.objectFit = 'cover'; v.style.display = 'none';
          thumbEl.appendChild(v);
          // hover handlers
          thumbEl.addEventListener('mouseenter', () => {
            if (!v.src) v.src = videoMedia.src;
            imgEl.style.display = 'none';
            v.style.display = 'block';
            v.play().catch(()=>{});
          });
          thumbEl.addEventListener('mouseleave', () => {
            v.pause();
            v.style.display = 'none';
            imgEl.style.display = 'block';
          });
          // click toggles on touch devices
          thumbEl.addEventListener('click', (ev) => {
            // stopPropagation already handled by card click - but toggles video first
            ev.stopPropagation();
            if (!v.src) v.src = videoMedia.src;
            if (v.paused) {
              imgEl.style.display = 'none';
              v.style.display = 'block';
              v.play().catch(()=>{});
            } else {
              v.pause();
              v.style.display = 'none';
              imgEl.style.display = 'block';
            }
          });
        }
      })(p, img, spinner, thumb);
    });

    projectsGrid.appendChild(frag);
  }

  // If we already had projectsData (from inline script), render immediately.
  // Otherwise try to fetch index.json and build projectsData then render.
  (async function bootstrap() {
    if (projectsData && Array.isArray(projectsData) && projectsData.length > 0) {
      renderProjectsImmediate(projectsData);
      showSection('home');
      return;
    }

    // try to fetch projects/index.json (non-blocking, but we will await result)
    const idx = await tryLoadIndexJson();
    if (idx && Array.isArray(idx.data) && idx.data.length > 0) {
      // if index.json exists, transform entries into minimal PROJECT objects expected by render
      const loaded = idx.data.map(entry => {
        return {
          id: entry.id || (entry.title || '').toLowerCase().replace(/[^a-z0-9]+/ig,'-'),
          title: entry.title || entry.id || 'Untitled',
          year: entry.year || '',
          desc: { es: entry.shortDesc_es || '', en: entry.shortDesc_en || '' },
          longDesc: { es: entry.longDesc_es || '', en: entry.longDesc_en || '' },
          links: entry.links || {},
          media: Array.isArray(entry.media) ? entry.media : [],
          tags: entry.tags || [],
          devlog: entry.devlog || []
        };
      });
      projectsData = loaded;
      renderProjectsImmediate(projectsData);
      showSection('home');
      return;
    }

    // no inline or remote index.json -> try fallback: render empty but keep UI usable
    projectsData = projectsData || [];
    renderProjectsImmediate(projectsData);
    showSection('home');
  })();

  // Tabs handlers (if exist)
  if (tabOverview) {
    tabOverview.addEventListener('click', (e) => {
      e.preventDefault();
      if (overviewWrap) overviewWrap.style.display = 'block';
      if (devlogWrap) devlogWrap.style.display = 'none';
      if (tabOverview) tabOverview.style.background = 'var(--accent)';
      if (tabDevlog) tabDevlog.style.background = '#1a2333';
    });
  }
  if (tabDevlog) {
    tabDevlog.addEventListener('click', (e) => {
      e.preventDefault();
      if (overviewWrap) overviewWrap.style.display = 'none';
      if (devlogWrap) devlogWrap.style.display = 'block';
      if (tabDevlog) tabDevlog.style.background = 'var(--accent)';
      if (tabOverview) tabOverview.style.background = '#1a2333';
    });
  }

  const backBtn = document.getElementById('backToProjects');
  if (backBtn) backBtn.addEventListener('click', (e) => { e.preventDefault(); showSection('projects'); });

});
