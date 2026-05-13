const projects = [
  {
    id: 101,
    title: "AI Document Intelligence Platform",
    tagline: "RAG backend for natural-language search over 100k+ pages.",
    description:
      "A scalable RAG platform that ingests and indexes large document corpora and answers natural-language queries with sub-2s end-to-end latency.",
    role: "Backend architect — pipeline, retrieval, deployment",
    problem:
      "Search across 100k+ page document sets had to feel instant and stay accurate as the corpus grew, while ingestion needed to keep up with hundreds of uploads per hour.",
    outcome:
      "Hybrid lexical + semantic retrieval (FAISS + BM25) under 2s end-to-end. Async ingestion pool sustained 500+ document uploads/hour with dead-letter retry, CloudWatch alerting, and 90%+ TDD coverage.",
    stack: [
      "Node.js",
      "Java",
      "Spring Boot",
      "LangChain",
      "FAISS",
      "PostgreSQL",
      "Docker",
      "AWS S3",
    ],
    technologies: "Node.js, Java/Spring Boot, LangChain, FAISS, PostgreSQL, Docker, AWS S3",
    year: "2025",
    src: "/images/projectsImages/rag-platform.svg",
    code: null,
    demo: null,
    featured: true,
  },
  {
    id: 102,
    title: "Distributed Rate-Limiter Library",
    tagline: "Plug-in Spring Boot rate-limiter at 50K RPS, <1ms overhead.",
    description:
      "A Spring Boot rate-limiter library backed by Redis atomic Lua scripts — token-bucket and sliding-window algorithms, distributed-safe.",
    role: "Solo build — library design, Redis Lua scripting, observability",
    problem:
      "Multiple microservices needed a consistent, low-overhead way to enforce per-user / per-IP / per-endpoint limits without each team re-implementing it.",
    outcome:
      "50,000 RPS at <1ms overhead per request. Consumed by 3 microservices in production with configurable limits, a Grafana dashboard, and graceful degradation on Redis failure.",
    stack: ["Java", "Spring Boot", "Redis", "Lua", "Docker", "Grafana"],
    technologies: "Java, Redis (Lua scripting), Spring Boot, Docker",
    year: "2024",
    src: "/images/projectsImages/rate-limiter.svg",
    code: null,
    demo: null,
    featured: true,
  },
  {
    id: 1,
    title: "Tarava NFT",
    tagline: "A polished NFT marketplace concept.",
    description:
      "NFT marketplace built with React and Tailwind. Focus: pixel-perfect product UI, smooth product flows, and a responsive collector experience.",
    role: "Solo build — design, frontend, state",
    problem:
      "Translate a marketplace mockup into a fast, responsive React app with rich product detail pages and a curated browse experience.",
    outcome:
      "Multi-page SPA with Redux state, responsive at every breakpoint, deployed to Netlify.",
    stack: ["React", "Redux", "Tailwind CSS", "Vite"],
    technologies: "JavaScript, React, Redux, Tailwind CSS",
    year: "2024",
    src: "/images/projectsImages/tarava.webp",
    demo: "https://glistening-heliotrope-da3ced.netlify.app/",
    code: "https://github.com/ASinghShekhawat/Taravans",
  },
  {
    id: 2,
    title: "PopcornIntel",
    tagline: "Search and explore movies & series.",
    description:
      "PopcornIntel lets you search movies and series, view rich detail pages, and explore related titles via a clean discovery flow.",
    role: "Solo build — frontend, API integration",
    problem:
      "Build a fast, ergonomic movie discovery UI on top of a public film database API.",
    outcome:
      "Smooth client-side routing, debounced search, lazy-loaded posters, and detail pages with related titles.",
    stack: ["React", "Tailwind CSS", "REST APIs"],
    technologies: "JavaScript, React, Tailwind CSS",
    year: "2024",
    src: "/images/projectsImages/moviepedia.webp",
    demo: "https://popcornintel.netlify.app/",
    code: "https://github.com/ASinghShekhawat/PopcornIntel",
  },
  {
    id: 3,
    title: "Weather App",
    tagline: "Hyper-local weather with city search.",
    description:
      "Know the weather in your location (°C or °F) and search for any city worldwide. Built on a public weather API.",
    role: "Solo build — frontend, geolocation",
    problem:
      "Provide a friendly weather lookup that defaults to the user's location and supports global city search.",
    outcome:
      "Geolocation-first UX with graceful fallbacks, unit toggle, and clean responsive layout.",
    stack: ["React", "Tailwind CSS", "Geolocation API"],
    technologies: "JavaScript, React, Tailwind CSS",
    year: "2023",
    src: "/images/projectsImages/weatherapp.webp",
    demo: "https://climatecue.netlify.app/",
    code: "https://github.com/ASinghShekhawat/Weather-app",
  },
  {
    id: 4,
    title: "Rick and Morty",
    tagline: "Browse characters by dimension.",
    description:
      "Find Rick and Morty's characters by dimension. A small play with the public Rick and Morty API.",
    role: "Solo build — frontend",
    problem:
      "Practice integrating a public REST API into a React UI with filtering and pagination.",
    outcome:
      "Clean filter-by-dimension flow with paginated character grid.",
    stack: ["React", "Tailwind CSS", "REST APIs"],
    technologies: "JavaScript, React, Tailwind CSS",
    year: "2023",
    src: "/images/projectsImages/rickandmorty.webp",
    demo: "https://rickmortyverse.netlify.app/",
    code: "https://github.com/ASinghShekhawat/RickyMorty",
  },
  {
    id: 5,
    title: "Dogs Blog",
    tagline: "Articles for dog lovers.",
    description:
      "DogsBlog is a page for dog lovers, with curated articles about caring for these beautiful animals.",
    role: "Solo build — design + frontend",
    problem:
      "Hand-built blog layout from scratch — no frameworks — to sharpen HTML/CSS fundamentals.",
    outcome:
      "Responsive multi-page blog with hand-crafted layout and typography.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    technologies: "JavaScript, HTML5, CSS3",
    year: "2022",
    src: "/images/projectsImages/dogsblog.webp",
    demo: "https://dogs-blog-love.netlify.app/",
    code: "https://github.com/ASinghShekhawat/dogs-blog",
  },
  {
    id: 6,
    title: "Tic Tac Toe",
    tagline: "Classic game, vs CPU or a friend.",
    description:
      "A classic Tic Tac Toe where you can play against the computer or a friend.",
    role: "Solo build — frontend, game logic",
    problem:
      "Implement a minimal game loop and a basic AI opponent in React.",
    outcome:
      "Clean board state management, win/draw detection, and CPU opponent.",
    stack: ["React", "Tailwind CSS"],
    technologies: "JavaScript, React, Tailwind CSS",
    year: "2023",
    src: "/images/projectsImages/tictactoe.webp",
    demo: "https://toe-to-toe.netlify.app/",
    code: "https://github.com/ASinghShekhawat/toe-to-toe",
  },
];

export default projects;
