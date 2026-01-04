document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // FALLBACK DATA (NO TOCAR)
  // -------------------------
  const PROJECTS_FALLBACK = [
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      desc:{ es:'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en:'Action game focused on combat, cartoon aesthetics and skill progression.' },
      longDesc:{ es:'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en:'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/pirate_poster.jpg' } ],
      tags:['Action','Unity'],
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

  // variable reemplazable por loadProjectsFromFolder()
  let PROJECTS = PROJECTS_FALLBACK.slice();

  // -------------------------
  // ELEMENTS
  // -------------------------
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

  // small constants
  const PLACEHOLDER_DATA = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const LAZY_ROOT_MARGIN = '300px';
  let LANG = 'es';

  // -------------------------
  // UTILS: safe fetch helpers
  // -------------------------
  async function fetchJsonSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.json(); } catch(e){ return null; }
  }
  async function fetchTextSafe(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) return null; return await r.text(); } catch(e){ return null; }
  }

  // -------------------------
  // LOAD projects/index.json (si existe)
  // -------------------------
  async function loadProjectsFromFolder(){
    const candidates = ['./projects/', 'projects/', '/projects/'];
    let chosenBase = null;
    let idx = null;
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
        devlog: Array.isArray(devlogJson) ? devlogJson.slice() : (Array.isArray(devlogJson?.entries) ? devlogJson.entries.slice() : [])
      };

      // Normalizar media paths relativos
      if(Array.isArray(dataInfo?.media) && dataInfo.media.length){
        proj.media = dataInfo.media.map(m => {
          const n = Object.assign({}, m);
          if(n.src && !n.src.match(/^https?:\/\//) && !n.src.startsWith('/') && !n.src.startsWith(base)){
            n.src = base + n.src;
          }
          if(n.poster && !n.poster.match(/^https?:\/\//) && !n.poster.startsWith('/') && !n.poster.startsWith(base)){
            n.poster = base + n.poster;
          }
          return n;
        });
      } else if(Array.isArray(entry.media) && entry.media.length){
        proj.media = entry.media.map(m => {
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
  // NAV handling (robusto)
  // -------------------------
  function showSection(id){
    // query fresh lists to avoid stale nodes
    const secs = document.querySelectorAll('main .section');
    const navs = document.querySelectorAll('header nav a[data-target]');
    secs.forEach(s => s.classList.toggle('active', s.id === id));
    navs.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  // use event delegation on nav to catch clicks reliably
  (function attachNav(){
    const navEl = document.querySelector('header nav');
    if(!navEl) return;
    navEl.addEventListener('click', (e) => {
      const a = e.target.closest('a[data-target]');
      if(!a) return;
      e.preventDefault();
      const t = a.dataset.target;
      if(t) showSection(t);
    });
  })();

  if(homeProjectsBtn){
    homeProjectsBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      showSection('projects');
    });
  }

  // -------------------------
  // Spinner style (only once)
  // -------------------------
  if (!document.getElementById('thumb-spinner-style')) {
    const s = document.createElement('style');
    s.id = 'thumb-spinner-style';
    s.textContent = `
      .thumb-spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 4px solid rgba(255,255,255,0.12);
        border-top-color: var(--accent);
        box-sizing: border-box;
        animation: thumb-spin 1s linear infinite;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @keyframes thumb-spin { from { transform: translate(-50%,-50%) rotate(0deg);} to { transform: translate(-50%,-50%) rotate(360deg);} }
    `;
    document.head.appendChild(s);
  }

  // -------------------------
  // Lazy observer for thumbs
  // -------------------------
  const thumbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const thumb = entry.target;
      const img = thumb.querySelector('img[data-src]');
      const vid = thumb.querySelector('video[data-src]');
      if (img && img.dataset.src) {
        const real = img.dataset.src;
        const loader = new Image();
        loader.onload = () => {
          img.src = real;
          delete img.dataset.src;
          const spinner = thumb.querySelector('.thumb-spinner');
          if (spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner);
        };
        loader.onerror = () => {
          const spinner = thumb.querySelector('.thumb-spinner');
          if (spinner) { spinner.textContent = '⚠'; spinner.style.border = '4px solid rgba(255,0,0,0.12)'; setTimeout(()=>{ if(spinner && spinner.parentNode) spinner.parentNode.removeChild(spinner); }, 1200); }
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
  // RENDER projects: create cards immediately, load media lazily
  // -------------------------
  function renderProjects(){
    if(!projectsGrid){ console.warn('projectsGrid no encontrado'); return; }
    projectsGrid.innerHTML = '';

    for(let i=0;i<PROJECTS.length;i++){
      const p = PROJECTS[i];
      try{
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-project-id', p.id);

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        thumb.style.position = 'relative';

        const imageMedia = (p.media||[]).find(m => m.type === 'image');
        const videoMedia = (p.media||[]).find(m => m.type === 'video');

        let intendedImg = 'images/placeholder_thumb.jpg';
        if (imageMedia && imageMedia.src) intendedImg = imageMedia.src;
        if (videoMedia && videoMedia.poster) intendedImg = videoMedia.poster;

        const img = document.createElement('img');
        img.src = PLACEHOLDER_DATA;
        img.alt = p.title || '';
        img.setAttribute('data-src', intendedImg);

        const spinner = document.createElement('div');
        spinner.className = 'thumb-spinner';

        thumb.appendChild(spinner);
        thumb.appendChild(img);

        if (videoMedia) {
          const vid = document.createElement('video');
          if (videoMedia.src) vid.setAttribute('data-src', videoMedia.src);
          vid.muted = true; vid.loop = true; vid.preload = 'metadata';
          vid.style.position = 'absolute'; vid.style.top = '0'; vid.style.left = '0';
          vid.style.width = '100%'; vid.style.height = '100%'; vid.style.objectFit = 'cover'; vid.style.display = 'none';
          thumb.appendChild(vid);

          thumb.addEventListener('mouseenter', () => {
            const ds = vid.getAttribute('data-src');
            if (ds && ds !== 'PLACEHOLDER_VIDEO' && !vid.src) vid.src = ds;
            if (vid.src) { img.style.display = 'none'; vid.style.display = 'block'; vid.play().catch(()=>{}); }
          });
          thumb.addEventListener('mouseleave', () => {
            if (vid.src) { vid.pause(); vid.style.display = 'none'; img.style.display = 'block'; }
          });
          thumb.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const ds = vid.getAttribute('data-src');
            if (ds && ds !== 'PLACEHOLDER_VIDEO' && !vid.src) vid.src = ds;
            if (!vid.src) return;
            if (vid.paused) { img.style.display = 'none'; vid.style.display = 'block'; vid.play().catch(()=>{}); }
            else { vid.pause(); vid.style.display = 'none'; img.style.display = 'block'; }
          });
        }

        const meta = document.createElement('div');
        meta.className = 'meta';
        const titleText = p.title || 'Untitled';
        const yearText = p.year || '';
        const descText = (p.desc && p.desc[LANG]) ? p.desc[LANG] : ((p.desc && p.desc.es) ? p.desc.es : '');
        meta.innerHTML = `<h4>${titleText} <span style="font-weight:600;color:var(--muted);font-size:13px">(${yearText})</span></h4>
                          <p>${descText}</p>
                          <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>`;

        const titleEl = meta.querySelector('h4');
        if(titleEl){ titleEl.style.cursor = 'pointer'; titleEl.addEventListener('click', ev => { ev.stopPropagation(); openDetail(p.id); }); }
        img.style.cursor = 'pointer';
        img.addEventListener('click', ev => { ev.stopPropagation(); openDetail(p.id); });

        card.appendChild(thumb);
        card.appendChild(meta);
        projectsGrid.appendChild(card);

        thumbObserver.observe(thumb);

        card.tabIndex = 0;
        card.addEventListener('keydown', (ev) => { if(ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openDetail(p.id); } });

      }catch(err){
        console.error('Error rendering project', p && p.id, err);
      }
    }

    console.info('renderProjects completed. cards:', projectsGrid.children.length);
  }

  // -------------------------
  // OPEN DETAIL (overview & devlog)
  // -------------------------
  function openDetail(id){
    try{
      const p = PROJECTS.find(x=>x.id===id);
      if(!p) return;

      if(detailTitle) detailTitle.textContent = p.title || '';
      if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

      if(detailMedia) detailMedia.innerHTML = '';
      if(detailThumbs) detailThumbs.innerHTML = '';
      if(detailLinks) detailLinks.innerHTML = '';
      if(detailDevlog) detailDevlog.innerHTML = '';

      const main = (p.media && p.media.length) ? (p.media.find(m=>m.type==='video' && m.src && m.src!=='PLACEHOLDER_VIDEO') || p.media[0]) : null;
      if(main){
        if(main.type === 'video' && main.src && main.src !== 'PLACEHOLDER_VIDEO'){
          const mv = document.createElement('video');
          mv.src = main.src; mv.controls = true; mv.style.width = '100%'; mv.style.height = '400px'; mv.preload = 'metadata';
          detailMedia.appendChild(mv);
        } else if(main.type === 'image' && main.src){
          const im = document.createElement('img'); im.src = main.src; im.style.width = '100%'; im.style.borderRadius = '8px';
          detailMedia.appendChild(im);
        } else {
          const ph = document.createElement('div'); ph.style.height='320px'; ph.style.display='flex'; ph.style.alignItems='center'; ph.style.justifyContent='center'; ph.style.background='#0b0d12'; ph.style.color='var(--muted)'; ph.textContent='Preview placeholder';
          detailMedia.appendChild(ph);
        }
      } else if(p.links && p.links.itch){
        const iframe = document.createElement('iframe'); iframe.src = p.links.itch; iframe.style.width = '100%'; iframe.style.height = '400px'; iframe.style.border = '0'; detailMedia.appendChild(iframe);
      } else {
        const ph = document.createElement('div'); ph.style.height='320px'; ph.style.display='flex'; ph.style.alignItems='center'; ph.style.justifyContent='center'; ph.style.background='#0b0d12'; ph.style.color='var(--muted)'; ph.textContent='Preview disponible';
        detailMedia.appendChild(ph);
      }

      (p.media || []).forEach(m => {
        try{
          const t = document.createElement('div');
          t.style.width = '120px'; t.style.height = '68px'; t.style.overflow = 'hidden'; t.style.borderRadius = '8px'; t.style.cursor = 'pointer'; t.style.background = '#000'; t.style.marginRight = '8px';
          if(m.type === 'video'){
            const mv = document.createElement('video');
            if(m.src && m.src !== 'PLACEHOLDER_VIDEO') mv.src = m.src;
            mv.muted = true; mv.preload = 'metadata'; mv.style.width = '100%'; mv.style.height = '100%'; mv.style.objectFit = 'cover';
            t.appendChild(mv);
            t.addEventListener('click', () => {
              detailMedia.innerHTML = '';
              if(mv.src){ const v = document.createElement('video'); v.controls = true; v.src = mv.src; v.style.width='100%'; v.style.height='400px'; detailMedia.appendChild(v); }
            });
          } else {
            const mi = document.createElement('img');
            mi.src = m.src || 'images/placeholder_thumb.jpg';
            mi.style.width = '100%'; mi.style.height = '100%'; mi.style.objectFit = 'cover';
            t.appendChild(mi);
            t.addEventListener('click', () => {
              detailMedia.innerHTML = '';
              const im = document.createElement('img'); im.src = m.src || 'images/placeholder_thumb.jpg'; im.style.width = '100%'; im.style.borderRadius = '8px';
              detailMedia.appendChild(im);
            });
          }
          detailThumbs.appendChild(t);
        }catch(thumbErr){
          console.error('thumb render error for project', id, thumbErr);
        }
      });

      if(p.links){
        if(p.links.download){
          const a = document.createElement('a'); a.href = p.links.download; a.target = '_blank'; a.className = 'cta'; a.textContent = 'Download / Play'; detailLinks.appendChild(a);
        } else if(p.links.itch){
          const a = document.createElement('a'); a.href = p.links.itch; a.target = '_blank'; a.className = 'cta'; a.textContent = 'View on itch.io'; detailLinks.appendChild(a);
        } else {
          const span = document.createElement('div'); span.style.color = 'var(--muted)'; span.innerText = 'No download link available yet.'; detailLinks.appendChild(span);
        }
      } else {
        const span = document.createElement('div'); span.style.color = 'var(--muted)'; span.innerText = 'No download link available yet.'; detailLinks.appendChild(span);
      }

      (p.devlog || []).forEach(entry => {
        const li = document.createElement('li'); li.innerText = entry; detailDevlog.appendChild(li);
      });

      if(overviewWrap && devlogWrap){
        overviewWrap.style.display = 'block';
        devlogWrap.style.display = 'none';
        if(tabOverview) tabOverview.style.background = 'var(--accent)';
        if(tabDevlog) tabDevlog.style.background = '#1a2333';
      }

      showSection('detail');

    }catch(err){
      console.error('openDetail error for id', id, err);
    }
  }

  window.openDetail = openDetail;

  // -------------------------
  // overview / devlog tabs
  // -------------------------
  if(tabOverview) tabOverview.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='block'; devlogWrap.style.display='none'; tabOverview.style.background = 'var(--accent)'; tabDevlog.style.background = '#1a2333'; });
  if(tabDevlog) tabDevlog.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='none'; devlogWrap.style.display='block'; tabDevlog.style.background = 'var(--accent)'; tabOverview.style.background = '#1a2333'; });

  // -------------------------
  // back button
  // -------------------------
  const backBtn = document.getElementById('backToProjects');
  if(backBtn) backBtn.addEventListener('click', (e) => { e.preventDefault(); showSection('projects'); });

  // -------------------------
  // Contact form handling (with visible status)
  // -------------------------
  const contactForm = document.getElementById('contactForm');
  let contactStatus = document.getElementById('contactStatus');
  if(!contactStatus && contactForm){
    contactStatus = document.createElement('div');
    contactStatus.id = 'contactStatus';
    contactStatus.style.marginTop = '8px';
    contactStatus.style.color = 'var(--muted)';
    contactForm.parentNode.insertBefore(contactStatus, contactForm.nextSibling);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if(!contactStatus) return;

      contactStatus.innerText = '';
      contactStatus.style.color = '';

      const name = document.getElementById('cName')?.value.trim() || '';
      const email = document.getElementById('cEmail')?.value.trim() || '';
      const msg = document.getElementById('cMsg')?.value.trim() || '';

      if (!name || !email || !msg) {
        contactStatus.innerText = 'Por favor completá todos los campos.';
        contactStatus.style.color = '#ff6b6b';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        contactStatus.innerText = 'El email no es válido.';
        contactStatus.style.color = '#ff6b6b';
        return;
      }

      if (!contactForm.action) {
        contactStatus.innerText = 'Error: formulario sin destino de envío. Si querés, puedo ayudarte a configurar un backend gratuito.';
        contactStatus.style.color = '#ff6b6b';
        return;
      }

      try {
        contactStatus.innerText = 'Enviando mensaje...';
        contactStatus.style.color = 'var(--muted)';
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: msg
          })
        });
        if (res.ok) {
          contactStatus.innerText = 'Mensaje enviado correctamente. ¡Gracias!';
          contactStatus.style.color = '#4ade80';
          contactForm.reset();
        } else {
          contactStatus.innerText = 'Error al enviar el mensaje. Intentá más tarde.';
          contactStatus.style.color = '#ff6b6b';
        }
      } catch (err) {
        contactStatus.innerText = 'Error de conexión. Revisá tu internet.';
        contactStatus.style.color = '#ff6b6b';
      }
    });
  }

  // -------------------------
  // INIT: try folder load, then render
  // -------------------------
  (async function init(){
    await loadProjectsFromFolder(); // reemplaza PROJECTS si existen archivos
    renderProjects();              // crea cards inmediatamente (media lazy)
    showSection('home');
    setTimeout(()=>{ if(projectsGrid) console.info('rendered projects count:', projectsGrid.children.length, 'PROJECTS total:', PROJECTS.length); }, 200);
  })();
});
