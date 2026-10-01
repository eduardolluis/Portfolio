export type Lang = "en" | "es";

export type ProjectFact = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  gallery: { src: string; alt: string; label: string; kind?: "desktop" | "mobile" }[];
  stack: string[];
  github?: string;
  live?: string;
  caseStudy?: string;
  visual: "gio" | "melodix" | "whatzapp" | "multistore";
  disclaimer?: string;
  facts?: ProjectFact[];
  role?: string;
  repositoryNote?: string;
  previewNote?: string;
};

export const site = {
  name: "Eduardo De La Cruz",
  email: "eduardodelacruzg5@gmail.com",
  github: "https://github.com/eduardolluis",
  linkedin: "https://www.linkedin.com/in/eduardo-de-la-cruz-b6171837a/",
  whatsapp: "https://wa.me/18495191571",
  url: "https://eduardo-portfolio-neon-two.vercel.app/",
  location: "Santo Domingo, Dominican Republic",
  resume: "/Eduardo_De_La_Cruz_Resume.pdf",
};

export const content = {
  en: {
    nav: { stack: "Stack", projects: "Projects", about: "About", contact: "Contact" },
    hero: {
      hello: "Hi, I'm",
      rolePrefix: "Developer",
      roles: ["Full-Stack", "Flutter", "Web"],
      lead: "I build web apps, mobile apps and business software end to end — from databases and APIs to interfaces people can actually use.",
      projects: "View my projects",
      resume: "Resume",
      contact: "Let's talk",
      scroll: "Scroll",
      availability: "Open to freelance projects, internships, junior software roles and collaborations",
    },
    capabilities: {
      eyebrow: "What I build",
      title: "Products that connect real workflows with solid engineering.",
      items: [
        { title: "Web Applications", text: "Responsive dashboards, portals and product interfaces built around real workflows." },
        { title: "Mobile Apps", text: "Cross-platform Flutter apps connected to authentication, data and real-time services." },
        { title: "Business Systems", text: "Scheduling, roles, records, payments, inventory and internal operations in one place." },
        { title: "APIs & Backend", text: "Authentication, databases, integrations and server-side logic that keep the product together." },
      ],
    },
    stack: {
      title: "My toolbox",
      lead: "Technologies I have used in real projects, grouped by where they fit in the product.",
      groups: [
        {
          icon: "UI",
          className: "i-front",
          title: "Frontend",
          description: "Responsive interfaces, dashboards and production web applications.",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"],
        },
        {
          icon: "API",
          className: "i-back",
          title: "Backend & data",
          description: "APIs, authentication, relational and NoSQL data, and server-side logic.",
          items: ["FastAPI", "Node.js", "Express", "PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Supabase", "Appwrite"],
        },
        {
          icon: "App",
          className: "i-mobile",
          title: "Mobile & realtime",
          description: "Cross-platform applications with media, maps and real-time communication.",
          items: ["Flutter", "Dart", "Riverpod", "Firebase", "Socket.IO", "LiveKit", "Agora", "Google Maps"],
        },
        {
          icon: "Ops",
          className: "i-ops",
          title: "Tools & languages",
          description: "The workflow and languages I use around building, testing and shipping software.",
          items: ["Git", "GitHub", "GitHub Actions", "Docker", "Linux", "Bash", "Vercel", "Render", "C#", "C++", "Prisma"],
        },
      ],
    },
    projects: {
      title: "Selected work",
      lead: "Four projects that show how I work across business software, mobile products, real-time systems and e-commerce.",
      viewCode: "View source",
      viewLive: "Live demo",
      caseStudy: "Case study",
      more: "More projects on GitHub",
      explore: "Explore project",
      close: "Close project",
      overview: "Project overview",
      gallery: "Screens",
      highlights: "What it includes",
      role: "My role",
      proof: "Project facts",
      repository: "Repository",
      items: [
        {
          id: "gio",
          title: "GIO Workspace",
          category: "Client project · Production",
          description: "A custom internal management platform that replaced Excel-based workflows with a centralized workspace for appointments, staff schedules, patients, payments, inventory and reporting.",
          highlights: [
            "Role-based access for Administrator, Receptionist and Professional users",
            "Scheduling visibility that reduces appointment conflicts between professionals",
            "Centralized control for appointments, payments, inventory, patients, services and reports",
          ],
          facts: [
            { label: "Roles", value: "3 operational roles" },
            { label: "Delivery", value: "Core modules completed" },
            { label: "Previous workflow", value: "Excel-based operations" },
          ],
          role: "End-to-end ownership: requirements, interface design, frontend, database structure, authentication, permissions, workflows, testing and delivery.",
          repositoryNote: "Private client repository",
          gallery: [
            { src: "/images/projects/gio/dashboard.webp", alt: "GIO Workspace dashboard showing daily appointments, patients, income and quick actions", label: "Dashboard", kind: "desktop" },
            { src: "/images/projects/gio/agenda.webp", alt: "GIO Workspace scheduling calendar for staff appointments", label: "Schedule", kind: "desktop" },
            { src: "/images/projects/gio/services.webp", alt: "GIO Workspace services management screen", label: "Services", kind: "desktop" },
            { src: "/images/projects/gio/login-desktop.webp", alt: "GIO Workspace staff sign-in screen on desktop", label: "Desktop login", kind: "desktop" },
            { src: "/images/projects/gio/login-mobile.webp", alt: "GIO Workspace staff sign-in screen on mobile", label: "Mobile login", kind: "mobile" },
            { src: "/images/projects/gio/patients-mobile.webp", alt: "GIO Workspace patient management screen on mobile", label: "Patients", kind: "mobile" },
          ],
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vite", "GitHub Actions"],
          caseStudy: "/gio-workspace.pdf",
          visual: "gio",
        },
        {
          id: "melodix",
          title: "Melodix",
          category: "Full-stack music platform",
          description: "A Flutter music streaming application backed by FastAPI and PostgreSQL, with authentication, discovery, playlists, profiles, media uploads and background playback.",
          highlights: [
            "Flutter client with Riverpod and background audio playback",
            "FastAPI + PostgreSQL backend with SQLAlchemy and JWT authentication",
            "Search, artist profiles, playlists, uploads and cloud media storage",
          ],
          facts: [
            { label: "Client", value: "Flutter" },
            { label: "Backend", value: "FastAPI" },
            { label: "Database", value: "PostgreSQL" },
          ],
          role: "Designed and implemented the mobile client, backend API, database integration and core product flows.",
          gallery: [
            { src: "/images/projects/melodix/home.webp", alt: "Melodix music discovery home screen", label: "Home", kind: "mobile" },
            { src: "/images/projects/melodix/login.webp", alt: "Melodix account login screen", label: "Login", kind: "mobile" },
            { src: "/images/projects/melodix/search.webp", alt: "Melodix search and discovery screen", label: "Search", kind: "mobile" },
            { src: "/images/projects/melodix/player.webp", alt: "Melodix full-screen music player", label: "Player", kind: "mobile" },
            { src: "/images/projects/melodix/library.webp", alt: "Melodix playlist library screen", label: "Library", kind: "mobile" },
            { src: "/images/projects/melodix/artist.webp", alt: "Melodix artist profile with music and follow controls", label: "Artist", kind: "mobile" },
          ],
          stack: ["Flutter", "Dart", "Riverpod", "FastAPI", "PostgreSQL", "SQLAlchemy", "Cloudinary"],
          github: "https://github.com/eduardolluis/melodix",
          visual: "melodix",
        },
        {
          id: "whatzapp",
          title: "Whatzapp",
          category: "Real-time messaging app",
          description: "A cross-platform messaging application with real-time chat, phone OTP authentication, voice/video calls, media sharing, files and live location.",
          highlights: [
            "Real-time messaging through Socket.IO",
            "Voice and video calling with LiveKit and Agora integrations",
            "Firebase Auth, Firestore, Storage and Google Maps workflows",
          ],
          facts: [
            { label: "Authentication", value: "Phone OTP" },
            { label: "Realtime", value: "Socket.IO" },
            { label: "Platforms", value: "Mobile, web & desktop" },
          ],
          role: "Built the Flutter application and integrated authentication, realtime messaging, media, maps and calling services.",
          gallery: [
            { src: "/images/projects/whatzapp/welcome.webp", alt: "Whatzapp welcome and terms screen", label: "Welcome", kind: "mobile" },
            { src: "/images/projects/whatzapp/login.webp", alt: "Whatzapp phone number verification login screen", label: "Login", kind: "mobile" },
            { src: "/images/projects/whatzapp/home.webp", alt: "Whatzapp conversations home screen", label: "Home", kind: "mobile" },
            { src: "/images/projects/whatzapp/chat.webp", alt: "Whatzapp one-to-one chat screen", label: "Chat", kind: "mobile" },
            { src: "/images/projects/whatzapp/calls.webp", alt: "Whatzapp call history screen", label: "Calls", kind: "mobile" },
          ],
          stack: ["Flutter", "Firebase", "Socket.IO", "LiveKit", "Agora", "Google Maps"],
          github: "https://github.com/eduardolluis/whatzapp",
          visual: "whatzapp",
          disclaimer: "Independent engineering project. Not affiliated with WhatsApp or Meta.",
        },
        {
          id: "multistore",
          title: "Multi Store",
          category: "Multi-vendor e-commerce app",
          description: "A Flutter marketplace with separate customer and supplier workflows, product browsing, cart and checkout flows, supplier tools, orders and Firebase-backed authentication/data.",
          highlights: [
            "Customer and supplier authentication flows, including Google sign-in",
            "Product discovery, categories, product detail, cart, orders and checkout",
            "Supplier tools for product management, orders, balance and store operations",
          ],
          facts: [
            { label: "Frontend", value: "Flutter" },
            { label: "Services", value: "Firebase + Stripe" },
            { label: "Modes", value: "Customer & supplier" },
          ],
          role: "Implemented the marketplace flows, customer/supplier experiences, product management and supporting backend integrations.",
          previewNote: "Portfolio previews reconstructed from the project’s actual Flutter UI code and bundled product assets.",
          gallery: [
            { src: "/images/projects/multistore/home.webp", alt: "Multi Store customer home with categories, promotions and product grid", label: "Home", kind: "mobile" },
            { src: "/images/projects/multistore/login.webp", alt: "Multi Store customer login with email, password and Google sign-in", label: "Login", kind: "mobile" },
            { src: "/images/projects/multistore/product.webp", alt: "Multi Store product detail with price, stock and add-to-cart action", label: "Product", kind: "mobile" },
            { src: "/images/projects/multistore/cart.webp", alt: "Multi Store shopping cart with products, quantities and checkout", label: "Cart", kind: "mobile" },
            { src: "/images/projects/multistore/manage-products.webp", alt: "Multi Store supplier product management screen with search, stock and edit actions", label: "Manage products", kind: "mobile" },
          ],
          stack: ["Flutter", "Dart", "Firebase", "Firestore", "Stripe", "Provider"],
          visual: "multistore",
        },
      ] as Project[],
    },
    about: {
      title: "A little about me",
      paragraphs: [
        "I'm a Software Engineering student at INTEC and a freelance full-stack developer based in Santo Domingo, Dominican Republic.",
        "I enjoy owning the complete product path — requirements, data model, API, web or mobile interface, realtime features, testing and deployment — especially when the software solves a concrete business or user problem.",
      ],
      stats: [
        { value: "Full-Stack", label: "web + backend + mobile" },
        { value: "EN / ES", label: "bilingual · English C1" },
        { value: "Open", label: "freelance, internships & junior roles" },
      ],
      timeline: [
        {
          time: "Aug 2026 — Present",
          title: "Freelance Full-Stack Developer",
          where: "GIO Workspace",
          description: "Built and delivered an internal management platform covering appointments, patients, staff, services, finances, reports and inventory.",
        },
        {
          time: "Aug 2025 — Expected 2029",
          title: "B.Sc. Software Engineering",
          where: "INTEC · Instituto Tecnológico de Santo Domingo",
          description: "Studying software engineering while building full-stack, mobile and realtime projects outside the classroom.",
        },
        {
          time: "Ongoing",
          title: "Independent Product Projects",
          where: "GitHub · @eduardolluis",
          description: "Building projects across Flutter, React, FastAPI, Firebase, PostgreSQL and realtime communication.",
        },
      ],
    },
    contact: {
      title: "Have a project in mind?",
      lead: "Tell me what you're building. I'm open to freelance work, internships, junior software roles and collaborations.",
      copy: "Copy email",
      copied: "Email copied",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      form: {
        name: "Name",
        email: "Email",
        type: "What do you need?",
        message: "Tell me about the project or opportunity",
        submit: "Send details",
        sending: "Sending…",
        sent: "Message sent — I’ll get back to you soon.",
        fallback: "Direct email delivery is not configured yet, so I opened a pre-filled email draft instead.",
        error: "I could not send that message right now. Try WhatsApp or email me directly.",
        options: ["Web application", "Mobile app", "Business system", "API / backend", "Internship / job opportunity", "Collaboration", "Other"],
        note: "No spam. Your details are only used to reply to this message.",
      },
    },
    footer: "Full-Stack Software Developer",
    notFound: { title: "That page doesn't exist.", text: "The portfolio is one page — head back home and keep exploring.", action: "Back home" },
  },
  es: {
    nav: { stack: "Stack", projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
    hero: {
      hello: "Hola, soy",
      rolePrefix: "Desarrollador",
      roles: ["Full-Stack", "Flutter", "Web"],
      lead: "Construyo aplicaciones web, apps móviles y software para negocios de principio a fin: desde bases de datos y APIs hasta interfaces que la gente realmente puede usar.",
      projects: "Ver mis proyectos",
      resume: "CV / Resume",
      contact: "Hablemos",
      scroll: "Desliza",
      availability: "Disponible para proyectos freelance, pasantías, roles junior y colaboraciones",
    },
    capabilities: {
      eyebrow: "Lo que desarrollo",
      title: "Productos que conectan flujos reales con buena ingeniería.",
      items: [
        { title: "Aplicaciones Web", text: "Dashboards, portales e interfaces responsive construidas alrededor de flujos reales." },
        { title: "Apps Móviles", text: "Aplicaciones Flutter multiplataforma conectadas a autenticación, datos y servicios en tiempo real." },
        { title: "Sistemas de Negocio", text: "Agenda, roles, registros, pagos, inventario y operaciones internas en un solo lugar." },
        { title: "APIs y Backend", text: "Autenticación, bases de datos, integraciones y lógica de servidor que sostienen el producto." },
      ],
    },
    stack: {
      title: "Mi caja de herramientas",
      lead: "Tecnologías que he usado en proyectos reales, agrupadas según su función dentro del producto.",
      groups: [
        {
          icon: "UI",
          className: "i-front",
          title: "Frontend",
          description: "Interfaces responsive, dashboards y aplicaciones web listas para producción.",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"],
        },
        {
          icon: "API",
          className: "i-back",
          title: "Backend y datos",
          description: "APIs, autenticación, datos relacionales/NoSQL y lógica de servidor.",
          items: ["FastAPI", "Node.js", "Express", "PostgreSQL", "MySQL", "MongoDB", "SQLAlchemy", "Supabase", "Appwrite"],
        },
        {
          icon: "App",
          className: "i-mobile",
          title: "Móvil y realtime",
          description: "Apps multiplataforma con multimedia, mapas y comunicación en tiempo real.",
          items: ["Flutter", "Dart", "Riverpod", "Firebase", "Socket.IO", "LiveKit", "Agora", "Google Maps"],
        },
        {
          icon: "Ops",
          className: "i-ops",
          title: "Herramientas y lenguajes",
          description: "El flujo de trabajo y los lenguajes que uso para construir, probar y publicar software.",
          items: ["Git", "GitHub", "GitHub Actions", "Docker", "Linux", "Bash", "Vercel", "Render", "C#", "C++", "Prisma"],
        },
      ],
    },
    projects: {
      title: "Trabajo seleccionado",
      lead: "Cuatro proyectos que muestran mi trabajo en software empresarial, apps móviles, sistemas en tiempo real y e-commerce.",
      viewCode: "Ver código",
      viewLive: "Demo",
      caseStudy: "Caso de estudio",
      more: "Más proyectos en GitHub",
      explore: "Explorar proyecto",
      close: "Cerrar proyecto",
      overview: "Resumen del proyecto",
      gallery: "Pantallas",
      highlights: "Qué incluye",
      role: "Mi rol",
      proof: "Datos del proyecto",
      repository: "Repositorio",
      items: [
        {
          id: "gio",
          title: "GIO Workspace",
          category: "Proyecto de cliente · Producción",
          description: "Plataforma interna personalizada que reemplazó flujos gestionados en Excel por un workspace centralizado para citas, horarios del personal, pacientes, pagos, inventario y reportes.",
          highlights: [
            "Acceso por roles para Administrador, Recepcionista y Profesional",
            "Mayor visibilidad de horarios para reducir choques de citas entre profesionales",
            "Control centralizado de citas, pagos, inventario, pacientes, servicios y reportes",
          ],
          facts: [
            { label: "Roles", value: "3 roles operativos" },
            { label: "Entrega", value: "Módulos principales terminados" },
            { label: "Proceso anterior", value: "Operaciones en Excel" },
          ],
          role: "Responsabilidad end-to-end: requisitos, diseño de interfaz, frontend, estructura de base de datos, autenticación, permisos, flujos, pruebas y entrega.",
          repositoryNote: "Repositorio privado del cliente",
          gallery: [
            { src: "/images/projects/gio/dashboard.webp", alt: "Dashboard de GIO Workspace con citas del día, pacientes, ingresos y accesos rápidos", label: "Dashboard", kind: "desktop" },
            { src: "/images/projects/gio/agenda.webp", alt: "Calendario de agenda de GIO Workspace para citas del personal", label: "Agenda", kind: "desktop" },
            { src: "/images/projects/gio/services.webp", alt: "Pantalla de gestión de servicios de GIO Workspace", label: "Servicios", kind: "desktop" },
            { src: "/images/projects/gio/login-desktop.webp", alt: "Inicio de sesión de GIO Workspace en escritorio", label: "Login desktop", kind: "desktop" },
            { src: "/images/projects/gio/login-mobile.webp", alt: "Inicio de sesión de GIO Workspace en móvil", label: "Login móvil", kind: "mobile" },
            { src: "/images/projects/gio/patients-mobile.webp", alt: "Gestión de pacientes de GIO Workspace en móvil", label: "Pacientes", kind: "mobile" },
          ],
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vite", "GitHub Actions"],
          caseStudy: "/gio-workspace.pdf",
          visual: "gio",
        },
        {
          id: "melodix",
          title: "Melodix",
          category: "Plataforma musical full-stack",
          description: "App de streaming musical en Flutter conectada a FastAPI y PostgreSQL, con autenticación, descubrimiento, playlists, perfiles, carga de contenido y reproducción en segundo plano.",
          highlights: [
            "Cliente Flutter con Riverpod y reproducción de audio en segundo plano",
            "Backend FastAPI + PostgreSQL con SQLAlchemy y autenticación JWT",
            "Búsqueda, perfiles de artistas, playlists, uploads y almacenamiento de media en la nube",
          ],
          facts: [
            { label: "Cliente", value: "Flutter" },
            { label: "Backend", value: "FastAPI" },
            { label: "Base de datos", value: "PostgreSQL" },
          ],
          role: "Diseñé e implementé el cliente móvil, API backend, integración de base de datos y flujos principales del producto.",
          gallery: [
            { src: "/images/projects/melodix/home.webp", alt: "Pantalla principal de descubrimiento musical en Melodix", label: "Home", kind: "mobile" },
            { src: "/images/projects/melodix/login.webp", alt: "Pantalla de inicio de sesión de Melodix", label: "Login", kind: "mobile" },
            { src: "/images/projects/melodix/search.webp", alt: "Pantalla de búsqueda y descubrimiento de Melodix", label: "Búsqueda", kind: "mobile" },
            { src: "/images/projects/melodix/player.webp", alt: "Reproductor musical de pantalla completa de Melodix", label: "Reproductor", kind: "mobile" },
            { src: "/images/projects/melodix/library.webp", alt: "Biblioteca de playlists de Melodix", label: "Biblioteca", kind: "mobile" },
            { src: "/images/projects/melodix/artist.webp", alt: "Perfil de artista en Melodix", label: "Artista", kind: "mobile" },
          ],
          stack: ["Flutter", "Dart", "Riverpod", "FastAPI", "PostgreSQL", "SQLAlchemy", "Cloudinary"],
          github: "https://github.com/eduardolluis/melodix",
          visual: "melodix",
        },
        {
          id: "whatzapp",
          title: "Whatzapp",
          category: "App de mensajería en tiempo real",
          description: "Aplicación de mensajería multiplataforma con chat realtime, autenticación por OTP, llamadas de voz/video, multimedia, archivos y ubicación en vivo.",
          highlights: [
            "Mensajería en tiempo real mediante Socket.IO",
            "Llamadas de voz y video con integraciones LiveKit y Agora",
            "Firebase Auth, Firestore, Storage y flujos con Google Maps",
          ],
          facts: [
            { label: "Autenticación", value: "OTP por teléfono" },
            { label: "Realtime", value: "Socket.IO" },
            { label: "Plataformas", value: "Móvil, web y escritorio" },
          ],
          role: "Construí la app Flutter e integré autenticación, mensajería realtime, multimedia, mapas y servicios de llamadas.",
          gallery: [
            { src: "/images/projects/whatzapp/welcome.webp", alt: "Pantalla de bienvenida y términos de Whatzapp", label: "Bienvenida", kind: "mobile" },
            { src: "/images/projects/whatzapp/login.webp", alt: "Pantalla de verificación de número de Whatzapp", label: "Login", kind: "mobile" },
            { src: "/images/projects/whatzapp/home.webp", alt: "Pantalla principal de conversaciones de Whatzapp", label: "Home", kind: "mobile" },
            { src: "/images/projects/whatzapp/chat.webp", alt: "Chat individual de Whatzapp", label: "Chat", kind: "mobile" },
            { src: "/images/projects/whatzapp/calls.webp", alt: "Historial de llamadas de Whatzapp", label: "Llamadas", kind: "mobile" },
          ],
          stack: ["Flutter", "Firebase", "Socket.IO", "LiveKit", "Agora", "Google Maps"],
          github: "https://github.com/eduardolluis/whatzapp",
          visual: "whatzapp",
          disclaimer: "Proyecto de ingeniería independiente. Sin afiliación con WhatsApp ni Meta.",
        },
        {
          id: "multistore",
          title: "Multi Store",
          category: "App e-commerce multi-vendedor",
          description: "Marketplace en Flutter con flujos separados para clientes y proveedores, catálogo, carrito/checkout, herramientas de proveedor, pedidos y autenticación/datos con Firebase.",
          highlights: [
            "Flujos de autenticación para clientes y proveedores, incluyendo Google Sign-In",
            "Descubrimiento, categorías, detalle de producto, carrito, pedidos y checkout",
            "Herramientas de proveedor para gestión de productos, pedidos, balance y operaciones de tienda",
          ],
          facts: [
            { label: "Frontend", value: "Flutter" },
            { label: "Servicios", value: "Firebase + Stripe" },
            { label: "Modos", value: "Cliente y proveedor" },
          ],
          role: "Implementé los flujos del marketplace, experiencias de cliente/proveedor, gestión de productos e integraciones backend.",
          previewNote: "Las vistas del portfolio fueron reconstruidas a partir del código Flutter y los assets reales incluidos en el proyecto.",
          gallery: [
            { src: "/images/projects/multistore/home.webp", alt: "Home de Multi Store con categorías, promociones y productos", label: "Home", kind: "mobile" },
            { src: "/images/projects/multistore/login.webp", alt: "Login de cliente de Multi Store con correo, contraseña y Google", label: "Login", kind: "mobile" },
            { src: "/images/projects/multistore/product.webp", alt: "Detalle de producto de Multi Store con precio, stock y carrito", label: "Producto", kind: "mobile" },
            { src: "/images/projects/multistore/cart.webp", alt: "Carrito de Multi Store con productos, cantidades y checkout", label: "Carrito", kind: "mobile" },
            { src: "/images/projects/multistore/manage-products.webp", alt: "Gestión de productos de Multi Store con búsqueda, stock y acciones de edición", label: "Gestionar productos", kind: "mobile" },
          ],
          stack: ["Flutter", "Dart", "Firebase", "Firestore", "Stripe", "Provider"],
          visual: "multistore",
        },
      ] as Project[],
    },
    about: {
      title: "Un poco sobre mí",
      paragraphs: [
        "Soy estudiante de Ingeniería de Software en INTEC y desarrollador full-stack freelance en Santo Domingo, República Dominicana.",
        "Me gusta trabajar el recorrido completo del producto: requisitos, modelo de datos, API, interfaz web o móvil, funciones en tiempo real, pruebas y despliegue; especialmente cuando el software resuelve un problema concreto de negocio o usuario.",
      ],
      stats: [
        { value: "Full-Stack", label: "web + backend + móvil" },
        { value: "EN / ES", label: "bilingüe · inglés C1" },
        { value: "Open", label: "freelance, pasantías y roles junior" },
      ],
      timeline: [
        {
          time: "Ago 2026 — Presente",
          title: "Desarrollador Full-Stack Freelance",
          where: "GIO Workspace",
          description: "Construí y entregué una plataforma interna para gestionar citas, pacientes, personal, servicios, finanzas, reportes e inventario.",
        },
        {
          time: "Ago 2025 — 2029 estimado",
          title: "Ingeniería de Software",
          where: "INTEC · Instituto Tecnológico de Santo Domingo",
          description: "Estudio Ingeniería de Software mientras desarrollo proyectos full-stack, móviles y realtime fuera del aula.",
        },
        {
          time: "Continuo",
          title: "Proyectos de Producto Independientes",
          where: "GitHub · @eduardolluis",
          description: "Construyo proyectos con Flutter, React, FastAPI, Firebase, PostgreSQL y comunicación en tiempo real.",
        },
      ],
    },
    contact: {
      title: "¿Tienes un proyecto en mente?",
      lead: "Cuéntame qué estás construyendo. Estoy disponible para freelance, pasantías, roles junior y colaboraciones.",
      copy: "Copiar correo",
      copied: "Correo copiado",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      form: {
        name: "Nombre",
        email: "Correo",
        type: "¿Qué necesitas?",
        message: "Cuéntame sobre el proyecto o la oportunidad",
        submit: "Enviar detalles",
        sending: "Enviando…",
        sent: "Mensaje enviado — te responderé pronto.",
        fallback: "El envío directo todavía no está configurado, así que abrí un correo prellenado como alternativa.",
        error: "No pude enviar el mensaje ahora mismo. Prueba WhatsApp o escríbeme directamente por correo.",
        options: ["Aplicación web", "App móvil", "Sistema de negocio", "API / backend", "Pasantía / oportunidad laboral", "Colaboración", "Otro"],
        note: "Sin spam. Tus datos solo se usan para responder este mensaje.",
      },
    },
    footer: "Desarrollador Full-Stack",
    notFound: { title: "Esa página no existe.", text: "El portfolio es de una sola página; vuelve al inicio y sigue explorando.", action: "Volver al inicio" },
  },
};
