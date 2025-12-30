// ----------------------------
// script.js (reemplazar todo)
// ----------------------------
(function(){
  document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // DATA — mantiene los juegos
    // ===============================
    const PROJECTS = [
      { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
        desc:{ es:'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en:'Action game focused on combat, cartoon aesthetics and skill progression.' },
        longDesc:{ es:'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en:'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/pirate_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/pirate_poster.jpg' } ], tags:['Action','Unity'], devlog:['Inicio del proyecto','Primer prototipo de combate','Iteraciones de UI y shaders'] },

      { id:'axiebrawl', title:'Pirate Penguin (Axie Brawl)', year:2023,
        desc:{ es:'MOBA competitivo con énfasis en partidas rápidas y juego en equipo.', en:'Competitive MOBA focused on fast matches and team play.' },
        longDesc:{ es:'Participación en desarrollo MOBA con foco en C#, gameplay y sistemas multiplayer.', en:'MOBA development with focus on C#, gameplay and multiplayer systems.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/axiebrawl_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ], tags:['MOBA','Multiplayer'], devlog:['Integración de sistemas multiplayer','Balance inicial de personajes'] },

      { id:'llamageddon', title:'Llamageddon', year:2020,
        desc:{ es:'Juego arcade meme con humor absurdo.', en:'Arcade meme game with absurd humor.' },
        longDesc:{ es:'Juego corto de acción arcade desarrollado como experimento creativo.', en:'Short arcade action game developed as a creative experiment.' },
        links:{ itch:'https://lexanos.itch.io/llamageddon', download:'https://lexanos.itch.io/llamageddon' },
        media:[ { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/llamageddon_poster.jpg' }, { type:'image', src:'images/llamageddon_ss1.jpg' } ], tags:['Arcade'], devlog:['Concepto inicial','Publicación en itch.io'] },

      { id:'artool', title:'Artool', year:2019,
        desc:{ es:'Herramienta creativa para lluvia de ideas.', en:'Creative brainstorming tool.' },
        longDesc:{ es:'Herramienta experimental para procesos creativos y concept art.', en:'Experimental tool for creative processes and concept art.' },
        links:{ itch:'https://lexanos.itch.io/artool', download:'https://lexanos.itch.io/artool' },
        media:[ { type:'image', src:'images/artool_thumb.jpg' } ], tags:['Tool'], devlog:['Diseño de herramienta','Release público'] },

      { id:'agentrabbit', title:'Agent Rabbit - Climber Ninja', year:2018,
        desc:{ es:'Juego mobile casual de reflejos.', en:'Casual reflex-based mobile game.' },
        longDesc:{ es:'Juego mobile enfocado en escalada, timing y reflejos rápidos.', en:'Mobile game focused on climbing, timing and fast reflexes.' },
        links:{ itch:'https://lexanos.itch.io/agent-rabbit-climber-ninja', download:'https://lexanos.itch.io/agent-rabbit-climber-ninja' },
        media:[ { type:'image', src:'images/agentrabbit_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ], tags:['Mobile'], devlog:['Prototipo','Optimización mobile','Release'] },

      { id:'wildroad', title:'Wild Road', year:2019,
        desc:{ es:'Beat em up clásico con estética contemporánea.', en:'Classic beat em up with contemporary aesthetics.' },
        longDesc:{ es:'Wild Road es un beat em up con niveles diseñados para combate fluido y mecánicas acumulativas.', en:'Wild Road is a beat em up with levels designed for fluid combat and cumulative mechanics.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/wildroad_thumb.jpg' } ], tags:['BeatEmUp'], devlog:[] },

      { id:'pachis', title:'Pachis', year:2020,
        desc:{ es:'Juego educativo.', en:'Educational game.' },
        longDesc:{ es:'Pachis es un juego educativo pensado para enseñar conceptos básicos mediante minijuegos.', en:'Pachis is an educational game designed to teach basic concepts through minigames.' },
        links:{ itch:'https://lexanos.itch.io/pachis', download:'https://lexanos.itch.io/pachis' },
        media:[ { type:'image', src:'images/pachis_thumb.jpg' } ], tags:['Educational'], devlog:[] },

      { id:'greenbrush', title:'Green Brush', year:2018,
        desc:{ es:'Strategy game.', en:'Strategy game.' },
        longDesc:{ es:'Green Brush es un juego de estrategia con componentes educativos y resolución por turnos.', en:'Green Brush is a strategy game with educational components and turn-based resolution.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/greenbrush_thumb.jpg' } ], tags:['Strategy'], devlog:[] },

      { id:'thebeyond', title:'The Beyond', year:2017,
        desc:{ es:'3D Adventure.', en:'3D Adventure.' },
        longDesc:{ es:'The Beyond explora mecánicas 3D y narrativa ambiental en un mundo semi abierto.', en:'The Beyond explores 3D mechanics and environmental narrative in a semi-open world.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/thebeyond_thumb.jpg' } ], tags:['3D'], devlog:[] },

      { id:'alphabet', title:'Alphabet', year:2015,
        desc:{ es:'Platform Puzzle.', en:'Platform Puzzle.' },
        longDesc:{ es:'Alphabet es un puzzle-platform premiado por su diseño intuitivo.', en:'Alphabet is a prize-winning puzzle-platformer known for intuitive design.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ], tags:['Puzzle'], devlog:[] },

      { id:'drunkaholic', title:'Drunkaholic', year:2015,
        desc:{ es:'Casual 3D.', en:'Casual 3D game.' },
        longDesc:{ es:'Proyecto 3D casual orientado a la diversión y experimentación.', en:'Casual 3D project oriented to fun and experimentation.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/drunkaholic_thumb.jpg' } ], tags:['Simulation'], devlog:[] },

      { id:'samuraiblade', title:'Samurai Blade : Rock, Paper & Scissors', year:2024,
        desc:{ es:'Roguelite arcade basado en piedra-papel-tijera.', en:'Roguelite arcade based on rock-paper-scissors combat.' },
        longDesc:{ es:'Combate roguelite con mecánicas de piedra-papel-tijera como núcleo.', en:'Roguelite combat with rock-paper-scissors mechanics at its core.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/samuraiblade_thumb.jpg' } ], tags:['Action'], devlog:[] },

      { id:'zombieattack', title:'Zombie Attack Nightmare Endurance Apocalyptic Edition', year:2020,
        desc:{ es:'Shooter apocalíptico.', en:'Apocalyptic shooter.' },
        longDesc:{ es:'Modo endurance apocalíptico con hordas de enemigos.', en:'Endurance apocalyptic mode with hordes of enemies.' },
        links:{ itch:'', download:'' },
        media:[ { type:'image', src:'images/zombieattack_thumb.jpg' } ], tags:['Action'], devlog:[] }
    ];

    // ---------- variables / elements ----------
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
    const I18N = {
      es:{ homeTitle:'Desarrollador de Juegos · Unity · C#', homeDesc:'Programador y artista de videojuegos. Experiencia en Unity, C#, shaders, UI/UX, diseño y arte 2D/3D.' },
      en:{ homeTitle:'Game Developer · Unity · C#', homeDesc:'Programmer and game artist. Experience in Unity, C#, shaders, UI/UX, design and 2D/3D art.' }
    };

    // ---------- helpers ----------
    function showSection(id){
      sections.forEach(s => s.classList.toggle('active', s.id === id));
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
      window.scrollTo(0,0);
    }

    function applyLang(){
      const d = I18N[LANG] || I18N.es;
      const ht = document.getElementById('homeTitle');
      const hd = document.getElementById('homeDesc');
      if(ht) ht.innerText = d.homeTitle;
      if(hd) hd.innerText = d.homeDesc;
    }
    applyLang();

    // attach nav handlers (defensive)
    (function attachNav(){
      const links = document.querySelectorAll('header nav a[data-target]');
      links.forEach(l=>{
        l.removeEventListener && l.removeEventListener('click', ()=>{});
        l.addEventListener('click', (e)=>{ e.preventDefault(); const t = l.dataset.target; if(t) showSection(t); });
      });
    })();

    if(homeProjectsBtn){
      homeProjectsBtn.addEventListener('click', (e)=>{ e.preventDefault(); showSection('projects'); });
    }

    // ===============================
    // RENDER projects (robusto)
    // ===============================
    function renderProjects(){
      if(!projectsGrid) {
        console.warn('projectsGrid not found');
        return;
      }
      projectsGrid.innerHTML = '';

      // use plain for loop to avoid silent interruption
      for(let i=0;i<PROJECTS.length;i++){
        const p = PROJECTS[i];
        try{
          // create card
          const card = document.createElement('div');
          card.className = 'card';

          // thumb
          const thumb = document.createElement('div');
          thumb.className = 'thumb';
          thumb.style.position = 'relative';

          const imageMedia = (p.media||[]).find(m=>m.type==='image');
          const videoMedia = (p.media||[]).find(m=>m.type==='video');

          let imgSrc = 'images/placeholder_thumb.jpg';
          if(imageMedia && imageMedia.src) imgSrc = imageMedia.src;
          if(videoMedia && videoMedia.poster) imgSrc = videoMedia.poster;

          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = p.title || '';
          thumb.appendChild(img);

          // video hover if exists
          if(videoMedia){
            const vid = document.createElement('video');
            if(videoMedia.src && videoMedia.src !== 'PLACEHOLDER_VIDEO') vid.src = videoMedia.src;
            vid.muted = true; vid.loop = true; vid.preload = 'metadata';
            vid.style.position = 'absolute'; vid.style.top='0'; vid.style.left='0';
            vid.style.width='100%'; vid.style.height='100%'; vid.style.objectFit='cover';
            vid.style.display = 'none';
            thumb.appendChild(vid);

            thumb.addEventListener('mouseenter', ()=>{
              if(vid.src){ img.style.display='none'; vid.style.display='block'; vid.play().catch(()=>{}); }
            });
            thumb.addEventListener('mouseleave', ()=>{
              if(vid.src){ vid.pause(); vid.style.display='none'; img.style.display='block'; }
            });

            thumb.addEventListener('click', (ev)=>{
              ev.stopPropagation();
              if(!vid.src) return;
              if(vid.paused){ vid.play().catch(()=>{}); vid.style.display='block'; img.style.display='none'; }
              else { vid.pause(); vid.style.display='none'; img.style.display='block'; }
            });
          }

          // meta
          const meta = document.createElement('div');
          meta.className = 'meta';
          const titleText = p.title || 'Untitled';
          const yearText = p.year || '';
          const descText = (p.desc && p.desc[LANG]) ? p.desc[LANG] : ((p.desc && p.desc.es) ? p.desc.es : '');
          meta.innerHTML = `<h4>${titleText} <span style="font-weight:600;color:var(--muted);font-size:13px">(${yearText})</span></h4>
                            <p>${descText}</p>
                            <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>`;

          // clickable handlers
          const titleEl = meta.querySelector('h4');
          if(titleEl){ titleEl.style.cursor='pointer'; titleEl.addEventListener('click', (e)=>{ e.stopPropagation(); openDetail(p.id); }); }
          img.style.cursor = 'pointer';
          img.addEventListener('click', (e)=>{ e.stopPropagation(); openDetail(p.id); });

          card.addEventListener('click', ()=>openDetail(p.id));

          // append
          card.appendChild(thumb);
          card.appendChild(meta);
          projectsGrid.appendChild(card);

        } catch(err){
          console.error('Error rendering project at index', i, 'id/title:', (p && (p.id || p.title)), err);
          // continue with next project
        }
      } // end for
    }

    // ===============================
    // DETAIL / OPEN
    // ===============================
    function openDetail(id){
      try{
        const p = PROJECTS.find(x=>x.id===id);
        if(!p) return;

        // title & desc
        if(detailTitle) detailTitle.textContent = p.title || '';
        if(detailDesc) detailDesc.textContent = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

        // clear sections
        if(detailMedia) detailMedia.innerHTML='';
        if(detailThumbs) detailThumbs.innerHTML='';
        if(detailLinks) detailLinks.innerHTML='';
        if(detailDevlog) detailDevlog.innerHTML='';

        // main preview logic
        const main = (p.media && p.media.length) ? (p.media.find(m=>m.type==='video') || p.media[0]) : null;
        if(main){
          if(main.type === 'video' && main.src && main.src !== 'PLACEHOLDER_VIDEO'){
            const v = document.createElement('video');
            v.controls = true; v.src = main.src; v.style.width='100%'; v.style.height='400px'; v.preload='metadata';
            detailMedia.appendChild(v);
          } else if(main.type === 'image' && main.src){
            const im = document.createElement('img'); im.src = main.src; im.style.width='100%'; im.style.borderRadius='8px';
            detailMedia.appendChild(im);
          } else {
            const ph = document.createElement('div'); ph.style.height='320px'; ph.style.display='flex'; ph.style.alignItems='center'; ph.style.justifyContent='center'; ph.style.background='#0b0d12'; ph.style.color='var(--muted)'; ph.textContent='Preview placeholder';
            detailMedia.appendChild(ph);
          }
        } else if(p.links && p.links.itch){
          const iframe = document.createElement('iframe'); iframe.src = p.links.itch; iframe.style.width='100%'; iframe.style.height='400px'; iframe.style.border='0';
          detailMedia.appendChild(iframe);
        } else {
          const ph = document.createElement('div'); ph.style.height='320px'; ph.style.display='flex'; ph.style.alignItems='center'; ph.style.justifyContent='center'; ph.style.background='#0b0d12'; ph.style.color='var(--muted)'; ph.textContent='Preview disponible';
          detailMedia.appendChild(ph);
        }

        // thumbnails
        (p.media||[]).forEach(m=>{
          try{
            const t = document.createElement('div');
            t.style.width='120px'; t.style.height='68px'; t.style.overflow='hidden'; t.style.borderRadius='8px'; t.style.cursor='pointer'; t.style.background='#000'; t.style.marginRight='8px';

            if(m.type === 'video'){
              const mv = document.createElement('video');
              if(m.src && m.src !== 'PLACEHOLDER_VIDEO') mv.src = m.src;
              mv.muted = true; mv.preload = 'metadata'; mv.style.width='100%'; mv.style.height='100%'; mv.style.objectFit='cover';
              t.appendChild(mv);
              t.addEventListener('click', ()=>{ detailMedia.innerHTML=''; if(mv.src){ const v=document.createElement('video'); v.controls=true; v.src=mv.src; v.style.width='100%'; v.style.height='400px'; detailMedia.appendChild(v); } });
            } else {
              const mi = document.createElement('img');
              mi.src = m.src || 'images/placeholder_thumb.jpg';
              mi.style.width='100%'; mi.style.height='100%'; mi.style.objectFit='cover';
              t.appendChild(mi);
              t.addEventListener('click', ()=>{ detailMedia.innerHTML=''; const im=document.createElement('img'); im.src = m.src || 'images/placeholder_thumb.jpg'; im.style.width='100%'; im.style.borderRadius='8px'; detailMedia.appendChild(im); });
            }
            detailThumbs.appendChild(t);
          }catch(thumbErr){
            console.error('thumb render error for project', id, thumbErr);
          }
        });

        // links
        if(p.links && p.links.download){ const a=document.createElement('a'); a.className='cta'; a.href=p.links.download; a.target='_blank'; a.textContent='Download / Play'; detailLinks.appendChild(a); }
        else if(p.links && p.links.itch){ const a=document.createElement('a'); a.className='cta'; a.href=p.links.itch; a.target='_blank'; a.textContent='View on itch.io'; detailLinks.appendChild(a); }
        else { const sp = document.createElement('div'); sp.style.color='var(--muted)'; sp.textContent='No download link available yet.'; detailLinks.appendChild(sp); }

        // devlog
        (p.devlog||[]).forEach(d => { const li = document.createElement('li'); li.innerText = d; detailDevlog.appendChild(li); });

        // show overview tab by default
        if(overviewWrap && devlogWrap){
          overviewWrap.style.display='block';
          devlogWrap.style.display='none';
          if(tabOverview) tabOverview.style.background='';
          if(tabDevlog) tabDevlog.style.background='var(--accent)';
        }

        // finally show detail
        showSection('detail');

      }catch(err){
        console.error('openDetail error for id', id, err);
      }
    }

    // expose openDetail
    window.openDetail = openDetail;

    // tabs
    if(tabOverview) tabOverview.addEventListener('click', (e)=>{ e.preventDefault(); if(overviewWrap) overviewWrap.style.display='block'; if(devlogWrap) devlogWrap.style.display='none'; if(tabOverview) tabOverview.style.background=''; if(tabDevlog) tabDevlog.style.background='var(--accent)'; });
    if(tabDevlog) tabDevlog.addEventListener('click', (e)=>{ e.preventDefault(); if(overviewWrap) overviewWrap.style.display='none'; if(devlogWrap) devlogWrap.style.display='block'; if(tabDevlog) tabDevlog.style.background=''; if(tabOverview) tabOverview.style.background='var(--accent)'; });

    // back button
    const backBtn = document.getElementById('backToProjects');
    if(backBtn) backBtn.addEventListener('click', (e)=>{ e.preventDefault(); showSection('projects'); });

    // initial render + view
    try{
      renderProjects();
      showSection('home');
    }catch(e){
      console.error('initial render error', e);
    }

    // final debug info (non-intrusive)
    setTimeout(()=>{
      try{
        if(projectsGrid) console.info('rendered projects count:', projectsGrid.children.length, 'PROJECTS total:', PROJECTS.length);
      }catch(e){}
    }, 300);
  });
})();
