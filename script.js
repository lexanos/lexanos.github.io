document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // 1. DATOS Y ESTADO GLOBAL (RESTAURADO COMPLETO)
  // -------------------------
  const PROJECTS_FALLBACK = [
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      desc:{ es:'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en:'Action game focused on combat, cartoon aesthetics and skill progression.' },
      longDesc:{ es:'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en:'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/pirate_poster.jpg' } ],
      tags:['Action','Unity'],
      platform: 'PC', engine: 'Unity', // Campos explícitos si se desean
      devlog:['Inicio del proyecto','Primer prototipo de combate','Iteraciones de UI y shaders']
    },
    { id:'axiebrawl', title:'Pirate Penguin (Axie Brawl)', year:2023,
      desc:{ es:'MOBA competitivo con énfasis en partidas rápidas y juego en equipo.', en:'Competitive MOBA focused on fast matches and team play.' },
      longDesc:{ es:'Participación en desarrollo MOBA con foco en C#, gameplay y sistemas multiplayer.', en:'MOBA development with focus on C#, gameplay and multiplayer systems.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/axiebrawl_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ],
      tags:['MOBA','Multiplayer'],
      devlog:['Integración de sistemas multiplayer','Balance inicial de personajes']
    },
    { id:'llamageddon', title:'Llamageddon', year:2020,
      desc:{ es:'Juego arcade meme con humor absurdo.', en:'Arcade meme game with absurd humor.' },
      longDesc:{ es:'Juego corto de acción arcade desarrollado como experimento creativo.', en:'Short arcade action game developed as a creative experiment.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon', download:'https://lexanos.itch.io/llamageddon' },
      media:[ { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/llamageddon_poster.jpg' }, { type:'image', src:'images/llamageddon_ss1.jpg' } ],
      tags:['Arcade'],
      devlog:['Concepto inicial','Publicación en itch.io']
    },
    { id:'artool', title:'Artool', year:2019,
      desc:{ es:'Herramienta creativa para lluvia de ideas.', en:'Creative brainstorming tool.' },
      longDesc:{ es:'Herramienta experimental para procesos creativos y concept art.', en:'Experimental tool for creative processes and concept art.' },
      links:{ itch:'https://lexanos.itch.io/artool', download:'https://lexanos.itch.io/artool' },
      media:[ { type:'image', src:'images/artool_thumb.jpg' } ],
      tags:['Tool'],
      devlog:['Diseño de herramienta','Release público']
    },
    { id:'agentrabbit', title:'Agent Rabbit - Climber Ninja', year:2018,
      desc:{ es:'Juego mobile casual de reflejos.', en:'Casual reflex-based mobile game.' },
      longDesc:{ es:'Juego mobile enfocado en escalada, timing y reflejos rápidos.', en:'Mobile game focused on climbing, timing and fast reflexes.' },
      links:{ itch:'https://lexanos.itch.io/agent-rabbit-climber-ninja', download:'https://lexanos.itch.io/agent-rabbit-climber-ninja' },
      media:[ { type:'image', src:'images/agentrabbit_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ],
      tags:['Mobile'],
      devlog:['Prototipo','Optimización mobile','Release']
    },
    { id:'wildroad', title:'Wild Road', year:2019,
      desc:{ es:'Beat em up clásico con estética contemporánea.', en:'Classic beat em up with contemporary aesthetics.' },
      longDesc:{ es:'Wild Road es un beat em up con niveles diseñados para combate fluido y mecánicas acumulativas.', en:'Wild Road is a beat em up with levels designed for fluid combat and cumulative mechanics.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/wildroad_thumb.jpg' } ],
      tags:['BeatEmUp'],
      devlog:[]
    },
    { id:'pachis', title:'Pachis', year:2020,
      desc:{ es:'Juego educativo.', en:'Educational game.' },
      longDesc:{ es:'Pachis es un juego educativo pensado para enseñar conceptos básicos mediante minijuegos.', en:'Pachis is an educational game designed to teach basic concepts through minigames.' },
      links:{ itch:'https://lexanos.itch.io/pachis', download:'https://lexanos.itch.io/pachis' },
      media:[ { type:'image', src:'images/pachis_thumb.jpg' } ],
      tags:['Educational'],
      devlog:[]
    },
    { id:'greenbrush', title:'Green Brush', year:2018,
      desc:{ es:'Strategy game.', en:'Strategy game.' },
      longDesc:{ es:'Green Brush es un juego de estrategia con componentes educativos y resolución por turnos.', en:'Green Brush is a strategy game with educational components and turn-based resolution.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/greenbrush_thumb.jpg' } ],
      tags:['Strategy'],
      devlog:[]
    },
    { id:'thebeyond', title:'The Beyond', year:2017,
      desc:{ es:'3D Adventure.', en:'3D Adventure.' },
      longDesc:{ es:'The Beyond explora mecánicas 3D y narrativa ambiental en un mundo semi abierto.', en:'The Beyond explores 3D mechanics and environmental narrative in a semi-open world.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/thebeyond_thumb.jpg' } ],
      tags:['3D'],
      devlog:[]
    },
    { id:'alphabet', title:'Alphabet', year:2015,
      desc:{ es:'Platform Puzzle.', en:'Platform Puzzle.' },
      longDesc:{ es:'Alphabet es un puzzle-platform premiado por su diseño intuitivo.', en:'Alphabet is a prize-winning puzzle-platformer known for intuitive design.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ],
      tags:['Puzzle'],
      devlog:[]
    },
    { id:'drunkaholic', title:'Drunkaholic', year:2015,
      desc:{ es:'Casual 3D.', en:'Casual 3D game.' },
      longDesc:{ es:'Proyecto 3D casual orientado a la diversión y experimentación.', en:'Casual 3D project oriented to fun and experimentation.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/drunkaholic_thumb.jpg' } ],
      tags:['Simulation'],
      devlog:[]
    },
    { id:'samuraiblade', title:'Samurai Blade : Rock, Paper & Scissors', year:2024,
      desc:{ es:'Roguelite arcade basado en piedra-papel-tijera.', en:'Roguelite arcade based on rock-paper-scissors combat.' },
      longDesc:{ es:'Combate roguelite con mecánicas de piedra-papel-tijera como núcleo.', en:'Roguelite combat with rock-paper-scissors mechanics at its core.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/samuraiblade_thumb.jpg' } ],
      tags:['Action'],
      devlog:[]
    },
    { id:'zombieattack', title:'Zombie Attack Nightmare Endurance Apocalyptic Edition', year:2020,
      desc:{ es:'Shooter apocalíptico.', en:'Apocalyptic shooter.' },
      longDesc:{ es:'Modo endurance apocalíptico con hordas de enemigos.', en:'Endurance apocalyptic mode with hordes of enemies.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/zombieattack_thumb.jpg' } ],
      tags:['Action'],
      devlog:[]
    }
  ];

  // Variables de estado
  let PROJECTS = PROJECTS_FALLBACK.slice();
  let LANG = 'es';

  // -------------------------
  // 2. ELEMENTOS DOM
  // -------------------------
  const projectsGrid = document.getElementById('projectsGrid'); // Asegúrate que tu HTML tenga un div con id="projects" o "projectsGrid"
  
  // Elementos del Modal/Detalle
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

  // Constantes
  const PLACEHOLDER_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const LAZY_ROOT_MARGIN = '300px';

  // -------------------------
  // 3. UTILS & CARGA DE DATOS (FUNCIONALIDAD ORIGINAL)
  // -------------------------
  async function fetchJsonSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.json(); } catch(e){ return null; }
  }
  async function fetchTextSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.text(); } catch(e){ return null; }
  }

  // Lógica para cargar desde carpetas (Restaurada)
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

      // Normalizar rutas de media
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
  // 4. ESTILO DEL SPINNER (INYECCIÓN CSS)
  // -------------------------
  if (!document.getElementById('thumb-spinner-style')) {
    const s = document.createElement('style');
    s.id = 'thumb-spinner-style';
    s.textContent = `
      .thumb-spinner {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%,-50%);
        width: 36px; height: 36px;
        border-radius: 50%;
        border: 4px solid rgba(255,255,255,0.12);
        border-top-color: var(--accent, #4da3ff);
        box-sizing: border-box;
        animation: thumb-spin 1s linear infinite;
        z-index: 5;
        display: flex; align-items: center; justify-content: center;
      }
      @keyframes thumb-spin { from { transform: translate(-50%,-50%) rotate(0deg);} to { transform: translate(-50%,-50%) rotate(360deg);} }
    `;
    document.head.appendChild(s);
  }

  // -------------------------
  // 5. RENDERIZADO ASÍNCRONO (IntersectionObserver)
  // -------------------------
  const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const thumb = entry.target;
      
      // Buscar elementos lazy dentro del thumb
      const img = thumb.querySelector('img[data-src]');
      const vid = thumb.querySelector('video[data-src]');
      
      if (img && img.dataset.src) {
        const real = img.dataset.src;
        const loader = new Image();
        
        loader.onload = () => {
          img.src = real;
          delete img.dataset.src;
          // Remover spinner al cargar exitosamente
          const spinner = thumb.querySelector('.thumb-spinner');
          if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
          img.style.opacity = '1'; // Fade in si se agrega CSS
        };
        
        loader.onerror = () => {
          // Manejo de error visual en el spinner
          const spinner = thumb.querySelector('.thumb-spinner');
          if (spinner) { 
            spinner.textContent = '⚠'; 
            spinner.style.border = '4px solid rgba(255,0,0,0.12)';
          }
        };
        
        loader.src = real;
      }
      
      if (vid && vid.dataset.src) {
        const ds = vid.dataset.src;
        if (ds && ds !== 'PLACEHOLDER_VIDEO') {
          vid.src = ds;
        }
        delete vid.dataset.src;
      }
      
      thumbObserver.unobserve(thumb);
    });
  }, { root: null, rootMargin: LAZY_ROOT_MARGIN, threshold: 0.01 });


  // -------------------------
  // 6. RENDERIZADO PRINCIPAL DE CARDS
  // -------------------------
  function renderProjects(){
    // Intentar buscar el contenedor. Si la ID cambió en HTML, usar fallback.
    const container = projectsGrid || document.getElementById('projects');
    if(!container){ console.warn('Contenedor de proyectos no encontrado'); return; }
    
    container.innerHTML = '';
    
    // Crear la grid si no existe por estilos CSS (opcional, depende de tu CSS)
    if (!container.classList.contains('grid')) container.classList.add('grid');

    for(let i=0; i<PROJECTS.length; i++){
      const p = PROJECTS[i];
      try{
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-project-id', p.id);
        
        // --- SECCIÓN 1: THUMBNAIL + SPINNER ---
        const thumb = document.createElement('div');
        thumb.className = 'thumb card thumb'; // Combina clases para CSS
        thumb.style.position = 'relative';

        // Determinar media inicial (Poster o Imagen)
        const imageMedia = (p.media||[]).find(m => m.type === 'image');
        const videoMedia = (p.media||[]).find(m => m.type === 'video');

        let intendedImg = 'images/placeholder_thumb.jpg';
        if (imageMedia && imageMedia.src) intendedImg = imageMedia.src;
        if (videoMedia && videoMedia.poster) intendedImg = videoMedia.poster;

        // Imagen Placeholder con data-src
        const img = document.createElement('img');
        img.src = PLACEHOLDER_DATA; // 1x1 transparente
        img.alt = p.title || '';
        img.setAttribute('data-src', intendedImg);
        img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'cover'; img.style.display = 'block';

        // Spinner
        const spinner = document.createElement('div');
        spinner.className = 'thumb-spinner';

        thumb.appendChild(spinner);
        thumb.appendChild(img);

        // Video Hover (Opcional, lógica original mantenida)
        if (videoMedia) {
          const vid = document.createElement('video');
          if (videoMedia.src) vid.setAttribute('data-src', videoMedia.src);
          vid.muted = true; vid.loop = true; vid.preload = 'metadata';
          vid.style.position = 'absolute'; vid.style.top = '0'; vid.style.left = '0';
          vid.style.width = '100%'; vid.style.height = '100%'; vid.style.objectFit = 'cover'; vid.style.display = 'none';
          thumb.appendChild(vid);

          // Eventos hover para video
          thumb.addEventListener('mouseenter', () => {
             const ds = vid.getAttribute('data-src');
             if (ds && ds !== 'PLACEHOLDER_VIDEO' && !vid.src) vid.src = ds;
             if (vid.src) { img.style.display = 'none'; vid.style.display = 'block'; vid.play().catch(()=>{}); }
          });
          thumb.addEventListener('mouseleave', () => {
             if (vid.src) { vid.pause(); vid.style.display = 'none'; img.style.display = 'block'; }
          });
        }

        // --- SECCIÓN 2: METADATA (Título, año, desc, tags, platform, engine) ---
        const meta = document.createElement('div');
        meta.className = 'meta card meta';
        
        const titleText = p.title || 'Untitled';
        const yearText = p.year || '';
        const descText = (p.desc && p.desc[LANG]) ? p.desc[LANG] : ((p.desc && p.desc.es) ? p.desc.es : '');
        
        // Generar HTML para platform y engine si existen
        let techInfo = '';
        if(p.platform || p.engine) {
            techInfo = `<div style="font-size:11px; color:var(--accent); margin-bottom:4px;">
                ${p.platform ? `<span>${p.platform}</span>` : ''} 
                ${p.platform && p.engine ? ' · ' : ''} 
                ${p.engine ? `<span>${p.engine}</span>` : ''}
            </div>`;
        }

        meta.innerHTML = `
           <h4>${titleText} <span style="font-weight:600;color:var(--muted);font-size:13px">(${yearText})</span></h4>
           ${techInfo}
           <p>${descText}</p>
           <div class="tags" style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">
              ${(p.tags||[]).map(t=>`<span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; font-size:11px;">${t}</span>`).join('')}
           </div>
        `;

        card.appendChild(thumb);
        card.appendChild(meta);
        
        // --- INTERACCIÓN GLOBAL: Click para Overview ---
        // Se añade el evento a toda la card para asegurar accesibilidad
        card.style.cursor = 'pointer';
        card.addEventListener('click', (ev) => {
           // Si el click fue en un link o botón específico dentro de la card (si hubiera), prevenimos
           if(ev.target.tagName === 'A') return;
           openDetail(p.id);
        });

        // Accesibilidad teclado
        card.tabIndex = 0;
        card.addEventListener('keydown', (ev) => { 
            if(ev.key === 'Enter' || ev.key === ' ') { 
                ev.preventDefault(); openDetail(p.id); 
            } 
        });

        container.appendChild(card);
        
        // Activar observador lazy para este thumb
        thumbObserver.observe(thumb);

      }catch(err){
        console.error('Error rendering project', p && p.id, err);
      }
    }
  }

  // -------------------------
  // 7. DETALLE DEL PROYECTO (MODAL/SECCIÓN)
  // -------------------------
  function openDetail(id){
    try{
      const p = PROJECTS.find(x=>x.id===id);
      if(!p) return;

      if(detailTitle) detailTitle.textContent = p.title || '';
      if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

      // Limpiar contenedores
      if(detailMedia) detailMedia.innerHTML = '';
      if(detailThumbs) detailThumbs.innerHTML = '';
      if(detailLinks) detailLinks.innerHTML = '';
      if(detailDevlog) detailDevlog.innerHTML = '';

      // Media Principal (Primer video o primera imagen)
      const main = (p.media && p.media.length) ? (p.media.find(m=>m.type==='video' && m.src && m.src!=='PLACEHOLDER_VIDEO') || p.media[0]) : null;
      
      if(main){
        if(main.type === 'video' && main.src && main.src !== 'PLACEHOLDER_VIDEO'){
          const mv = document.createElement('video');
          mv.src = main.src; mv.controls = true; mv.style.width = '100%'; mv.style.maxHeight = '450px'; mv.style.background = '#000';
          detailMedia.appendChild(mv);
        } else if(main.type === 'image' && main.src){
          const im = document.createElement('img'); im.src = main.src; im.style.width = '100%'; im.style.borderRadius = '8px';
          detailMedia.appendChild(im);
        }
      }

      // Miniaturas
      (p.media || []).forEach(m => {
        const t = document.createElement('div');
        t.style.cssText = 'width:100px; height:60px; overflow:hidden; border-radius:6px; cursor:pointer; background:#000; margin-right:8px; opacity:0.7; transition:opacity 0.2s';
        t.onmouseenter = () => t.style.opacity = '1';
        t.onmouseleave = () => t.style.opacity = '0.7';

        const content = (m.type === 'video') ? document.createElement('video') : document.createElement('img');
        content.src = m.src || m.poster || '';
        content.style.cssText = 'width:100%; height:100%; object-fit:cover;';
        t.appendChild(content);

        t.addEventListener('click', () => {
             detailMedia.innerHTML = '';
             if(m.type === 'video'){
                 const v = document.createElement('video'); v.controls = true; v.src = m.src; v.style.width='100%'; detailMedia.appendChild(v); v.play();
             } else {
                 const i = document.createElement('img'); i.src = m.src; i.style.width='100%'; detailMedia.appendChild(i);
             }
        });
        detailThumbs.appendChild(t);
      });

      // Links
      if(p.links){
        if(p.links.download){
          const a = document.createElement('a'); a.href = p.links.download; a.target = '_blank'; a.className = 'cta'; a.textContent = 'Download / Play'; 
          detailLinks.appendChild(a);
        } 
        if(p.links.itch){
          const a = document.createElement('a'); a.href = p.links.itch; a.target = '_blank'; a.className = 'cta'; a.textContent = 'itch.io'; 
          a.style.marginLeft = '10px'; a.style.background = 'transparent'; a.style.border = '1px solid var(--accent)';
          detailLinks.appendChild(a);
        }
      }

      // Devlog
      (p.devlog || []).forEach(entry => {
        const li = document.createElement('li'); li.innerText = entry; detailDevlog.appendChild(li);
      });

      // Mostrar sección Detail
      showSection('detail'); 
      window.scrollTo(0,0);

    }catch(err){ console.error('Error detail', err); }
  }

  // -------------------------
  // 8. NAVEGACIÓN Y UI GENERAL
  // -------------------------
  function showSection(id){
    document.querySelectorAll('main .section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('header nav a').forEach(a => a.classList.remove('active'));
    
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    
    // Si hay un link en el nav que apunta a esta sección, activarlo
    const link = document.querySelector(`header nav a[data-target="${id}"]`);
    if(link) link.classList.add('active');
  }

  // Event Listeners Navegación
  document.querySelectorAll('header nav a[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.target);
    });
  });

  const backBtn = document.getElementById('backToProjects');
  if(backBtn) backBtn.addEventListener('click', (e) => { e.preventDefault(); showSection('projects'); });

  // Selector Idioma
  const langSel = document.getElementById('lang');
  if(langSel) langSel.addEventListener('change', (e) => {
      LANG = e.target.value;
      renderProjects(); // Re-renderizar textos de cards
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

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const data = Object.fromEntries(fd.entries());
      
      contactStatus.innerText = 'Enviando...';
      contactStatus.style.color = '#999';

      try {
        const res = await fetch(contactForm.action, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (res.ok) {
            contactStatus.innerText = '¡Enviado!'; contactStatus.style.color = '#4ade80'; contactForm.reset();
        } else {
            contactStatus.innerText = 'Error al enviar.'; contactStatus.style.color = '#ff6b6b';
        }
      } catch (err) {
        contactStatus.innerText = 'Error de conexión.'; contactStatus.style.color = '#ff6b6b';
      }
    });
  }

  // -------------------------
  // 10. INICIALIZACIÓN
  // -------------------------
  (async function init(){
    await loadProjectsFromFolder(); 
    renderProjects();
    // Iniciar en Home por defecto
    showSection('home');
    console.log('Sistema cargado. Proyectos:', PROJECTS.length);
  })();

});