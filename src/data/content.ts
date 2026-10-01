export type Lang = "en" | "es";

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
  visual: "gio" | "melodix" | "whatzapp" | "discord";
  disclaimer?: string;
};

export const site = {
  name: "Eduardo De La Cruz",
  email: "eduardodelacruzg5@gmail.com",
  github: "https://github.com/eduardolluis",
  linkedin: "https://www.linkedin.com/in/eduardo-de-la-cruz-b6171837a/",
  whatsapp: "https://wa.me/18495191571",
};

export const content = {
  en: {
    nav: { stack: "Stack", projects: "Projects", about: "About", contact: "Contact" },
    hero: {
      hello: "Hi, I'm",
      rolePrefix: "Developer",
      roles: ["Full-Stack", "Flutter", "Web"],
      lead: "I build web apps, mobile apps and business software end to end — from APIs and databases to polished interfaces people can actually use.",
      projects: "View my projects",
      contact: "Let's talk",
      scroll: "Scroll",
      availability: "Available for freelance & remote projects",
    },
    capabilities: {
      eyebrow: "What I build",
      title: "From business workflows to consumer apps.",
      items: [
        { title: "Web Applications", text: "Dashboards, portals and responsive products built around real workflows." },
        { title: "Mobile Apps", text: "Cross-platform Flutter applications connected to real backends and services." },
        { title: "Business Systems", text: "Scheduling, roles, records, payments, inventory and internal operations." },
        { title: "APIs & Backend", text: "Authentication, databases, integrations and server-side logic that hold the product together." },
      ],
    },
    stack: {
      title: "My toolbox",
      lead: "The technologies I use to take a product from idea to production.",
      groups: [
        {
          icon: "UI",
          className: "i-front",
          title: "Frontend",
          description: "Responsive interfaces, dashboards and production web apps.",
          items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Vite"],
        },
        {
          icon: "API",
          className: "i-back",
          title: "Backend",
          description: "APIs, authentication, relational data and server-side logic.",
          items: ["FastAPI", "Node.js", "Express", "PostgreSQL", "SQLAlchemy", "Supabase"],
        },
        {
          icon: "App",
          className: "i-mobile",
          title: "Mobile",
          description: "Cross-platform applications with native-feeling interactions.",
          items: ["Flutter", "Dart", "Riverpod", "Firebase", "just_audio", "Google Maps"],
        },
        {
          icon: "Ops",
          className: "i-ops",
          title: "Tools & languages",
          description: "The workflow and languages around building, testing and shipping projects.",
          items: ["Git", "GitHub", "GitHub Actions", "Linux", "Vercel", "Render", "C#", "C++"],
        },
      ],
    },
    projects: {
      title: "Projects I've built",
      lead: "Real work across business software, mobile apps and real-time platforms.",
      viewCode: "Code",
      viewLive: "Live demo",
      caseStudy: "Case study",
      more: "More projects on GitHub",
      explore: "Explore project",
      close: "Close project",
      overview: "Project overview",
      gallery: "Screens",
      highlights: "What it includes",
      items: [
        {
          id: "gio",
          title: "GIO Workspace",
          category: "Client business platform",
          description: "A responsive internal management platform for GIO Beauty & Wellness with scheduling, patients, services, inventory, payments and role-based access.",
          highlights: [
            "Google and email OTP authentication with role-aware access",
            "Scheduling, patients, services, payments, inventory and reports",
            "Responsive desktop and mobile workflows for staff",
          ],
          gallery: [
            { src: "/images/projects/gio/dashboard.webp", alt: "GIO Workspace dashboard", label: "Dashboard", kind: "desktop" },
            { src: "/images/projects/gio/agenda.webp", alt: "GIO Workspace schedule", label: "Schedule", kind: "desktop" },
            { src: "/images/projects/gio/services.webp", alt: "GIO Workspace services catalog", label: "Services", kind: "desktop" },
            { src: "/images/projects/gio/login-desktop.webp", alt: "GIO Workspace desktop login", label: "Login", kind: "desktop" },
            { src: "/images/projects/gio/login-mobile.webp", alt: "GIO Workspace mobile login", label: "Mobile login", kind: "mobile" },
            { src: "/images/projects/gio/patients-mobile.webp", alt: "GIO Workspace mobile patient view", label: "Patients", kind: "mobile" },
          ],
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vite"],
          caseStudy: "/gio-workspace.pdf",
          visual: "gio",
        },
        {
          id: "melodix",
          title: "Melodix",
          category: "Full-stack mobile app",
          description: "A full-stack music streaming app with background playback, playlists, search, artist profiles and media uploads.",
          highlights: [
            "Flutter client with Riverpod state management",
            "FastAPI + PostgreSQL backend with SQLAlchemy",
            "Background audio, playlists, search and media uploads",
          ],
          gallery: [
            { src: "/images/projects/melodix/home.png", alt: "Melodix home screen", label: "Home", kind: "mobile" },
            { src: "/images/projects/melodix/player.png", alt: "Melodix player", label: "Player", kind: "mobile" },
            { src: "/images/projects/melodix/playlist.png", alt: "Melodix playlist", label: "Library", kind: "mobile" },
            { src: "/images/projects/melodix/artist.png", alt: "Melodix artist profile", label: "Artist", kind: "mobile" },
          ],
          stack: ["Flutter", "FastAPI", "PostgreSQL", "Riverpod", "Cloudinary"],
          github: "https://github.com/eduardolluis/melodix",
          visual: "melodix",
        },
        {
          id: "whatzapp",
          title: "Whatzapp",
          category: "Real-time messaging app",
          description: "A real-time messaging application with chat, voice and video calls, media sharing, live location and phone OTP authentication.",
          highlights: [
            "Real-time messaging through Socket.IO",
            "Voice/video calling with LiveKit and Agora integrations",
            "Firebase Auth, Firestore, Storage and Google Maps workflows",
          ],
          gallery: [
            { src: "/images/projects/whatzapp/home.png", alt: "Whatzapp home", label: "Home", kind: "mobile" },
            { src: "/images/projects/whatzapp/chat.png", alt: "Whatzapp chat", label: "Chat", kind: "mobile" },
            { src: "/images/projects/whatzapp/calls.png", alt: "Whatzapp call history", label: "Calls", kind: "mobile" },
          ],
          stack: ["Flutter", "Firebase", "Socket.IO", "LiveKit", "Google Maps"],
          github: "https://github.com/eduardolluis/whatzapp",
          visual: "whatzapp",
          disclaimer: "Independent engineering project. Not affiliated with WhatsApp or Meta.",
        },
        {
          id: "discord",
          title: "Discord Clone",
          category: "Real-time web platform",
          description: "A full-stack real-time community platform with servers, channels, text chat, member roles, file sharing and voice/video calls.",
          highlights: [
            "Servers, channels, roles and real-time text chat",
            "Authentication and data modeling with Clerk and Prisma",
            "Voice/video communication powered by LiveKit",
          ],
          gallery: [
            { src: "/images/projects/discord/main.png", alt: "Discord clone main interface", label: "Server", kind: "desktop" },
            { src: "/images/projects/discord/call.png", alt: "Discord clone call interface", label: "Call", kind: "desktop" },
          ],
          stack: ["Next.js", "Prisma", "Clerk", "Socket.IO", "LiveKit"],
          github: "https://github.com/eduardolluis/discord-clone",
          live: "https://discord-clone-production-3bce.up.railway.app",
          visual: "discord",
          disclaimer: "Independent engineering project. Not affiliated with Discord Inc.",
        },
      ] as Project[],
    },
    about: {
      title: "A little about me",
      paragraphs: [
        "I'm a Software Engineering student at INTEC and a full-stack developer based in Santo Domingo, Dominican Republic.",
        "I like owning the full product path: data model, API, web interface, mobile experience and deployment. My strongest work is where technical decisions connect directly to a real user or business workflow.",
      ],
      stats: [
        { value: "Web + Mobile", label: "full product development" },
        { value: "EN / ES", label: "bilingual communication" },
        { value: "Remote", label: "available for projects" },
      ],
      timeline: [
        {
          time: "2026 — Present",
          title: "Full-Stack Software Developer",
          where: "GIO Beauty & Wellness · Freelance",
          description: "Building and refining GIO Workspace, an internal business management platform for real operational workflows.",
        },
        {
          time: "2025 — Present",
          title: "Software Engineering",
          where: "Instituto Tecnológico de Santo Domingo (INTEC)",
          description: "Studying software engineering while building web, mobile and backend projects outside the classroom.",
        },
        {
          time: "Ongoing",
          title: "Independent Product Projects",
          where: "GitHub · @eduardolluis",
          description: "Building full-stack applications focused on mobile, real-time communication, APIs and product architecture.",
        },
      ],
    },
    contact: {
      title: "Let's build something useful.",
      lead: "If you need a web app, mobile app or internal system, send me the idea and I'll tell you how I'd approach it.",
      copy: "Copy email",
      copied: "Email copied",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      form: {
        name: "Name",
        email: "Email",
        type: "Project type",
        message: "Tell me about the project",
        submit: "Open email draft",
        options: ["Web application", "Mobile app", "Business system", "API / backend", "Other"],
        note: "This opens your email app with the project details pre-filled.",
      },
    },
    footer: "Full-Stack & Flutter Developer",
  },
  es: {
    nav: { stack: "Stack", projects: "Proyectos", about: "Sobre mí", contact: "Contacto" },
    hero: {
      hello: "Hola, soy",
      rolePrefix: "Desarrollador",
      roles: ["Full-Stack", "Flutter", "Web"],
      lead: "Construyo aplicaciones web, apps móviles y software para negocios de principio a fin: desde APIs y bases de datos hasta interfaces que la gente realmente puede usar.",
      projects: "Ver mis proyectos",
      contact: "Hablemos",
      scroll: "Desliza",
      availability: "Disponible para proyectos freelance y remotos",
    },
    capabilities: {
      eyebrow: "Lo que desarrollo",
      title: "Desde operaciones de negocio hasta apps de consumo.",
      items: [
        { title: "Aplicaciones Web", text: "Dashboards, portales y productos responsive construidos alrededor de flujos reales." },
        { title: "Apps Móviles", text: "Aplicaciones Flutter multiplataforma conectadas a backends y servicios reales." },
        { title: "Sistemas de Negocio", text: "Agenda, roles, expedientes, pagos, inventario y operaciones internas." },
        { title: "APIs y Backend", text: "Autenticación, bases de datos, integraciones y lógica de servidor que sostienen el producto." },
      ],
    },
    stack: {
      title: "Mi caja de herramientas",
      lead: "Las tecnologías que uso para llevar un producto desde la idea hasta producción.",
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
          title: "Backend",
          description: "APIs, autenticación, datos relacionales y lógica de servidor.",
          items: ["FastAPI", "Node.js", "Express", "PostgreSQL", "SQLAlchemy", "Supabase"],
        },
        {
          icon: "App",
          className: "i-mobile",
          title: "Móvil",
          description: "Aplicaciones multiplataforma con interacciones fluidas y experiencia nativa.",
          items: ["Flutter", "Dart", "Riverpod", "Firebase", "just_audio", "Google Maps"],
        },
        {
          icon: "Ops",
          className: "i-ops",
          title: "Herramientas y lenguajes",
          description: "El flujo de trabajo y los lenguajes alrededor de construir, probar y publicar proyectos.",
          items: ["Git", "GitHub", "GitHub Actions", "Linux", "Vercel", "Render", "C#", "C++"],
        },
      ],
    },
    projects: {
      title: "Proyectos que he construido",
      lead: "Trabajo real entre software para negocios, aplicaciones móviles y plataformas en tiempo real.",
      viewCode: "Código",
      viewLive: "Demo",
      caseStudy: "Caso de estudio",
      more: "Más proyectos en GitHub",
      explore: "Explorar proyecto",
      close: "Cerrar proyecto",
      overview: "Resumen del proyecto",
      gallery: "Pantallas",
      highlights: "Qué incluye",
      items: [
        {
          id: "gio",
          title: "GIO Workspace",
          category: "Plataforma empresarial para cliente",
          description: "Plataforma interna responsive para GIO Beauty & Wellness con agenda, pacientes, servicios, inventario, pagos y control de acceso por roles.",
          highlights: [
            "Acceso con Google y OTP por correo con permisos según el rol",
            "Agenda, pacientes, servicios, pagos, inventario y reportes",
            "Flujos responsive para escritorio y móvil usados por el equipo",
          ],
          gallery: [
            { src: "/images/projects/gio/dashboard.webp", alt: "Dashboard de GIO Workspace", label: "Dashboard", kind: "desktop" },
            { src: "/images/projects/gio/agenda.webp", alt: "Agenda de GIO Workspace", label: "Agenda", kind: "desktop" },
            { src: "/images/projects/gio/services.webp", alt: "Servicios de GIO Workspace", label: "Servicios", kind: "desktop" },
            { src: "/images/projects/gio/login-desktop.webp", alt: "Login de GIO Workspace en escritorio", label: "Login", kind: "desktop" },
            { src: "/images/projects/gio/login-mobile.webp", alt: "Login móvil de GIO Workspace", label: "Login móvil", kind: "mobile" },
            { src: "/images/projects/gio/patients-mobile.webp", alt: "Pacientes de GIO Workspace en móvil", label: "Pacientes", kind: "mobile" },
          ],
          stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vite"],
          caseStudy: "/gio-workspace.pdf",
          visual: "gio",
        },
        {
          id: "melodix",
          title: "Melodix",
          category: "App móvil full-stack",
          description: "App full-stack de streaming de música con reproducción en segundo plano, playlists, búsqueda, perfiles de artistas y subida de medios.",
          highlights: [
            "Cliente Flutter con gestión de estado en Riverpod",
            "Backend FastAPI + PostgreSQL con SQLAlchemy",
            "Audio en segundo plano, playlists, búsqueda y subida de medios",
          ],
          gallery: [
            { src: "/images/projects/melodix/home.png", alt: "Inicio de Melodix", label: "Inicio", kind: "mobile" },
            { src: "/images/projects/melodix/player.png", alt: "Reproductor de Melodix", label: "Reproductor", kind: "mobile" },
            { src: "/images/projects/melodix/playlist.png", alt: "Playlist de Melodix", label: "Biblioteca", kind: "mobile" },
            { src: "/images/projects/melodix/artist.png", alt: "Perfil de artista de Melodix", label: "Artista", kind: "mobile" },
          ],
          stack: ["Flutter", "FastAPI", "PostgreSQL", "Riverpod", "Cloudinary"],
          github: "https://github.com/eduardolluis/melodix",
          visual: "melodix",
        },
        {
          id: "whatzapp",
          title: "Whatzapp",
          category: "App de mensajería en tiempo real",
          description: "Aplicación de mensajería en tiempo real con chat, llamadas de voz y video, archivos, ubicación y autenticación por OTP telefónico.",
          highlights: [
            "Mensajería en tiempo real mediante Socket.IO",
            "Llamadas de voz y video con LiveKit y Agora",
            "Firebase Auth, Firestore, Storage y flujos con Google Maps",
          ],
          gallery: [
            { src: "/images/projects/whatzapp/home.png", alt: "Inicio de Whatzapp", label: "Inicio", kind: "mobile" },
            { src: "/images/projects/whatzapp/chat.png", alt: "Chat de Whatzapp", label: "Chat", kind: "mobile" },
            { src: "/images/projects/whatzapp/calls.png", alt: "Llamadas de Whatzapp", label: "Llamadas", kind: "mobile" },
          ],
          stack: ["Flutter", "Firebase", "Socket.IO", "LiveKit", "Google Maps"],
          github: "https://github.com/eduardolluis/whatzapp",
          visual: "whatzapp",
          disclaimer: "Proyecto independiente de ingeniería. Sin afiliación con WhatsApp o Meta.",
        },
        {
          id: "discord",
          title: "Discord Clone",
          category: "Plataforma web en tiempo real",
          description: "Plataforma full-stack de comunidades en tiempo real con servidores, canales, chat, roles, archivos y llamadas de voz/video.",
          highlights: [
            "Servidores, canales, roles y chat de texto en tiempo real",
            "Autenticación y modelado de datos con Clerk y Prisma",
            "Comunicación de voz y video mediante LiveKit",
          ],
          gallery: [
            { src: "/images/projects/discord/main.png", alt: "Interfaz principal del clon de Discord", label: "Servidor", kind: "desktop" },
            { src: "/images/projects/discord/call.png", alt: "Llamada en el clon de Discord", label: "Llamada", kind: "desktop" },
          ],
          stack: ["Next.js", "Prisma", "Clerk", "Socket.IO", "LiveKit"],
          github: "https://github.com/eduardolluis/discord-clone",
          live: "https://discord-clone-production-3bce.up.railway.app",
          visual: "discord",
          disclaimer: "Proyecto independiente de ingeniería. Sin afiliación con Discord Inc.",
        },
      ] as Project[],
    },
    about: {
      title: "Un poco sobre mí",
      paragraphs: [
        "Soy estudiante de Ingeniería de Software en INTEC y desarrollador full-stack en Santo Domingo, República Dominicana.",
        "Me gusta dominar el recorrido completo del producto: modelo de datos, API, interfaz web, experiencia móvil y despliegue. Mi mejor trabajo aparece cuando las decisiones técnicas resuelven un flujo real de una persona o negocio.",
      ],
      stats: [
        { value: "Web + Móvil", label: "desarrollo de producto completo" },
        { value: "EN / ES", label: "comunicación bilingüe" },
        { value: "Remoto", label: "disponible para proyectos" },
      ],
      timeline: [
        {
          time: "2026 — Actualidad",
          title: "Desarrollador de Software Full-Stack",
          where: "GIO Beauty & Wellness · Freelance",
          description: "Construyendo y refinando GIO Workspace, una plataforma interna de gestión para flujos reales del negocio.",
        },
        {
          time: "2025 — Actualidad",
          title: "Ingeniería de Software",
          where: "Instituto Tecnológico de Santo Domingo (INTEC)",
          description: "Estudiando Ingeniería de Software mientras construyo proyectos web, móviles y backend fuera del aula.",
        },
        {
          time: "Continuo",
          title: "Proyectos de Producto Independientes",
          where: "GitHub · @eduardolluis",
          description: "Construyendo aplicaciones full-stack enfocadas en móvil, comunicación en tiempo real, APIs y arquitectura de producto.",
        },
      ],
    },
    contact: {
      title: "Hagamos algo útil.",
      lead: "Si necesitas una app web, una app móvil o un sistema interno, mándame la idea y te digo cómo la abordaría.",
      copy: "Copiar correo",
      copied: "Correo copiado",
      github: "GitHub",
      linkedin: "LinkedIn",
      whatsapp: "WhatsApp",
      form: {
        name: "Nombre",
        email: "Correo",
        type: "Tipo de proyecto",
        message: "Cuéntame sobre el proyecto",
        submit: "Abrir borrador de correo",
        options: ["Aplicación web", "App móvil", "Sistema de negocio", "API / backend", "Otro"],
        note: "Esto abre tu aplicación de correo con los detalles del proyecto ya completados.",
      },
    },
    footer: "Desarrollador Full-Stack & Flutter",
  },
} as const;
