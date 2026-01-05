document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // 1. ESTADO GLOBAL Y CONFIGURACIÓN
  // -------------------------
  let PROJECTS = []; 
  let LANG = 'es';
  const PLACEHOLDER_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  // Elementos del DOM
  const projectsGrid = document.getElementById('projectsGrid') || document.getElementById('projects');
  const detailTitle = document.getElementById('detailTitle');
  const detailMedia = document.getElementById('detailMedia');
  const detailThumbs = document.getElementById('detailThumbs');
  const detailDesc = document.getElementById('detailDesc');
  const detailLinks = document.getElementById('detailLinks');
  const detailDevlog = document.getElementById('detailDevlog');
  const overviewWrap = document.getElementById('detailOverview');
  const devlogWrap = document.getElementById('detailDevlogWrap');

  // -------------------------
  // 2. CARGA DINÁMICA (CORRECCIÓN DE RUTAS 404)
  // -------------------------
  async function fetchJsonSafe(url){ try{ const r = await fetch(url,{cache:'no-store'}); return r.ok ? await r.json() : null; } catch(e){ return null; } }
  async function fetchTextSafe(url){ try{ const r = await fetch(url,{cache:'no-store'}); return r.ok ? await r.text() : null; } catch(e){ return null; } }

  async function loadProjectsFromFolder() {
    // Buscamos el index.json que contiene la lista de todos tus proyectos
    const candidates = ['./projects/', 'projects/', '/projects/'];
    let chosenBase = null; 
    let indexList = null;
    
    for(const base of candidates){
      try { 
        const res = await fetch(base + 'index.json'); 
        if(res.ok){ indexList = await res.json(); chosenBase = base; break; } 
      } catch(e){}
    }
    
    if(!chosenBase || !Array.isArray(indexList)) {
      console.error("No se pudo cargar index.json de la carpeta projects/");
      return;
    }

    const loaded = [];
    for(const entry of indexList) {
      const id = entry.id;
      const projectFolder = chosenBase + encodeURIComponent(id) + '/';
      
      // Intentamos cargar la data específica de cada carpeta
      const dataInfo = await fetchJsonSafe(projectFolder + 'dataInfo.json');
      const descEs = await fetchTextSafe(projectFolder + 'description_es.txt');
      const descEn = await fetchTextSafe(projectFolder + 'description_en.txt');
      const devlogJson = await fetchJsonSafe(projectFolder + 'devlog.json');

      const proj = {
        id: dataInfo?.id || id,
        title: dataInfo?.title || entry.title || id,
        year: dataInfo?.year ?? (entry.year || 0),
        desc: { 
          es: dataInfo?.shortDesc_es || entry.desc_es || '', 
          en: dataInfo?.shortDesc_en || entry.desc_en || '' 
        },
        longDesc: { 
          es: descEs?.trim() || dataInfo?.longDesc_es || '', 
          en: descEn?.trim() || dataInfo?.longDesc_en || '' 
        },
        links: dataInfo?.links || entry.links || {},
        tags: dataInfo?.tags || entry.tags || [],
        platform: dataInfo?.platform || entry.platform || '',
        engine: dataInfo?.engine || entry.engine || '',
        devlog: Array.isArray(devlogJson) ? devlogJson : (devlogJson?.entries || []),
        media: []
      };

      // --- SOLUCIÓN DIRECTA A LAS RUTAS DUPLICADAS ---
      const rawMedia = dataInfo?.media || entry.media || [];
      proj.media = rawMedia.map(m => {
        const n = {...m};
        // Si la ruta ya es absoluta o ya incluye "projects/", no tocamos nada.
        // Si es solo el nombre del archivo (ej: "ss1.jpg"), le ponemos la ruta de la carpeta.
        if(n.src && !n.src.includes('http') && !n.src.includes('projects/')) {
          n.src = projectFolder + n.src;
        }
        if(n.poster && !n.poster.includes('http') && !n.poster.includes('projects/')) {
          n.poster = projectFolder + n.poster;
        }
        return n;
      });

      if(proj.media.length === 0) {
        proj.media.push({ type:'image', src: projectFolder + 'placeholder.png' });
      }
      
      loaded.push(proj);
    }
    PROJECTS = loaded;
  }

  // -------------------------
  // 3. RENDERIZADO CON SPINWHEEL (LAZY LOAD)
  // -------------------------
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const container = entry.target;
      const img = container.querySelector('img[data-src]');
      const spinner = container.querySelector('.thumb-spinner');
      
      if (img) {
        const temp = new Image();
        temp.src = img.dataset.src;
        temp.onload = () => {
          img.src = img.dataset.src;
          img.style.opacity = '1';
          if(spinner) spinner.remove();
        };
        temp.onerror = () => { if(spinner) spinner.style.borderTopColor = 'red'; };
      }
      obs.unobserve(container);
    });
  }, { rootMargin: '200px' });

  function renderProjects() {
    if(!projectsGrid) return;
    projectsGrid.innerHTML = '';

    PROJECTS.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      
      // Thumbnail con Spinner (Spinwheel)
      const thumb = document.createElement('div');
      thumb.className = 'thumb card thumb';
      thumb.style.position = 'relative';
      thumb.innerHTML = `<div class="thumb-spinner"></div>`;
      
      const img = document.createElement('img');
      // Usamos la primera imagen o el poster del primer video como miniatura
      const firstMedia = p.media[0];
      img.dataset.src = firstMedia?.src || firstMedia?.poster || '';
      img.src = PLACEHOLDER_DATA;
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s';
      
      thumb.appendChild(img);

      // Meta con Platform y Engine (Datos de dataInfo.json)
      const meta = document.createElement('div');
      meta.className = 'meta card meta';
      
      const plat = Array.isArray(p.platform) ? p.platform.join(', ') : p.platform;
      const engine = p.engine ? ` | ${p.engine}` : '';

      meta.innerHTML = `
        <h4>${p.title} <span style="opacity:0.5; font-size:0.8em">(${p.year})</span></h4>
        <div style="font-size:11px; color:var(--accent); margin-bottom:6px; font-weight:bold; text-transform:uppercase">
          ${plat}${engine}
        </div>
        <p>${p.desc[LANG] || p.desc['es'] || ''}</p>
        <div class="tags" style="margin-top:8px">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      `;

      card.appendChild(thumb);
      card.appendChild(meta);
      
      card.onclick = () => openDetail(p.id);
      
      projectsGrid.appendChild(card);
      lazyObserver.observe(thumb);
    });
  }

  // -------------------------
  // 4. LÓGICA DE DETALLE (PROYECTOS)
  // -------------------------
  function openDetail(id) {
    const p = PROJECTS.find(x => x.id === id);
    if(!p) return;

    detailTitle.textContent = p.title;
    detailDesc.textContent = p.longDesc[LANG] || p.desc[LANG] || "";
    detailMedia.innerHTML = '';
    detailThumbs.innerHTML = '';
    detailLinks.innerHTML = '';
    detailDevlog.innerHTML = '';

    // Mostrar el primer elemento media
    const first = p.media[0];
    if(first?.type === 'video' && first.src !== 'PLACEHOLDER_VIDEO'){
      detailMedia.innerHTML = `<video src="${first.src}" controls autoplay style="width:100%; border-radius:8px;"></video>`;
    } else {
      detailMedia.innerHTML = `<img src="${first?.src || first?.poster}" style="width:100%; border-radius:8px">`;
    }

    // Miniaturas para cambiar el media principal
    p.media.forEach(m => {
      const t = document.createElement('img');
      t.src = m.poster || m.src;
      t.style.cssText = "width:80px; height:50px; object-fit:cover; cursor:pointer; border-radius:4px; opacity:0.7; transition:0.2s;";
      t.onclick = () => {
        detailMedia.innerHTML = m.type === 'video' 
          ? `<video src="${m.src}" controls autoplay style="width:100%; border-radius:8px;"></video>`
          : `<img src="${m.src}" style="width:100%; border-radius:8px">`;
      };
      t.onmouseenter = () => t.style.opacity = "1";
      t.onmouseleave = () => t.style.opacity = "0.7";
      detailThumbs.appendChild(t);
    });

    // Enlaces dinámicos
    if(p.links.itch){
      const a = document.createElement('a'); a.href = p.links.itch; a.className = 'cta'; a.target = '_blank'; a.textContent = 'Ver en Itch.io';
      detailLinks.appendChild(a);
    }
    if(p.links.download){
      const a = document.createElement('a'); a.href = p.links.download; a.className = 'cta'; a.target = '_blank'; a.textContent = 'Descargar';
      a.style.background = 'var(--glass)'; 
      detailLinks.appendChild(a);
    }

    // Devlog (si existe)
    if(p.devlog.length > 0) {
      p.devlog.forEach(entry => {
        const li = document.createElement('li'); li.textContent = entry;
        detailDevlog.appendChild(li);
      });
    }

    showSection('detail');
    window.scrollTo(0,0);
  }

  // -------------------------
  // 5. NAVEGACIÓN Y EVENTOS
  // -------------------------
  function showSection(id){
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    
    const link = document.querySelector(`nav a[data-target="${id}"]`);
    if(link) link.classList.add('active');
  }

  document.querySelectorAll('nav a[data-target]').forEach(a => {
    a.onclick = (e) => { e.preventDefault(); showSection(a.dataset.target); };
  });

  const backBtn = document.getElementById('backToProjects');
  if(backBtn) backBtn.onclick = () => showSection('projects');

  const langSel = document.getElementById('lang');
  if(langSel) langSel.onchange = (e) => { 
    LANG = e.target.value; 
    renderProjects(); 
  };

  // -------------------------
  // 6. INICIALIZACIÓN
  // -------------------------
  (async function init(){
    await loadProjectsFromFolder();
    renderProjects();
    showSection('home');
    console.log('Sistema inicializado correctamente.');
  })();
});