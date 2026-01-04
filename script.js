document.addEventListener('DOMContentLoaded', () => {

  const PROJECTS = [
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      platform:['PC'],
      desc:{ es:'Juego de acción con fuerte foco en combate, estética cartoon y progresión de habilidades.', en:'Action game focused on combat, cartoon aesthetics and skill progression.' },
      longDesc:{ es:'Proyecto de acción con énfasis en combate fluido, shaders personalizados, UI avanzada y progresión de habilidades.', en:'Action project focused on fluid combat, custom shaders, advanced UI and skill progression.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/pirate_poster.jpg' } ],
      tags:['Action','Unity'],
      devlog:['Inicio del proyecto','Primer prototipo de combate','Iteraciones de UI y shaders']
    },

    { id:'axiebrawl', title:'Pirate Penguin (Axie Brawl)', year:2023,
      platform:['PC'],
      desc:{ es:'MOBA competitivo con énfasis en partidas rápidas y juego en equipo.', en:'Competitive MOBA focused on fast matches and team play.' },
      longDesc:{ es:'Participación en desarrollo MOBA con foco en C#, gameplay y sistemas multiplayer.', en:'MOBA development with focus on C#, gameplay and multiplayer systems.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/axiebrawl_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ],
      tags:['MOBA','Multiplayer'],
      devlog:['Integración de sistemas multiplayer','Balance inicial de personajes']
    },

    { id:'llamageddon', title:'Llamageddon', year:2020,
      platform:['PC','Web'],
      desc:{ es:'Juego arcade con humor absurdo.', en:'Arcade game with absurd humor.' },
      longDesc:{ es:'Juego corto de acción arcade desarrollado como experimento creativo.', en:'Short arcade action game developed as a creative experiment.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon', download:'https://lexanos.itch.io/llamageddon' },
      media:[ { type:'video', src:'PLACEHOLDER_VIDEO', poster:'images/llamageddon_poster.jpg' }, { type:'image', src:'images/llamageddon_ss1.jpg' } ],
      tags:['Arcade'],
      devlog:['Concepto inicial','Publicación en itch.io']
    },

    { id:'artool', title:'Artool', year:2019,
      platform:['PC'],
      desc:{ es:'Herramienta creativa para lluvia de ideas.', en:'Creative brainstorming tool.' },
      longDesc:{ es:'Herramienta experimental para procesos creativos y concept art.', en:'Experimental tool for creative processes and concept art.' },
      links:{ itch:'https://lexanos.itch.io/artool', download:'https://lexanos.itch.io/artool' },
      media:[ { type:'image', src:'images/artool_thumb.jpg' } ],
      tags:['Tool'],
      devlog:['Diseño de herramienta','Release público']
    },

    { id:'agentrabbit', title:'Agent Rabbit - Climber Ninja', year:2018,
      platform:['Mobile'],
      desc:{ es:'Juego mobile casual de reflejos.', en:'Casual reflex-based mobile game.' },
      longDesc:{ es:'Juego mobile enfocado en escalada, timing y reflejos rápidos.', en:'Mobile game focused on climbing, timing and fast reflexes.' },
      links:{ itch:'https://lexanos.itch.io/agent-rabbit-climber-ninja', download:'https://lexanos.itch.io/agent-rabbit-climber-ninja' },
      media:[ { type:'image', src:'images/agentrabbit_thumb.jpg' }, { type:'video', src:'PLACEHOLDER_VIDEO' } ],
      tags:['Mobile'],
      devlog:['Prototipo','Optimización mobile','Release']
    },

    { id:'wildroad', title:'Wild Road', year:2019,
      platform:['PC'],
      desc:{ es:'Beat em up clásico con estética contemporánea.', en:'Classic beat em up with contemporary aesthetics.' },
      longDesc:{ es:'Wild Road es un beat em up con niveles diseñados para combate fluido y mecánicas acumulativas.', en:'Wild Road is a beat em up with levels designed for fluid combat and cumulative mechanics.' },
      links:{ itch:'https://lexanos.itch.io/wild-road', download:'' },
      media:[ { type:'image', src:'images/wildroad_thumb.jpg' } ],
      tags:['BeatEmUp'],
      devlog:[]
    },

    { id:'pachis', title:'Pachis', year:2020,
      platform:['PC','Web'],
      desc:{ es:'Juego educativo.', en:'Educational game.' },
      longDesc:{ es:'Pachis es un juego educativo pensado para enseñar conceptos básicos mediante minijuegos.', en:'Pachis is an educational game designed to teach basic concepts through minigames.' },
      links:{ itch:'https://lexanos.itch.io/pachis', download:'https://lexanos.itch.io/pachis' },
      media:[ { type:'image', src:'images/pachis_thumb.jpg' } ],
      tags:['Educational'],
      devlog:[]
    },

    { id:'greenbrush', title:'Green Brush', year:2018,
      platform:['PC'],
      desc:{ es:'Strategy game.', en:'Strategy game.' },
      longDesc:{ es:'Green Brush es un juego de estrategia con componentes educativos y resolución por turnos.', en:'Green Brush is a strategy game with educational components and turn-based resolution.' },
      links:{ itch:'https://lexanos.itch.io/green-brush', download:'' },
      media:[ { type:'image', src:'images/greenbrush_thumb.jpg' } ],
      tags:['Strategy'],
      devlog:[]
    },

    { id:'thebeyond', title:'The Beyond', year:2017,
      platform:['PC'],
      desc:{ es:'3D Adventure.', en:'3D Adventure.' },
      longDesc:{ es:'The Beyond explora mecánicas 3D y narrativa ambiental en un mundo semi abierto.', en:'The Beyond explores 3D mechanics and environmental narrative in a semi-open world.' },
      links:{ itch:'https://lexanos.itch.io/the-beyond', download:'' },
      media:[ { type:'image', src:'images/thebeyond_thumb.jpg' } ],
      tags:['Adventure','3D'],
      devlog:[]
    },

    { id:'alphabet', title:'Alphabet', year:2015,
      platform:['PC','Web'],
      desc:{ es:'Platform Puzzle.', en:'Platform Puzzle.' },
      longDesc:{ es:'Alphabet es un puzzle-platform premiado por su diseño intuitivo.', en:'Alphabet is a prize-winning puzzle-platformer known for intuitive design.' },
      links:{ itch:'https://lexanos.itch.io/alphabet', download:'' },
      media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ],
      tags:['Puzzle'],
      devlog:[]
    },

    { id:'drunkaholic', title:'Drunkaholic', year:2015,
      platform:['PC'],
      desc:{ es:'Casual 3D.', en:'Casual 3D game.' },
      longDesc:{ es:'Proyecto 3D casual orientado a la diversión y experimentación.', en:'Casual 3D project oriented to fun and experimentation.' },
      links:{ itch:'https://lexanos.itch.io/drunkaholic', download:'' },
      media:[ { type:'image', src:'images/drunkaholic_thumb.jpg' } ],
      tags:['Simulation'],
      devlog:[]
    },

    { id:'samuraiblade', title:'Samurai Blade : Rock, Paper & Scissors', year:2024,
      platform:['PC'],
      desc:{ es:'Roguelite arcade basado en piedra-papel-tijera.', en:'Roguelite arcade based on rock-paper-scissors combat.' },
      longDesc:{ es:'Combate roguelite con mecánicas de piedra-papel-tijera como núcleo.', en:'Roguelite combat with rock-paper-scissors mechanics at its core.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/samuraiblade_thumb.jpg' } ],
      tags:['Action'],
      devlog:[]
    },

    { id:'losxtars', title:"Los Xtar's", year:2018,
      platform:['PC'],
      desc:{ es:'Juego experimental narrativo.', en:'Narrative experimental game.' },
      longDesc:{ es:'Proyecto experimental con foco narrativo.', en:'Narrative experiment.' },
      links:{ itch:'https://lexanos.itch.io/los-xtars', download:'' },
      media:[ { type:'image', src:'images/losxtars_thumb.jpg' } ],
      tags:['Narrative'],
      devlog:[]
    },

    { id:'tiempocuantico', title:'Tiempo Cuántico', year:2016,
      platform:['Web'],
      desc:{ es:'Juego conceptual de puzzles temporales.', en:'Time-based puzzle game.' },
      longDesc:{ es:'Exploración de mecánicas temporales.', en:'Time mechanics exploration.' },
      links:{ itch:'https://lexanos.itch.io/tiempo-cuantico', download:'' },
      media:[ { type:'image', src:'images/tiempocuantico_thumb.jpg' } ],
      tags:['Puzzle'],
      devlog:[]
    },

    { id:'fistparty', title:'Fist Party Command', year:2016,
      platform:['PC'],
      desc:{ es:'Plataforma shooter party.', en:'Platform shooter party.' },
      longDesc:{ es:'Caos multijugador local.', en:'Local multiplayer chaos.' },
      links:{ itch:'https://lexanos.itch.io/fist-party-command', download:'' },
      media:[ { type:'image', src:'images/fistparty_thumb.jpg' } ],
      tags:['Party'],
      devlog:[]
    },

    { id:'zombieattack', title:'Zombie Attack Nightmare Endurance Apocalyptic Edition', year:2020,
      platform:['PC'],
      desc:{ es:'Shooter apocalíptico.', en:'Apocalyptic shooter.' },
      longDesc:{ es:'Modo endurance apocalíptico con hordas de enemigos.', en:'Endurance apocalyptic mode with hordes of enemies.' },
      links:{ itch:'https://lexanos.itch.io/zombie-attack', download:'' },
      media:[ { type:'image', src:'images/zombieattack_thumb.jpg' } ],
      tags:['Action'],
      devlog:[]
    }
  ];

  let LANG = 'es';

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main .section');
  const grid = document.getElementById('projectsGrid');
  const homeProjectsBtn = document.getElementById('homeProjectsBtn');

  function showSection(id){
    sections.forEach(s => s.classList.toggle('active', s.id === id));
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.target === id));
    window.scrollTo(0,0);
  }

  navLinks.forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const t = a.dataset.target;
      if(t) showSection(t);
    });
  });

  if(homeProjectsBtn){
    homeProjectsBtn.addEventListener('click', e=>{
      e.preventDefault();
      showSection('projects');
    });
  }

  function renderProjects(){
    if(!grid) return;
    grid.innerHTML = '';

    for(let i=0;i<PROJECTS.length;i++){
      const p = PROJECTS[i];
      try{
        // Prevent duplicates if render called repeatedly
        if(grid.querySelector(`[data-project-id="${p.id}"]`)) continue;

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-project-id', p.id);

        const thumb = document.createElement('div');
        thumb.className = 'thumb';
        // fixed height to avoid layout shift (prevents title flicker)
        thumb.style.cssText = 'position:relative;height:150px;overflow:hidden;';

        const imageMedia = (p.media||[]).find(m=>m.type==='image');
        const videoMedia = (p.media||[]).find(m=>m.type==='video');

        let imgSrc = 'images/placeholder_thumb.jpg';
        if(imageMedia && imageMedia.src) imgSrc = imageMedia.src;
        if(videoMedia && videoMedia.poster) imgSrc = videoMedia.poster;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = p.title || '';
        // absolute positioning so image doesn't affect layout when hidden
        img.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;transition:opacity .15s ease;';
        img.decoding = 'async';

        // onload -> show
        img.onload = () => { try{ img.style.opacity = '1'; }catch(e){}; };

        // onerror -> only try placeholder once to avoid infinite loop
        img.onerror = () => {
          try{
            if(!img.dataset._errored){
              img.dataset._errored = '1';
              img.src = 'images/placeholder_thumb.jpg';
            } else {
              // already errored once; stop retrying and hide broken image visually
              img.style.display = 'none';
            }
          }catch(e){}
        };

        thumb.appendChild(img);

        if(videoMedia){
          const vid = document.createElement('video');
          if(videoMedia.src && videoMedia.src !== 'PLACEHOLDER_VIDEO') vid.src = videoMedia.src;
          vid.muted = true; vid.loop = true; vid.preload = 'metadata';
          // absolute positioning, hide initially
          vid.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:none;transition:opacity .15s ease;';
          thumb.appendChild(vid);

          // hover (desktop)
          thumb.addEventListener('mouseenter', ()=>{
            if(vid.src){
              img.style.display = 'none';
              vid.style.display = 'block';
              vid.play().catch(()=>{ /* autoplay may fail on some browsers */ });
            }
          });
          thumb.addEventListener('mouseleave', ()=>{
            if(vid.src){
              try{ vid.pause(); }catch(e){}
              vid.style.display = 'none';
              img.style.display = 'block';
            }
          });

          // click on thumb toggles (mobile)
          thumb.addEventListener('click', (ev)=>{
            ev.stopPropagation();
            if(!vid.src){
              openDetail(p.id); // if no video actual source, open detail
              return;
            }
            if(vid.paused){ vid.play().catch(()=>{}); vid.style.display='block'; img.style.display='none'; }
            else { vid.pause(); vid.style.display='none'; img.style.display='block'; }
          });
        } else {
          // click on image opens detail
          img.style.cursor = 'pointer';
          img.addEventListener('click', (e)=>{ e.stopPropagation(); openDetail(p.id); });
        }

        const meta = document.createElement('div');
        meta.className = 'meta';

        // build tags html
        const tagsHtml = (p.tags||[]).map(t=>`<span>${t}</span>`).join('');
        // build platform pills (own line, distinct style)
        const platformsHtml = (p.platform||[]).map(pl=>`<span style="display:inline-block;margin-right:6px;padding:4px 8px;border-radius:8px;background:rgba(255,255,255,0.04);color:var(--muted);font-size:12px;border:1px solid rgba(255,255,255,0.02)">${pl}</span>`).join(' ');

        meta.innerHTML = `
          <h4 style="margin:0;cursor:pointer">${p.title} <span style="color:var(--muted);font-size:13px">(${p.year})</span></h4>
          <p style="margin:8px 0 6px">${p.desc[LANG] || ''}</p>
          <div class="tags" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">${tagsHtml}</div>
          <div class="platforms" style="margin-top:8px">${platformsHtml}</div>
        `;

        const titleEl = meta.querySelector('h4');
        if(titleEl){
          titleEl.addEventListener('click', (e)=>{ e.stopPropagation(); openDetail(p.id); });
        }

        card.appendChild(thumb);
        card.appendChild(meta);
        card.addEventListener('click', ()=>openDetail(p.id));
        grid.appendChild(card);

      } catch(err){
        console.error('Error rendering project', p && p.id, err);
      }
    }
  }

  function openDetail(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;

    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailMedia = document.getElementById('detailMedia');
    const detailThumbs = document.getElementById('detailThumbs');
    const detailLinks = document.getElementById('detailLinks');
    const detailDevlog = document.getElementById('detailDevlog');

    if(detailTitle) detailTitle.innerText = p.title || '';
    if(detailDesc) detailDesc.innerText = (p.longDesc && p.longDesc[LANG]) ? p.longDesc[LANG] : (p.desc && p.desc[LANG]) ? p.desc[LANG] : '';

    if(detailMedia) detailMedia.innerHTML = '';
    if(detailThumbs) detailThumbs.innerHTML = '';
    if(detailLinks) detailLinks.innerHTML = '';
    if(detailDevlog) detailDevlog.innerHTML = '';

    const realVideo = (p.media || []).find(m=>m.type==='video' && m.src && m.src!=='PLACEHOLDER_VIDEO');
    const first = (p.media || [])[0] || null;
    const main = realVideo || first;

    if(detailMedia){
      if(main && main.type==='video' && main.src && main.src!=='PLACEHOLDER_VIDEO'){
        const v = document.createElement('video');
        v.controls = true; v.src = main.src; v.style.width='100%'; v.style.height='400px'; v.preload='metadata';
        detailMedia.appendChild(v);
      } else if(main && main.type==='image' && main.src){
        const im = document.createElement('img');
        im.src = main.src; im.style.width='100%'; im.style.borderRadius='8px';
        im.onerror = () => {
          if(!im.dataset._errored){ im.dataset._errored = '1'; im.src = 'images/placeholder_thumb.jpg'; }
          else { im.style.display = 'none'; }
        };
        detailMedia.appendChild(im);
      } else if(p.links && p.links.itch){
        const iframe = document.createElement('iframe');
        iframe.src = p.links.itch; iframe.style.width='100%'; iframe.style.height='400px'; iframe.style.border='0';
        detailMedia.appendChild(iframe);
      } else {
        const ph = document.createElement('div');
        ph.style.height='320px'; ph.style.display='flex'; ph.style.alignItems='center'; ph.style.justifyContent='center';
        ph.style.background='#0b0d12'; ph.style.color='var(--muted)'; ph.textContent='Preview disponible';
        detailMedia.appendChild(ph);
      }
    }

    (p.media || []).forEach(m=>{
      const t = document.createElement('div');
      t.style.cssText = 'width:120px;height:68px;border-radius:8px;overflow:hidden;cursor:pointer;margin-right:8px;display:inline-block;background:#000';
      if(m.type === 'video'){
        const mv = document.createElement('video');
        if(m.src && m.src !== 'PLACEHOLDER_VIDEO') mv.src = m.src;
        mv.muted = true; mv.preload = 'metadata'; mv.style.width='100%'; mv.style.height='100%'; mv.style.objectFit='cover';
        t.appendChild(mv);
        t.addEventListener('click', () => {
          if(detailMedia){ detailMedia.innerHTML = ''; if(mv.src){ const v = document.createElement('video'); v.controls=true; v.src=mv.src; v.style.width='100%'; v.style.height='400px'; detailMedia.appendChild(v); } }
        });
      } else {
        const mi = document.createElement('img');
        mi.src = m.src || 'images/placeholder_thumb.jpg';
        mi.style.width='100%'; mi.style.height='100%'; mi.style.objectFit='cover';
        mi.onerror = () => {
          if(!mi.dataset._errored){ mi.dataset._errored = '1'; mi.src = 'images/placeholder_thumb.jpg'; }
          else { mi.style.display = 'none'; }
        };
        t.appendChild(mi);
        t.addEventListener('click', () => {
          if(detailMedia){ detailMedia.innerHTML = ''; const im = document.createElement('img'); im.src = m.src || 'images/placeholder_thumb.jpg'; im.style.width='100%'; im.style.borderRadius='8px'; detailMedia.appendChild(im); }
        });
      }
      if(detailThumbs) detailThumbs.appendChild(t);
    });

    if(detailLinks){
      detailLinks.innerHTML = '';
      if(p.links && p.links.download){
        const a = document.createElement('a'); a.className='cta'; a.href=p.links.download; a.target='_blank'; a.innerText='Download / Play'; detailLinks.appendChild(a);
      } else if(p.links && p.links.itch){
        const a = document.createElement('a'); a.className='cta'; a.href=p.links.itch; a.target='_blank'; a.innerText='View on itch.io'; detailLinks.appendChild(a);
      } else {
        const sp = document.createElement('div'); sp.style.color='var(--muted)'; sp.innerText='No download link available yet.'; detailLinks.appendChild(sp);
      }
    }

    if(detailDevlog){
      (p.devlog || []).forEach(d => { const li = document.createElement('li'); li.innerText = d; detailDevlog.appendChild(li); });
    }

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

  const backToProjectsBtn = document.getElementById('backToProjects');
  if(backToProjectsBtn){
    backToProjectsBtn.addEventListener('click', (e)=>{ e.preventDefault(); showSection('projects'); });
  }

  renderProjects();
  showSection('home');
});
