document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------
  // Intento seguro de obtener los datos PROJECTS
  // ---------------------------
  let PROJECTS = [];

  (function detectProjectsSource(){
    // 1) window.PROJECTS (si se definió explícitamente así)
    try {
      if (window && Array.isArray(window.PROJECTS) && window.PROJECTS.length > 0) {
        PROJECTS = window.PROJECTS;
        console.info('script: using window.PROJECTS (length=' + PROJECTS.length + ')');
        return;
      }
    } catch(e){ /* ignore */ }

    // 2) intento eval global (indirect) para leer PROJECTS si existe como variable global (const/let)
    try {
      const maybe = (0, eval)('typeof PROJECTS !== "undefined" ? PROJECTS : undefined');
      if (Array.isArray(maybe) && maybe.length > 0) {
        PROJECTS = maybe;
        console.info('script: using global PROJECTS variable (length=' + PROJECTS.length + ')');
        return;
      }
    } catch(e){
      // puede fallar si PROJECTS está en TDZ o no existe, seguimos
    }

    // 3) no hay datos — dejamos PROJECTS vacío por ahora
    console.info('script: no external PROJECTS found, using internal empty array (PROJECTS length=0)');
  })();

  // ---------------------------
  // Elementos y helpers
  // ---------------------------
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

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  navLinks.forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      showSection(a.dataset.target);
    });
  });

  if(homeProjectsBtn){
    homeProjectsBtn.addEventListener('click', e=>{
      e.preventDefault();
      showSection('projects');
    });
  }

  // ---------------------------
  // Spinner CSS (one time)
  // ---------------------------
  if(!document.getElementById('thumb-spinner-style')){
    const s = document.createElement('style');
    s.id = 'thumb-spinner-style';
    s.textContent = `
      .thumb { background: var(--card); position: relative; overflow:hidden; min-height:150px; display:flex; align-items:center; justify-content:center; }
      .thumb img { width:100%; height:100%; object-fit:cover; display:block; }
      .thumb-spinner{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:32px; height:32px; border-radius:50%; border:4px solid rgba(255,255,255,.12); border-top-color:var(--accent); animation:thumb-spin 1s linear infinite; z-index:5; }
      @keyframes thumb-spin{ to{ transform:translate(-50%,-50%) rotate(360deg); } }
    `;
    document.head.appendChild(s);
  }

  // ---------------------------
  // Async image loader helper (non-blocking)
  // ---------------------------
  function loadImageAsync(realSrc, imgEl, spinnerEl){
    if(!realSrc){
      if(spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl);
      return;
    }
    const loader = new Image();
    loader.onload = () => {
      imgEl.src = realSrc;
      if(spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl);
    };
    loader.onerror = () => {
      if(spinnerEl && spinnerEl.parentNode){
        spinnerEl.textContent = '⚠';
        setTimeout(()=>{ if(spinnerEl && spinnerEl.parentNode) spinnerEl.parentNode.removeChild(spinnerEl); }, 1200);
      }
    };
    // start async load
    loader.src = realSrc;
  }

  // ---------------------------
  // Render cards immediately (title, year, desc) and load media async
  // ---------------------------
  function renderProjects(){
    if(!projectsGrid){
      console.warn('script: projectsGrid element not found (id=projectsGrid)');
      return;
    }

    projectsGrid.innerHTML = '';

    // If PROJECTS empty, show a placeholder card so user sees something immediately
    if(!Array.isArray(PROJECTS) || PROJECTS.length === 0){
      const placeholder = document.createElement('div');
      placeholder.className = 'card';
      placeholder.innerHTML = `<div class="meta"><h4>No projects found</h4><p style="color:var(--muted)">No hay proyectos cargados aún. Si esperás que se carguen desde un archivo, verificá que index.json o la variable global PROJECTS estén disponibles.</p></div>`;
      projectsGrid.appendChild(placeholder);
      console.info('script: rendered placeholder because PROJECTS is empty');
      return;
    }

    // Render synchronously minimal card structure for each project (so UI is immediate)
    for(let i=0;i<PROJECTS.length;i++){
      const p = PROJECTS[i];
      try {
        const card = document.createElement('div');
        card.className = 'card';

        // Thumb area (shows spinner while real image loads)
        const thumb = document.createElement('div');
        thumb.className = 'thumb';

        const spinner = document.createElement('div');
        spinner.className = 'thumb-spinner';
        thumb.appendChild(spinner);

        const img = document.createElement('img');
        img.alt = p.title || '';
        // set a tiny data URI placeholder so layout is immediate
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        thumb.appendChild(img);

        // determine candidate image/video poster
        const imageMedia = (p.media||[]).find(m=>m.type==='image' && m.src);
        const videoMedia = (p.media||[]).find(m=>m.type==='video' && (m.poster || m.src));

        let realImg = null;
        if(videoMedia && videoMedia.poster) realImg = videoMedia.poster;
        else if(imageMedia && imageMedia.src) realImg = imageMedia.src;
        else realImg = 'images/placeholder_thumb.jpg';

        // start loading image in background
        loadImageAsync(realImg, img, spinner);

        // Meta
        const meta = document.createElement('div');
        meta.className = 'meta';
        const titleText = p.title || 'Untitled';
        const yearText = p.year || '';
        const descText = (p.desc && p.desc[LANG]) ? p.desc[LANG] : ((p.desc && p.desc.es) ? p.desc.es : '');
        meta.innerHTML = `<h4>${titleText} <span style="font-weight:600;color:var(--muted);font-size:13px">(${yearText})</span></h4>
                          <p>${descText}</p>
                          <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>`;

        // clicking title or image opens detail
        const titleEl = meta.querySelector('h4');
        if(titleEl) { titleEl.style.cursor='pointer'; titleEl.addEventListener('click', ev=>{ ev.stopPropagation(); openDetail(p.id); }); }
        img.style.cursor='pointer';
        img.addEventListener('click', ev=>{ ev.stopPropagation(); openDetail(p.id); });

        // clicking whole card opens detail
        card.addEventListener('click', ()=>openDetail(p.id));

        card.appendChild(thumb);
        card.appendChild(meta);
        projectsGrid.appendChild(card);
      } catch(err){
        console.error('script: error rendering project index', i, 'id:', (p && p.id), err);
      }
    } // end for

    console.info('script: renderProjects completed. cards:', projectsGrid.children.length, 'PROJECTS total:', PROJECTS.length);
  }

  // ---------------------------
  // Detail / overview / devlog
  // ---------------------------
  function openDetail(id){
    const p = (Array.isArray(PROJECTS) ? PROJECTS.find(x=>x.id===id) : null);
    if(!p) return;

    try {
      if(detailTitle) detailTitle.textContent = p.title || '';
      if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

      if(detailMedia) detailMedia.innerHTML = '';
      if(detailThumbs) detailThumbs.innerHTML = '';
      if(detailLinks) detailLinks.innerHTML = '';
      if(detailDevlog) detailDevlog.innerHTML = '';

      const main = (p.media && p.media.length) ? (p.media.find(m=>m.type==='video' && m.src && m.src!=='PLACEHOLDER_VIDEO') || p.media[0]) : null;

      if(main){
        if(main.type === 'video' && main.src && main.src!=='PLACEHOLDER_VIDEO'){
          const mv = document.createElement('video');
          mv.controls = true;
          mv.src = main.src;
          mv.style.width = '100%';
          mv.style.height = '400px';
          mv.preload = 'metadata';
          detailMedia.appendChild(mv);
        } else if(main.type === 'image' && main.src){
          const im = document.createElement('img');
          im.src = main.src;
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

      (p.media || []).forEach(m => {
        try {
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
            t.addEventListener('click', ()=> {
              detailMedia.innerHTML = '';
              if(mv.src){ const v = document.createElement('video'); v.controls = true; v.src = mv.src; v.style.width='100%'; v.style.height='400px'; detailMedia.appendChild(v); }
            });
          } else {
            const mi = document.createElement('img');
            mi.src = m.src || 'images/placeholder_thumb.jpg';
            mi.style.width = '100%'; mi.style.height = '100%'; mi.style.objectFit = 'cover';
            t.appendChild(mi);
            t.addEventListener('click', ()=> {
              detailMedia.innerHTML = '';
              const im = document.createElement('img'); im.src = m.src || 'images/placeholder_thumb.jpg'; im.style.width = '100%'; im.style.borderRadius = '8px';
              detailMedia.appendChild(im);
            });
          }

          detailThumbs.appendChild(t);
        } catch(thumbErr){
          console.error('script: thumb render error for project', id, thumbErr);
        }
      });

      // links block
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

      // default to overview tab
      if(overviewWrap && devlogWrap){
        overviewWrap.style.display = 'block';
        devlogWrap.style.display = 'none';
        if(tabOverview) tabOverview.style.background = '';
        if(tabDevlog) tabDevlog.style.background = '#1a2333';
      }

      showSection('detail');

    } catch(err){
      console.error('script: openDetail error for id', id, err);
    }
  }

  window.openDetail = openDetail;

  // tabs handlers
  if(tabOverview) tabOverview.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='block'; devlogWrap.style.display='none'; tabOverview.style.background = ''; tabDevlog.style.background = '#1a2333'; });
  if(tabDevlog) tabDevlog.addEventListener('click', (e) => { e.preventDefault(); overviewWrap.style.display='none'; devlogWrap.style.display='block'; tabDevlog.style.background = ''; tabOverview.style.background = '#1a2333'; });

  document.getElementById('backToProjects')?.addEventListener('click', (e) => { e.preventDefault(); showSection('projects'); });

  // initial render
  renderProjects();
  showSection('home');

});
