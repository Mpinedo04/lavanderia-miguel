const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");
const posterButtons = document.querySelectorAll(".poster-zoom");
const revealTargets = document.querySelectorAll(
  ".prices .section-intro, .price-board, .dryer-offer, .services .section-intro, .service-grid, .local-main-image, .local-copy, .local-detail, .steps .section-intro, .step-track, .poster-copy, .poster-card, .visit-copy, .map-frame, .contact-copy, .contact-form"
);

const WHATSAPP_NUMBER = "34670607756";

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeaderState = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const setMenuState = (isOpen) => {
  document.body.classList.toggle("nav-open", isOpen);
  mainNav?.classList.toggle("is-open", isOpen);
  navToggle?.setAttribute("aria-expanded", String(isOpen));
  navToggle?.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    setMenuState(!document.body.classList.contains("nav-open"));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const nombre = String(data.get("nombre") || "").trim();
    const contacto = String(data.get("contacto") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    const status = contactForm.querySelector(".form-status");
    const text = [
      "Hola Rayo Washing, quiero hacer una consulta.",
      nombre ? `Nombre: ${nombre}` : "",
      contacto ? `Contacto: ${contacto}` : "",
      mensaje ? `Mensaje: ${mensaje}` : "",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (status) {
      status.textContent = "Se ha abierto WhatsApp con tu mensaje preparado.";
    }
  });
}

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
};

posterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightboxSrc || "";
    lightboxImage.alt = button.dataset.lightboxAlt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
    setMenuState(false);
  }
});

if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.dataset.revealDelay = String(index % 4);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }
}
