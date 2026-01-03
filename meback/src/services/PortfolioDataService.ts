import {
  ExperienceModel,
  SkillModel,
  ProjectModel,
  HackathonProjectModel,
  ResearchPaperModel,
  CertificationModel,
  BlogPostModel,
  ContactInfoModel,
  AboutInfoModel,
  ActivityStatsModel
} from '../models/Portfolio';

export class PortfolioDataService {

  async seedInitialData(): Promise<void> {
    console.log('🌱 Seeding initial portfolio data...');

    try {
      await Promise.all([
        this.seedAboutInfo(),
        this.seedContactInfo(),
        this.seedExperiences(),
        this.seedSkills(),
        this.seedProjects(),
        this.seedHackathonProjects(),
        this.seedResearchPapers(),
        this.seedCertifications(),
        this.seedBlogPosts()
      ]);

      await this.calculateActivityStats();

      console.log('✅ Portfolio data seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding portfolio data:', error);
      throw error;
    }
  }

  private async seedAboutInfo(): Promise<void> {
    const existingAbout = await AboutInfoModel.findOne();
    if (existingAbout) return;

    await AboutInfoModel.create({
      name: "Khabib Thekillys",
      title: "Full-Stack Developer & Backend Engineer",
      bio: "Passionate software engineer with expertise in building scalable backend systems, fintech applications, and blockchain solutions. I love solving complex problems and creating innovative technology solutions that make a real impact.",
      location: "Lagos, Nigeria",
      avatar: "/avatar.jpg",
      resume_url: "/resume.pdf",
      interests: ["Backend Development", "Blockchain", "Fintech", "Open Source", "Rust Programming"],
      languages: ["English", "Hausa", "Yoruba"],
      fun_facts: [
        "Built backend systems handling ₦50M+ in transactions",
        "Contributed to multiple open source projects",
        "Won hackathons and reached finals in multiple competitions",
        "Specialized in Rust and TypeScript backend development"
      ],
      current_focus: [
        "Rust Backend Development",
        "Blockchain Integration",
        "Fintech Solutions",
        "Scalable Microservices"
      ]
    });
  }

  private async seedContactInfo(): Promise<void> {
    const existingContact = await ContactInfoModel.findOne();
    if (existingContact) return;

    await ContactInfoModel.create({
      email: "khabibthekillys@gmail.com",
      phone: "+234 (0) 123-4567",
      location: "Lagos, Nigeria",
      social_links: {
        github: "https://github.com/dotandev",
        linkedin: "https://linkedin.com/in/khabibthekillys",
        twitter: "https://twitter.com/khabibthekillys",
        website: "https://khabibthekillys.dev"
      },
      availability: {
        status: "available",
        message: "Open to new opportunities and collaborations in backend development and fintech"
      }
    });
  }

  private async seedExperiences(): Promise<void> {
    const existingExperiences = await ExperienceModel.find();
    if (existingExperiences.length > 0) return;

    const experiences = [
      {
        experience_id: "biyard-inc",
        type: "company",
        company: "Biyard Inc",
        location: "Remote, Korea",
        roles: [
          {
            title: "QA Engineer",
            duration: "Aug 2025 – Present",
            type: "Full-time",
            description: "Engineered backend architectures for **4 production-grade projects** — Ratela, Dagit, Incheon Heroes, and Voice Korea — using **Axum (Rust)** with clean REST and WebSocket interfaces integrated into Dioxus frontends.",
            achievements: [
              "Implemented complex relational data models with **PostgreSQL libraries** to handle **multi-tenant workflows** and **property hierarchies**.",
              "Integrated **AWS (S3, RDS, Lambda, CloudFront)** ensuring **scalable deployments with minimal latency**.",
              "Integrated **Kaia Wallet** into Incheon Heroes for **secure blockchain identity verification**.",
              "Designed **graph-based backend algorithms** for dynamic content models in Ratela's pipelines.",
              "Developed modular **APIs in Axum**, maintaining data integrity and reusable business logic.",
              "Built **backend test suites** (Playwright + custom benchmarking) ensuring responsiveness under high concurrency.",
              "Orchestrated **CI/CD pipelines (GitHub Actions)** with **85%+ success rate** across environments."
            ],
            technologies: ["Rust", "Axum", "PostgreSQL", "AWS", "Kaia Wallet", "CI/CD"]
          },
          {
            title: "Software Engineer",
            duration: "Apr 2025 – Jul 2025",
            type: "Full-time",
            description: "Engineered backend architectures for **4 production-grade projects** — Ratela, Dagit, Incheon Heroes, and Voice Korea — using **Axum (Rust)** with clean REST and WebSocket interfaces integrated into Dioxus frontends.",
            achievements: [
              "Implemented complex relational data models with **PostgreSQL libraries** to handle **multi-tenant workflows** and **property hierarchies**.",
              "Integrated **AWS (S3, RDS, Lambda, CloudFront)** ensuring **scalable deployments with minimal latency**.",
              "Integrated **Kaia Wallet** into Incheon Heroes for **secure blockchain identity verification**.",
              "Designed **graph-based backend algorithms** for dynamic content models in Ratela's pipelines.",
              "Developed modular **APIs in Axum**, maintaining data integrity and reusable business logic.",
              "Built **backend test suites** (Playwright + custom benchmarking) ensuring responsiveness under high concurrency.",
              "Orchestrated **CI/CD pipelines (GitHub Actions)** with **85%+ success rate** across environments."
            ],
            technologies: ["Rust", "Axum", "PostgreSQL", "AWS", "Kaia Wallet", "CI/CD"]
          },
          {
            title: "Software Engineer - Contract",
            duration: "Feb 2025 – Apr 2025",
            type: "Contract",
            description: "Engineered backend architectures for **4 production-grade projects** — Ratela, Dagit, Incheon Heroes, and Voice Korea — using **Axum (Rust)** with clean REST and WebSocket interfaces integrated into Dioxus frontends.",
            achievements: [
              "Implemented complex relational data models with **PostgreSQL libraries** to handle **multi-tenant workflows** and **property hierarchies**.",
              "Integrated **AWS (S3, RDS, Lambda, CloudFront)** ensuring **scalable deployments with minimal latency**.",
              "Integrated **Kaia Wallet** into Incheon Heroes for **secure blockchain identity verification**.",
              "Designed **graph-based backend algorithms** for dynamic content models in Ratela's pipelines.",
              "Developed modular **APIs in Axum**, maintaining data integrity and reusable business logic.",
              "Built **backend test suites** (Playwright + custom benchmarking) ensuring responsiveness under high concurrency.",
              "Orchestrated **CI/CD pipelines (GitHub Actions)** with **85%+ success rate** across environments."
            ],
            technologies: ["Rust", "Axum", "PostgreSQL", "AWS", "Kaia Wallet", "CI/CD"]
          }
        ]
      },
      {
        experience_id: "career-break-2024",
        type: "break",
        duration: "Jul 2024 – Feb 2025",
        description: "Took a career break to travel, rest, and focus on professional development."
      },
      {
        experience_id: "blockks",
        type: "company",
        company: "Blockks",
        location: "Lagos, Nigeria",
        roles: [
          {
            title: "Software Engineer - Contract",
            duration: "April 2024 – Jul 2024",
            type: "Contract",
            description: "Led backend architecture for **wallet and payment services**, handling over **₦50M+ in transactions** and serving **1,000+ beta users**.",
            achievements: [
              "Integrated **MAPLERAD** and **Risevest APIs** reducing onboarding from **48h → 10min**.",
              "Deployed **Redis-backed microservices**, improving throughput by **60%** and reducing race-condition downtime by **~80%**.",
              "Designed REST APIs in **Express + TypeScript**, enabling **real-time analytics** (+25% transaction frequency).",
              "Modeled **hybrid schemas (MongoDB + PostgreSQL)** processing **30K+ events/day** with sub-100ms responses.",
              "Adopted **TDD** and CI pipelines, cutting post-deployment bugs by **70%**."
            ],
            technologies: ["Express", "TypeScript", "Redis", "MongoDB", "PostgreSQL", "CI/CD"]
          }
        ]
      },
      {
        experience_id: "feedxpay",
        type: "company",
        company: "FeedXPay",
        location: "Lagos, Nigeria",
        roles: [
          {
            title: "Software Engineer - Fintech Startup",
            duration: "Aug 2023 – Jan 2024",
            type: "Full-time",
            description: "Led backend architecture for **wallet and payment services**, handling over **₦50M+ in transactions** and serving **1,000+ beta users**.",
            achievements: [
              "Integrated **MAPLERAD** and **Risevest APIs** reducing onboarding from **48h → 10min**.",
              "Deployed **Redis-backed microservices**, improving throughput by **60%** and reducing race-condition downtime by **~80%**.",
              "Designed REST APIs in **Express + TypeScript**, enabling **real-time analytics** (+25% transaction frequency).",
              "Modeled **hybrid schemas (MongoDB + PostgreSQL)** processing **30K+ events/day** with sub-100ms responses.",
              "Adopted **TDD** and CI pipelines, cutting post-deployment bugs by **70%**."
            ],
            technologies: ["Express", "TypeScript", "Redis", "MongoDB", "PostgreSQL", "CI/CD"]
          }
        ]
      },
      {
        experience_id: "tribal-prints",
        type: "company",
        company: "Tribal Prints",
        location: "Lagos, Nigeria",
        roles: [
          {
            title: "Software Engineer (Internship)",
            duration: "Oct 2023 – Dec 2023",
            type: "Internship",
            description: "Delivered backend infrastructure with **NestJS + TypeScript**, automating **300+ print order processes**.",
            achievements: [
              "Cut invoice errors by **90%** via automation.",
              "Boosted checkout success by **35%** with secure cart/order APIs.",
              "Integrated financial APIs reducing reconciliation time from **2h → <10min/day**.",
              "Achieved **95% sprint goal completion** in agile team of 4.",
              "Reduced failed deployments by **~50%** with CI pipelines + pre-merge testing."
            ],
            technologies: ["NestJS", "TypeScript", "Sequelize", "PostgreSQL", "CI/CD"]
          }
        ]
      },
      {
        experience_id: "peerhub",
        type: "company",
        company: "PeerHub",
        location: "Lagos, Nigeria",
        roles: [
          {
            title: "Software Engineer - SaaS Startup",
            duration: "Aug 2023 – Oct 2023",
            type: "Full-time",
            description: "Designed and deployed scalable backends for **multi-tenant SaaS**, supporting **3+ client apps** with strong uptime.",
            achievements: [
              "Developed middleware improving request handling by **40%**.",
              "Shipped **user auth systems** reducing onboarding time by **25%**.",
              "Built APIs handling **20K+ monthly requests**, backed by MongoDB + PostgreSQL.",
              "Led unit testing (**80%+ coverage**) and CI/CD setup, cutting QA cycles by **60%**."
            ],
            technologies: ["Node.js", "PostgreSQL", "MongoDB", "CI/CD"]
          }
        ]
      }
    ];

    await ExperienceModel.insertMany(experiences);
  }

  private async seedSkills(): Promise<void> {
    const existingSkills = await SkillModel.find();
    if (existingSkills.length > 0) return;

    const skills = [
      {
        category: "Programming Languages",
        items: ["TypeScript", "Java", "Rust", "Python", "Go", "JavaScript", "C#", "Move"]
      },
      {
        category: "Cloud & DevOps",
        items: ["AWS", "GCP", "Kubernetes", "Docker"]
      },
      {
        category: "Databases",
        items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite", "Firebase", "Firestore", "DynamoDB"]
      },
      {
        category: "Web Technologies",
        items: ["React", "Next.js", "Node.js", "GraphQL", "REST APIs", "WebSocket"]
      },
      {
        category: "Blockchain",
        items: ["SUI", "Solana", "Ethereum", "Web3.js", "IPFS", "Smart Contracts"]
      }
    ];

    await SkillModel.insertMany(skills);
  }

  private async seedProjects(): Promise<void> {
    // Removed early return to allow upserting new data
    // const existingProjects = await ProjectModel.find();
    // if (existingProjects.length > 0) return;

    // Use the actual projects from the JSON file
    const projects = [
      {
        project_id: "1",
        searchName: "progrex",
        category: "Library",
        name: "Progrex",
        description: "A Rust library for progressive tasks and scheduling.",
        image: "https://via.placeholder.com/150",
        languages: ["Rust"],
        tags: ["Library", "Rust", "Progressive"],
        date: "2024-08-01",
        framework: "Rust",
        industry: "Software Development",
        tasks: [
          "Build task scheduling mechanisms",
          "Ensure high performance and low latency",
          "Support concurrent task processing"
        ],
        requirements: [
          "Support for background task execution",
          "Integration with other Rust libraries"
        ],
        details: "Progrex is a high-performance library for task scheduling in Rust, designed to manage and execute tasks with minimum latency. It leverages Rust's ownership model to ensure memory safety while providing a flexible API for defining complex task dependencies.",
        long_description: `Building a task scheduler in Rust presented a unique set of challenges, primarily revolving around the need for zero-cost abstractions and thread safety without compromising on developer experience.
        
        The core architecture of Progrex is built on top of the Tokio runtime, allowing for efficient asynchronous execution. We implemented a custom directed acyclic graph (DAG) engine to resolve task dependencies in real-time. This ensures that no task is executed before its prerequisites are met, effectively eliminating race conditions at the logical level.
        
        One of the key innovations in Progrex is its 'borrow-checker-friendly' API design. Traditional schedulers often require complex lifetime annotations or \`Arc<Mutex< T >>\` wrapping. Progrex simplifies this by using a handle-based system where tasks are owned by the scheduler and accessed via safe, typed identifiers.
        
        Performance benchmarks showed that Progrex outperforms similar libraries in high-concurrency scenarios, handling over 100,000 tasks per second with negligible overhead. Future updates will focus on distributed scheduling capabilities, allowing Progrex to coordinate tasks across a cluster of machines.`,
        github: "https://crates.io/crates/progrex",
        demo: "https://crates.io/crates/progrex"
      },
      {
        project_id: "2",
        searchName: "limiter",
        category: "Library",
        name: "LIMITER",
        description: "A rate limiting library for Node.js.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js"],
        tags: ["Library", "Rate Limiting", "Node.js"],
        date: "2024-08-02",
        framework: "Node.js",
        industry: "Software Development",
        tasks: [
          "Implement rate limiting algorithms",
          "Support multiple strategies (e.g., fixed window, sliding window)",
          "Ensure scalability and performance"
        ],
        requirements: [
          "Handle large-scale rate limiting for APIs",
          "Ensure compliance with rate limits in high-traffic environments"
        ],
        details: "LIMITER is a robust Node.js middleware library designed to provide rate limiting capabilities for APIs. It protects servers from brute-force attacks and DDOS attempts by efficiently tracking and throttling request rates.",
        long_description: `In the world of public-facing APIs, ensuring service availability under load is paramount. LIMITER was conceived to address the gap for a lightweight yet highly configurable rate limiting solution for Node.js / Express ecosystems that could scale horizontally.
        
        At its heart, LIMITER utilizes a Lua-scripted Redis backend to perform atomic counter increments and expiry checks. This 'Sliding Window' implementation ensures mathematical accuracy in rate limiting, avoiding the 'burst' issues common with fixed-window algorithms.
        
        We focused heavily on developer ergonomics. The middleware is plug-and-play compatible with Express, Fastify, and Koa. It supports dynamic key generation (e.g., limiting by IP, API key, or user role) and provides custom callback hooks for when limits are exceeded, allowing developers to implement sophisticated fallback strategies or alert systems.
        
        During stress testing, LIMITER demonstrated the ability to process 50k requests per second with less than 2ms of added latency, proving its viability for high-traffic production environments.`,
        github: "https://github.com/dotandev/Limiter",
        demo: "https://github.com/dotandev/Limiter"
      },
      {
        project_id: "3",
        searchName: "shortie",
        category: "Backend",
        name: "SHORTIE",
        description: "A URL shortening service built using Rust.",
        image: "https://via.placeholder.com/150",
        languages: ["Rust"],
        tags: ["URL Shortening", "Rust"],
        date: "2024-08-03",
        framework: "Rust",
        industry: "Web Services",
        tasks: [
          "Implement URL shortening mechanisms",
          "Build a high-performance backend service",
          "Ensure scalability and reliability"
        ],
        requirements: [
          "Support for large number of URLs",
          "High availability for shortened URLs"
        ],
        details: "SHORTIE is a Rust-based URL shortening service designed for high scalability and performance. It uses advanced hashing algorithms to generate compact, collision-resistant unique identifiers.",
        long_description: `URL shortening is a classic system design problem that touches on database sharding, caching strategies, and unique ID generation. SHORTIE solves this using a distributed ID generation service (inspired by Twitter's Snowflake) ensuring that ID generation is coordination-free and highly scalable.
        
        The persistence layer is built on ScyllaDB (a high-performance rewrite of Cassandra), chosen for its ability to handle massive write throughput and low-latency reads. For the hot path, a multi-layered caching strategy using local in-memory LRU caches and a Redis cluster ensures that 99% of redirect requests are served in sub-millisecond time.
        
        Security was also a major focus. SHORTIE includes proactive malware scanning for target URLs and implements a reputation system to prevent abuse by bad actors.
        
        The service is containerized using Docker and orchestrated via Kubernetes, with built-in auto-scaling metrics based on request load.`,
        github: "https://github.com/dotandev/Shortie"
      },
      {
        project_id: "4",
        searchName: "anonymemo",
        category: "Backend",
        name: "Anony-Memo",
        description: "An anonymous messaging service built using Node.js and Express.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js", "Express"],
        tags: ["Messaging", "Node.js", "Express"],
        date: "2024-08-04",
        framework: "Node.js, Express",
        industry: "Web Services",
        tasks: [
          "Implement anonymous message sending and receiving",
          "Ensure security and anonymity of users",
          "Integrate with third-party services for authentication"
        ],
        requirements: [
          "Support for real-time messaging",
          "Ensure data privacy and security"
        ],
        details: "Anony-Memo is an anonymous messaging service that allows users to send and receive messages without revealing their identities.",
        github: "https://github.com/dotandev/Anony-Memo"
      },
      {
        project_id: "5",
        searchName: "skypulse",
        category: "Backend",
        name: "SKY-PULSE",
        description: "A space station simulation built with Rust.",
        image: "https://via.placeholder.com/150",
        languages: ["Rust"],
        tags: ["Simulation", "Rust", "Space"],
        date: "2024-08-05",
        framework: "Rust",
        industry: "Gaming, Simulation",
        tasks: [
          "Create a simulation environment for a space station",
          "Implement real-time data processing and control systems",
          "Ensure scalability for multiple users"
        ],
        requirements: [
          "Support real-time simulation of space station systems",
          "Integrate multiplayer functionality for user interactions"
        ],
        details: "SKY-PULSE is a space station simulation game built using Rust, focusing on real-time processing and multiplayer interactions.",
        github: "https://github.com/dotandev/SkyPulse"
      },
      {
        project_id: "6",
        searchName: "finans",
        category: "Backend",
        name: "FINANS",
        description: "A finance management service built with Node.js.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js"],
        tags: ["Finance", "Node.js"],
        date: "2024-08-06",
        framework: "Node.js",
        industry: "Finance, Web Services",
        tasks: [
          "Develop a finance tracking system",
          "Implement secure authentication and authorization",
          "Integrate with third-party APIs for financial data"
        ],
        requirements: [
          "Support for real-time financial tracking",
          "Secure storage of financial data"
        ],
        details: "FINANS is a finance management service that helps users track their spending and manage their budget with real-time data.",
        github: "https://github.com/dotandev/Finans"
      },
      {
        project_id: "7",
        searchName: "filer",
        category: "Backend",
        name: "FILER",
        description: "A file management service built with Go.",
        image: "https://via.placeholder.com/150",
        languages: ["Go"],
        tags: ["File Management", "Go"],
        date: "2024-08-07",
        framework: "Go",
        industry: "Software Development",
        tasks: [
          "Develop a file management system with robust APIs",
          "Ensure secure file access and sharing",
          "Support for large file uploads and versioning"
        ],
        requirements: [
          "High availability for file storage",
          "Integration with external storage services"
        ],
        details: "FILER is a Go-based file management service that offers secure file sharing, storage, and versioning.",
        github: "https://github.com/dotandev/Filer"
      },
      {
        project_id: "8",
        searchName: "healthish",
        category: "Backend",
        name: "Heath-ISH",
        description: "A health service API built using Node.js.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js"],
        tags: ["Health", "Node.js"],
        date: "2024-08-08",
        framework: "Node.js",
        industry: "HealthTech",
        tasks: [
          "Build an API for health data tracking",
          "Ensure HIPAA compliance for medical data",
          "Integrate with health data sources"
        ],
        requirements: [
          "Real-time data tracking and reporting",
          "Secure storage and transmission of health data"
        ],
        details: "Health-ISH is a health service API designed to track and manage health-related data with compliance to healthcare standards.",
        github: "https://github.com/dotandev/HealthISH-API"
      },
      {
        project_id: "9",
        searchName: "formera",
        category: "Backend",
        name: "FORMERA",
        description: "A form builder API built with Node.js.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js"],
        tags: ["Form Builder", "Node.js"],
        date: "2024-08-09",
        framework: "Node.js",
        industry: "Web Services",
        tasks: [
          "Develop a dynamic form builder API",
          "Support form validation and user input handling",
          "Ensure scalability for large form collections"
        ],
        requirements: [
          "Support complex form structures",
          "Ensure performance under high load"
        ],
        details: "FORMERA is a form builder API that allows users to create and manage dynamic forms with custom validation rules.",
        github: "https://github.com/dotandev/Formera"
      },
      {
        project_id: "10",
        searchName: "delivapro",
        category: "Backend",
        name: "DELIVA-PRO",
        description: "A full-stack logistics web service.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js", "Express"],
        tags: ["Logistics", "Node.js", "Full-Stack"],
        date: "2024-08-10",
        framework: "Node.js, Express",
        industry: "Logistics",
        tasks: [
          "Build and manage logistics workflows",
          "Integrate shipment tracking and management",
          "Develop user interfaces and backend services"
        ],
        requirements: [
          "Support for real-time tracking",
          "Ensure system scalability"
        ],
        details: "DELIVA-PRO is a logistics web service designed for managing shipment and delivery tracking for businesses.",
        github: "https://github.com/dotandev/Deliva-Backend"
      },
      {
        project_id: "11",
        searchName: "cohi",
        category: "Website",
        name: "COHI",
        description: "The official website of the Council of Higher Institutions.",
        image: "https://via.placeholder.com/150",
        languages: ["HTML", "CSS", "JavaScript"],
        tags: ["Website", "HTML", "CSS", "JavaScript"],
        date: "2024-08-11",
        framework: "HTML, CSS, JavaScript",
        industry: "Education",
        tasks: [
          "Design the official website for the council",
          "Develop responsive layouts and interactive features",
          "Integrate user registration and event management"
        ],
        requirements: [
          "Support for multiple users and members",
          "Easy-to-navigate UI for educational content"
        ],
        details: "COHI is the official website for the Council of Higher Institutions, providing information, events, and resources for students and institutions.",
        github: "https://github.com/dotandev/COHI"
      },
      {
        project_id: "12",
        searchName: "tws",
        category: "Website",
        name: "TWS",
        description: "The official website of the WordsMith Debate Council.",
        image: "https://via.placeholder.com/150",
        languages: ["HTML", "CSS", "JavaScript"],
        tags: ["Website", "Debate", "HTML", "CSS", "JavaScript"],
        date: "2024-08-12",
        framework: "HTML, CSS, JavaScript",
        industry: "Education",
        tasks: [
          "Build a website for a debate council",
          "Design event schedules, team member pages, and registration features",
          "Implement discussion forums and member login"
        ],
        requirements: [
          "Support for event management and registration",
          "Ensure smooth user experience for debate participants"
        ],
        details: "TWS is the official website of the WordsMith Debate Council, providing updates on events, discussions, and team details.",
        github: "https://github.com/dotandev/twsu"
      },
      {
        project_id: "13",
        searchName: "nabos",
        category: "Website",
        name: "NABOS",
        description: "The official website of the National Association of Botany Students, UNILAG.",
        image: "https://via.placeholder.com/150",
        languages: ["HTML", "CSS", "JavaScript"],
        tags: ["Website", "Botany", "HTML", "CSS", "JavaScript"],
        date: "2024-08-13",
        framework: "HTML, CSS, JavaScript",
        industry: "Education, Botany",
        tasks: [
          "Design the official website for botany students association",
          "Develop member and event management systems",
          "Implement resources and articles for botany students"
        ],
        requirements: [
          "Ensure smooth user interaction",
          "Enable easy access to academic and event information"
        ],
        details: "NABOS is the official website of the National Association of Botany Students at UNILAG, providing resources and event information for members.",
        github: "https://github.com/dotandev/Botany"
      },
      {
        project_id: "14",
        searchName: "quizapi",
        category: "Backend",
        name: "Quiz-API",
        description: "A backend API for a quiz application.",
        image: "https://via.placeholder.com/150",
        languages: ["Node.js", "Express"],
        tags: ["API", "Quiz", "Node.js", "Express"],
        date: "2024-08-14",
        framework: "Node.js, Express",
        industry: "Education",
        tasks: [
          "Develop an API for quiz management",
          "Support real-time quizzes and results tracking",
          "Integrate user authentication for quiz participation"
        ],
        requirements: [
          "Ensure scalability for large quiz databases",
          "Secure user data and quiz results"
        ],
        details: "Quiz-API is a backend API that supports quiz management, real-time results tracking, and user participation.",
        github: "https://github.com/dotandev/Quiz-API"
      }
    ];

    for (const project of projects) {
      await ProjectModel.findOneAndUpdate(
        { project_id: project.project_id },
        { $set: project },
        { upsert: true, new: true }
      );
    }
  }

  private async seedHackathonProjects(): Promise<void> {
    const existingHackathons = await HackathonProjectModel.find();
    if (existingHackathons.length > 0) return;

    const hackathonProjects = [
      {
        hackathon_id: "switchcon-2024",
        title: "SwitchCon - 2024",
        hackathon: "The Ignition 2023",
        duration: "48 hours",
        team: "4 members",
        placement: "Final 10",
        prize: "$0",
        description: "Innovative use of emerging technologies in solving Nigerian problems. Built a solution that reached the final 10 participants.",
        technologies: ["React", "Node.js", "MongoDB"],
        image: "/placeholder.svg?height=300&width=500",
        links: {
          github: "#",
          demo: "Link Is Broken."
        },
        date: "2023-10-14"
      },
      {
        hackathon_id: "cavista-ml-hackathon",
        title: "Cavista ML Hackathon",
        hackathon: "Health Tech with AI",
        duration: "24 hours",
        team: "4 members",
        placement: "Participated",
        prize: "$0",
        description: "Health Tech with AI hackathon focused on solving healthcare problems using machine learning and AI technologies.",
        technologies: ["TypeScript", "Express", "Flutter"],
        image: "/placeholder.svg?height=300&width=500",
        links: {
          github: "https://github.com/Cavista-Hackathon-2024/The-Nodes/tree/main/Node-Engine"
        },
        date: "2024-04-26"
      },
      {
        hackathon_id: "hackops-pipeops",
        title: "Hackops By Pipeops",
        hackathon: "Building for productivity",
        duration: "48 hours",
        team: "2 members",
        placement: "Finalist",
        prize: "$1,000",
        description: "Building for productivity hackathon where we developed a solution that reached the finalist stage.",
        technologies: ["TypeScript", "Express", "TensorFlow"],
        image: "/placeholder.svg?height=300&width=500",
        links: {
          github: "https://github.com/Tryouts-HK/Pipe_Hack"
        },
        date: "2024-07-06"
      }
    ];

    await HackathonProjectModel.insertMany(hackathonProjects);
  }

  private async seedResearchPapers(): Promise<void> {
    const existingPapers = await ResearchPaperModel.find();
    if (existingPapers.length > 0) return;

    const researchPapers = [
      {
        paper_id: "quantum-ml-crypto",
        title: "Quantum-Enhanced Machine Learning for Cryptographic Protocol Analysis",
        authors: ["John Doe", "Jane Smith", "Dr. Alice Johnson"],
        journal: "Nature Quantum Information",
        year: "2024",
        status: "Published",
        category: "Quantum Computing",
        abstract: "This paper presents a novel approach to analyzing cryptographic protocols using quantum-enhanced machine learning algorithms, demonstrating significant improvements in detection accuracy and computational efficiency.",
        citations: 47,
        impact_factor: 8.2,
        links: {
          pdf: "#",
          arxiv: "#",
          doi: "#"
        },
        date: "2024-01-15"
      },
      {
        paper_id: "federated-edge",
        title: "Federated Learning in Edge Computing: Privacy-Preserving Distributed AI",
        authors: ["John Doe", "Dr. Bob Wilson", "Sarah Chen"],
        journal: "IEEE Transactions on Mobile Computing",
        year: "2024",
        status: "Under Review",
        category: "Distributed Systems",
        abstract: "We propose a federated learning framework optimized for edge computing environments, addressing privacy concerns while maintaining model performance across distributed nodes.",
        citations: 23,
        impact_factor: 6.8,
        links: {
          arxiv: "#",
          preprint: "#"
        },
        date: "2024-02-10"
      },
      {
        paper_id: "blockchain-identity",
        title: "Blockchain-Based Identity Management for IoT Ecosystems",
        authors: ["John Doe", "Dr. Carol Martinez", "Mike Thompson"],
        journal: "ACM Transactions on Internet Technology",
        year: "2023",
        status: "Published",
        category: "Blockchain",
        abstract: "A comprehensive framework for managing digital identities in IoT ecosystems using blockchain technology, ensuring security, privacy, and scalability.",
        citations: 89,
        impact_factor: 4.9,
        links: {
          pdf: "#",
          doi: "#",
          code: "#"
        },
        date: "2023-06-15"
      },
      {
        paper_id: "neural-architecture-search",
        title: "Neural Architecture Search for Real-Time Computer Vision Applications",
        authors: ["John Doe", "Dr. David Lee"],
        journal: "Computer Vision and Image Understanding",
        year: "2023",
        status: "Published",
        category: "Computer Vision",
        abstract: "An automated neural architecture search methodology specifically designed for real-time computer vision applications with resource constraints.",
        citations: 156,
        impact_factor: 5.3,
        links: {
          pdf: "#",
          doi: "#",
          code: "#"
        },
        date: "2023-04-20"
      },
      {
        paper_id: "adversarial-robustness",
        title: "Adversarial Robustness in Deep Learning: A Comprehensive Survey",
        authors: ["John Doe", "Dr. Emma Rodriguez", "Alex Kim", "Dr. Frank Zhang"],
        journal: "Machine Learning Journal",
        year: "2023",
        status: "Published",
        category: "Machine Learning",
        abstract: "A comprehensive survey of adversarial robustness techniques in deep learning, analyzing current methods and proposing future research directions.",
        citations: 234,
        impact_factor: 7.1,
        links: {
          pdf: "#",
          doi: "#"
        },
        date: "2023-03-10"
      },
      {
        paper_id: "sustainable-ai",
        title: "Sustainable AI: Energy-Efficient Deep Learning Models",
        authors: ["John Doe", "Dr. Grace Liu", "Tom Anderson"],
        journal: "Nature Machine Intelligence",
        year: "2022",
        status: "Published",
        category: "Sustainable AI",
        abstract: "This work addresses the environmental impact of AI by developing energy-efficient deep learning models without compromising performance.",
        citations: 312,
        impact_factor: 9.4,
        links: {
          pdf: "#",
          doi: "#",
          code: "#"
        },
        date: "2022-11-25"
      }
    ];

    await ResearchPaperModel.insertMany(researchPapers);
  }

  private async seedCertifications(): Promise<void> {
    const existingCerts = await CertificationModel.find();
    if (existingCerts.length > 0) return;

    const certifications = [
      {
        cert_id: "ml-scientist",
        title: "Machine Learning Scientist",
        issuer: "DataCamp",
        date: "June 2024",
        link: "https://datacamp.com/certificate/ml-scientist",
        logo: "/logos/datacamp.png",
        description: "Advanced machine learning certification covering deep learning, neural networks, and AI model deployment."
      },
      {
        cert_id: "deep-learning-specialization",
        title: "Deep Learning Specialization",
        issuer: "Coursera",
        date: "April 2024",
        link: "https://coursera.org/certificate/deep-learning",
        logo: "/logos/coursera.png",
        description: "Comprehensive deep learning specialization covering neural networks, CNNs, RNNs, and advanced architectures."
      },
      {
        cert_id: "aws-solutions-architect",
        title: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        date: "Feb 2024",
        link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        logo: "/logos/aws.png",
        description: "Cloud architecture certification demonstrating expertise in designing distributed systems on AWS."
      },
      {
        cert_id: "fullstack-developer",
        title: "Full-Stack Web Developer",
        issuer: "FreeCodeCamp",
        date: "Jan 2024",
        link: "https://freecodecamp.org/certification/full-stack",
        logo: "/logos/fcc.png",
        description: "Full-stack web development certification covering frontend and backend technologies."
      }
    ];

    await CertificationModel.insertMany(certifications);
  }

  private async seedBlogPosts(): Promise<void> {
    const existingPosts = await BlogPostModel.find();
    if (existingPosts.length > 0) return;

    const blogPosts = [
      {
        blog_id: "rust-backend-development",
        title: "Building High-Performance Backend Systems with Rust",
        slug: "rust-backend-development",
        excerpt: "Exploring Rust's memory safety, performance benefits, and growing ecosystem that makes it ideal for modern backend development.",
        content: "# Building High-Performance Backend Systems with Rust\n\nRust has been gaining tremendous momentum in the backend development world, and for good reason. In this post, I'll share my experience building production systems with Rust and why it's becoming my go-to language for backend development.\n\n## Why Rust for Backend?\n\n1. **Memory Safety**: No more segfaults or memory leaks\n2. **Performance**: Zero-cost abstractions and compile-time optimizations\n3. **Concurrency**: Fearless concurrency with ownership system\n4. **Ecosystem**: Growing ecosystem with excellent crates\n\n## Real-World Experience\n\nAt Biyard Inc, I've been using Rust with Axum to build backend systems for multiple production applications. The performance and reliability have been outstanding...",
        author: "Khabib Thekillys",
        published_date: "2024-03-15",
        tags: ["Rust", "Backend Development", "Performance", "Axum"],
        category: "Technology",
        reading_time: 8,
        status: "published"
      },
      {
        blog_id: "fintech-backend-architecture",
        title: "Scaling Fintech Backend: Lessons from Processing ₦50M+ Transactions",
        slug: "fintech-backend-architecture",
        excerpt: "Key insights and architectural decisions from building fintech systems that handle millions in transactions with high reliability.",
        content: "# Scaling Fintech Backend: Lessons from Processing ₦50M+ Transactions\n\nBuilding fintech systems requires a unique combination of performance, security, and reliability. Here are the key lessons I learned while building backend systems that processed over ₦50M in transactions.\n\n## Architecture Decisions\n\n1. **Microservices with Redis**: Improved throughput by 60%\n2. **Hybrid Database Strategy**: MongoDB + PostgreSQL for different use cases\n3. **Real-time Analytics**: Event-driven architecture for instant insights\n\n## Security Considerations\n\nFintech applications require special attention to security...",
        author: "Khabib Thekillys",
        published_date: "2024-02-28",
        tags: ["Fintech", "Backend Architecture", "Scaling", "Security"],
        category: "Technology",
        reading_time: 12,
        status: "published"
      },
      {
        blog_id: "hackathon-journey",
        title: "My Hackathon Journey: From Failure to Finalist",
        slug: "hackathon-journey",
        excerpt: "Reflections on participating in multiple hackathons, the lessons learned from failures, and the path to becoming a finalist.",
        content: "# My Hackathon Journey: From Failure to Finalist\n\nHackathons have been an incredible part of my development journey. From early failures to reaching finalist positions, each event taught me valuable lessons about rapid prototyping, teamwork, and innovation.\n\n## The Early Days\n\nMy first hackathon was the Cavista ML Hackathon in 2024. We had ambitious plans but lacked proper planning and time management...\n\n## Learning from Failure\n\nThe key lessons from early failures:\n- Better planning and task division\n- Focus on MVP first\n- Team communication is crucial\n\n## Success at Hackops\n\nBy the time I participated in Hackops by Pipeops, I had learned from previous mistakes...",
        author: "Khabib Thekillys",
        published_date: "2024-08-15",
        tags: ["Hackathons", "Learning", "Career", "Innovation"],
        category: "Career",
        reading_time: 6,
        status: "published"
      }
    ];

    await BlogPostModel.insertMany(blogPosts);
  }

  private async calculateActivityStats(): Promise<void> {
    const [projects, hackathons, papers, experiences, skills] = await Promise.all([
      ProjectModel.countDocuments(),
      HackathonProjectModel.countDocuments(),
      ResearchPaperModel.countDocuments(),
      ExperienceModel.find({ type: 'company' }),
      SkillModel.find()
    ]);

    const hackathonWins = await HackathonProjectModel.countDocuments({
      $or: [
        { placement: { $regex: '1st', $options: 'i' } },
        { placement: { $regex: 'winner', $options: 'i' } }
      ]
    });

    const technologiesUsed = [...new Set(skills.flatMap(s => s.items))].length;
    const yearsExperience = experiences.length > 0 ?
      new Date().getFullYear() - 2020 : 0; // Adjust based on actual start year

    await ActivityStatsModel.findOneAndUpdate(
      {},
      {
        total_projects: projects,
        total_contributions: 0, // Will be updated by GitHub sync
        years_experience: yearsExperience,
        technologies_used: technologiesUsed,
        hackathons_won: hackathonWins,
        research_papers: papers
      },
      { upsert: true, new: true }
    );
  }

  async updateActivityStats(githubContributions: number): Promise<void> {
    await ActivityStatsModel.findOneAndUpdate(
      {},
      { total_contributions: githubContributions },
      { upsert: true }
    );
  }
}