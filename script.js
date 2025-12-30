// ===============================
// Navegación de secciones
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
}

// Header navigation
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.dataset.target;
    if (target) showSection(target);
  });
});

// Botón "Ver Juegos" (Home)
const homeProjectsBtn = document.getElementById("homeProjectsBtn");
if (homeProjectsBtn) {
  homeProjectsBtn.addEventListener("click", e => {
    e.preventDefault();
    showSection("projects");
  });
}

// ===============================
// Detalle de proyecto
// ===============================
const projectsSection = document.getElementById("projects");
const detailSection = document.getElementById("detail");

function openDetail() {
  if (projectsSection) projectsSection.classList.remove("active");
  if (detailSection) detailSection.classList.add("active");
}

// volver a proyectos
const backBtn = document.getElementById("backToProjects");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    detailSection.classList.remove("active");
    projectsSection.classList.add("active");
  });
}

// ===============================
// Tabs Overview / Devlog
// ===============================
const tabOverview = document.getElementById("tabOverview");
const tabDevlog = document.getElementById("tabDevlog");
const overview = document.getElementById("detailOverview");
const devlog = document.getElementById("detailDevlogWrap");

if (tabOverview && tabDevlog) {
  tabOverview.addEventListener("click", () => {
    overview.style.display = "block";
    devlog.style.display = "none";
    tabOverview.style.background = "";
    tabDevlog.style.background = "#1a2333";
  });

  tabDevlog.addEventListener("click", () => {
    overview.style.display = "none";
    devlog.style.display = "block";
    tabDevlog.style.background = "";
    tabOverview.style.background = "#1a2333";
  });
}

// ===============================
// Exponer funciones si algún card las usa
// ===============================
window.openDetail = openDetail;
