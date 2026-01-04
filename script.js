document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // 1. DATOS Y ESTADO GLOBAL
  // -------------------------
  
  // Lista completa de proyectos (Fallback)
  const PROJECTS_FALLBACK = [
    { 
      id: 'piratepenguin', 
      title: 'Pirate Penguin / Forja de Almas', 
      year: 2024,
      desc: { es: 'Juego de acción con fuerte foco en combate.', en: 'Action game focused on combat.' },
      longDesc: { es: 'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en: 'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links: { itch: '#', download: '#' },
      media: [ { type: 'image', src: 'images/pirate_thumb.jpg' }, { type: 'video', src: 'PLACEHOLDER_VIDEO', poster: 'images/pirate_poster.jpg' } ],
      tags: ['Action', 'Unity'],
      platform: 'PC', 
      engine: 'Unity',
      devlog: ['Inicio del proyecto', 'Primer prototipo de combate', 'Iteraciones de UI y shaders']
    },
    { 
      id: 'axiebrawl', 
      title: 'Pirate Penguin (Axie Brawl)', 
      year: 2023,
      desc: { es: 'MOBA competitivo con énfasis en partidas rápidas.', en: 'Competitive MOBA focused on fast matches.' },
      longDesc: { es: 'Participación en desarrollo MOBA con foco en C#, gameplay y sistemas multiplayer.', en: 'MOBA development with focus on C#, gameplay and multiplayer systems.' },
      links: { itch: '#', download: '#' },
      media: [ { type: 'image', src: 'images/axie_thumb.jpg' } ],
      tags: ['MOBA', 'Multiplayer'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'llamageddon', 
      title: 'Llamageddon', 
      year: 2020,
      desc: { es: 'Juego arcade meme con humor absurdo.', en: 'Arcade meme game with absurd humor.' },
      longDesc: { es: 'Juego corto de acción arcade desarrollado como experimento creativo.', en: 'Short arcade action game developed as a creative experiment.' },
      links: { itch: 'https://lexanos.itch.io/llamageddon', download: 'https://lexanos.itch.io/llamageddon' },
      media: [ { type: 'video', src: 'PLACEHOLDER_VIDEO', poster: 'images/llamageddon_poster.jpg' }, { type: 'image', src: 'images/llamageddon_ss1.jpg' } ],
      tags: ['Arcade'],
      platform: 'PC', engine: 'Unity',
      devlog: ['Concepto inicial', 'Publicación en itch.io']
    },
    { 
      id: 'artool', 
      title: 'Artool', 
      year: 2019,
      desc: { es: 'Herramienta creativa para lluvia de ideas.', en: 'Creative brainstorming tool.' },
      longDesc: { es: 'Herramienta experimental para procesos creativos y concept art.', en: 'Experimental tool for creative processes and concept art.' },
      links: { itch: 'https://lexanos.itch.io/artool', download: 'https://lexanos.itch.io/artool' },
      media: [ { type: 'image', src: 'images/artool_thumb.jpg' } ],
      tags: ['Tool'],
      platform: 'PC', engine: 'Unity',
      devlog: ['Diseño de herramienta', 'Release público']
    },
    { 
      id: 'agentrabbit', 
      title: 'Agent Rabbit - Climber Ninja', 
      year: 2018,
      desc: { es: 'Juego mobile casual de reflejos.', en: 'Casual reflex-based mobile game.' },
      longDesc: { es: 'Juego mobile enfocado en escalada, timing y reflejos rápidos.', en: 'Mobile game focused on climbing, timing and fast reflexes.' },
      links: { itch: 'https://lexanos.itch.io/agent-rabbit-climber-ninja', download: 'https://lexanos.itch.io/agent-rabbit-climber-ninja' },
      media: [ { type: 'image', src: 'images/agentrabbit_thumb.jpg' }, { type: 'video', src: 'PLACEHOLDER_VIDEO' } ],
      tags: ['Mobile'],
      platform: 'Android', engine: 'Unity',
      devlog: ['Prototipo', 'Optimización mobile', 'Release']
    },
    { 
      id: 'wildroad', 
      title: 'Wild Road', 
      year: 2019,
      desc: { es: 'Beat em up clásico con estética contemporánea.', en: 'Classic beat em up with contemporary aesthetics.' },
      longDesc: { es: 'Wild Road es un beat em up con niveles diseñados para combate fluido y mecánicas acumulativas.', en: 'Wild Road is a beat em up with levels designed for fluid combat and cumulative mechanics.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/wildroad_thumb.jpg' } ],
      tags: ['BeatEmUp'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'pachis', 
      title: 'Pachis', 
      year: 2020,
      desc: { es: 'Juego educativo.', en: 'Educational game.' },
      longDesc: { es: 'Pachis es un juego educativo pensado para enseñar conceptos básicos mediante minijuegos.', en: 'Pachis is an educational game designed to teach basic concepts through minigames.' },
      links: { itch: 'https://lexanos.itch.io/pachis', download: 'https://lexanos.itch.io/pachis' },
      media: [ { type: 'image', src: 'images/pachis_thumb.jpg' } ],
      tags: ['Educational'],
      platform: 'Web/PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'greenbrush', 
      title: 'Green Brush', 
      year: 2018,
      desc: { es: 'Strategy game.', en: 'Strategy game.' },
      longDesc: { es: 'Green Brush es un juego de estrategia con componentes educativos y resolución por turnos.', en: 'Green Brush is a strategy game with educational components and turn-based resolution.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/greenbrush_thumb.jpg' } ],
      tags: ['Strategy'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'thebeyond', 
      title: 'The Beyond', 
      year: 2017,
      desc: { es: '3D Adventure.', en: '3D Adventure.' },
      longDesc: { es: 'The Beyond explora mecánicas 3D y narrativa ambiental en un mundo semi abierto.', en: 'The Beyond explores 3D mechanics and environmental narrative in a semi-open world.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/thebeyond_thumb.jpg' } ],
      tags: ['3D'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'alphabet', 
      title: 'Alphabet', 
      year: 2015,
      desc: { es: 'Platform Puzzle.', en: 'Platform Puzzle.' },
      longDesc: { es: 'Alphabet es un puzzle-platform premiado por su diseño intuitivo.', en: 'Alphabet is a prize-winning puzzle-platformer known for intuitive design.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/alphabet_thumb.jpg' } ],
      tags: ['Puzzle'],
      platform: 'PC', engine: 'Construct 2',
      devlog: []
    },
    { 
      id: 'drunkaholic', 
      title: 'Drunkaholic', 
      year: 2015,
      desc: { es: 'Casual 3D.', en: 'Casual 3D game.' },
      longDesc: { es: 'Proyecto 3D casual orientado a la diversión y experimentación.', en: 'Casual 3D project oriented to fun and experimentation.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/drunkaholic_thumb.jpg' } ],
      tags: ['Simulation'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'samuraiblade', 
      title: 'Samurai Blade', 
      year: 2024,
      desc: { es: 'Roguelite arcade basado en piedra-papel-tijera.', en: 'Roguelite arcade based on rock-paper-scissors combat.' },
      longDesc: { es: 'Combate roguelite con mecánicas de piedra-papel-tijera como núcleo.', en: 'Roguelite combat with rock-paper-scissors mechanics at its core.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/samuraiblade_thumb.jpg' } ],
      tags: ['Action'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    },
    { 
      id: 'zombieattack', 
      title: 'Zombie Attack', 
      year: 2020,
      desc: { es: 'Shooter apocalíptico.', en: 'Apocalyptic shooter.' },
      longDesc: { es: 'Modo endurance apocalíptico con hordas de enemigos.', en: 'Endurance apocalyptic mode with hordes of enemies.' },
      links: { itch: '', download: '' },
      media: [ { type: 'image', src: 'images/zombieattack_thumb.jpg' } ],
      tags: ['Action'],
      platform: 'PC', engine: 'Unity',
      devlog: []
    }
  ];

  let PROJECTS = PROJECTS_FALLBACK.slice();
  let LANG = 'es';

  // -------------------------
  // 2. ELEMENTOS DEL DOM
  // -------------------------
  const projectsGrid = document.getElementById('projectsGrid') || document.getElementById('projects');
  
  // Elementos Detail
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

  // Utils
  const PLACEHOLDER_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // Pixel transparente
  const LAZY_ROOT_MARGIN = '300px';

  // -------------------------
  // 3. UTILS & CARGA (No tocar lógica de carpetas)
  // -------------------------
  async function fetchJsonSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.json(); } catch(e){ return null; }
  }
  async function fetchTextSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.text(); } catch(e){ return null; }
  }

  async function loadProjectsFromFolder(){
    const candidates = ['./projects/', 'projects/', '/projects/'];
    let chosenBase = null;
    let idx = null;
    
    // Buscar index.json
    for(const base of candidates){
      const idxUrl = base + 'index.json';
      try{
        const res = await fetch(idxUrl, {cache: "no-store"});
        if(res && res.ok){
          try{ idx = await res.json(); chosenBase = base; break; } catch(e){ idx = null; }
        }
      }catch(e){}
    }
    
    if(!chosenBase || !Array.isArray(idx) || idx.length === 0) return;

    const loaded = [];
    for(const entry of idx){
      if(!entry || !entry.id) continue;
      const id = entry.id;
      const base = chosenBase + encodeURIComponent(id) + '/';
      
      const dataInfo = await fetchJsonSafe(base + 'dataInfo.json');
      const descEs = await fetchTextSafe(base + 'description_es.txt');
      const descEn = await fetchTextSafe(base + 'description_en.txt');
      const devlogJson = await fetchJsonSafe(base + 'devlog.json');

      const proj = {
        id: dataInfo?.id || id,
        title: dataInfo?.title || entry.title || id,
        year: dataInfo?.year || entry.year || '',
        desc: { es: dataInfo?.shortDesc_es || entry.desc_es || '', en: dataInfo?.shortDesc_en || entry.desc_en || '' },
        longDesc: { es: descEs ? descEs.trim() : (dataInfo?.longDesc_es || ''), en: descEn ? descEn.trim() : (dataInfo?.longDesc_en || '') },
        links: dataInfo?.links || entry.links || {},
        media: [],
        tags: dataInfo?.tags || entry.tags || [],
        platform: dataInfo?.platform || entry.platform || '',
        engine: dataInfo?.engine || entry.engine || '',
        devlog: Array.isArray(devlogJson) ? devlogJson.slice() : (Array.isArray(devlogJson?.entries) ? devlogJson.entries.slice() : [])
      };

      // Normalizar rutas media
      const rawMedia = (dataInfo?.media && dataInfo.media.length) ? dataInfo.media : (entry.media || []);
      if(rawMedia.length){
        proj.media = rawMedia.map(m => {
          const n = Object.assign({}, m);
          if(n.src && !n.src.match(/^https?:\/\//) && !n.src.startsWith('/') && !n.src.startsWith(base)){
            n.src = base + n.src;
          }
          if(n.poster && !n.poster.match(/^https?:\/\//) && !n.poster.startsWith('/') && !n.poster.startsWith(base)){
            n.poster = base + n.poster;
          }
          return n;
        });
      } else {
        proj.media.push({ type: 'image', src: base + 'placeholder.png' });
      }
      loaded.push(proj);
    }
    if(loaded.length > 0) PROJECTS = loaded;
  }

  // -------------------------
  // 4. INYECCION DE ESTILOS (SPINNER)
  // -------------------------
  if (!document.getElementById('injected-spinner-style')) {
    const s = document.createElement('style');
    s.id = 'injected-spinner-style';
    s.textContent = `
      .thumb-spinner {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%,-50%);
        width: 32px; height: 32px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top-color: var(--accent, #4da3ff);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 2;
      }
      @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
      .thumb img { transition: opacity 0.3s ease; }
    `;
    document.head.appendChild(s);
  }

  // -------------------------
  // 5. OBSERVER (LAZY LOADING)
  // -------------------------
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const container = entry.target;
      
      const img = container.querySelector('img[data-src]');
      const spinner = container.querySelector('.thumb-spinner');
      
      if (img) {
        const temp = new Image();
        temp.onload = () => {
          img.src = img.dataset.src; // Asigna ruta real
          img.removeAttribute('data-src');
          img.style.opacity = '1'; // Fade in
          if(spinner) spinner.remove(); // Quita spinner
        };
        temp.onerror = () => {
           if(spinner) spinner.style.borderTopColor = 'red'; // Feedback error
        };
        temp.src = img.dataset.src;
      }

      // Video lógica (si aplica)
      const vid = container.querySelector('video[data-src]');
      if (vid) {
          vid.src = vid.dataset.src;
          vid.removeAttribute('data-src');
      }

      observer.unobserve(container);
    });
  }, { rootMargin: LAZY_ROOT_MARGIN });


  // -------------------------
  // 6. RENDERIZADO DE CARDS (Espacios + Eventos)
  // -------------------------
  function renderProjects(){
    if(!projectsGrid){ console.warn('projectsGrid no encontrado'); return; }
    projectsGrid.innerHTML = '';
    
    // Asegurar grid layout
    if(!projectsGrid.classList.contains('grid')) projectsGrid.classList.add('grid');

    PROJECTS.forEach(p => {
      try {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', p.id);

        // --- A. Thumbnail con Spinner ---
        const thumb = document.createElement('div');
        thumb.className = 'thumb card thumb'; // Clases originales
        thumb.style.position = 'relative'; 
        
        // Buscar imagen/poster principal
        const vidRef = (p.media||[]).find(m=>m.type==='video');
        const imgRef = (p.media||[]).find(m=>m.type==='image');
        let realSrc = 'images/placeholder.jpg';
        
        if(imgRef && imgRef.src) realSrc = imgRef.src;
        else if(vidRef && vidRef.poster) realSrc = vidRef.poster;

        // Elemento Spinner
        const spinner = document.createElement('div');
        spinner.className = 'thumb-spinner';

        // Elemento Imagen (oculta al inicio con opacidad o src falso)
        const img = document.createElement('img');
        img.src = PLACEHOLDER_DATA; // 1x1 transparente
        img.dataset.src = realSrc;   // Ruta real para el observer
        img.alt = p.title;
        img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover';
        img.style.opacity = '0'; // Se pone en 1 al cargar

        thumb.appendChild(spinner);
        thumb.appendChild(img);

        // --- B. Meta Info (Tags, Platform, Engine) ---
        const meta = document.createElement('div');
        meta.className = 'meta card meta';

        const title = p.title || 'Untitled';
        const year = p.year || '';
        const desc = (p.desc && p.desc[LANG]) ? p.desc[LANG] : (p.desc?.es || '');
        
        // Construcción de línea técnica (Platform · Engine)
        let techInfo = '';
        if(p.platform || p.engine) {
            const plat = p.platform ? `<span>${p.platform}</span>` : '';
            const sep = (p.platform && p.engine) ? ' · ' : '';
            const eng = p.engine ? `<span>${p.engine}</span>` : '';
            techInfo = `<div style="font-size:11px; color:var(--accent); margin-bottom:4px; opacity:0.9;">${plat}${sep}${eng}</div>`;
        }

        meta.innerHTML = `
          <h4>${title} <span style="font-size:0.8em; opacity:0.6">(${year})</span></h4>
          ${techInfo}
          <p>${desc}</p>
          <div class="tags" style="margin-top:8px; display:flex; flex-wrap:wrap; gap:6px;">
             ${ (p.tags||[]).map(t => `<span style="background:rgba(255,255,255,0.05); padding:2px 6px; border-radius:4px; font-size:11px;">${t}</span>`).join('') }
          </div>
        `;

        card.appendChild(thumb);
        card.appendChild(meta);

        // --- C. Evento Global Click (Abre Overview) ---
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Evitar que dispare si clickea un link externo dentro de la card (si lo hubiera)
            if(e.target.tagName === 'A') return;
            openDetail(p.id);
        });

        // Evento Teclado (Accesibilidad)
        card.tabIndex = 0;
        card.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openDetail(p.id);
            }
        });

        projectsGrid.appendChild(card);

        // Iniciar observación para Lazy Load
        lazyObserver.observe(thumb);

      } catch(err) {
        console.error('Error render project:', p.id, err);
      }
    });
  }

  // -------------------------
  // 7. ABRIR DETALLE (Funcionalidad Clave)
  // -------------------------
  function openDetail(id){
    const p = PROJECTS.find(x => x.id === id);
    if(!p) return;

    console.log('Abriendo detalle:', id); // Debug

    // Llenar datos
    if(detailTitle) detailTitle.textContent = p.title;
    if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : ((p.desc && p.desc[LANG]) ? p.desc[LANG] : '');
    
    // Limpiar zonas media
    if(detailMedia) detailMedia.innerHTML = '';
    if(detailThumbs) detailThumbs.innerHTML = '';
    if(detailLinks) detailLinks.innerHTML = '';
    if(detailDevlog) detailDevlog.innerHTML = '';

    // Media Principal
    const mainVid = (p.media||[]).find(m => m.type === 'video');
    const mainImg = (p.media||[]).find(m => m.type === 'image');

    // Prioridad: Video > Imagen
    if(mainVid && mainVid.src !== 'PLACEHOLDER_VIDEO'){
        const v = document.createElement('video');
        v.src = mainVid.src; v.controls = true; v.style.width='100%'; v.style.maxHeight='400px'; v.style.background='#000';
        detailMedia.appendChild(v);
    } else if(mainImg){
        const i = document.createElement('img');
        i.src = mainImg.src; i.style.width='100%'; i.style.borderRadius='8px';
        detailMedia.appendChild(i);
    }

    // Miniaturas (Thumbs)
    (p.media || []).forEach(m => {
        const div = document.createElement('div');
        div.style.cssText = 'width:80px; height:50px; background:#222; margin-right:8px; cursor:pointer; overflow:hidden; border-radius:4px; opacity:0.6; transition:opacity 0.2s;';
        div.onmouseenter = () => div.style.opacity = '1';
        div.onmouseleave = () => div.style.opacity = '0.6';

        const content = m.type==='video' ? document.createElement('video') : document.createElement('img');
        content.src = m.src || m.poster;
        content.style.cssText = 'width:100%; height:100%; object-fit:cover;';
        div.appendChild(content);

        // Click en miniatura cambia el Main
        div.addEventListener('click', () => {
            detailMedia.innerHTML = '';
            if(m.type === 'video'){
                const v = document.createElement('video'); v.src = m.src; v.controls = true; v.style.width='100%'; v.autoplay = true;
                detailMedia.appendChild(v);
            } else {
                const i = document.createElement('img'); i.src = m.src; i.style.width='100%';
                detailMedia.appendChild(i);
            }
        });
        detailThumbs.appendChild(div);
    });

    // Links
    if(p.links){
        if(p.links.download){
            const btn = document.createElement('a');
            btn.href = p.links.download; btn.target = '_blank'; btn.className = 'cta'; btn.textContent = 'Jugar / Descargar';
            detailLinks.appendChild(btn);
        }
        if(p.links.itch){
            const btn = document.createElement('a');
            btn.href = p.links.itch; btn.target = '_blank'; btn.className = 'cta'; btn.textContent = 'Itch.io';
            btn.style.background = 'transparent'; btn.style.border = '1px solid var(--accent)'; btn.style.marginLeft = '10px';
            detailLinks.appendChild(btn);
        }
    }

    // Devlog
    (p.devlog || []).forEach(d => {
        const li = document.createElement('li'); li.textContent = d;
        detailDevlog.appendChild(li);
    });

    // Resetear Tabs
    if(overviewWrap) overviewWrap.style.display = 'block';
    if(devlogWrap) devlogWrap.style.display = 'none';
    
    // Navegar
    showSection('detail');
    window.scrollTo(0,0);
  }

  // -------------------------
  // 8. NAVEGACIÓN GENERAL
  // -------------------------
  function showSection(id){
    document.querySelectorAll('main .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));

    const target = document.getElementById(id);
    if(target) target.classList.add('active');

    const link = document.querySelector(`nav a[data-target="${id}"]`);
    if(link) link.classList.add('active');
  }

  // Event Listeners Nav
  document.querySelectorAll('nav a[data-target]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(a.dataset.target);
    });
  });

  // Botón Volver
  const backBtn = document.getElementById('backToProjects');
  if(backBtn) backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('projects');
  });

  // Selector Idioma
  const langSel = document.getElementById('lang');
  if(langSel) langSel.addEventListener('change', (e) => {
      LANG = e.target.value;
      renderProjects(); // Re-renderizar textos
      // Opcional: recargar detalle si está abierto
  });

  // -------------------------
  // 9. FORMULARIO CONTACTO
  // -------------------------
  const contactForm = document.getElementById('contactForm');
  let contactStatus = document.getElementById('contactStatus');
  if(!contactStatus && contactForm){
      contactStatus = document.createElement('div');
      contactStatus.id = 'contactStatus';
      contactForm.parentNode.insertBefore(contactStatus, contactForm.nextSibling);
  }

  if(contactForm){
      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          contactStatus.textContent = 'Enviando...';
          contactStatus.style.color = '#888';
          
          const fd = new FormData(contactForm);
          const data = Object.fromEntries(fd.entries());

          try {
              const r = await fetch(contactForm.action, {
                  method: 'POST',
                  headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                  body: JSON.stringify(data)
              });
              if(r.ok){
                  contactStatus.textContent = '¡Mensaje enviado!';
                  contactStatus.style.color = '#4ade80';
                  contactForm.reset();
              } else {
                  contactStatus.textContent = 'Error al enviar.';
                  contactStatus.style.color = '#ff6b6b';
              }
          } catch(err){
              contactStatus.textContent = 'Error de conexión.';
              contactStatus.style.color = '#ff6b6b';
          }
      });
  }

  // -------------------------
  // 10. INIT
  // -------------------------
  (async function init(){
      await loadProjectsFromFolder();
      renderProjects();
      showSection('home');
      console.log('Sistema inicializado correctamente.');
  })();

});