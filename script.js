document.addEventListener('DOMContentLoaded', () => {

  // DICCIONARIO DE TRADUCCIONES
  const UI_TEXTS = {
    es: {
      nav_home: "Inicio", nav_games: "Juegos", nav_blog: "Blog", nav_donations: "Donaciones", nav_about: "Sobre Mí", nav_contact: "Contacto",
      home_title: "Desarrollador de Juegos · Unity · C#",
      home_desc: "Programador y artista de videojuegos. Experiencia en Unity, C#, shaders, UI/UX, diseño y arte 2D/3D.",
      btn_view_games: "Ver Juegos", title_projects: "Mis Proyectos", btn_back: "← Volver a proyectos",
      tab_overview: "Resumen", tab_devlog: "Bitácora (Devlog)", blog_desc: "Espacio personal para ideas y notas generales.",
      don_desc: "Si querés apoyar el desarrollo de futuros proyectos podés hacerlo a través de las siguientes plataformas:",
      don_thanks: "¡Gracias por apoyar el desarrollo de mis juegos!",
      don_crypto_title: "Direcciones de Depósito",
      about_exp_title: "Experiencia destacada", contact_send_msg: "Enviar mensaje", btn_send: "Enviar Mensaje",
      msg_sending: "Enviando...", msg_success: "¡Mensaje enviado con éxito!", msg_error: "Hubo un error al enviar.",
      copy_ok: "¡Copiado!", copy_btn: "Copiar"
    },
    en: {
      nav_home: "Home", nav_games: "Games", nav_blog: "Blog", nav_donations: "Donations", nav_about: "About", nav_contact: "Contact",
      home_title: "Game Developer · Unity · C#",
      home_desc: "Video game programmer and artist. Experience in Unity, C#, shaders, UI/UX, design and 2D/3D art.",
      btn_view_games: "View Games", title_projects: "My Projects", btn_back: "← Back to projects",
      tab_overview: "Overview", tab_devlog: "Devlog", blog_desc: "Personal space for ideas and general notes.",
      don_desc: "If you want to support future developments, you can do so through the following platforms:",
      don_thanks: "Thanks for supporting my game development!",
      don_crypto_title: "Deposit Addresses",
      about_exp_title: "Professional Experience", contact_send_msg: "Send a message", btn_send: "Send Message",
      msg_sending: "Sending...", msg_success: "Message sent successfully!", msg_error: "An error occurred.",
      copy_ok: "Copied!", copy_btn: "Copy"
    }
  };

  const PROJECTS =,
      tags:, devlog:['Mecánicas de combate terminadas']
    },
    { id:'llamageddon', title:'Llamageddon', year:2020,
      desc:{ es:'Juego arcade con humor absurdo sobre Argentina.', en:'Arcade game with absurd humor about Argentina.' },
      longDesc:{ es:'El año 2020 tiene nuevas y catastróficas sorpresas, pero la Argentina está preparada.', en:'The year 2020 has new and catastrophic surprises, but Argentina is ready.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon' },
      media:[ { type:'image', src:'images/llamageddon_thumb.jpg' } ],
      tags:['Action','Arcade'], devlog:['Lanzamiento en itch.io']
    },
    { id:'alphabet', title:'Alphabet', year:2015,
      desc:{ es:'Platform Puzzle premiado.', en:'Award-winning Platform Puzzle.' },
      longDesc:{ es:'"Y" es liberado de una misteriosa instalación y debe averiguar su pasado.', en:'"Y" is released from a mysterious facility and must find out about his past.' },
      links:{ itch:'https://lexanos.itch.io/alphabet' },
      media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ],
      tags:['Puzzle','Platformer'], devlog:['Premio al mejor diseño']
    },
    { id:'losxtars', title:'Los Xtar\'s', year:2018,
      desc:{ es:'Plataformas y conspiración.', en:'Platformer about a conspiracy.' },
      longDesc:{ es:'Únete a los Xtar\'s y ayuda a descubrir quién está detrás de esta conspiración.', en:'Join the Xtar\'s and help discover who is behind this conspiracy.' },
      links:{ itch:'https://lexanos.itch.io/los-xtars' },
      media:[ { type:'image', src:'images/losxtars_thumb.jpg' } ],
      tags:['Platformer'], devlog:
    },
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      desc:{ es:'Acción cartoon y combate fluido.', en:'Cartoon action and fluid combat.' },
      longDesc:{ es:'Desarrollo de GUI y sistemas de combate fluido en Unity.', en:'GUI development and fluid combat systems in Unity.' },
      links:{ itch:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' } ],
      tags:['Action','Unity'], devlog:
    }
  ];

  let LANG = 'es';

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main.section');
  const grid = document.getElementById('projectsGrid');
  const langSelect = document.getElementById('lang');

  function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (UI_TEXTS[LANG][key]) el.innerText = UI_TEXTS[LANG][key];
    });
    // Form placeholders
    document.getElementById('cName').placeholder = (LANG === 'es'? 'Nombre' : 'Name');
    document.getElementById('cEmail').placeholder = (LANG === 'es'? 'Email' : 'Email');
    document.getElementById('cMsg').placeholder = (LANG === 'es'? 'Mensaje' : 'Message');
    renderProjects();
  }

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

  langSelect.addEventListener('change', (e) => {
    LANG = e.target.value;
    updateUI();
  });

  function renderProjects(){
    grid.innerHTML = '';
    PROJECTS.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card';
      const thumb = document.createElement('div');
      thumb.className = 'thumb';
      const imgItem = (p.media||).find(m=>m.type==='image');
      const img = document.createElement('img');
      img.src = imgItem?.src |

| 'images/placeholder_thumb.jpg';
      thumb.appendChild(img);

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerHTML = `
        <h4>${p.title} <span style="color:var(--muted);font-size:13px">(${p.year})</span></h4>
        <p>${p.desc[LANG]}</p>
        <div class="tags">${(p.tags||).map(t=>`<span>${t}</span>`).join('')}</div>
      `;
      card.appendChild(thumb);
      card.appendChild(meta);
      card.addEventListener('click',()=>openDetail(p.id));
      grid.appendChild(card);
    });
  }

  function openDetail(id){
    const p = PROJECTS.find(x=>x.id===id);
    if(!p) return;
    document.getElementById('detailTitle').innerText = p.title;
    document.getElementById('detailDesc').innerText = p.longDesc[LANG] |

| p.desc[LANG];
    const media = document.getElementById('detailMedia');
    media.innerHTML = '';
    const main = p.media;
    if(main?.type==='image'){
      const i = document.createElement('img'); i.src = main.src; i.style.width = '100%'; i.style.borderRadius = '8px'; media.appendChild(i);
    }
    const links = document.getElementById('detailLinks');
    links.innerHTML='';
    if(p.links.itch){
      const a=document.createElement('a'); a.className='cta'; a.href=p.links.itch; a.target='_blank'; a.innerText='Itch.io'; links.appendChild(a);
    }
    const devlog = document.getElementById('detailDevlog');
    devlog.innerHTML='';
    p.devlog.forEach(d=>{ const li=document.createElement('li'); li.innerText=d; devlog.appendChild(li); });
    showSection('detail');
  }

  // LÓGICA DE DONACIONES & CRYPTO
  const binanceBtn = document.getElementById('binanceBtn');
  const cryptoModule = document.getElementById('cryptoModule');
  
  binanceBtn.onclick = (e) => { e.preventDefault(); cryptoModule.style.display = 'block'; };
  document.getElementById('closeCrypto').onclick = () => cryptoModule.style.display = 'none';

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = UI_TEXTS[LANG].copy_ok;
        btn.style.background = '#4ade80';
        setTimeout(() => { 
          btn.innerText = originalText; 
          btn.style.background = '';
        }, 2000);
      });
      document.getElementById('donThanks').style.display = 'block';
    };
  });

  // CONTACTO (Formspree)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  contactForm.onsubmit = async (e) => {
    e.preventDefault();
    contactStatus.innerText = UI_TEXTS[LANG].msg_sending;
    contactStatus.style.color = "var(--muted)";

    const data = new FormData(contactForm);
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        contactStatus.innerText = UI_TEXTS[LANG].msg_success;
        contactStatus.style.color = "#4ade80";
        contactForm.reset();
      } else {
        contactStatus.innerText = UI_TEXTS[LANG].msg_error;
        contactStatus.style.color = "#ff6b6b";
      }
    } catch {
      contactStatus.innerText = UI_TEXTS[LANG].msg_error;
      contactStatus.style.color = "#ff6b6b";
    }
  };

  document.getElementById('backToProjects').onclick = ()=>showSection('projects');
  document.getElementById('tabOverview').onclick = () => {
    document.getElementById('detailOverview').style.display='block';
    document.getElementById('detailDevlogWrap').style.display='none';
  };
  document.getElementById('tabDevlog').onclick = () => {
    document.getElementById('detailOverview').style.display='none';
    document.getElementById('detailDevlogWrap').style.display='block';
  };

  updateUI();
});
