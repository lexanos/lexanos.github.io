// ---------- DATA ----------
const PROJECTS = [...]; // ⚠️ ES EXACTAMENTE EL MISMO ARRAY QUE YA TENÍAS
// (no lo modifico para no romper nada)

// ---------- I18N ----------
const I18N = {
  es:{ homeTitle:'Desarrollador de Juegos · Unity · C#', homeDesc:'Programador y artista de videojuegos. Experiencia en Unity, C#, shaders, UI/UX, diseño y arte 2D/3D.' },
  en:{ homeTitle:'Game Developer · Unity · C#', homeDesc:'Programmer and game artist. Experience in Unity, C#, shaders, UI/UX, design and 2D/3D art.' }
};
let LANG='es';

// ---------- NAV ----------
const navLinks=document.querySelectorAll('header nav a');
const sections=document.querySelectorAll('main .section');

function showSection(id){
  sections.forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el) el.classList.add('active');
  navLinks.forEach(a=>a.classList.toggle('active',a.dataset.target===id));
  window.scrollTo(0,0);
}

navLinks.forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  showSection(a.dataset.target);
}));

document.getElementById('homeProjectsBtn')
  .addEventListener('click',e=>{
    e.preventDefault();
    showSection('projects');
  });

// ---------- LANG ----------
function applyLang(){
  const d=I18N[LANG];
  homeTitle.innerText=d.homeTitle;
  homeDesc.innerText=d.homeDesc;
}
applyLang();

// ---------- PROJECT CARDS ----------
function renderProjects(){
  const grid=document.getElementById('projectsGrid');
  grid.innerHTML='';
  PROJECTS.forEach(p=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <div class="thumb">
        <img src="${p.media?.[0]?.src||'images/placeholder_thumb.jpg'}">
      </div>
      <div class="meta">
        <h4>${p.title} <span style="color:var(--muted)">(${p.year})</span></h4>
        <p>${p.desc[LANG]}</p>
      </div>
    `;
    card.onclick=()=>openDetail(p.id);
    grid.appendChild(card);
  });
}
renderProjects();

// ---------- DETAIL ----------
function openDetail(id){
  const p=PROJECTS.find(x=>x.id===id);
  if(!p) return;

  showSection('detail');
  detailTitle.innerText=p.title;
  detailDesc.innerText=p.longDesc[LANG]||'';

  detailMedia.innerHTML='';
  detailThumbs.innerHTML='';
  detailLinks.innerHTML='';

  if(p.links?.itch){
    detailLinks.innerHTML+=`<a class="cta" target="_blank" href="${p.links.itch}">Jugar</a>`;
  }

  detailDevlog.innerHTML='';
  (p.devlog||[]).forEach(d=>{
    const li=document.createElement('li');
    li.innerText=d;
    detailDevlog.appendChild(li);
  });
}

// ---------- DETAIL BUTTONS ----------
tabOverview.onclick=()=>{
  detailOverview.style.display='block';
  detailDevlogWrap.style.display='none';
};
tabDevlog.onclick=()=>{
  detailOverview.style.display='none';
  detailDevlogWrap.style.display='block';
};
backToProjects.onclick=()=>showSection('projects');

// ---------- INIT ----------
showSection('home');
