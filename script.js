document.addEventListener('DOMContentLoaded', () => {

  const PROJECTS =,
      tags:['Action','Unity'],
      devlog:['Prototipo inicial']
    },
    { id:'llamageddon', title:'Llamageddon', year:2020,
      desc:{ es:'Juego arcade con humor absurdo.', en:'Arcade game with absurd humor.' },
      longDesc:{ es:'Acción arcade ambientada en Argentina 2020.', en:'Arcade action set in Argentina 2020.' },
      links:{ itch:'https://lexanos.itch.io/llamageddon', download:'' },
      media:[ { type:'image', src:'images/llamageddon_thumb.jpg' } ],
      tags:['Action'],
      devlog:['Lanzamiento itch.io']
    }
    // Puedes seguir agregando el resto manteniendo esta estructura
  ];

  let LANG = 'es';

  // --- NAVEGACIÓN (Restaurada de tu original) ---
  const navLinks = document.querySelectorAll('header nav a[data-target]');
  const sections = document.querySelectorAll('main.section');
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

  // --- RENDER DE PROYECTOS ---
  function renderProjects(){
    if(!grid) return;
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
    const main = (p.media||);
    if(main?.type==='image'){
      const i = document.createElement('img'); i.src = main.src; i.style.width = '100%'; media.appendChild(i);
    }
    const links = document.getElementById('detailLinks');
    links.innerHTML='';
    if(p.links.itch){
      const a=document.createElement('a'); a.className='cta'; a.href=p.links.itch; a.target='_blank'; a.innerText='itch.io'; links.appendChild(a);
    }
    showSection('detail');
  }

  // --- DONACIONES (Binance Copy) ---
  const binanceBsc = "0xa1e79ea99e2461db522c591a8b87aee2d1d40ece";
  const binanceTrx = "TCKX7fxAvtRvE3Wn1pRtGWjbvCj5LFe6mc";

  document.getElementById('binanceBsc').onclick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(binanceBsc);
    alert("Dirección BSC copiada");
    document.getElementById('donThanks').style.display = 'block';
  };

  document.getElementById('binanceTrx').onclick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(binanceTrx);
    alert("Dirección TRON copiada");
    document.getElementById('donThanks').style.display = 'block';
  };

  // --- CONTACTO (Formspree) ---
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');

  if(contactForm) {
    contactForm.onsubmit = async (e) => {
      e.preventDefault();
      contactStatus.innerText = "Enviando...";
      const data = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          contactStatus.innerText = "¡Mensaje enviado!";
          contactForm.reset();
        } else {
          contactStatus.innerText = "Error al enviar.";
        }
      } catch {
        contactStatus.innerText = "Error de conexión.";
      }
    };
  }

  document.getElementById('backToProjects').onclick = ()=>showSection('projects');
  document.getElementById('tabOverview').onclick = () => {
    document.getElementById('detailOverview').style.display='block';
    document.getElementById('detailDevlogWrap').style.display='none';
  };
  document.getElementById('tabDevlog').onclick = () => {
    document.getElementById('detailOverview').style.display='none';
    document.getElementById('detailDevlogWrap').style.display='block';
  };

  renderProjects();
});