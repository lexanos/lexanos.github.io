// ----------------------------
// script.js (reemplazar todo)
// ----------------------------
(function(){
  // Ejecutar cuando DOM esté listo (seguro)
  document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // DATA — mantiene los juegos que ya tenías
    // ===============================
    const PROJECTS = [
      {
        id: "llamageddon",
        title: "LLamageddon",
        year: 2020,
        desc: {
          es: "Juego arcade meme de acción rápida.",
          en: "Fast paced arcade meme game."
        },
        longDesc: {
          es: "LLamageddon es un juego arcade con humor absurdo y partidas cortas.",
          en: "LLamageddon is an arcade game with absurd humor and short sessions."
        },
        media: [
          { type: "image", src: "images/llamageddon.jpg" }
        ],
        links: {
          itch: "https://lexanos.itch.io/llamageddon"
        },
        devlog: [
          "Prototipo inicial",
          "Balance de dificultad",
          "Publicación en itch.io"
        ],
        tags: ["Arcade", "Meme"]
      },
      {
        id: "artool",
        title: "Artool",
        year: 2019,
        desc: {
          es: "Herramienta creativa para brainstorming.",
          en: "Creative brainstorming tool."
        },
        longDesc: {
          es: "Artool es una herramienta experimental para ideas visuales.",
          en: "Artool is an experimental visual ideation tool."
        },
        media: [],
        links: {
          itch: "https://lexanos.itch.io/artool"
        },
        devlog: [],
        tags: ["Tool"]
      }
    ];

    // ===============================
    // ELEMENTS & HELPERS
    // ===============================
    const navLinks = document.querySelectorAll("nav a[data-target]");
    const sections = document.querySelectorAll(".section");
    const projectsGrid = document.getElementById("projectsGrid");
    const homeProjectsBtn = document.getElementById("homeProjectsBtn");
    const detailSection = document.getElementById("detail");
    const projectsSection = document.getElementById("projects");

    // detail elements
    const detailTitle = document.getElementById("detailTitle");
    const detailMedia = document.getElementById("detailMedia");
    const detailThumbs = document.getElementById("detailThumbs");
    const detailDesc = document.getElementById("detailDesc");
    const detailLinks = document.getElementById("detailLinks");
    const detailDevlog = document.getElementById("detailDevlog");

    const tabOverview = document.getElementById("tabOverview");
    const tabDevlog = document.getElementById("tabDevlog");
    const overviewWrap = document.getElementById("detailOverview");
    const devlogWrap = document.getElementById("detailDevlogWrap");

    // safe placeholder helpers
    function safeGet(arr, idx, def){ return (arr && arr[idx]) ? arr[idx] : def; }
    function createTextEl(tag, txt, cls){ const e = document.createElement(tag); e.textContent = txt || ''; if(cls) e.className = cls; return e; }

    // ===============================
    // NAV: showSection
    // ===============================
    function showSection(id){
      sections.forEach(s => s.classList.toggle('active', s.id === id));
      navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === id));
      window.scrollTo(0,0);
    }

    // attach nav handlers (idempotent)
    navLinks.forEach(link => {
      // remove previous same handler if any (defensive)
      link.replaceWith(link.cloneNode(true));
    });
    // re-query after clones
    const navLinks2 = document.querySelectorAll("nav a[data-target]");
    navLinks2.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = link.dataset.target;
        if(target) showSection(target);
      });
    });

    // Home "Ver Juegos"
    if(homeProjectsBtn){
      homeProjectsBtn.addEventListener('click', e => {
        e.preventDefault();
        showSection('projects');
      });
    }

    // ===============================
    // RENDER: projects grid (cards)
    // ===============================
    function renderProjects(){
      if(!projectsGrid) return;
      projectsGrid.innerHTML = '';
      PROJECTS.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';

        const thumb = document.createElement('div');
        thumb.className = 'thumb';

        // image (use poster or first image if available; else placeholder)
        let imgSrc = 'images/placeholder_thumb.jpg';
        const imageMedia = p.media && p.media.find(m => m.type === 'image');
        const videoMedia = p.media && p.media.find(m => m.type === 'video');
        if(imageMedia && imageMedia.src) imgSrc = imageMedia.src;
        // if video has poster, use it as thumb
        if(videoMedia && videoMedia.poster) imgSrc = videoMedia.poster;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = p.title;
        thumb.appendChild(img);

        // if there's a video and real src, prepare hover play
        if(videoMedia){
          const vid = document.createElement('video');
          if(videoMedia.src && videoMedia.src !== 'PLACEHOLDER_VIDEO') vid.src = videoMedia.src;
          vid.muted = true;
          vid.loop = true;
          vid.preload = 'metadata';
          vid.style.position = 'absolute';
          vid.style.top = '0';
          vid.style.left = '0';
          vid.style.width = '100%';
          vid.style.height = '100%';
          vid.style.objectFit = 'cover';
          vid.style.display = 'none';
          thumb.appendChild(vid);

          // hover play (desktop)
          thumb.addEventListener('mouseenter', () => {
            if(vid.src){ img.style.display = 'none'; vid.style.display = 'block'; vid.play().catch(()=>{}); }
          });
          thumb.addEventListener('mouseleave', () => {
            if(vid.src){ vid.pause(); vid.style.display = 'none'; img.style.display = 'block'; }
          });

          // click on thumb toggles play (mobile-friendly)
          thumb.addEventListener('click', ev => {
            ev.stopPropagation();
            if(!vid.src) return;
            if(vid.paused){ vid.play().catch(()=>{}); vid.style.display='block'; img.style.display='none'; }
            else { vid.pause(); vid.style.display='none'; img.style.display='block'; }
          });
        }

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.innerHTML = `<h4>${p.title} <span style="font-weight:600;color:var(--muted);font-size:13px">(${p.year})</span></h4>
                          <p>${p.desc?.es || ''}</p>
                          <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>`;

        // make title and image clickable to open detail
        meta.querySelector('h4').style.cursor = 'pointer';
        meta.querySelector('h4').addEventListener('click', ev => { ev.stopPropagation(); openDetail(p.id); });

        img.style.cursor = 'pointer';
        img.addEventListener('click', ev => { ev.stopPropagation(); openDetail(p.id); });

        // click card opens detail
        card.addEventListener('click', () => openDetail(p.id));

        card.appendChild(thumb);
        card.appendChild(meta);
        projectsGrid.appendChild(card);
      });
    }

    // ===============================
    // DETAIL: openDetail / populate overview & devlog
    // ===============================
    function openDetail(id){
      const p = PROJECTS.find(x => x.id === id);
      if(!p) return;

      // switch visible section
      showSection('detail');

      // set title & long desc
      if(detailTitle) detailTitle.textContent = p.title || '';
      if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc.es) ? p.longDesc.es : (p.desc && p.desc.es) ? p.desc.es : '';

      // media area
      if(detailMedia) detailMedia.innerHTML = '';
      if(detailThumbs) detailThumbs.innerHTML = '';
      if(detailLinks) detailLinks.innerHTML = '';
      if(detailDevlog) detailDevlog.innerHTML = '';

      // main preview
      const mainMedia = (p.media && p.media.length) ? p.media[0] : null;
      if(mainMedia){
        if(mainMedia.type === 'video' && mainMedia.src && mainMedia.src !== 'PLACEHOLDER_VIDEO'){
          const mv = document.createElement('video');
          mv.src = mainMedia.src;
          mv.controls = true;
          mv.style.width = '100%';
          mv.style.height = '400px';
          mv.preload = 'metadata';
          detailMedia.appendChild(mv);
        } else if(mainMedia.type === 'image' && mainMedia.src){
          const im = document.createElement('img');
          im.src = mainMedia.src;
          im.style.width = '100%';
          im.style.borderRadius = '8px';
          detailMedia.appendChild(im);
        } else {
          const ph = document.createElement('div');
          ph.style.height = '320px';
          ph.style.display = 'flex';
          ph.style.alignItems = 'center';
          ph.style.justifyContent = 'center';
          ph.style.background = '#0b0d12';
          ph.style.color = 'var(--muted)';
          ph.textContent = 'Preview placeholder';
          detailMedia.appendChild(ph);
        }
      } else if(p.links && p.links.itch){
        const iframe = document.createElement('iframe');
        iframe.src = p.links.itch;
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = '0';
        detailMedia.appendChild(iframe);
      } else {
        const ph = document.createElement('div');
        ph.style.height = '320px';
        ph.style.display = 'flex';
        ph.style.alignItems = 'center';
        ph.style.justifyContent = 'center';
        ph.style.background = '#0b0d12';
        ph.style.color = 'var(--muted)';
        ph.textContent = 'Preview disponible';
        detailMedia.appendChild(ph);
      }

      // thumbnails row
      (p.media || []).forEach(m => {
        const t = document.createElement('div');
        t.style.width = '120px';
        t.style.height = '68px';
        t.style.overflow = 'hidden';
        t.style.borderRadius = '8px';
        t.style.cursor = 'pointer';
        t.style.background = '#000';
        t.style.marginRight = '8px';
        if(m.type === 'video'){
          const mv = document.createElement('video');
          if(m.src && m.src !== 'PLACEHOLDER_VIDEO') mv.src = m.src;
          mv.muted = true; mv.preload = 'metadata';
          mv.style.width = '100%'; mv.style.height = '100%'; mv.style.objectFit = 'cover';
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
            const im = document.createElement('img'); im.src = m.src || 'images/placeholder_thumb.jpg'; im.style.width='100%'; im.style.borderRadius='8px';
            detailMedia.appendChild(im);
          });
        }
        detailThumbs.appendChild(t);
      });

      // links
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

      // devlog
      (p.devlog || []).forEach(entry => {
        const li = document.createElement('li'); li.innerText = entry; detailDevlog.appendChild(li);
      });

      // ensure overview tab is shown
      if(overviewWrap && devlogWrap){
        overviewWrap.style.display = 'block';
        devlogWrap.style.display = 'none';
        tabOverview.style.background = '';
        tabDevlog.style.background = '#1a2333';
      }
    }

    // expose openDetail globally (some parts expect it)
    window.openDetail = openDetail;

    // ===============================
    // TABS Overview / Devlog (attach safely)
    // ===============================
    if(tabOverview && tabDevlog && overviewWrap && devlogWrap){
      tabOverview.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='block'; devlogWrap.style.display='none'; tabOverview.style.background = ''; tabDevlog.style.background = '#1a2333'; });
      tabDevlog.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='none'; devlogWrap.style.display='block'; tabDevlog.style.background = ''; tabOverview.style.background = '#1a2333'; });
    }

    // Back button
    const backBtn = document.getElementById('backToProjects');
    if(backBtn){
      backBtn.addEventListener('click', (e) => { e.preventDefault(); showSection('projects'); });
    }

    // initial render + initial view
    renderProjects();
    showSection('home');

    // debug: if grid is empty, log
    if(!projectsGrid || projectsGrid.children.length === 0){
      console.warn('projectsGrid is empty — check PROJECTS array or assets. PROJECTS length=', PROJECTS.length);
    }
  });
})();
