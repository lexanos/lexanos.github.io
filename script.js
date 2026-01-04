document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     CONFIG
  ========================= */

  let LANG = 'es';

  let PROJECTS = window.PROJECTS || [];

  const projectsGrid = document.getElementById('projectsGrid');

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main .section');

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

  /* =========================
     NAV
  ========================= */

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  navLinks.forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      showSection(a.dataset.target);
    });
  });

  if(homeProjectsBtn){
    homeProjectsBtn.onclick = e=>{
      e.preventDefault();
      showSection('projects');
    };
  }

  /* =========================
     SPINNER STYLE (ONCE)
  ========================= */

  if(!document.getElementById('thumb-spinner-style')){
    const s = document.createElement('style');
    s.id = 'thumb-spinner-style';
    s.textContent = `
      .thumb{
        background: var(--card);
        position: relative;
        overflow: hidden;
      }
      .thumb-spinner{
        position:absolute;
        top:50%;
        left:50%;
        width:32px;
        height:32px;
        border-radius:50%;
        border:4px solid rgba(255,255,255,.15);
        border-top-color:var(--accent);
        transform:translate(-50%,-50%);
        animation:spin 1s linear infinite;
      }
      @keyframes spin{
        to{transform:translate(-50%,-50%) rotate(360deg)}
      }
    `;
    document.head.appendChild(s);
  }

  /* =========================
     ASYNC MEDIA LOADER
  ========================= */

  function loadImageAsync(realSrc, img, spinner){
    if(!realSrc){
      spinner.remove();
      return;
    }
    const loader = new Image();
    loader.onload = ()=>{
      img.src = realSrc;
      spinner.remove();
    };
    loader.onerror = ()=>{
      spinner.remove();
    };
    loader.src = realSrc;
  }

  /* =========================
     RENDER CARDS (IMMEDIATE)
  ========================= */

  function renderProjects(){
    if(!projectsGrid) return;

    projectsGrid.innerHTML = '';

    PROJECTS.forEach(p=>{

      /* CARD */
      const card = document.createElement('div');
      card.className = 'card';

      /* THUMB */
      const thumb = document.createElement('div');
      thumb.className = 'thumb';

      const spinner = document.createElement('div');
      spinner.className = 'thumb-spinner';
      thumb.appendChild(spinner);

      const img = document.createElement('img');
      img.alt = p.title || '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      thumb.appendChild(img);

      /* Decide image */
      const imageMedia = (p.media||[]).find(m=>m.type==='image');
      const videoMedia = (p.media||[]).find(m=>m.type==='video');

      let realImg = null;
      if(videoMedia && videoMedia.poster) realImg = videoMedia.poster;
      else if(imageMedia && imageMedia.src) realImg = imageMedia.src;

      /* async load */
      loadImageAsync(realImg, img, spinner);

      /* META */
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `
        <h4>${p.title || 'Untitled'} <span style="color:var(--muted);font-size:13px">(${p.year||''})</span></h4>
        <p>${(p.desc && p.desc[LANG]) || ''}</p>
        <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>
      `;

      card.appendChild(thumb);
      card.appendChild(meta);

      /* CLICK WHOLE CARD */
      card.onclick = ()=>openDetail(p.id);

      projectsGrid.appendChild(card);
    });
  }

  /* =========================
     DETAIL VIEW
  ========================= */

  function openDetail(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;

    detailTitle.textContent = p.title || '';
    detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) || (p.desc && p.desc[LANG]) || '';

    detailMedia.innerHTML = '';
    detailThumbs.innerHTML = '';
    detailLinks.innerHTML = '';
    detailDevlog.innerHTML = '';

    /* MAIN MEDIA */
    const main = (p.media||[]).find(m=>m.type==='video') || (p.media||[])[0];

    if(main){
      if(main.type==='video' && main.src && main.src!=='PLACEHOLDER_VIDEO'){
        const v=document.createElement('video');
        v.controls=true;
        v.src=main.src;
        v.style.width='100%';
        detailMedia.appendChild(v);
      }else if(main.type==='image' && main.src){
        const i=document.createElement('img');
        i.src=main.src;
        i.style.width='100%';
        detailMedia.appendChild(i);
      }
    }

    /* THUMBS */
    (p.media||[]).forEach(m=>{
      const t=document.createElement('div');
      t.style.width='120px';
      t.style.height='68px';
      t.style.marginRight='8px';
      t.style.cursor='pointer';

      if(m.type==='image'){
        const i=document.createElement('img');
        i.src=m.src;
        i.style.width='100%';
        i.style.height='100%';
        i.style.objectFit='cover';
        t.appendChild(i);
        t.onclick=()=>{
          detailMedia.innerHTML='';
          const im=document.createElement('img');
          im.src=m.src;
          im.style.width='100%';
          detailMedia.appendChild(im);
        };
      }
      detailThumbs.appendChild(t);
    });

    /* LINKS */
    if(p.links){
      if(p.links.download){
        const a=document.createElement('a');
        a.href=p.links.download;
        a.target='_blank';
        a.className='cta';
        a.textContent='Download / Play';
        detailLinks.appendChild(a);
      }else if(p.links.itch){
        const a=document.createElement('a');
        a.href=p.links.itch;
        a.target='_blank';
        a.className='cta';
        a.textContent='View on itch.io';
        detailLinks.appendChild(a);
      }
    }

    /* DEVLOG */
    (p.devlog||[]).forEach(d=>{
      const li=document.createElement('li');
      li.textContent=d;
      detailDevlog.appendChild(li);
    });

    overviewWrap.style.display='block';
    devlogWrap.style.display='none';

    showSection('detail');
  }

  window.openDetail = openDetail;

  if(tabOverview) tabOverview.onclick=()=>{
    overviewWrap.style.display='block';
    devlogWrap.style.display='none';
  };

  if(tabDevlog) tabDevlog.onclick=()=>{
    overviewWrap.style.display='none';
    devlogWrap.style.display='block';
  };

  document.getElementById('backToProjects')?.addEventListener('click',e=>{
    e.preventDefault();
    showSection('projects');
  });

  /* =========================
     INIT
  ========================= */

  renderProjects();
  showSection('home');

});
