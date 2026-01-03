export type Language = "en" | "es" | "fr" | "de" | "zh" | "ja"

export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  zh: { name: "中文", flag: "🇨🇳" },
  ja: { name: "日本語", flag: "🇯🇵" },
}

export const defaultLanguage: Language = "fr"

export type TranslationKey = keyof typeof translations.en

export const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.research": "Research",
    "nav.hacks": "Hacks",
    "nav.experience": "Experience",
    "nav.certifications": "Certifications",
    "nav.activity": "Activity",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",

    // Homepage
    "home.hero.title": "HELPING IN BUILDING THE",
    "home.hero.accent": "FUTURE",
    "home.hero.subtitle": "OF TECHNOLOGY",
    "home.hero.description":
      "Crafting innovative solutions through cutting-edge research, full-stack development, and strategic technological implementations that drive meaningful impact across industries.",
    "home.hero.cta.projects": "View Projects",
    "home.hero.cta.resume": "Download Resume",
    "home.impact.title": "READY TO",
    "home.impact.accent": "GET STARTED?",
    "home.impact.description":
      "Transform your ideas into reality with cutting-edge technology solutions. From concept to deployment, I deliver exceptional results.",
    "home.impact.cta": "Start a Project",
    "home.capabilities.title": "Core Capabilities",
    "home.capabilities.subtitle": "Specialized expertise across multiple domains of technology and innovation",
    "home.stats.projects": "Projects Completed",
    "home.stats.papers": "Research Papers",
    "home.stats.experience": "Years Experience",
    "home.stats.certifications": "Certifications",
    "home.cta.title": "Let's Build Something Amazing Together",
    "home.cta.description": "Ready to turn your vision into reality? Get in touch and let's discuss your next project.",
    "home.cta.button": "Get In Touch",

    // Projects
    "projects.hero.title": "FEATURED",
    "projects.hero.accent": "PROJECTS",
    "projects.hero.description":
      "A curated collection of innovative solutions spanning AI, blockchain, data visualization, and cutting-edge technologies that drive meaningful impact.",
    "projects.filter.all": "All",
    "projects.cta.title": "Have a Project in Mind?",
    "projects.cta.description":
      "Let's collaborate and bring your innovative ideas to life with cutting-edge technology.",
    "projects.cta.button": "Start a Conversation",

    // Research
    "research.hero.title": "RESEARCH &",
    "research.hero.accent": "PUBLICATIONS",
    "research.hero.description":
      "Advancing the frontiers of technology through rigorous research, peer-reviewed publications, and collaborative academic endeavors that shape the future of computing.",
    "research.stats.publications": "Publications",
    "research.stats.citations": "Citations",
    "research.stats.collaborators": "Collaborators",
    "research.stats.impact": "Avg Impact Factor",
    "research.cta.title": "Interested in Collaboration?",
    "research.cta.description":
      "Let's explore opportunities for joint research, academic partnerships, and innovative projects.",
    "research.cta.button": "Discuss Research Opportunities",

    // Experience
    "experience.hero.title": "PROFESSIONAL",
    "experience.hero.accent": "EXPERIENCE",
    "experience.hero.description":
      "A journey through innovative companies and research institutions, building cutting-edge technology solutions and advancing the state of the art in computer science.",
    "experience.skills.title": "Technical Expertise",
    "experience.skills.subtitle": "Comprehensive skill set spanning multiple domains of technology and innovation",

    // Activity
    "activity.hero.title": "DEVELOPMENT",
    "activity.hero.accent": "ACTIVITY",
    "activity.hero.description":
      "Real-time insights into my development journey, contribution patterns, and open-source involvement across multiple platforms and repositories.",
    "activity.contributions.title": "Contribution Activity",
    "activity.contributions.description":
      "Daily contribution patterns over the past year showing consistency and dedication to development.",
    "activity.monthly.title": "Monthly Activity",
    "activity.monthly.description": "Commits, pull requests, and issues over the past year",
    "activity.languages.title": "Language Distribution",
    "activity.languages.description": "Programming languages used in commits this year",
    "activity.repos.title": "Popular Repositories",
    "activity.repos.description": "Most starred and actively maintained open-source projects",

    // Hacks
    "hacks.hero.title": "HACKATHON",
    "hacks.hero.accent": "PROJECTS",
    "hacks.hero.description":
      "Rapid prototyping and innovative solutions built under pressure. A showcase of creativity, technical skills, and collaborative problem-solving in time-constrained environments.",
    "hacks.stats.participated": "Hackathons Participated",
    "hacks.stats.awards": "Awards Won",
    "hacks.stats.prize": "Total Prize Money",
    "hacks.stats.team": "Team Projects",
    "hacks.cta.title": "Want to Hack Together?",
    "hacks.cta.description":
      "Looking for a hackathon teammate or organizing an event? Let's build something amazing in record time.",
    "hacks.cta.button": "Let's Collaborate",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.close": "Close",
    "common.open": "Open",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.download": "Download",
    "common.share": "Share",
    "common.copy": "Copy",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.more": "More",
    "common.less": "Less",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.research": "Investigación",
    "nav.hacks": "Hackathons",
    "nav.experience": "Experiencia",
    "nav.certifications": "Certificaciones",
    "nav.activity": "Actividad",
    "nav.about": "Acerca de",
    "nav.portfolio": "Portafolio",

    // Homepage
    "home.hero.title": "CONSTRUYENDO EL",
    "home.hero.accent": "FUTURO",
    "home.hero.subtitle": "DE LA TECNOLOGÍA",
    "home.hero.description":
      "Creando soluciones innovadoras a través de investigación de vanguardia, desarrollo full-stack e implementaciones tecnológicas estratégicas que generan un impacto significativo en todas las industrias.",
    "home.hero.cta.projects": "Ver Proyectos",
    "home.hero.cta.resume": "Descargar CV",
    "home.impact.title": "¿LISTO PARA",
    "home.impact.accent": "COMENZAR?",
    "home.impact.description":
      "Transforma tus ideas en realidad con soluciones tecnológicas de vanguardia. Desde el concepto hasta la implementación, entrego resultados excepcionales.",
    "home.impact.cta": "Iniciar Proyecto",
    "home.capabilities.title": "Capacidades Principales",
    "home.capabilities.subtitle": "Experiencia especializada en múltiples dominios de tecnología e innovación",
    "home.stats.projects": "Proyectos Completados",
    "home.stats.papers": "Artículos de Investigación",
    "home.stats.experience": "Años de Experiencia",
    "home.stats.certifications": "Certificaciones",
    "home.cta.title": "Construyamos Algo Increíble Juntos",
    "home.cta.description":
      "¿Listo para convertir tu visión en realidad? Ponte en contacto y discutamos tu próximo proyecto.",
    "home.cta.button": "Contactar",

    // Projects
    "projects.hero.title": "PROYECTOS",
    "projects.hero.accent": "DESTACADOS",
    "projects.hero.description":
      "Una colección curada de soluciones innovadoras que abarcan IA, blockchain, visualización de datos y tecnologías de vanguardia que generan un impacto significativo.",
    "projects.filter.all": "Todos",
    "projects.cta.title": "¿Tienes un Proyecto en Mente?",
    "projects.cta.description": "Colaboremos y demos vida a tus ideas innovadoras con tecnología de vanguardia.",
    "projects.cta.button": "Iniciar Conversación",

    // Research
    "research.hero.title": "INVESTIGACIÓN Y",
    "research.hero.accent": "PUBLICACIONES",
    "research.hero.description":
      "Avanzando las fronteras de la tecnología a través de investigación rigurosa, publicaciones revisadas por pares y esfuerzos académicos colaborativos que dan forma al futuro de la computación.",
    "research.stats.publications": "Publicaciones",
    "research.stats.citations": "Citas",
    "research.stats.collaborators": "Colaboradores",
    "research.stats.impact": "Factor de Impacto Promedio",
    "research.cta.title": "¿Interesado en Colaborar?",
    "research.cta.description":
      "Exploremos oportunidades para investigación conjunta, asociaciones académicas y proyectos innovadores.",
    "research.cta.button": "Discutir Oportunidades de Investigación",

    // Experience
    "experience.hero.title": "EXPERIENCIA",
    "experience.hero.accent": "PROFESIONAL",
    "experience.hero.description":
      "Un viaje a través de empresas innovadoras e instituciones de investigación, construyendo soluciones tecnológicas de vanguardia y avanzando el estado del arte en ciencias de la computación.",
    "experience.skills.title": "Experiencia Técnica",
    "experience.skills.subtitle":
      "Conjunto integral de habilidades que abarca múltiples dominios de tecnología e innovación",

    // Activity
    "activity.hero.title": "ACTIVIDAD DE",
    "activity.hero.accent": "DESARROLLO",
    "activity.hero.description":
      "Perspectivas en tiempo real de mi viaje de desarrollo, patrones de contribución e involucramiento en código abierto a través de múltiples plataformas y repositorios.",
    "activity.contributions.title": "Actividad de Contribución",
    "activity.contributions.description":
      "Patrones de contribución diaria durante el último año mostrando consistencia y dedicación al desarrollo.",
    "activity.monthly.title": "Actividad Mensual",
    "activity.monthly.description": "Commits, pull requests e issues durante el último año",
    "activity.languages.title": "Distribución de Lenguajes",
    "activity.languages.description": "Lenguajes de programación utilizados en commits este año",
    "activity.repos.title": "Repositorios Populares",
    "activity.repos.description": "Proyectos de código abierto más destacados y mantenidos activamente",

    // Hacks
    "hacks.hero.title": "PROYECTOS DE",
    "hacks.hero.accent": "HACKATHON",
    "hacks.hero.description":
      "Prototipado rápido y soluciones innovadoras construidas bajo presión. Una muestra de creatividad, habilidades técnicas y resolución colaborativa de problemas en entornos con limitaciones de tiempo.",
    "hacks.stats.participated": "Hackathons Participados",
    "hacks.stats.awards": "Premios Ganados",
    "hacks.stats.prize": "Dinero Total en Premios",
    "hacks.stats.team": "Proyectos en Equipo",
    "hacks.cta.title": "¿Quieres Hackear Juntos?",
    "hacks.cta.description":
      "¿Buscas un compañero de hackathon u organizando un evento? Construyamos algo increíble en tiempo récord.",
    "hacks.cta.button": "Colaboremos",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Ocurrió un error",
    "common.retry": "Reintentar",
    "common.close": "Cerrar",
    "common.open": "Abrir",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.confirm": "Confirmar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.view": "Ver",
    "common.download": "Descargar",
    "common.share": "Compartir",
    "common.copy": "Copiar",
    "common.search": "Buscar",
    "common.filter": "Filtrar",
    "common.sort": "Ordenar",
    "common.more": "Más",
    "common.less": "Menos",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.research": "Recherche",
    "nav.hacks": "Hackathons",
    "nav.experience": "Expérience",
    "nav.certifications": "Certifications",
    "nav.activity": "Activité",
    "nav.about": "À propos",
    "nav.portfolio": "Portfolio",

    // Homepage
    "home.hero.title": "CONSTRUIRE LE",
    "home.hero.accent": "FUTUR",
    "home.hero.subtitle": "DE LA TECHNOLOGIE",
    "home.hero.description":
      "Créer des solutions innovantes grâce à la recherche de pointe, au développement full-stack et aux implémentations technologiques stratégiques qui génèrent un impact significatif dans toutes les industries.",
    "home.hero.cta.projects": "Voir les Projets",
    "home.hero.cta.resume": "Télécharger CV",
    "home.impact.title": "PRÊT À",
    "home.impact.accent": "COMMENCER?",
    "home.impact.description":
      "Transformez vos idées en réalité avec des solutions technologiques de pointe. Du concept au déploiement, je livre des résultats exceptionnels.",
    "home.impact.cta": "Démarrer un Projet",
    "home.capabilities.title": "Capacités Principales",
    "home.capabilities.subtitle": "Expertise spécialisée dans plusieurs domaines de la technologie et de l'innovation",
    "home.stats.projects": "Projets Terminés",
    "home.stats.papers": "Articles de Recherche",
    "home.stats.experience": "Années d'Expérience",
    "home.stats.certifications": "Certifications",
    "home.cta.title": "Construisons Quelque Chose d'Incroyable Ensemble",
    "home.cta.description":
      "Prêt à transformer votre vision en réalité? Contactez-moi et discutons de votre prochain projet.",
    "home.cta.button": "Prendre Contact",

    // Projects
    "projects.hero.title": "PROJETS",
    "projects.hero.accent": "SÉLECTIONNÉS",
    "projects.hero.description":
      "Une collection organisée de solutions innovantes couvrant l'IA, la blockchain, la visualisation de données et les technologies de pointe qui génèrent un impact significatif.",
    "projects.filter.all": "Tous",
    "projects.cta.title": "Vous Avez un Projet en Tête?",
    "projects.cta.description": "Collaborons et donnons vie à vos idées innovantes avec une technologie de pointe.",
    "projects.cta.button": "Commencer une Conversation",

    // Research
    "research.hero.title": "RECHERCHE &",
    "research.hero.accent": "PUBLICATIONS",
    "research.hero.description":
      "Faire progresser les frontières de la technologie grâce à la recherche rigoureuse, aux publications évaluées par les pairs et aux efforts académiques collaboratifs qui façonnent l'avenir de l'informatique.",
    "research.stats.publications": "Publications",
    "research.stats.citations": "Citations",
    "research.stats.collaborators": "Collaborateurs",
    "research.stats.impact": "Facteur d'Impact Moyen",
    "research.cta.title": "Intéressé par une Collaboration?",
    "research.cta.description":
      "Explorons les opportunités de recherche conjointe, de partenariats académiques et de projets innovants.",
    "research.cta.button": "Discuter des Opportunités de Recherche",

    // Experience
    "experience.hero.title": "EXPÉRIENCE",
    "experience.hero.accent": "PROFESSIONNELLE",
    "experience.hero.description":
      "Un voyage à travers des entreprises innovantes et des institutions de recherche, construisant des solutions technologiques de pointe et faisant progresser l'état de l'art en informatique.",
    "experience.skills.title": "Expertise Technique",
    "experience.skills.subtitle":
      "Ensemble complet de compétences couvrant plusieurs domaines de la technologie et de l'innovation",

    // Activity
    "activity.hero.title": "ACTIVITÉ DE",
    "activity.hero.accent": "DÉVELOPPEMENT",
    "activity.hero.description":
      "Aperçus en temps réel de mon parcours de développement, des modèles de contribution et de l'implication open source sur plusieurs plateformes et référentiels.",
    "activity.contributions.title": "Activité de Contribution",
    "activity.contributions.description":
      "Modèles de contribution quotidienne au cours de la dernière année montrant la cohérence et le dévouement au développement.",
    "activity.monthly.title": "Activité Mensuelle",
    "activity.monthly.description": "Commits, pull requests et issues au cours de la dernière année",
    "activity.languages.title": "Distribution des Langages",
    "activity.languages.description": "Langages de programmation utilisés dans les commits cette année",
    "activity.repos.title": "Référentiels Populaires",
    "activity.repos.description": "Projets open source les plus étoilés et activement maintenus",

    // Hacks
    "hacks.hero.title": "PROJETS DE",
    "hacks.hero.accent": "HACKATHON",
    "hacks.hero.description":
      "Prototypage rapide et solutions innovantes construites sous pression. Une vitrine de créativité, de compétences techniques et de résolution collaborative de problèmes dans des environnements contraints par le temps.",
    "hacks.stats.participated": "Hackathons Participés",
    "hacks.stats.awards": "Prix Remportés",
    "hacks.stats.prize": "Argent Total des Prix",
    "hacks.stats.team": "Projets d'Équipe",
    "hacks.cta.title": "Envie de Hacker Ensemble?",
    "hacks.cta.description":
      "Vous cherchez un coéquipier de hackathon ou organisez un événement? Construisons quelque chose d'incroyable en un temps record.",
    "hacks.cta.button": "Collaborons",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Une erreur s'est produite",
    "common.retry": "Réessayer",
    "common.close": "Fermer",
    "common.open": "Ouvrir",
    "common.save": "Enregistrer",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.download": "Télécharger",
    "common.share": "Partager",
    "common.copy": "Copier",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.more": "Plus",
    "common.less": "Moins",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.projects": "Projekte",
    "nav.research": "Forschung",
    "nav.hacks": "Hackathons",
    "nav.experience": "Erfahrung",
    "nav.certifications": "Zertifizierungen",
    "nav.activity": "Aktivität",
    "nav.about": "Über mich",
    "nav.portfolio": "Portfolio",

    // Homepage
    "home.hero.title": "DIE ZUKUNFT",
    "home.hero.accent": "DER TECHNOLOGIE",
    "home.hero.subtitle": "GESTALTEN",
    "home.hero.description":
      "Innovative Lösungen durch modernste Forschung, Full-Stack-Entwicklung und strategische technologische Implementierungen schaffen, die bedeutsame Auswirkungen in allen Branchen erzielen.",
    "home.hero.cta.projects": "Projekte Ansehen",
    "home.hero.cta.resume": "Lebenslauf Herunterladen",
    "home.impact.title": "BEREIT ZUM",
    "home.impact.accent": "LOSLEGEN?",
    "home.impact.description":
      "Verwandeln Sie Ihre Ideen mit modernsten Technologielösungen in die Realität. Vom Konzept bis zur Bereitstellung liefere ich außergewöhnliche Ergebnisse.",
    "home.impact.cta": "Projekt Starten",
    "home.capabilities.title": "Kernkompetenzen",
    "home.capabilities.subtitle": "Spezialisierte Expertise in mehreren Bereichen der Technologie und Innovation",
    "home.stats.projects": "Abgeschlossene Projekte",
    "home.stats.papers": "Forschungsarbeiten",
    "home.stats.experience": "Jahre Erfahrung",
    "home.stats.certifications": "Zertifizierungen",
    "home.cta.title": "Lassen Sie uns Gemeinsam Etwas Großartiges Schaffen",
    "home.cta.description":
      "Bereit, Ihre Vision in die Realität umzusetzen? Kontaktieren Sie mich und lassen Sie uns Ihr nächstes Projekt besprechen.",
    "home.cta.button": "Kontakt Aufnehmen",

    // Projects
    "projects.hero.title": "AUSGEWÄHLTE",
    "projects.hero.accent": "PROJEKTE",
    "projects.hero.description":
      "Eine kuratierte Sammlung innovativer Lösungen, die KI, Blockchain, Datenvisualisierung und modernste Technologien umfassen, die bedeutsame Auswirkungen erzielen.",
    "projects.filter.all": "Alle",
    "projects.cta.title": "Haben Sie ein Projekt im Kopf?",
    "projects.cta.description":
      "Lassen Sie uns zusammenarbeiten und Ihre innovativen Ideen mit modernster Technologie zum Leben erwecken.",
    "projects.cta.button": "Gespräch Beginnen",

    // Research
    "research.hero.title": "FORSCHUNG &",
    "research.hero.accent": "PUBLIKATIONEN",
    "research.hero.description":
      "Die Grenzen der Technologie durch rigorose Forschung, peer-reviewte Publikationen und kollaborative akademische Bemühungen vorantreiben, die die Zukunft der Informatik prägen.",
    "research.stats.publications": "Publikationen",
    "research.stats.citations": "Zitierungen",
    "research.stats.collaborators": "Mitarbeiter",
    "research.stats.impact": "Durchschnittlicher Impact-Faktor",
    "research.cta.title": "Interessiert an einer Zusammenarbeit?",
    "research.cta.description":
      "Lassen Sie uns Möglichkeiten für gemeinsame Forschung, akademische Partnerschaften und innovative Projekte erkunden.",
    "research.cta.button": "Forschungsmöglichkeiten Besprechen",

    // Experience
    "experience.hero.title": "BERUFLICHE",
    "experience.hero.accent": "ERFAHRUNG",
    "experience.hero.description":
      "Eine Reise durch innovative Unternehmen und Forschungseinrichtungen, bei der modernste Technologielösungen entwickelt und der Stand der Technik in der Informatik vorangetrieben wird.",
    "experience.skills.title": "Technische Expertise",
    "experience.skills.subtitle":
      "Umfassende Fähigkeiten, die mehrere Bereiche der Technologie und Innovation abdecken",

    // Activity
    "activity.hero.title": "ENTWICKLUNGS-",
    "activity.hero.accent": "AKTIVITÄT",
    "activity.hero.description":
      "Echtzeiteinblicke in meine Entwicklungsreise, Beitragsmuster und Open-Source-Beteiligung über mehrere Plattformen und Repositories hinweg.",
    "activity.contributions.title": "Beitragsaktivität",
    "activity.contributions.description":
      "Tägliche Beitragsmuster im letzten Jahr zeigen Konsistenz und Hingabe zur Entwicklung.",
    "activity.monthly.title": "Monatliche Aktivität",
    "activity.monthly.description": "Commits, Pull Requests und Issues im letzten Jahr",
    "activity.languages.title": "Sprachverteilung",
    "activity.languages.description": "In Commits verwendete Programmiersprachen in diesem Jahr",
    "activity.repos.title": "Beliebte Repositories",
    "activity.repos.description": "Am meisten bewertete und aktiv gepflegte Open-Source-Projekte",

    // Hacks
    "hacks.hero.title": "HACKATHON-",
    "hacks.hero.accent": "PROJEKTE",
    "hacks.hero.description":
      "Schnelle Prototypenerstellung und innovative Lösungen unter Druck. Eine Präsentation von Kreativität, technischen Fähigkeiten und kollaborativer Problemlösung in zeitlich begrenzten Umgebungen.",
    "hacks.stats.participated": "Teilgenommene Hackathons",
    "hacks.stats.awards": "Gewonnene Auszeichnungen",
    "hacks.stats.prize": "Gesamtes Preisgeld",
    "hacks.stats.team": "Teamprojekte",
    "hacks.cta.title": "Lust Zusammen zu Hacken?",
    "hacks.cta.description":
      "Suchen Sie einen Hackathon-Teamkollegen oder organisieren ein Event? Lassen Sie uns in Rekordzeit etwas Großartiges schaffen.",
    "hacks.cta.button": "Zusammenarbeiten",

    // Common
    "common.loading": "Laden...",
    "common.error": "Ein Fehler ist aufgetreten",
    "common.retry": "Wiederholen",
    "common.close": "Schließen",
    "common.open": "Öffnen",
    "common.save": "Speichern",
    "common.cancel": "Abbrechen",
    "common.confirm": "Bestätigen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.view": "Ansehen",
    "common.download": "Herunterladen",
    "common.share": "Teilen",
    "common.copy": "Kopieren",
    "common.search": "Suchen",
    "common.filter": "Filtern",
    "common.sort": "Sortieren",
    "common.more": "Mehr",
    "common.less": "Weniger",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.projects": "项目",
    "nav.research": "研究",
    "nav.hacks": "黑客马拉松",
    "nav.experience": "经验",
    "nav.certifications": "认证",
    "nav.activity": "活动",
    "nav.about": "关于",
    "nav.portfolio": "作品集",

    // Homepage
    "home.hero.title": "构建",
    "home.hero.accent": "技术",
    "home.hero.subtitle": "的未来",
    "home.hero.description": "通过前沿研究、全栈开发和战略技术实施，打造创新解决方案，在各行各业产生有意义的影响。",
    "home.hero.cta.projects": "查看项目",
    "home.hero.cta.resume": "下载简历",
    "home.impact.title": "准备好",
    "home.impact.accent": "开始了吗？",
    "home.impact.description": "用前沿技术解决方案将您的想法变为现实。从概念到部署，我提供卓越的结果。",
    "home.impact.cta": "开始项目",
    "home.capabilities.title": "核心能力",
    "home.capabilities.subtitle": "在技术和创新的多个领域拥有专业知识",
    "home.stats.projects": "完成的项目",
    "home.stats.papers": "研究论文",
    "home.stats.experience": "年经验",
    "home.stats.certifications": "认证",
    "home.cta.title": "让我们一起构建令人惊叹的东西",
    "home.cta.description": "准备将您的愿景变为现实？联系我，让我们讨论您的下一个项目。",
    "home.cta.button": "联系我",

    // Projects
    "projects.hero.title": "精选",
    "projects.hero.accent": "项目",
    "projects.hero.description": "涵盖人工智能、区块链、数据可视化和前沿技术的创新解决方案精选集合，产生有意义的影响。",
    "projects.filter.all": "全部",
    "projects.cta.title": "有项目想法吗？",
    "projects.cta.description": "让我们合作，用前沿技术将您的创新想法变为现实。",
    "projects.cta.button": "开始对话",

    // Research
    "research.hero.title": "研究与",
    "research.hero.accent": "出版物",
    "research.hero.description": "通过严格的研究、同行评议的出版物和协作的学术努力推进技术前沿，塑造计算的未来。",
    "research.stats.publications": "出版物",
    "research.stats.citations": "引用",
    "research.stats.collaborators": "合作者",
    "research.stats.impact": "平均影响因子",
    "research.cta.title": "有兴趣合作吗？",
    "research.cta.description": "让我们探索联合研究、学术合作伙伴关系和创新项目的机会。",
    "research.cta.button": "讨论研究机会",

    // Experience
    "experience.hero.title": "专业",
    "experience.hero.accent": "经验",
    "experience.hero.description": "通过创新公司和研究机构的旅程，构建前沿技术解决方案并推进计算机科学的最新技术。",
    "experience.skills.title": "技术专长",
    "experience.skills.subtitle": "涵盖技术和创新多个领域的综合技能集",

    // Activity
    "activity.hero.title": "开发",
    "activity.hero.accent": "活动",
    "activity.hero.description": "实时洞察我的开发历程、贡献模式以及跨多个平台和存储库的开源参与。",
    "activity.contributions.title": "贡献活动",
    "activity.contributions.description": "过去一年的日常贡献模式显示了对开发的一致性和奉献精神。",
    "activity.monthly.title": "月度活动",
    "activity.monthly.description": "过去一年的提交、拉取请求和问题",
    "activity.languages.title": "语言分布",
    "activity.languages.description": "今年提交中使用的编程语言",
    "activity.repos.title": "热门存储库",
    "activity.repos.description": "最受欢迎和积极维护的开源项目",

    // Hacks
    "hacks.hero.title": "黑客马拉松",
    "hacks.hero.accent": "项目",
    "hacks.hero.description":
      "在压力下构建的快速原型和创新解决方案。展示在时间受限环境中的创造力、技术技能和协作问题解决能力。",
    "hacks.stats.participated": "参与的黑客马拉松",
    "hacks.stats.awards": "获得的奖项",
    "hacks.stats.prize": "总奖金",
    "hacks.stats.team": "团队项目",
    "hacks.cta.title": "想一起黑客吗？",
    "hacks.cta.description": "寻找黑客马拉松队友或组织活动？让我们在创纪录的时间内构建令人惊叹的东西。",
    "hacks.cta.button": "让我们合作",

    // Common
    "common.loading": "加载中...",
    "common.error": "发生错误",
    "common.retry": "重试",
    "common.close": "关闭",
    "common.open": "打开",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.confirm": "确认",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.view": "查看",
    "common.download": "下载",
    "common.share": "分享",
    "common.copy": "复制",
    "common.search": "搜索",
    "common.filter": "筛选",
    "common.sort": "排序",
    "common.more": "更多",
    "common.less": "更少",
  },
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.projects": "プロジェクト",
    "nav.research": "研究",
    "nav.hacks": "ハッカソン",
    "nav.experience": "経験",
    "nav.certifications": "認定",
    "nav.activity": "アクティビティ",
    "nav.about": "について",
    "nav.portfolio": "ポートフォリオ",

    // Homepage
    "home.hero.title": "テクノロジーの",
    "home.hero.accent": "未来を",
    "home.hero.subtitle": "構築する",
    "home.hero.description":
      "最先端の研究、フルスタック開発、戦略的技術実装を通じて革新的なソリューションを作り、あらゆる業界で意味のある影響を与えます。",
    "home.hero.cta.projects": "プロジェクトを見る",
    "home.hero.cta.resume": "履歴書をダウンロード",
    "home.impact.title": "始める",
    "home.impact.accent": "準備はできましたか？",
    "home.impact.description":
      "最先端の技術ソリューションでアイデアを現実に変えましょう。コンセプトから展開まで、優れた結果をお届けします。",
    "home.impact.cta": "プロジェクトを開始",
    "home.capabilities.title": "コア機能",
    "home.capabilities.subtitle": "テクノロジーとイノベーションの複数の領域にわたる専門知識",
    "home.stats.projects": "完了したプロジェクト",
    "home.stats.papers": "研究論文",
    "home.stats.experience": "年の経験",
    "home.stats.certifications": "認定",
    "home.cta.title": "一緒に素晴らしいものを作りましょう",
    "home.cta.description":
      "ビジョンを現実に変える準備はできていますか？お気軽にお問い合わせください。次のプロジェクトについて話し合いましょう。",
    "home.cta.button": "お問い合わせ",

    // Projects
    "projects.hero.title": "注目の",
    "projects.hero.accent": "プロジェクト",
    "projects.hero.description":
      "AI、ブロックチェーン、データ可視化、最先端技術にわたる革新的なソリューションの厳選されたコレクションで、意味のある影響を与えます。",
    "projects.filter.all": "すべて",
    "projects.cta.title": "プロジェクトのアイデアはありますか？",
    "projects.cta.description": "協力して、最先端の技術で革新的なアイデアを実現しましょう。",
    "projects.cta.button": "会話を始める",

    // Research
    "research.hero.title": "研究と",
    "research.hero.accent": "出版物",
    "research.hero.description":
      "厳密な研究、査読付き出版物、コンピューティングの未来を形作る協力的な学術的取り組みを通じて、技術の最前線を推進します。",
    "research.stats.publications": "出版物",
    "research.stats.citations": "引用",
    "research.stats.collaborators": "協力者",
    "research.stats.impact": "平均インパクトファクター",
    "research.cta.title": "コラボレーションに興味がありますか？",
    "research.cta.description": "共同研究、学術パートナーシップ、革新的なプロジェクトの機会を探りましょう。",
    "research.cta.button": "研究機会について話し合う",

    // Experience
    "experience.hero.title": "プロフェッショナル",
    "experience.hero.accent": "経験",
    "experience.hero.description":
      "革新的な企業と研究機関を通じた旅で、最先端の技術ソリューションを構築し、コンピュータサイエンスの最新技術を推進します。",
    "experience.skills.title": "技術的専門知識",
    "experience.skills.subtitle": "テクノロジーとイノベーションの複数の領域をカバーする包括的なスキルセット",

    // Activity
    "activity.hero.title": "開発",
    "activity.hero.accent": "アクティビティ",
    "activity.hero.description":
      "私の開発の旅、貢献パターン、複数のプラットフォームとリポジトリにわたるオープンソースへの関与に関するリアルタイムの洞察。",
    "activity.contributions.title": "貢献アクティビティ",
    "activity.contributions.description": "過去1年間の日々の貢献パターンは、開発への一貫性と献身を示しています。",
    "activity.monthly.title": "月次アクティビティ",
    "activity.monthly.description": "過去1年間のコミット、プルリクエスト、イシュー",
    "activity.languages.title": "言語分布",
    "activity.languages.description": "今年のコミットで使用されたプログラミング言語",
    "activity.repos.title": "人気のリポジトリ",
    "activity.repos.description": "最もスターが付けられ、積極的に維持されているオープンソースプロジェクト",

    // Hacks
    "hacks.hero.title": "ハッカソン",
    "hacks.hero.accent": "プロジェクト",
    "hacks.hero.description":
      "プレッシャーの下で構築された迅速なプロトタイピングと革新的なソリューション。時間制約のある環境での創造性、技術スキル、協力的な問題解決のショーケース。",
    "hacks.stats.participated": "参加したハッカソン",
    "hacks.stats.awards": "獲得した賞",
    "hacks.stats.prize": "総賞金",
    "hacks.stats.team": "チームプロジェクト",
    "hacks.cta.title": "一緒にハックしませんか？",
    "hacks.cta.description":
      "ハッカソンのチームメイトを探していますか、それともイベントを開催していますか？記録的な時間で素晴らしいものを作りましょう。",
    "hacks.cta.button": "コラボレーションしましょう",

    // Common
    "common.loading": "読み込み中...",
    "common.error": "エラーが発生しました",
    "common.retry": "再試行",
    "common.close": "閉じる",
    "common.open": "開く",
    "common.save": "保存",
    "common.cancel": "キャンセル",
    "common.confirm": "確認",
    "common.delete": "削除",
    "common.edit": "編集",
    "common.view": "表示",
    "common.download": "ダウンロード",
    "common.share": "共有",
    "common.copy": "コピー",
    "common.search": "検索",
    "common.filter": "フィルター",
    "common.sort": "ソート",
    "common.more": "もっと",
    "common.less": "少なく",
  },
}
