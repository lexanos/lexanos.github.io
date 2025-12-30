// ===============================
// DATA — SISTEMA DE JUEGOS
// ===============================
const PROJECTS = [
  {
    id: "llamageddon",
    title: "LLamageddon",
    year: 2020,
    desc: {
      es: "Juego arcade meme de acción rápida.",
      en: "Fast paced arcade meme game."
    },
    longDesc: {
      es: "LLamageddon es un juego arcade con humor absurdo y partidas cortas.",
      en: "LLamageddon is an arcade game with absurd humor and short sessions."
    },
    media: [
      { type: "image", src: "images/llamageddon.jpg" }
    ],
    links: {
      itch: "https://lexanos.itch.io/llamageddon"
    },
    devlog: [
      "Prototipo inicial",
      "Balance de dificultad",
      "Publicación en itch.io"
    ],
    tags: ["Arcade", "Meme"]
  },
  {
    id: "artool",
    title: "Artool",
    year: 2019,
    desc: {
      es: "Herramienta creativa para brainstorming.",
      en: "Creative brainstorming tool."
    },
    longDesc: {
      es: "Artool es una herramienta experimental para ideas visuales.",
      en: "Artool is an experimental visual ideation tool."
    },
    media: [],
    links: {
      itch: "https://lexanos.itch.io/artool"
    },
    devlog: [],
    tags: ["Tool"]
  }
];

// ===============================
// NAVEGACIÓN DE SECCIONES
// ===============================
const navLinks = document.querySelectorAll("nav a[data-target]");
const sections = document.querySelectorAll(".section");

function showSection(id) {
  sections.forEach(sec => {
    sec.classList.toggle("active", sec.id === id);
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.dataset.target === id);
  });

  window.scrollTo(0, 0);
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    showSection(link.dataset.target);
  });
});

document.getElementById("homeProjectsBtn")
  .addEventListener("click", e => {
    e.preventDefault();
    showSection("projects");
  });

// ===============================
// RENDER DE CARDS
// ===============================
const grid = document.getElementById("projectsGrid");

function renderProjects() {
  grid.innerHTML = "";

  PROJECTS.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.innerHTML = `<strong>${p.title}</strong>`;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <h4>${p.title} (${p.year})</h4>
      <p>${p.desc.es}</p>
      <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    `;

    card.appendChild(thumb);
    card.appendChild(meta);

    card.addEventListener("click", () => openDetail(p.id));

    grid.appendChild(card);
  });
}

// ===============================
// DETAIL / OVERVIEW / DEVLOG
// ===============================
const detailSection = document.getElementById("detail");
const projectsSection = document.getElementById("projects");

const detailTitle = document.getElementById("detailTitle");
const detailMedia = document.getElementById("detailMedia");
const detailThumbs = document.getElementById("detailThumbs");
const detailDesc = document.getElementById("detailDesc");
const detailLinks = document.getElementById("detailLinks");
const detailDevlog = document.getElementById("detailDevlog");

function openDetail(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  detailTitle.textContent = p.title;
  detailDesc.textContent = p.longDesc.es;

  detailMedia.innerHTML = "";
  detailThumbs.innerHTML = "";
  detailLinks.innerHTML = "";
  detailDevlog.innerHTML = "";

  if (p.media.length) {
    const main = document.createElement("div");
    main.style.height = "300px";
    main.style.background = "#000";
    main.style.display = "flex";
    main.style.alignItems = "center";
    main.style.justifyContent = "center";
    main.textContent = "Preview disponible";
    detailMedia.appendChild(main);
  }

  if (p.links.itch) {
    const a = document.createElement("a");
    a.href = p.links.itch;
    a.target = "_blank";
    a.className = "cta";
    a.textContent = "Jugar / Descargar";
    detailLinks.appendChild(a);
  } else {
    detailLinks.textContent = "Link no disponible aún";
  }

  p.devlog.forEach(d => {
    const li = document.createElement("li");
    li.textContent = d;
    detailDevlog.appendChild(li);
  });

  projectsSection.classList.remove("active");
  detailSection.classList.add("active");
}

// ===============================
// TABS
// ===============================
const tabOverview = document.getElementById("tabOverview");
const tabDevlog = document.getElementById("tabDevlog");
const overview = document.getElementById("detailOverview");
const devlogWrap = document.getElementById("detailDevlogWrap");

tabOverview.addEventListener("click", () => {
  overview.style.display = "block";
  devlogWrap.style.display = "none";
});

tabDevlog.addEventListener("click", () => {
  overview.style.display = "none";
  devlogWrap.style.display = "block";
});

document.getElementById("backToProjects")
  .addEventListener("click", () => {
    detailSection.classList.remove("active");
    projectsSection.classList.add("active");
  });

// ===============================
// INIT
// ===============================
renderProjects();
showSection("home");

// Exponer por si alguna card lo usa
window.openDetail = openDetail;
