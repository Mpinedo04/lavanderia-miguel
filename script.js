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
const LANG_STORAGE_KEY = "rw-lang";
let activeLightboxItems = [];
let activeLightboxIndex = 0;
let swipeStartX = null;
let currentLang = "es";

const I18N = {
  es: {
    "meta.title": "Rayo Washing | Lavandería autoservicio en Abrera",
    "meta.description":
      "Rayo Washing, lavandería autoservicio en Abrera con lavado, secado, local climatizado y lavadora exclusiva para textiles de mascotas.",
    skip: "Saltar al contenido",
    "lang.aria": "Cambio de idioma",
    "brand.aria": "Rayo Washing, volver al inicio",
    "nav.aria": "Navegación principal",
    "nav.prices": "Precios",
    "nav.services": "Servicios",
    "nav.local": "El local",
    "nav.how": "Cómo funciona",
    "nav.location": "Ubicación",
    "menu.open": "Abrir menú",
    "menu.close": "Cerrar menú",
    "hero.eyebrow": "Lavandería autoservicio en Abrera",
    "hero.subtitle":
      "Lava y seca tu colada con máquinas de gran capacidad, precios claros y un espacio climatizado.",
    "hero.actionsAria": "Acciones principales",
    "hero.ctaPrices": "Ver precios",
    "hero.ctaDirections": "Cómo llegar",
    "hero.statusAria": "Información del establecimiento",
    "hero.hours": "Horario",
    "hero.everyday": "Todos los días",
    "hero.findUs": "Estamos en",
    "hero.phone": "Teléfono",
    "hero.callNow": "Llamar ahora",
    "hero.scroll": "Descubre el local",
    "hero.scrollAria": "Bajar a los precios",
    "prices.eyebrow": "Tarifas sin sorpresas",
    "prices.title": "Elige el tamaño.<br />Nosotros ponemos el jabón.",
    "prices.intro":
      "Todos los lavados incluyen jabón y suavizante. La lavadora de 15 kg utiliza agua ozonizada para una desinfección más completa.",
    "prices.w1tag": "Lavado diario",
    "prices.w1": "Lavadora 10 kg",
    "prices.w1desc": "Ropa del día a día",
    "prices.w2tag": "Agua ozonizada",
    "prices.w2": "Lavadora 15 kg",
    "prices.w2desc": "Mantas y cargas medias",
    "prices.w3tag": "Gran capacidad",
    "prices.w3": "Lavadora 18 kg",
    "prices.w3desc": "Edredones y cargas grandes",
    "prices.w4tag": "Uso exclusivo",
    "prices.w4": "Mascotas 10 kg",
    "prices.w4desc": "Mantas, camas y toallas",
    "prices.dryerTag": "Secadora de 17 kg",
    "prices.dryerTitle": "Seca más. Espera menos.",
    "prices.dryerPrice": "<b>1€</b> / 15 minutos",
    "services.eyebrow": "Tres zonas, una colada resuelta",
    "services.title": "Todo lo que necesitas,<br />sin complicaciones",
    "services.s1title": "Lavado autoservicio",
    "services.s1desc": "Máquinas de 10, 15 y 18 kg para ropa diaria, mantas y edredones.",
    "services.s2title": "Secado rápido",
    "services.s2desc": "Secadoras de 17 kg para terminar la colada sin depender del tiempo.",
    "services.s3title": "Textiles de mascotas",
    "services.s3desc": "Lavadora exclusiva para sus mantas, camas, toallas y accesorios.",
    "local.imgAlt": "Interior reformado de Rayo Washing con lavadoras y secadoras",
    "local.tag": "Local reformado",
    "local.eyebrow": "Hecho para el día a día",
    "local.title": "Un espacio limpio, claro y climatizado.",
    "local.text":
      "Un interior renovado con máquinas visibles, superficies de apoyo y espacio suficiente para organizar la colada con tranquilidad. Todo pensado para entrar, lavar y seguir con tu día.",
    "local.f1": "Local climatizado",
    "local.f2": "Jabón y suavizante incluidos",
    "local.f3": "Fácil aparcamiento cerca",
    "local.f4": "Máquinas de gran capacidad",
    "local.galleryAria": "Fotos destacadas del local reformado",
    "local.dryersAria": "Ampliar foto de las secadoras y la zona de apoyo",
    "local.dryersAlt": "Secadoras y zona de apoyo del local reformado",
    "local.waitAria": "Ampliar foto de la zona climatizada de espera",
    "local.waitAlt": "Zona climatizada de espera del local reformado",
    "local.moreAria": "Más fotos del local reformado",
    "local.rowAria": "Ampliar foto de la fila de lavadoras",
    "local.rowAlt": "Fila de lavadoras del local reformado",
    "local.doorWaitAria": "Ampliar foto de la zona de espera junto a la entrada",
    "local.doorWaitAlt": "Zona de espera junto a la entrada",
    "local.doorAria": "Ampliar foto de la entrada",
    "local.doorAlt": "Entrada luminosa de Rayo Washing",
    "local.waitZoneAria": "Ampliar foto de la zona de espera",
    "local.waitZoneAlt": "Mesa, banco y aire acondicionado del local",
    "gallery.more": "Ver más fotos",
    "gallery.less": "Ocultar fotos",
    "steps.eyebrow": "Así de sencillo",
    "steps.title": "Tu colada lista<br />en cuatro pasos",
    "steps.intro":
      "Una experiencia directa, incluso si es la primera vez que utilizas una lavandería autoservicio.",
    "steps.s1": "Trae tu colada",
    "steps.s1desc": "Ropa, mantas, edredones o textiles de mascotas.",
    "steps.s2": "Elige máquina",
    "steps.s2desc": "Selecciona la capacidad que mejor encaja con tu carga.",
    "steps.s3": "Lava y seca",
    "steps.s3desc": "Sigue las indicaciones de la máquina y aprovecha el tiempo.",
    "steps.s4": "Recoge y listo",
    "steps.s4desc": "Tu ropa limpia, seca y preparada para volver a casa.",
    "posters.eyebrow": "Información del local",
    "posters.title": "Lo ves aquí.<br />Lo encuentras allí.",
    "posters.text":
      "Consulta los carteles reales con los precios, el horario y la información de la zona exclusiva para textiles de mascotas.",
    "posters.link": "Ver dónde estamos",
    "posters.priceAlt": "Cartel de Rayo Washing con precios de lavado y servicio para mascotas",
    "posters.priceCaption": "Precios y mascotas",
    "posters.zoom": "Ampliar",
    "posters.priceLb": "Cartel de precios de Rayo Washing",
    "posters.hoursAlt": "Cartel de Rayo Washing con horario, dirección y oferta de secado",
    "posters.hoursCaption": "Horario y dirección",
    "posters.hoursLb": "Cartel de horario y dirección de Rayo Washing",
    "visit.eyebrow": "Ven cuando te vaya bien",
    "visit.title": "Estamos en el centro de Abrera.",
    "visit.text":
      "Abiertos los siete días de la semana, de 8:00 a 22:00, junto a una zona de fácil aparcamiento.",
    "visit.address": "Dirección",
    "visit.hours": "Horario",
    "visit.everyday": "Todos los días",
    "visit.phone": "Teléfono",
    "visit.maps": "Abrir Google Maps",
    "visit.wa": "Escribir por WhatsApp",
    "visit.mapAria": "Mapa real de Rayo Washing en Google Maps",
    "visit.mapTitle": "Ubicación de Rayo Washing en Abrera",
    "contact.eyebrow": "¿Necesitas preguntarnos algo?",
    "contact.title": "Hablemos.",
    "contact.text": "Completa el formulario y abriremos WhatsApp con tu mensaje preparado para enviar.",
    "contact.formAria": "Formulario de contacto por WhatsApp",
    "contact.name": "Nombre",
    "contact.namePh": "Tu nombre",
    "contact.channel": "Teléfono o email",
    "contact.channelPh": "Cómo contactarte",
    "contact.message": "Mensaje",
    "contact.messagePh": "Cuéntanos qué necesitas",
    "contact.submit": "Preparar mensaje",
    "footer.tagline": "Lavandería autoservicio en Abrera",
    "footer.everyday": "Todos los días · 8:00 — 22:00",
    "footer.linksAria": "Enlaces rápidos",
    "footer.legal": "Aviso legal",
    "footer.privacy": "Privacidad",
    "mobileWa.aria": "Enviar un WhatsApp a Rayo Washing",
    "lightbox.close": "Cerrar",
    "lightbox.closeAria": "Cerrar imagen ampliada",
    "lightbox.prevAria": "Ver imagen anterior",
    "lightbox.nextAria": "Ver imagen siguiente",
    "form.greeting": "Hola Rayo Washing, quiero hacer una consulta.",
    "form.nameLabel": "Nombre: ",
    "form.contactLabel": "Contacto: ",
    "form.messageLabel": "Mensaje: ",
    "form.status": "Se ha abierto WhatsApp con tu mensaje preparado.",
  },
  en: {
    "meta.title": "Rayo Washing | Self-service laundry in Abrera",
    "meta.description":
      "Rayo Washing, self-service laundry in Abrera with washing, drying, a heated space and a dedicated washer for pet textiles.",
    skip: "Skip to content",
    "lang.aria": "Language switch",
    "brand.aria": "Rayo Washing, back to the top",
    "nav.aria": "Main navigation",
    "nav.prices": "Prices",
    "nav.services": "Services",
    "nav.local": "The space",
    "nav.how": "How it works",
    "nav.location": "Location",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.eyebrow": "Self-service laundry in Abrera",
    "hero.subtitle":
      "Wash and dry your laundry with large-capacity machines, clear prices and a heated space.",
    "hero.actionsAria": "Main actions",
    "hero.ctaPrices": "See prices",
    "hero.ctaDirections": "Directions",
    "hero.statusAria": "Venue information",
    "hero.hours": "Hours",
    "hero.everyday": "Every day",
    "hero.findUs": "Find us at",
    "hero.phone": "Phone",
    "hero.callNow": "Call now",
    "hero.scroll": "Explore the space",
    "hero.scrollAria": "Jump to the prices",
    "prices.eyebrow": "No-surprise pricing",
    "prices.title": "You pick the size.<br />We bring the soap.",
    "prices.intro":
      "Every wash includes detergent and softener. The 15 kg washer uses ozonated water for a more thorough clean.",
    "prices.w1tag": "Daily wash",
    "prices.w1": "10 kg washer",
    "prices.w1desc": "Everyday laundry",
    "prices.w2tag": "Ozonated water",
    "prices.w2": "15 kg washer",
    "prices.w2desc": "Blankets & medium loads",
    "prices.w3tag": "High capacity",
    "prices.w3": "18 kg washer",
    "prices.w3desc": "Duvets & large loads",
    "prices.w4tag": "Exclusive use",
    "prices.w4": "Pets 10 kg",
    "prices.w4desc": "Blankets, beds & towels",
    "prices.dryerTag": "17 kg dryer",
    "prices.dryerTitle": "Dries more. Waits less.",
    "prices.dryerPrice": "<b>1€</b> / 15 min",
    "services.eyebrow": "Three zones, one easy wash",
    "services.title": "Everything you need,<br />with no hassle",
    "services.s1title": "Self-service wash",
    "services.s1desc": "10, 15 and 18 kg machines for daily clothes, blankets and duvets.",
    "services.s2title": "Fast drying",
    "services.s2desc": "17 kg dryers to finish your laundry, rain or shine.",
    "services.s3title": "Pet textiles",
    "services.s3desc": "A washer just for their blankets, beds, towels and accessories.",
    "local.imgAlt": "Renovated interior of Rayo Washing with washers and dryers",
    "local.tag": "Renovated premises",
    "local.eyebrow": "Made for everyday life",
    "local.title": "A clean, bright and heated space.",
    "local.text":
      "A renewed interior with visible machines, folding surfaces and enough room to sort out your laundry with ease. Everything designed so you can walk in, wash and get on with your day.",
    "local.f1": "Heated premises",
    "local.f2": "Detergent & softener included",
    "local.f3": "Easy parking nearby",
    "local.f4": "Large-capacity machines",
    "local.galleryAria": "Highlighted photos of the renovated premises",
    "local.dryersAria": "Enlarge photo of the dryers and folding area",
    "local.dryersAlt": "Dryers and folding area of the renovated premises",
    "local.waitAria": "Enlarge photo of the heated waiting area",
    "local.waitAlt": "Heated waiting area of the renovated premises",
    "local.moreAria": "More photos of the renovated premises",
    "local.rowAria": "Enlarge photo of the row of washers",
    "local.rowAlt": "Row of washers in the renovated premises",
    "local.doorWaitAria": "Enlarge photo of the waiting area by the entrance",
    "local.doorWaitAlt": "Waiting area by the entrance",
    "local.doorAria": "Enlarge photo of the entrance",
    "local.doorAlt": "Bright entrance of Rayo Washing",
    "local.waitZoneAria": "Enlarge photo of the waiting area",
    "local.waitZoneAlt": "Table, bench and air conditioning in the premises",
    "gallery.more": "See more photos",
    "gallery.less": "Hide photos",
    "steps.eyebrow": "It's that simple",
    "steps.title": "Your laundry done<br />in four steps",
    "steps.intro":
      "A straightforward experience, even on your first visit to a self-service laundry.",
    "steps.s1": "Bring your laundry",
    "steps.s1desc": "Clothes, blankets, duvets or pet textiles.",
    "steps.s2": "Pick a machine",
    "steps.s2desc": "Choose the capacity that best fits your load.",
    "steps.s3": "Wash and dry",
    "steps.s3desc": "Follow the machine's instructions and make the most of your time.",
    "steps.s4": "Collect and go",
    "steps.s4desc": "Your clothes clean, dry and ready to go home.",
    "posters.eyebrow": "On-site information",
    "posters.title": "See it here.<br />Find it there.",
    "posters.text":
      "Browse the real posters with prices, opening hours and details of the pets-only textile zone.",
    "posters.link": "See where we are",
    "posters.priceAlt": "Rayo Washing poster with wash prices and pet service",
    "posters.priceCaption": "Prices & pets",
    "posters.zoom": "Zoom in",
    "posters.priceLb": "Rayo Washing price poster",
    "posters.hoursAlt": "Rayo Washing poster with hours, address and drying offer",
    "posters.hoursCaption": "Hours & address",
    "posters.hoursLb": "Rayo Washing hours and address poster",
    "visit.eyebrow": "Come whenever it suits you",
    "visit.title": "We're right in central Abrera.",
    "visit.text": "Open seven days a week from 8:00 to 22:00, right next to easy parking.",
    "visit.address": "Address",
    "visit.hours": "Hours",
    "visit.everyday": "Every day",
    "visit.phone": "Phone",
    "visit.maps": "Open Google Maps",
    "visit.wa": "Message us on WhatsApp",
    "visit.mapAria": "Live Google Maps view of Rayo Washing",
    "visit.mapTitle": "Location of Rayo Washing in Abrera",
    "contact.eyebrow": "Need to ask us something?",
    "contact.title": "Let's talk.",
    "contact.text": "Fill in the form and we'll open WhatsApp with your message ready to send.",
    "contact.formAria": "WhatsApp contact form",
    "contact.name": "Name",
    "contact.namePh": "Your name",
    "contact.channel": "Phone or email",
    "contact.channelPh": "How to reach you",
    "contact.message": "Message",
    "contact.messagePh": "Tell us what you need",
    "contact.submit": "Prepare message",
    "footer.tagline": "Self-service laundry in Abrera",
    "footer.everyday": "Every day · 8:00 — 22:00",
    "footer.linksAria": "Quick links",
    "footer.legal": "Legal notice",
    "footer.privacy": "Privacy",
    "mobileWa.aria": "Send a WhatsApp to Rayo Washing",
    "lightbox.close": "Close",
    "lightbox.closeAria": "Close enlarged image",
    "lightbox.prevAria": "View previous image",
    "lightbox.nextAria": "View next image",
    "form.greeting": "Hi Rayo Washing, I'd like to make an enquiry.",
    "form.nameLabel": "Name: ",
    "form.contactLabel": "Contact: ",
    "form.messageLabel": "Message: ",
    "form.status": "WhatsApp has opened with your message ready to send.",
  },
  ca: {
    "meta.title": "Rayo Washing | Bugaderia autoservei a Abrera",
    "meta.description":
      "Rayo Washing, bugaderia autoservei a Abrera amb rentat, assecat, local climatitzat i rentadora exclusiva per a tèxtils de mascotes.",
    skip: "Salta al contingut",
    "lang.aria": "Canvi d'idioma",
    "brand.aria": "Rayo Washing, tornar a l'inici",
    "nav.aria": "Navegació principal",
    "nav.prices": "Preus",
    "nav.services": "Serveis",
    "nav.local": "El local",
    "nav.how": "Com funciona",
    "nav.location": "Ubicació",
    "menu.open": "Obrir menú",
    "menu.close": "Tancar menú",
    "hero.eyebrow": "Bugaderia autoservei a Abrera",
    "hero.subtitle":
      "Renta i eixuga la bugada amb màquines de gran capacitat, preus clars i un espai climatitzat.",
    "hero.actionsAria": "Accions principals",
    "hero.ctaPrices": "Veure preus",
    "hero.ctaDirections": "Com arribar",
    "hero.statusAria": "Informació de l'establiment",
    "hero.hours": "Horari",
    "hero.everyday": "Tots els dies",
    "hero.findUs": "Som a",
    "hero.phone": "Telèfon",
    "hero.callNow": "Truca ara",
    "hero.scroll": "Descobreix el local",
    "hero.scrollAria": "Baixar als preus",
    "prices.eyebrow": "Tarifes sense sorpreses",
    "prices.title": "Tria la mida.<br />Nosaltres posem el sabó.",
    "prices.intro":
      "Tots els rentats inclouen sabó i suavitzant. La rentadora de 15 kg utilitza aigua ozonitzada per a una desinfecció més completa.",
    "prices.w1tag": "Rentat diari",
    "prices.w1": "Rentadora 10 kg",
    "prices.w1desc": "Roba del dia a dia",
    "prices.w2tag": "Aigua ozonitzada",
    "prices.w2": "Rentadora 15 kg",
    "prices.w2desc": "Mantes i càrregues mitjanes",
    "prices.w3tag": "Gran capacitat",
    "prices.w3": "Rentadora 18 kg",
    "prices.w3desc": "Edredons i càrregues grans",
    "prices.w4tag": "Ús exclusiu",
    "prices.w4": "Mascotes 10 kg",
    "prices.w4desc": "Mantes, llits i tovallols",
    "prices.dryerTag": "Assecadora de 17 kg",
    "prices.dryerTitle": "Eixuga més. Esperes menys.",
    "prices.dryerPrice": "<b>1€</b> / 15 minuts",
    "services.eyebrow": "Tres zones, una bugada resolta",
    "services.title": "Tot el que necessites,<br />sense complicacions",
    "services.s1title": "Rentat autoservei",
    "services.s1desc": "Màquines de 10, 15 i 18 kg per a roba diària, mantes i edredons.",
    "services.s2title": "Assecat ràpid",
    "services.s2desc": "Assecadores de 17 kg per acabar la bugada sense dependre del temps.",
    "services.s3title": "Tèxtils de mascotes",
    "services.s3desc": "Rentadora exclusiva per a les seves mantes, llits, tovallols i accessoris.",
    "local.imgAlt": "Interior reformat de Rayo Washing amb rentadores i assecadores",
    "local.tag": "Local reformat",
    "local.eyebrow": "Fet per al dia a dia",
    "local.title": "Un espai net, clar i climatitzat.",
    "local.text":
      "Un interior renovat amb màquines visibles, superfícies de suport i espai suficient per organitzar la bugada amb tranquil·litat. Tot pensat per entrar, rentar i seguir amb el teu dia.",
    "local.f1": "Local climatitzat",
    "local.f2": "Sabó i suavitzant inclosos",
    "local.f3": "Fàcil aparcament a prop",
    "local.f4": "Màquines de gran capacitat",
    "local.galleryAria": "Fotos destacades del local reformat",
    "local.dryersAria": "Ampliar foto de les assecadores i la zona de suport",
    "local.dryersAlt": "Assecadores i zona de suport del local reformat",
    "local.waitAria": "Ampliar foto de la zona climatitzada d'espera",
    "local.waitAlt": "Zona climatitzada d'espera del local reformat",
    "local.moreAria": "Més fotos del local reformat",
    "local.rowAria": "Ampliar foto de la fila de rentadores",
    "local.rowAlt": "Fila de rentadores del local reformat",
    "local.doorWaitAria": "Ampliar foto de la zona d'espera junt a l'entrada",
    "local.doorWaitAlt": "Zona d'espera junt a l'entrada",
    "local.doorAria": "Ampliar foto de l'entrada",
    "local.doorAlt": "Entrada luminosa de Rayo Washing",
    "local.waitZoneAria": "Ampliar foto de la zona d'espera",
    "local.waitZoneAlt": "Taula, banc i aire condicionat del local",
    "gallery.more": "Veure més fotos",
    "gallery.less": "Amagar fotos",
    "steps.eyebrow": "Així de senzill",
    "steps.title": "La teva bugada a punt<br />en quatre passos",
    "steps.intro":
      "Una experiència directa, fins i tot si és la primera vegada que utilitzes una bugaderia autoservei.",
    "steps.s1": "Porta la teva bugada",
    "steps.s1desc": "Roba, mantes, edredons o tèxtils de mascotes.",
    "steps.s2": "Tria màquina",
    "steps.s2desc": "Selecciona la capacitat que millor encaixa amb la teva càrrega.",
    "steps.s3": "Renta i eixuga",
    "steps.s3desc": "Segueix les indicacions de la màquina i aprofita el temps.",
    "steps.s4": "Recull i llest",
    "steps.s4desc": "La teva roba neta, eixuta i preparada per tornar a casa.",
    "posters.eyebrow": "Informació del local",
    "posters.title": "Ho veus aquí.<br />Ho trobes allà.",
    "posters.text":
      "Consulta els cartells reals amb els preus, l'horari i la informació de la zona exclusiva per a tèxtils de mascotes.",
    "posters.link": "Veure on som",
    "posters.priceAlt": "Cartell de Rayo Washing amb preus de rentat i servei per a mascotes",
    "posters.priceCaption": "Preus i mascotes",
    "posters.zoom": "Ampliar",
    "posters.priceLb": "Cartell de preus de Rayo Washing",
    "posters.hoursAlt": "Cartell de Rayo Washing amb horari, adreça i oferta d'assecat",
    "posters.hoursCaption": "Horari i adreça",
    "posters.hoursLb": "Cartell d'horari i adreça de Rayo Washing",
    "visit.eyebrow": "Vine quan et vagi bé",
    "visit.title": "Som al centre d'Abrera.",
    "visit.text":
      "Oberts els set dies de la setmana, de 8:00 a 22:00, al costat d'una zona de fàcil aparcament.",
    "visit.address": "Adreça",
    "visit.hours": "Horari",
    "visit.everyday": "Tots els dies",
    "visit.phone": "Telèfon",
    "visit.maps": "Obrir Google Maps",
    "visit.wa": "Escriure per WhatsApp",
    "visit.mapAria": "Mapa real de Rayo Washing a Google Maps",
    "visit.mapTitle": "Ubicació de Rayo Washing a Abrera",
    "contact.eyebrow": "Necessites preguntar-nos alguna cosa?",
    "contact.title": "Parlem.",
    "contact.text": "Omple el formulari i obrim el WhatsApp amb el teu missatge preparat per enviar.",
    "contact.formAria": "Formulari de contacte per WhatsApp",
    "contact.name": "Nom",
    "contact.namePh": "El teu nom",
    "contact.channel": "Telèfon o correu",
    "contact.channelPh": "Com contactar-te",
    "contact.message": "Missatge",
    "contact.messagePh": "Explica'ns què necessites",
    "contact.submit": "Preparar missatge",
    "footer.tagline": "Bugaderia autoservei a Abrera",
    "footer.everyday": "Tots els dies · 8:00 — 22:00",
    "footer.linksAria": "Enllaços ràpids",
    "footer.legal": "Avís legal",
    "footer.privacy": "Privacitat",
    "mobileWa.aria": "Enviar un WhatsApp a Rayo Washing",
    "lightbox.close": "Tancar",
    "lightbox.closeAria": "Tancar imatge ampliada",
    "lightbox.prevAria": "Veure imatge anterior",
    "lightbox.nextAria": "Veure imatge següent",
    "form.greeting": "Hola Rayo Washing, voldria fer una consulta.",
    "form.nameLabel": "Nom: ",
    "form.contactLabel": "Contacte: ",
    "form.messageLabel": "Missatge: ",
    "form.status": "S'ha obert el WhatsApp amb el teu missatge preparat.",
  },
};

const readStoredLang = () => {
  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    return null;
  }
};

const storeLang = (lang) => {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* almacenamiento no disponible */
  }
};

const t = (key) => I18N[currentLang]?.[key] ?? I18N.es[key] ?? "";

const syncDynamicTexts = () => {
  navToggle?.setAttribute(
    "aria-label",
    document.body.classList.contains("nav-open") ? t("menu.close") : t("menu.open")
  );

  if (galleryMore && galleryMoreToggle) {
    const galleryLabel = galleryMoreToggle.querySelector("span");
    if (galleryLabel) {
      galleryLabel.textContent = galleryMore.classList.contains("is-open")
        ? t("gallery.less")
        : t("gallery.more");
    }
  }
};

const applyLang = (lang) => {
  currentLang = I18N[lang] ? lang : "es";

  document.documentElement.lang = currentLang;
  document.title = t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", t("meta.description"));
  document
    .querySelector('meta[property="og:locale"]')
    ?.setAttribute("content", { es: "es_ES", en: "en_GB", ca: "ca_ES" }[currentLang] || "es_ES");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.setAttribute("alt", t(el.dataset.i18nAlt));
  });

  document.querySelectorAll("[data-i18n-lbalt]").forEach((el) => {
    el.dataset.lightboxAlt = t(el.dataset.i18nLbalt);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.dataset.i18nTitle));
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  syncDynamicTexts();
  storeLang(currentLang);
};

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
  navToggle?.setAttribute("aria-label", isOpen ? t("menu.close") : t("menu.open"));
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

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.lang !== currentLang) applyLang(btn.dataset.lang);
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
      t("form.greeting"),
      nombre ? `${t("form.nameLabel")}${nombre}` : "",
      contacto ? `${t("form.contactLabel")}${contacto}` : "",
      mensaje ? `${t("form.messageLabel")}${mensaje}` : "",
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    if (status) {
      status.textContent = t("form.status");
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

  const setGalleryState = (isOpen) => {
    galleryMore.classList.toggle("is-open", isOpen);
    galleryMoreToggle.setAttribute("aria-expanded", String(isOpen));
    renovationGallery.toggleAttribute("inert", !isOpen);
    const galleryLabel = galleryMoreToggle.querySelector("span");
    if (galleryLabel) galleryLabel.textContent = isOpen ? t("gallery.less") : t("gallery.more");
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

applyLang(readStoredLang() || "es");
