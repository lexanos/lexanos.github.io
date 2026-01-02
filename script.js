document.addEventListener('DOMContentLoaded', () => {

  const PROJECTS = [
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      desc:{ es:'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en:'Action game focused on combat, cartoon aesthetics and skill progression.' },
      longDesc:{ es:'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en:'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/pirate_poster.jpg' } ],
      tags:['Action','Unity'],
      devlog:['Inicio del proyecto','Prototipo de combate']
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
      desc:{ es:'Juego arcade con humor absurdo.', en:'Arcade game with absurd humor.' },
      longDesc:{ es:'Acción arcade ambientada en Argentina 2020.', en:'Arcade action set in Argentina 2020.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon', download:'' },
      media:[ { type:'image', src:'images/llamageddon_thumb.jpg' } ],
      tags:['Action'],
      devlog:['Lanzamiento itch.io']
    },
    { id:'alphabet', title:'Alphabet', year:2015,
      desc:{ es:'Platform Puzzle premiado.', en:'Award-winning Platform Puzzle.' },
      longDesc:{ es:'"Y" escapa de una instalación y debe averiguar su pasado.', en:'"Y" escapes a facility and must find out about his past.' },
      links:{ itch:'https://lexanos.itch.io/alphabet' },
      media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ],
      tags:['Puzzle','Platformer'],
      devlog:['Premio al mejor diseño']
    }
  ];

  let LANG = 'es';

  // --- NAVEGACIÓN ORIGINAL (Restaurada) ---
  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main .section'); // CORRECCIÓN: selector correcto
  const grid = document.getElementById('projectsGrid');

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = a.dataset.target;
      if (target) showSection(target);
    });
  });

  document.getElementById('homeProjectsBtn')?.addEventListener('click', e => {
    e.preventDefault();
    showSection('projects');
  });

  // --- RENDER DE PROYECTOS ---
  function renderProjects(){
    if(!grid) return;
    grid.innerHTML = '';
    PROJECTS.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';

      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.style.position = 'relative';

      const imgItem = (p.media || []).find(m => m.type === 'image');
      const vidItem = (p.media || []).find(m => m.type === 'video');

      const img = document.createElement('img');
      img.src = imgItem ? imgItem.src : (vidItem && vidItem.poster ? vidItem.poster : 'images/placeholder_thumb.jpg');
      img.alt = p.title || '';
      thumb.appendChild(img);

      if(vidItem){
        const v = document.createElement('video');
        if(vidItem.src && vidItem.src !== 'PLACEHOLDER_VIDEO') v.src = vidItem.src;
        v.muted = true;
        v.loop = true;
        v.preload = 'metadata';
        v.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:none';
        thumb.appendChild(v);

        thumb.addEventListener('mouseenter',()=>{
          if(v.src){ img.style.display='none'; v.style.display='block'; v.play().catch(()=>{}); }
        });
        thumb.addEventListener('mouseleave',()=>{
          if(v.src){ v.pause(); v.style.display='none'; img.style.display='block'; }
        });

        // Click en thumb no debe propagar inmediatamente a abrir detalle si usuario solo quiere toggle video
        thumb.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if(v.src){
            if(v.paused){
              v.play().catch(()=>{}); v.style.display='block'; img.style.display='none';
            } else {
              v.pause(); v.style.display='none'; img.style.display='block';
            }
          } else {
            // si video es placeholder, abrir detail
            openDetail(p.id);
          }
        });
      } else {
        // si no hay video, click en imagen abre detalle
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => { e.stopPropagation(); openDetail(p.id); });
      }

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `
        <h4 style="cursor:pointer">${p.title} <span style="color:var(--muted);font-size:13px">(${p.year})</span></h4>
        <p>${p.desc[LANG] || ''}</p>
        <div class="tags">${(p.tags || []).map(t => `<span>${t}</span>`).join('')}</div>
      `;

      // click en título abre detalle
      const titleEl = meta.querySelector('h4');
      if(titleEl) titleEl.addEventListener('click', (e)=>{ e.stopPropagation(); openDetail(p.id); });

      card.appendChild(thumb);
      card.appendChild(meta);
      card.addEventListener('click',()=>openDetail(p.id));
      grid.appendChild(card);
    });
  }

  // --- FUNCIONES DE DETALLE ---
  function openDetail(id){
    const p = PROJECTS.find(x => x.id === id);
    if(!p) return;

    const detailTitleEl = document.getElementById('detailTitle');
    const detailDescEl = document.getElementById('detailDesc');
    const media = document.getElementById('detailMedia');
    const thumbs = document.getElementById('detailThumbs');
    const links = document.getElementById('detailLinks');
    const devlog = document.getElementById('detailDevlog');

    if(detailTitleEl) detailTitleEl.innerText = p.title || '';
    if(detailDescEl) detailDescEl.innerText = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

    if(media) media.innerHTML = '';
    if(thumbs) thumbs.innerHTML = '';
    if(links) links.innerHTML = '';
    if(devlog) devlog.innerHTML = '';

    // main preview: prefer a real video (no PLACEHOLDER_VIDEO), else first media
    const realVideo = (p.media || []).find(m => m.type === 'video' && m.src && m.src !== 'PLACEHOLDER_VIDEO');
    const firstMedia = (p.media || [])[0] || null;
    const main = realVideo || firstMedia;

    if(media){
      if(main && main.type === 'video' && main.src && main.src !== 'PLACEHOLDER_VIDEO'){
        const v = document.createElement('video');
        v.controls = true;
        v.src = main.src;
        v.style.width = '100%';
        v.style.height = '400px';
        v.preload = 'metadata';
        media.appendChild(v);
      } else if(main && main.type === 'image' && main.src){
        const i = document.createElement('img');
        i.src = main.src;
        i.style.width = '100%';
        i.style.borderRadius = '8px';
        media.appendChild(i);
      } else if(p.links && p.links.itch){
        const iframe = document.createElement('iframe');
        iframe.src = p.links.itch;
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = '0';
        media.appendChild(iframe);
      } else {
        const ph = document.createElement('div');
        ph.style.height = '320px';
        ph.style.display = 'flex';
        ph.style.alignItems = 'center';
        ph.style.justifyContent = 'center';
        ph.style.background = '#0b0d12';
        ph.style.color = 'var(--muted)';
        ph.textContent = 'Preview disponible';
        media.appendChild(ph);
      }
    }

    // thumbs
    (p.media || []).forEach(m => {
      const t = document.createElement('div');
      t.style.cssText = 'width:120px;height:68px;border-radius:8px;overflow:hidden;cursor:pointer;margin-right:8px;background:#000;display:inline-block';
      if(m.type === 'video'){
        const mv = document.createElement('video');
        if(m.src && m.src !== 'PLACEHOLDER_VIDEO') mv.src = m.src;
        mv.muted = true;
        mv.preload = 'metadata';
        mv.style.width = '100%';
        mv.style.height = '100%';
        mv.style.objectFit = 'cover';
        t.appendChild(mv);
        t.addEventListener('click', () => {
          if(media) {
            media.innerHTML = '';
            if(mv.src){
              const v = document.createElement('video');
              v.controls = true; v.src = mv.src; v.style.width = '100%'; v.style.height = '400px';
              media.appendChild(v);
            }
          }
        });
      } else {
        const mi = document.createElement('img');
        mi.src = m.src || 'images/placeholder_thumb.jpg';
        mi.style.width = '100%';
        mi.style.height = '100%';
        mi.style.objectFit = 'cover';
        t.appendChild(mi);
        t.addEventListener('click', () => {
          if(media){
            media.innerHTML = '';
            const im = document.createElement('img');
            im.src = m.src || 'images/placeholder_thumb.jpg';
            im.style.width = '100%';
            im.style.borderRadius = '8px';
            media.appendChild(im);
          }
        });
      }
      if(thumbs) thumbs.appendChild(t);
    });

    // links / download
    if(links){
      links.innerHTML = '';
      if(p.links && p.links.download){
        const a = document.createElement('a');
        a.className = 'cta';
        a.href = p.links.download;
        a.target = '_blank';
        a.innerText = 'Download / Play';
        links.appendChild(a);
      } else if(p.links && p.links.itch){
        const a = document.createElement('a');
        a.className = 'cta';
        a.href = p.links.itch;
        a.target = '_blank';
        a.innerText = 'View on itch.io';
        links.appendChild(a);
      } else {
        const sp = document.createElement('div');
        sp.style.color = 'var(--muted)';
        sp.innerText = 'No download link available yet.';
        links.appendChild(sp);
      }
    }

    // devlog
    if(devlog){
      (p.devlog || []).forEach(d => {
        const li = document.createElement('li');
        li.innerText = d;
        devlog.appendChild(li);
      });
    }

    // asegurarse que pestaña overview esté visible inicialmente
    const detailOverview = document.getElementById('detailOverview');
    const detailDevlogWrap = document.getElementById('detailDevlogWrap');
    const tabOverview = document.getElementById('tabOverview');
    const tabDevlog = document.getElementById('tabDevlog');
    if(detailOverview && detailDevlogWrap){
      detailOverview.style.display = 'block';
      detailDevlogWrap.style.display = 'none';
      if(tabOverview) tabOverview.style.background = 'var(--accent)';
      if(tabDevlog) tabDevlog.style.background = '#1a2333';
    }

    showSection('detail');
  }

  // --- Pestañas Overview / Devlog ---
  const tabOverviewBtn = document.getElementById('tabOverview');
  const tabDevlogBtn = document.getElementById('tabDevlog');

  if(tabOverviewBtn){
    tabOverviewBtn.addEventListener('click', () => {
      const detailOverview = document.getElementById('detailOverview');
      const detailDevlogWrap = document.getElementById('detailDevlogWrap');
      if(detailOverview && detailDevlogWrap){
        detailOverview.style.display = 'block';
        detailDevlogWrap.style.display = 'none';
      }
      tabOverviewBtn.style.background = 'var(--accent)';
      if(tabDevlogBtn) tabDevlogBtn.style.background = '#1a2333';
    });
  }

  if(tabDevlogBtn){
    tabDevlogBtn.addEventListener('click', () => {
      const detailOverview = document.getElementById('detailOverview');
      const detailDevlogWrap = document.getElementById('detailDevlogWrap');
      if(detailOverview && detailDevlogWrap){
        detailOverview.style.display = 'none';
        detailDevlogWrap.style.display = 'block';
      }
      tabDevlogBtn.style.background = 'var(--accent)';
      if(tabOverviewBtn) tabOverviewBtn.style.background = '#1a2333';
    });
  }

  // --- Back to projects ---
  const backToProjectsBtn = document.getElementById('backToProjects');
  if(backToProjectsBtn){
    backToProjectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('projects');
    });
  }

  // --- DONACIONES (BINANCE COPIADO) ---
  const addrBSC = "0xa1e79ea99e2461db522c591a8b87aee2d1d40ece";
  const addrTRX = "TCKX7fxAvtRvE3Wn1pRtGWjbvCj5LFe6mc";

  const binanceBscEl = document.getElementById('binanceBsc');
  const binanceTrxEl = document.getElementById('binanceTrx');
  const donThanksEl = document.getElementById('donThanks');

  if(binanceBscEl){
    binanceBscEl.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(addrBSC).then(()=>{
        alert("Dirección BSC (BEP20) copiada: " + addrBSC);
        if(donThanksEl) donThanksEl.style.display = 'block';
      }).catch(()=>{ alert("No se pudo copiar la dirección."); });
    });
  }

  if(binanceTrxEl){
    binanceTrxEl.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(addrTRX).then(()=>{
        alert("Dirección TRON (TRC20) copiada: " + addrTRX);
        if(donThanksEl) donThanksEl.style.display = 'block';
      }).catch(()=>{ alert("No se pudo copiar la dirección."); });
    });
  }

  // --- CONTACTO (FORMSPREE) ---
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  if(contactForm){
    contactForm.onsubmit = async (e) => {
      e.preventDefault();
      if(contactStatus){ contactStatus.innerText = "Enviando mensaje..."; contactStatus.style.color = "var(--muted)"; }
      const data = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          if(contactStatus){ contactStatus.innerText = "¡Mensaje enviado con éxito!"; contactStatus.style.color = "#4ade80"; }
          contactForm.reset();
        } else {
          if(contactStatus){ contactStatus.innerText = "Error al enviar el mensaje."; contactStatus.style.color = "#ff6b6b"; }
        }
      } catch (err) {
        if(contactStatus){ contactStatus.innerText = "Error de conexión."; contactStatus.style.color = "#ff6b6b"; }
      }
    };
  }

  // inicializa
  renderProjects();
  showSection('home');
});
