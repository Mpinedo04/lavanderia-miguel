const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxStage = document.querySelector(".lightbox-stage");
const lightboxPrevious = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxCounter = document.querySelector(".lightbox-counter");
const lightboxButtons = document.querySelectorAll("[data-lightbox-src]");
const galleryMore = document.querySelector("[data-gallery-more]");
const galleryMoreToggle = document.querySelector(".gallery-more-toggle");
const renovationGallery = document.querySelector("#renovation-gallery");
const revealTargets = document.querySelectorAll(
  ".prices .section-intro, .price-board, .dryer-offer, .services .section-intro, .service-grid, .local-main-image, .local-copy, .local-detail, .steps .section-intro, .step-track, .poster-copy, .poster-card, .visit-copy, .map-frame, .contact-copy, .contact-form"
);

const WHATSAPP_NUMBER = "34670607756";
let activeLightboxItems = [];
let activeLightboxIndex = 0;
let swipeStartX = null;

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

const showLightboxItem = (index) => {
  if (!lightboxImage || !activeLightboxItems.length) return;
  activeLightboxIndex = (index + activeLightboxItems.length) % activeLightboxItems.length;
  const item = activeLightboxItems[activeLightboxIndex];
  lightboxImage.src = item.dataset.lightboxSrc || "";
  lightboxImage.alt = item.dataset.lightboxAlt || "";
  if (lightboxCounter) lightboxCounter.textContent = `${activeLightboxIndex + 1} / ${activeLightboxItems.length}`;
};

const moveLightbox = (direction) => {
  if (activeLightboxItems.length < 2) return;
  showLightboxItem(activeLightboxIndex + direction);
};

lightboxButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    const group = button.dataset.lightboxGroup;
    activeLightboxItems = group
      ? [...document.querySelectorAll(`[data-lightbox-group="${group}"]`)]
      : [button];
    activeLightboxIndex = Math.max(0, activeLightboxItems.indexOf(button));
    lightbox.classList.toggle("has-gallery", activeLightboxItems.length > 1);
    showLightboxItem(activeLightboxIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose?.focus();
  });
});

lightboxPrevious?.addEventListener("click", () => moveLightbox(-1));
lightboxNext?.addEventListener("click", () => moveLightbox(1));

lightboxStage?.addEventListener("touchstart", (event) => {
  swipeStartX = event.changedTouches[0]?.clientX ?? null;
}, { passive: true });

lightboxStage?.addEventListener("touchend", (event) => {
  if (swipeStartX === null) return;
  const swipeEndX = event.changedTouches[0]?.clientX ?? swipeStartX;
  const distance = swipeEndX - swipeStartX;
  swipeStartX = null;
  if (Math.abs(distance) < 45) return;
  moveLightbox(distance < 0 ? 1 : -1);
}, { passive: true });

if (galleryMore && galleryMoreToggle && renovationGallery) {
  let galleryPinned = false;
  let hoverSuppressed = false;
  const galleryLabel = galleryMoreToggle.querySelector("span");

  const setGalleryState = (isOpen) => {
    galleryMore.classList.toggle("is-open", isOpen);
    galleryMoreToggle.setAttribute("aria-expanded", String(isOpen));
    renovationGallery.toggleAttribute("inert", !isOpen);
    if (galleryLabel) galleryLabel.textContent = isOpen ? "Ocultar fotos" : "Ver más fotos";
  };

  galleryMore.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse" && !galleryPinned && !hoverSuppressed) setGalleryState(true);
  });

  galleryMore.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "mouse") {
      hoverSuppressed = false;
      if (!galleryPinned && !galleryMore.contains(document.activeElement)) setGalleryState(false);
    }
  });

  galleryMoreToggle.addEventListener("click", () => {
    const isOpen = galleryMore.classList.contains("is-open");

    if (isOpen) {
      galleryPinned = false;
      hoverSuppressed = true;
      setGalleryState(false);
      return;
    }

    galleryPinned = true;
    hoverSuppressed = false;
    setGalleryState(true);
  });

  renovationGallery.querySelectorAll("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      galleryPinned = true;
      hoverSuppressed = false;
      setGalleryState(true);
    });
  });
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox?.classList.contains("is-open") && event.key === "ArrowLeft") moveLightbox(-1);
  if (lightbox?.classList.contains("is-open") && event.key === "ArrowRight") moveLightbox(1);
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
