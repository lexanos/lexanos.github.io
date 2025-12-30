document.addEventListener('DOMContentLoaded', () => {

  const PROJECTS = [
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

  let LANG = 'es';

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main .section');
  const grid = document.getElementById('projectsGrid');

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

  document.getElementById('homeProjectsBtn')?.addEventListener('click', e=>{
    e.preventDefault();
    showSection('projects');
  });

  function renderProjects(){
    grid.innerHTML = '';
    PROJECTS.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';

      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      thumb.style.position = 'relative';

      const imgItem = (p.media||[]).find(m=>m.type==='image');
      const vidItem = (p.media||[]).find(m=>m.type==='video');

      const img = document.createElement('img');
      img.src = imgItem?.src || vidItem?.poster || 'images/placeholder_thumb.jpg';
      thumb.appendChild(img);

      if(vidItem){
        const v = document.createElement('video');
        if(vidItem.src !== 'PLACEHOLDER_VIDEO') v.src = vidItem.src;
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
      }

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `
        <h4>${p.title} <span style="color:var(--muted);font-size:13px">(${p.year})</span></h4>
        <p>${p.desc[LANG]}</p>
        <div class="tags">${(p.tags||[]).map(t=>`<span>${t}</span>`).join('')}</div>
      `;

      card.appendChild(thumb);
      card.appendChild(meta);
      card.addEventListener('click',()=>openDetail(p.id));
      grid.appendChild(card);
    });
  }

  renderProjects();

  function openDetail(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;

    document.getElementById('detailTitle').innerText = p.title;
    document.getElementById('detailDesc').innerText = p.longDesc[LANG] || p.desc[LANG];

    const media = document.getElementById('detailMedia');
    media.innerHTML = '';

    const main = p.media.find(m=>m.type==='video' && m.src!=='PLACEHOLDER_VIDEO') || p.media[0];
    if(main?.type==='video' && main.src!=='PLACEHOLDER_VIDEO'){
      const v = document.createElement('video');
      v.controls = true;
      v.src = main.src;
      v.style.width = '100%';
      v.style.height = '400px';
      media.appendChild(v);
    } else if(main?.type==='image'){
      const i = document.createElement('img');
      i.src = main.src;
      i.style.width = '100%';
      media.appendChild(i);
    }

    const thumbs = document.getElementById('detailThumbs');
    thumbs.innerHTML = '';
    p.media.forEach(m=>{
      const t = document.createElement('div');
      t.style.cssText = 'width:120px;height:68px;border-radius:8px;overflow:hidden;cursor:pointer;margin-right:8px;background:#000';
      if(m.type==='image'){
        const i = document.createElement('img');
        i.src = m.src;
        i.style.width='100%';
        i.style.height='100%';
        i.style.objectFit='cover';
        t.appendChild(i);
        t.onclick = ()=>{ media.innerHTML=''; const im=document.createElement('img'); im.src=m.src; im.style.width='100%'; media.appendChild(im); };
      }
      thumbs.appendChild(t);
    });

    const links = document.getElementById('detailLinks');
    links.innerHTML='';
    if(p.links.download){
      const a=document.createElement('a'); a.className='cta'; a.href=p.links.download; a.target='_blank'; a.innerText='Download / Play'; links.appendChild(a);
    } else if(p.links.itch){
      const a=document.createElement('a'); a.className='cta'; a.href=p.links.itch; a.target='_blank'; a.innerText='View on itch.io'; links.appendChild(a);
    }

    const devlog = document.getElementById('detailDevlog');
    devlog.innerHTML='';
    p.devlog.forEach(d=>{ const li=document.createElement('li'); li.innerText=d; devlog.appendChild(li); });

    document.getElementById('detailOverview').style.display='block';
    document.getElementById('detailDevlogWrap').style.display='none';

    showSection('detail');
  }

  document.getElementById('tabOverview').onclick = ()=>{
    document.getElementById('detailOverview').style.display = 'block';
    document.getElementById('detailDevlogWrap').style.display = 'none';
    document.getElementById('tabOverview').style.background = 'var(--accent)';
    document.getElementById('tabDevlog').style.background = '#1a2333';
  };

  document.getElementById('tabDevlog').onclick = ()=>{
    document.getElementById('detailOverview').style.display = 'none';
    document.getElementById('detailDevlogWrap').style.display = 'block';
    document.getElementById('tabDevlog').style.background = 'var(--accent)';
    document.getElementById('tabOverview').style.background = '#1a2333';
  };

  document.getElementById('backToProjects').onclick = ()=>showSection('projects');

  showSection('home');

  // ===============================
  // Contact form submit (FIX REAL)
  // ===============================
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      contactStatus.innerText = '';
      contactStatus.style.color = '';

      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const msg = document.getElementById('cMsg').value.trim();

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
        contactStatus.innerText = 'Error: formulario sin destino de envío.';
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
            name,
            email,
            message: msg
          })
        });

        if (res.ok) {
          contactStatus.innerText = 'Mensaje enviado correctamente. ¡Gracias!';
          contactStatus.style.color = '#4ade80';
          contactForm.reset();
        } else {
          contactStatus.innerText = 'Error al enviar el mensaje.';
          contactStatus.style.color = '#ff6b6b';
        }
      } catch {
        contactStatus.innerText = 'Error de conexión.';
        contactStatus.style.color = '#ff6b6b';
      }
    });
  }

});
