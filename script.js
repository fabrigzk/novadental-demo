(function () {
  const pages = Array.from(document.querySelectorAll(".page"));
  const navLinks = Array.from(document.querySelectorAll(".js-nav"));

  function setActivePage(pageId) {
    pages.forEach(p => p.classList.toggle("is-active", p.id === pageId));
    navLinks.forEach(a => a.classList.toggle("is-active", a.dataset.page === pageId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.dataset.page;
      if (!pageId) return;
      setActivePage(pageId);
    });
  });

  // Respeta hash en la URL
  const hash = (location.hash || "").replace("#", "").trim();
  if (hash && document.getElementById(hash)) setActivePage(hash);
})();

/* ====== MENU MOVIL (FIX REAL, NO TOCA SPA) ====== */
(function () {
  const menuBtn = document.querySelector(".menu-btn");
  const mobileNav = document.querySelector(".mobile-nav");
  const navOverlay = document.querySelector(".nav-overlay"); // si existe
  const body = document.body;

  if (!menuBtn || !mobileNav) return;

  function openMenu() {
    body.classList.add("nav-open");   // ✅ CLAVE
    body.classList.add("no-scroll");
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    body.classList.remove("nav-open"); // ✅ CLAVE
    body.classList.remove("no-scroll");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMenu(e) {
    e.preventDefault();
    body.classList.contains("nav-open") ? closeMenu() : openMenu();
  }

  menuBtn.addEventListener("click", toggleMenu);

  // cerrar al hacer click en una opción
  mobileNav.querySelectorAll(".js-nav").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // cerrar tocando el overlay (si existe)
  if (navOverlay) navOverlay.addEventListener("click", closeMenu);

  // cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
