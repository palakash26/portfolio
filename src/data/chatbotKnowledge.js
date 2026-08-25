// Knowledge base for Akash Pal's AI Chatbot (ChatGPT / Gemini style dynamic system)

export const AKASH_PROFILE = {
    name: "Akash Pal",
    title: "Full-Stack MERN Developer & UI/UX Specialist",
    bio: "Passionate full-stack developer with 3+ years of experience building high-performance web applications using MongoDB, Express, React, Node.js, Tailwind CSS, and GSAP.",
    yearsExperience: "3+",
    projectsCount: "50+",
    clientsCount: "30+",
    location: "India",

    email: "pala68771@gmail.com",
    github: "https://github.com/palakash26",
    linkedin: "https://linkedin.com",
    resume: "/Akash_resume_ATS.pdf",
    skills: {
        frontend: ["React.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "GSAP Animations", "HTML5/CSS3", "Vite", "Framer Motion", "Recharts", "Redux Toolkit"],
        backend: ["Node.js", "Express.js", "REST APIs", "GraphQL", "JWT Authentication", "Middleware Architecture", "WebSocket", "PHP Laravel"],
        database: ["MongoDB", "Mongoose", "PostgreSQL", "MySQL", "Oracle DB"],
        tools: ["Git", "GitHub", "VS Code", "Vercel", "Postman", "npm/npx", "Figma", "ESLint"],
        soft: ["Problem Solving", "Clean Code Architecture", "Performance Optimization", "Agile Development", "UI/UX Design"]
    },
    experience: [
        {
            role: "PHP Full Stack Developer",
            company: "Intrastar Technology LLC",
            period: "June 2025 - Present",
            description: "Engineered and deployed robust, scalable web APIs using PHP (Laravel Framework), optimized database interactions, and improved core module processing."
        },
        {
            role: "Research and Development Intern",
            company: "Tech Cryptor's",
            period: "April 2024 - Dec 2024",
            description: "Collaborated on core software features contributing to 25% faster development cycles and implemented clean coding best practices."
        }
    ],
    projects: [
        {
            name: "Airbnb Clone",
            tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
            description: "Responsive property rental and booking platform featuring full CRUD operations, user authentication, and map integration."
        },
        {
            name: "Hotel Booking Website",
            tech: ["React", "Next.js", "Clerk Auth", "Stripe", "PostgreSQL"],
            description: "Role-based booking platform supporting over 100 listings, Stripe payment gateway, and dynamic availability tracking."
        },
        {
            name: "Fabric E-commerce Website",
            tech: ["React", "Node.js", "PayPal Gateway", "Cloudinary"],
            description: "Scalable e-commerce store with secure PayPal checkout and Cloudinary image optimization."
        },
        {
            name: "Tripora - Travel & Experience Booking",
            tech: ["Next.js", "Node.js", "MongoDB", "GSAP"],
            description: "Full-stack travel booking application with interactive itineraries and serverless optimizations."
        }
    ]
};

// Prompt builder for external AI models (Gemini / OpenAI)
export const getSystemPrompt = () => {
    return `You are "Akash AI", an intelligent, friendly, and highly knowledgeable AI assistant representing Akash Pal on his personal portfolio website.

ABOUT AKASH PAL:
- Name: ${AKASH_PROFILE.name}
- Role: ${AKASH_PROFILE.title}
- Experience: ${AKASH_PROFILE.yearsExperience} years (${AKASH_PROFILE.experience.map(e => `${e.role} at ${e.company}`).join(", ")})
- Frontend: ${AKASH_PROFILE.skills.frontend.join(", ")}
- Backend: ${AKASH_PROFILE.skills.backend.join(", ")}
- Databases: ${AKASH_PROFILE.skills.database.join(", ")}
- Featured Projects: ${AKASH_PROFILE.projects.map(p => p.name).join(", ")}

Respond dynamically like ChatGPT and Gemini with formatted markdown.`;
};

// Intelligent Local Natural Language Answer Engine
export const answerQueryLocal = (query) => {
    const q = query.toLowerCase().trim();

    // 1. Tech Stack / Skills / Languages
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("react") || q.includes("node") || q.includes("frontend") || q.includes("backend")) {
        return `### 🛠️ Akash's Technical Expertise

Akash Pal is a **Full-Stack MERN Developer** specializing in building performant, modern web applications:

* **Frontend:** ${AKASH_PROFILE.skills.frontend.join(", ")}
* **Backend & APIs:** ${AKASH_PROFILE.skills.backend.join(", ")}
* **Databases:** ${AKASH_PROFILE.skills.database.join(", ")}
* **Developer Tools:** ${AKASH_PROFILE.skills.tools.join(", ")}

> *"Akash focuses on writing modular, maintainable code with high performance and responsive glassmorphism UI design."*`;
    }

    // 2. Experience / Work / Jobs
    if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("role") || q.includes("company") || q.includes("career")) {
        return `### 💼 Professional Experience

${AKASH_PROFILE.experience.map(exp => `
* **${exp.role}** — *${exp.company}* (${exp.period})
  - ${exp.description}
`).join("\n")}

Akash has hands-on experience in **API design, database optimization, agile development, and production software deployment**.`;
    }

    // 3. Projects & Work Showcase
    if (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("airbnb") || q.includes("tripora") || q.includes("hotel") || q.includes("fabric") || q.includes("app")) {
        return `### 🚀 Featured Projects by Akash

Here are key full-stack projects built by Akash Pal:

${AKASH_PROFILE.projects.map((p, i) => `${i + 1}. **${p.name}**
   - **Stack:** \`${p.tech.join("`, `")}\`
   - **Details:** ${p.description}`).join("\n\n")}

💡 *Scroll to the **Projects section** on this page to explore interactive demos and source code!*`;
    }

    // 4. Contact / Hire / Email / Resume
    if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("phone") || q.includes("resume") || q.includes("cv")) {
        return `### 📬 Get in Touch with Akash

Akash is actively open to **full-time full-stack roles, freelance opportunities, and technical projects**!

* 📧 **Email:** [${AKASH_PROFILE.email}](mailto:${AKASH_PROFILE.email})
* 🐙 **GitHub:** [github.com/palakash26](${AKASH_PROFILE.github})
* 📄 **ATS Resume:** [Download PDF Resume](${AKASH_PROFILE.resume})

> You can also send a direct message using the **Contact Form** at the bottom of this portfolio!`;
    }

    // 5. Code Example / React / Node / JavaScript queries
    if (q.includes("code") || q.includes("component") || q.includes("example") || q.includes("function") || q.includes("demo")) {
        return `### 💻 Sample Clean Code by Akash

Here is an example of a custom asynchronous state hook pattern in React:

\`\`\`javascript
import { useState, useEffect } from 'react';

// Custom hook for async API fetching with caching & dynamic state
export const useAsyncData = (fetchFn, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        fetchFn()
            .then(res => { if (isMounted) setData(res); })
            .catch(err => { if (isMounted) setError(err); })
            .finally(() => { if (isMounted) setLoading(false); });

        return () => { isMounted = false; };
    }, dependencies);

    return { data, loading, error };
};
\`\`\`

Akash builds scalable codebases adhering to modern ES6+, TypeScript, and functional programming paradigms.`;
    }

    // 6. Greetings & Intro
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("start") || q.includes("greetings")) {
        return `Hello! 👋 I'm **Akash Pal's AI Assistant** (powered by dynamic real-time AI).

I'm ready to answer any questions! What would you like to know?
* 🛠️ **Akash's MERN Stack & Skills**
* 💻 **Featured Full-Stack Projects**
* 💼 **Work Experience & Career**
* 📬 **Contact Details & Resume**`;
    }

    // 7. General / Fallback Answer
    return `### 🤖 Akash AI Assistant

Thanks for asking: *"_${query}_"*

Akash Pal is a **Full-Stack MERN Developer** specializing in **React, Node.js, Express, MongoDB, and PHP Laravel**. He builds fast, responsive, and animated web applications with clean architecture.

* **Quick Questions You Can Ask:**
  - *"What are Akash's skills?"*
  - *"Tell me about his work experience"*
  - *"Show me his top projects"*
  - *"How can I contact Akash?"*`;
};
