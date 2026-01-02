document.addEventListener('DOMContentLoaded', () => {

  // CONFIGURACIÓN DE DONACIONES (Sustituye con tus links reales)
  const DONATION_CONFIG = {
    paypal: 'https://paypal.me/tu_usuario',
    mercado: 'https://link.mercadopago.com.ar/tu_usuario',
    payoneer: 'tu_email_payoneer@gmail.com', // Payoneer no tiene link directo fácil, a veces se usa email
    binance: 'TU_BINANCE_PAY_ID_O_LINK'
  };

  // DICCIONARIO DE TRADUCCIONES UI
  const UI_TEXTS = {
    es: {
      nav_home: "Home", nav_games: "Games", nav_blog: "Blog", nav_donations: "Donations", nav_about: "About", nav_contact: "Contact",
      home_title: "Desarrollador de Juegos · Unity · C#",
      home_desc: "Programador y artista de videojuegos. Experiencia en Unity, C#, shaders, UI/UX, diseño y arte 2D/3D.",
      btn_view_games: "Ver Juegos", title_projects: "Proyectos", btn_back: "← Volver a proyectos",
      tab_overview: "Overview", tab_devlog: "Devlog", blog_desc: "Espacio personal para ideas, notas y comentarios generales...",
      don_desc: "Si querés apoyar el desarrollo de futuros proyectos podés hacerlo a través de las siguientes plataformas:",
      don_thanks: "Gracias por apoyar el desarrollo de mis juegos. Tu aporte ayuda a seguir creando nuevos proyectos.",
      about_exp_title: "Experiencia destacada", contact_send_msg: "Enviar mensaje", btn_send: "Enviar",
      msg_sending: "Enviando mensaje...", msg_success: "¡Mensaje enviado correctamente!", msg_error: "Error al enviar el mensaje.",
      msg_fill_fields: "Por favor completá todos los campos.", msg_invalid_email: "El email no es válido."
    },
    en: {
      nav_home: "Home", nav_games: "Games", nav_blog: "Blog", nav_donations: "Donations", nav_about: "About", nav_contact: "Contact",
      home_title: "Game Developer · Unity · C#",
      home_desc: "Video game programmer and artist. Experience in Unity, C#, shaders, UI/UX, design and 2D/3D art.",
      btn_view_games: "View Games", title_projects: "Projects", btn_back: "← Back to Projects",
      tab_overview: "Overview", tab_devlog: "Devlog", blog_desc: "Personal space for ideas and notes. Devlogs are inside each project.",
      don_desc: "If you want to support future developments, you can do so through the following platforms:",
      don_thanks: "Thank you for supporting my game development. Your contribution helps keep projects going.",
      about_exp_title: "Featured Experience", contact_send_msg: "Send message", btn_send: "Send",
      msg_sending: "Sending message...", msg_success: "Message sent successfully!", msg_error: "Error sending message.",
      msg_fill_fields: "Please fill in all fields.", msg_invalid_email: "Invalid email address."
    }
  };

  const PROJECTS =,
      tags:['Action','Unity'],
      devlog:['Prototipo inicial']
    },
    { id:'llamageddon', title:'Llamageddon', year:2020,
      desc:{ es:'Juego arcade con humor absurdo sobre Argentina.', en:'Arcade game with absurd humor about Argentina.' },
      longDesc:{ es:'Juego corto de acción arcade desarrollado en 2020.', en:'Short arcade action game developed in 2020.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon', download:'https://lexanos.itch.io/llamageddon' },
      media:,
      tags:['Arcade'],
      devlog:['Publicado en itch.io']
    },
    { id:'alphabet', title:'Alphabet', year:2015,
      desc:{ es:'Puzzles y plataformas premiado.', en:'Award-winning puzzle platformer.' },
      longDesc:{ es:'Alphabet es un puzzle-platformer premiado por su diseño.', en:'Alphabet is a prize-winning puzzle-platformer.' },
      links:{ itch:'https://lexanos.itch.io/alphabet', download:'' },
      media:[ { type:'image', src:'images/alphabet_thumb.jpg' } ],
      tags:['Puzzle'],
      devlog:
    },
    { id:'piratepenguin', title:'Pirate Penguin / Forja de Almas', year:2024,
      desc:{ es:'Acción cartoon y combate fluido.', en:'Cartoon action with fluid combat.' },
      longDesc:{ es:'Proyecto de acción con shaders personalizados y UI avanzada.', en:'Action project with custom shaders and advanced UI.' },
      links:{ itch:'', download:'' },
      media:[ { type:'image', src:'images/pirate_thumb.jpg' } ],
      tags:['Action','Unity'],
      devlog:['Combate iterado']
    }
    //... puedes seguir agregando el resto de proyectos aquí
  ];

  let LANG = 'es';

  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main.section');
  const grid = document.getElementById('projectsGrid');
  const langSelect = document.getElementById('lang');

  // FUNCION CAMBIO IDIOMA UI
  function updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (UI_TEXTS[LANG][key]) {
        if (el.tagName === 'INPUT' |

| el.tagName === 'TEXTAREA') {
          el.placeholder = UI_TEXTS[LANG][key];
        } else {
          el.innerText = UI_TEXTS[LANG][key];
        }
      }
    });
    renderProjects();
  }

  langSelect.addEventListener('change', (e) => {
    LANG = e.target.value;
    updateUI();
  });

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
      
      const imgItem = (p.media||).find(m=>m.type==='image');
      const vidItem = (p.media||).find(m=>m.type==='video');
      const img = document.createElement('img');
      img.src = imgItem?.src |

| vidItem?.poster |
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
    const main = p.media.find(m=>m.type==='video' && m.src!=='PLACEHOLDER_VIDEO') |

| p.media;
    if(main?.type==='image'){
      const i = document.createElement('img'); i.src = main.src; i.style.width = '100%'; media.appendChild(i);
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

  document.getElementById('backToProjects').onclick = ()=>showSection('projects');
  document.getElementById('tabOverview').onclick = ()=> {
    document.getElementById('detailOverview').style.display='block';
    document.getElementById('detailDevlogWrap').style.display='none';
  };
  document.getElementById('tabDevlog').onclick = ()=> {
    document.getElementById('detailOverview').style.display='none';
    document.getElementById('detailDevlogWrap').style.display='block';
  };

  // LOGICA DONACIONES
  document.querySelectorAll('[data-donate]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-donate');
      const url = DONATION_CONFIG[type];
      
      if(type === 'binance') {
          navigator.clipboard.writeText(url);
          alert('Binance ID copiado al portapapeles');
      } else {
          window.open(url, '_blank');
      }
      document.getElementById('donThanks').style.display = 'block';
    };
  });

  // FORMULARIO DE CONTACTO (Formspree)
  const contactForm = document.getElementById('contactForm');
  let contactStatus = document.getElementById('contactStatus') |

| document.createElement('div');
  contactStatus.id = 'contactStatus';
  contactForm.appendChild(contactStatus);

  contactForm.onsubmit = async (e) => {
    e.preventDefault();
    contactStatus.innerText = UI_TEXTS[LANG].msg_sending;
    
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      contactStatus.innerText = UI_TEXTS[LANG].msg_success;
      contactStatus.style.color = '#4ade80';
      contactForm.reset();
    } else {
      contactStatus.innerText = UI_TEXTS[LANG].msg_error;
      contactStatus.style.color = '#ff6b6b';
    }
  };

  renderProjects();
  updateUI();
});
