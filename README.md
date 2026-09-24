# Rayo Washing · Autobugaderia / Lavandería Autoservicio

Sitio web oficial en producción para **Rayo Washing**, lavandería autoservicio ubicada en Abrera (Barcelona). 

El sitio presenta la oferta comercial, lista detallada de tarifas, fotografías del local reformado, servicio especializado para textiles de mascotas, horarios de apertura, mapa interactivo con indicaciones y canales de contacto directo (llamada y WhatsApp).

---

## 🌐 Sitio Web Oficial

- **URL en Producción:** [https://lavanderia-miguel.vercel.app/](https://lavanderia-miguel.vercel.app/)
- **Infraestructura:** Desplegado de forma continua en la red perimetral global (Edge) de [Vercel](https://vercel.com).

---

## ✨ Características principales

- **Soporte multi-idioma (i18n):**
  - Trilingüe nativo: **Español**, **Catalán** e **Inglés**.
  - Selector con banderas en la cabecera, persistencia de preferencia en `localStorage` y actualización reactiva de textos y atributos ARIA sin recargar la página.
- **Galería interactiva con Lightbox:**
  - Fotografías reales del local reformado en formato `.webp` de alta compresión.
  - Visor modal a pantalla completa con navegación por botones, control por teclado (`←`, `→`, `Escape`) y contador de imágenes.
- **Ilustraciones y animaciones SVG:**
  - Gráficos vectoriales a medida para la maquinaria de lavado, secado y mascotas con micro-interacciones CSS.
- **Mobile-First & Accesibilidad:**
  - Diseño 100% responsivo adaptable a cualquier resolución y dispositivo.
  - Navegación semántica, enlace de salto rápido (`skip-link`), atributos ARIA y respeto por las preferencias del usuario (`prefers-reduced-motion`).
- **SEO y Datos Estructurados:**
  - Metadatos Open Graph y Twitter Cards completos para previsualización social.
  - Marcado enriquecido Schema.org (`Laundromat` / `LocalBusiness`) para optimización en motores de búsqueda.
- **Analítica y Métricas de Rendimiento:**
  - Integración nativa con **Vercel Web Analytics** (analítica enfocada en la privacidad, sin uso de cookies invasivas).
  - Medición de Core Web Vitals en tiempo real mediante **Vercel Speed Insights**.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Estructura** | HTML5 semántico con atributos `data-i18n` para internacionalización |
| **Estilos** | CSS3 moderno (Custom Properties, Flexbox, CSS Grid, animaciones `@keyframes`) |
| **Interactividad** | JavaScript Vanilla (ES6+) sin dependencias externas pesadas |
| **Tipografía** | Google Fonts (*Barlow Condensed* y *Manrope*) |
| **Formatos visuales** | SVG vectorial para iconos/logos y WebP/JPG para imágenes fotográficas |
| **Infraestructura** | Vercel (Edge Network, Web Analytics, Speed Insights) |

---

## 📁 Estructura del Proyecto

```text
lavanderia-miguel/
├── assets/
│   ├── favicon.png                         # Favicon fallback en PNG
│   ├── favicon.svg                         # Favicon vectorial principal
│   ├── icons/
│   │   ├── dryer.svg                       # Ilustración interactiva secadora
│   │   ├── pet-washer.svg                  # Ilustración lavadora para mascotas
│   │   ├── rayo-washing-brand-mark.svg     # Logotipo/isotipo vectorial de la marca
│   │   └── washing-machine.svg             # Ilustración interactiva lavadora estándar
│   └── real/                               # Fotografías y cartelería del local
│       ├── rayo-washing-cartel-horario.*   # Cartel de horarios (JPG / WebP)
│       ├── rayo-washing-cartel-precios.*   # Cartel de tarifas oficiales (JPG / WebP)
│       └── reforma-*.webp                  # Reportaje fotográfico del local reformado
├── index.html                              # Página principal (Single Page Application)
├── aviso-legal.html                        # Página de aviso legal e información societaria
├── privacidad.html                         # Política de privacidad y tratamiento de datos
├── script.js                               # Lógica cliente: i18n, menú móvil, lightbox y animaciones
├── styles.css                              # Estilos globales, variables y media queries
└── README.md                               # Documentación del proyecto
