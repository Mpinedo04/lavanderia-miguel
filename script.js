const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const year = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");
const revealTargets = document.querySelectorAll(
  ".real-place, .gallery, .services, .pet-section, .steps, .extras, .trust, .location, .contact"
);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = contactForm.querySelector(".form-status");

    if (status) {
      status.textContent = "Gracias. Para una respuesta rápida, mejor escríbenos por WhatsApp o llámanos.";
    }

    contactForm.reset();
  });
}

if (revealTargets.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealTargets.forEach((target) => target.classList.add("reveal"));

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
      { threshold: 0.12 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }
}
