document.addEventListener('DOMContentLoaded', () => {

  let PROJECTS = [ /* === TU ARRAY ORIGINAL DE PROJECTS NO SE TOCA === */ ];

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

  /* ------------------ helpers ------------------ */

  async function fetchTextSafe(url){
    try{
      const r = await fetch(url, { cache:'no-store' });
      if(!r.ok) return null;
      return await r.text();
    }catch{ return null; }
  }

  async function fetchJsonSafe(url){
    try{
      const r = await fetch(url, { cache:'no-store' });
      if(!r.ok) return null;
      return await r.json();
    }catch{ return null; }
  }

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  /* ------------------ navegación ------------------ */

  navLinks.forEach(l=>{
    l.addEventListener('click', e=>{
      e.preventDefault();
      showSection(l.dataset.target);
    });
  });

  if(homeProjectsBtn){
    homeProjectsBtn.onclick = e => {
      e.preventDefault();
      showSection('projects');
    };
  }

  /* ------------------ spinner CSS (una vez) ------------------ */

  if(!document.getElementById('thumb-spinner-style')){
    const s = document.createElement('style');
    s.id = 'thumb-spinner-style';
    s.textContent = `
      .thumb{ position:relative }
      .thumb-spinner{
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        background:rgba(0,0,0,.25);
        z-index:2;
      }
      .thumb-spinner::after{
        content:'';
        width:32px;height:32px;
        border:4px solid rgba(255,255,255,.2);
        border-top-color:var(--accent);
        border-radius:50%;
        animation:spin 1s linear infinite;
      }
      @keyframes spin{to{transform:rotate(360deg)}}
    `;
    document.head.appendChild(s);
  }

  const PLACEHOLDER_IMG = 'images/placeholder_thumb.jpg';

  /* ------------------ render inmediato ------------------ */

  function renderProjects(){
    if(!projectsGrid) return;

    projectsGrid.innerHTML = '';

    PROJECTS.forEach(p => {

      /* card base */
      const card = document.createElement('div');
      card.className = 'card';
      card.tabIndex = 0;

      card.onclick = () => openDetail(p.id);
      card.onkeydown = e => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail(p.id);
        }
      };

      /* thumb */
      const thumb = document.createElement('div');
      thumb.className = 'thumb';

      const img = document.createElement('img');
      img.src = PLACEHOLDER_IMG;
      img.alt = p.title || '';
      thumb.appendChild(img);

      const spinner = document.createElement('div');
      spinner.className = 'thumb-spinner';
      thumb.appendChild(spinner);

      /* async media load (NO bloquea render) */
      const mediaImg = (p.media||[]).find(m=>m.type==='image');
      const mediaVid = (p.media||[]).find(m=>m.type==='video');

      const realImgSrc =
        (mediaVid && mediaVid.poster) ||
        (mediaImg && mediaImg.src) ||
        null;

      if(realImgSrc){
        const loader = new Image();
        loader.onload = () => {
          img.src = realImgSrc;
          spinner.remove();
        };
        loader.onerror = () => spinner.remove();
        loader.src = realImgSrc;
      } else {
        spinner.remove();
      }

      /* video hover (solo si existe src real) */
      if(mediaVid && mediaVid.src && mediaVid.src !== 'PLACEHOLDER_VIDEO'){
        const vid = document.createElement('video');
        vid.muted = true;
        vid.loop = true;
        vid.preload = 'metadata';
        vid.style.display = 'none';
        thumb.appendChild(vid);

        thumb.onmouseenter = () => {
          if(!vid.src) vid.src = mediaVid.src;
          img.style.display = 'none';
          vid.style.display = 'block';
          vid.play().catch(()=>{});
        };
        thumb.onmouseleave = () => {
          vid.pause();
          vid.style.display = 'none';
          img.style.display = 'block';
        };
      }

      /* meta */
      const meta = document.createElement('div');
      meta.className = 'meta';

      meta.innerHTML = `
        <h4>${p.title || 'Untitled'}
          <span style="color:var(--muted)">(${p.year||''})</span>
        </h4>
        <p>${(p.desc && p.desc[LANG]) || ''}</p>
        <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>
      `;

      card.appendChild(thumb);
      card.appendChild(meta);
      projectsGrid.appendChild(card);
    });

    console.info('renderProjects completed. cards:', projectsGrid.children.length);
  }

  /* ------------------ detalle (NO TOCADO salvo guards) ------------------ */

  function openDetail(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;

    detailTitle.textContent = p.title || '';
    detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) || (p.desc && p.desc[LANG]) || '';

    detailMedia.innerHTML = '';
    detailThumbs.innerHTML = '';
    detailLinks.innerHTML = '';
    detailDevlog.innerHTML = '';

    const main = p.media && p.media.length ? p.media[0] : null;

    if(main && main.type==='video' && main.src && main.src!=='PLACEHOLDER_VIDEO'){
      const v = document.createElement('video');
      v.controls = true;
      v.src = main.src;
      v.style.width='100%';
      v.style.height='400px';
      detailMedia.appendChild(v);
    } else if(main && main.type==='image'){
      const i = document.createElement('img');
      i.src = main.src || PLACEHOLDER_IMG;
      i.style.width='100%';
      detailMedia.appendChild(i);
    }

    (p.devlog||[]).forEach(d=>{
      const li=document.createElement('li');
      li.textContent=d;
      detailDevlog.appendChild(li);
    });

    showSection('detail');
  }

  window.openDetail = openDetail;

  /* ------------------ init ------------------ */

  renderProjects();
  showSection('home');

});
