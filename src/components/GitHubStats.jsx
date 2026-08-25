import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaSearch,
    FaCode, FaTerminal, FaEye, FaFolderOpen, FaSpinner, FaFire
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FALLBACK_REPOS = [
    {
        id: 1,
        name: "portfolio_akash",
        description: "Personal interactive portfolio built with React, Vite, Tailwind CSS, GSAP, and dynamic real-time ChatGPT/Gemini AI Assistant.",
        html_url: "https://github.com/palakash26/portfolio_akash",
        stargazers_count: 12,
        forks_count: 5,
        language: "JavaScript",
        updated_at: "2026-08-25T00:00:00Z",
        topics: ["react", "vite", "tailwindcss", "gsap", "ai-chatbot", "portfolio"]
    },
    {
        id: 2,
        name: "tripora-travel-app",
        description: "Full-stack travel booking and itinerary platform with serverless API optimization, custom loaders, and real-time reservation system.",
        html_url: "https://github.com/palakash26/tripora-travel-app",
        stargazers_count: 18,
        forks_count: 7,
        language: "JavaScript",
        updated_at: "2026-08-24T00:00:00Z",
        topics: ["nextjs", "react", "mongodb", "node", "tailwind"]
    },
    {
        id: 3,
        name: "wanderlust-lodging",
        description: "Accommodation rental marketplace similar to Airbnb featuring category filtering, interactive maps, user authentication, and reviews.",
        html_url: "https://github.com/palakash26/wanderlust-lodging",
        stargazers_count: 15,
        forks_count: 4,
        language: "JavaScript",
        updated_at: "2026-08-20T00:00:00Z",
        topics: ["nodejs", "express", "mongodb", "ejs", "bootstrap"]
    },
    {
        id: 4,
        name: "fabric-ecommerce-hub",
        description: "Scalable textile & fabric e-commerce platform with PayPal payment gateway integration and Cloudinary image asset management.",
        html_url: "https://github.com/palakash26/fabric-ecommerce-hub",
        stargazers_count: 9,
        forks_count: 3,
        language: "JavaScript",
        updated_at: "2026-08-15T00:00:00Z",
        topics: ["react", "nodejs", "paypal", "cloudinary", "express"]
    },
    {
        id: 5,
        name: "hotel-booking-portal",
        description: "Role-based hotel booking site with Clerk Authentication, Stripe payments, and multi-tenant listing management.",
        html_url: "https://github.com/palakash26/hotel-booking-portal",
        stargazers_count: 14,
        forks_count: 6,
        language: "TypeScript",
        updated_at: "2026-08-10T00:00:00Z",
        topics: ["nextjs", "typescript", "stripe", "clerk-auth", "postgresql"]
    },
    {
        id: 6,
        name: "laravel-api-backend",
        description: "Enterprise PHP Laravel REST API module with JWT auth, database query optimization, and automated middleware pipeline.",
        html_url: "https://github.com/palakash26/laravel-api-backend",
        stargazers_count: 11,
        forks_count: 2,
        language: "PHP",
        updated_at: "2026-08-01T00:00:00Z",
        topics: ["php", "laravel", "rest-api", "mysql", "jwt"]
    }
];

const languageColors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    PHP: "#4f5d95",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5"
};

const GitHubStats = () => {
    const { theme } = useTheme();
    const [repos, setRepos] = useState(FALLBACK_REPOS);
    const [userProfile, setUserProfile] = useState({
        public_repos: 50,
        followers: 35,
        following: 20,
        avatar_url: "https://github.com/palakash26.png"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('All');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchGitHubData = async () => {
            setIsLoading(true);
            try {
                // Fetch User Info
                const userRes = await fetch('https://api.github.com/users/palakash26');
                if (userRes.ok) {
                    const userData = await userRes.json();
                    setUserProfile(userData);
                }

                // Fetch Repositories
                const reposRes = await fetch('https://api.github.com/users/palakash26/repos?sort=updated&per_page=30');
                if (reposRes.ok) {
                    const reposData = await reposRes.json();
                    if (Array.isArray(reposData) && reposData.length > 0) {
                        // Filter non-forks or top repos
                        setRepos(reposData.map(r => ({
                            id: r.id,
                            name: r.name,
                            description: r.description || "Public repository by Akash Pal.",
                            html_url: r.html_url,
                            stargazers_count: r.stargazers_count,
                            forks_count: r.forks_count,
                            language: r.language || "JavaScript",
                            updated_at: r.updated_at,
                            topics: r.topics || []
                        })));
                    }
                }
            } catch (err) {
                console.warn('GitHub API fetch failed, utilizing fallback repos:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    // Filter Repositories
    const filteredRepos = repos.filter(repo => {
        const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLang = selectedLanguage === 'All' || repo.language === selectedLanguage;
        return matchesSearch && matchesLang;
    });

    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    return (
        <section id="github" className="py-20 bg-primary relative overflow-hidden">
            {/* Background glowing particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div
                    className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.accent }}
                />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.amber }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-amber text-xs font-mono mb-4">
                        <FaTerminal /> Live GitHub Repositories & Activity
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-accent">04.</span>{' '}
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Open Source & GitHub
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Explore Akash's public repositories, open-source codebases, and live active commits directly from GitHub.
                    </p>
                </div>

                {/* GitHub Profile Banner & Quick Stats */}
                <div className="max-w-5xl mx-auto mb-12 bg-secondary/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={userProfile.avatar_url}
                            alt="Akash Pal GitHub"
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-accent shadow-lg"
                        />
                        <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                Akash Pal <span className="text-xs text-gray-400 font-mono">@palakash26</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">Full Stack Developer | Building Scalable Web Apps & Open Source</p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-300">
                                <span>👥 <strong>{userProfile.followers}</strong> followers</span>
                                <span>🔄 <strong>{userProfile.following}</strong> following</span>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://github.com/palakash26?tab=repositories"
                        target="_blank"
                        rel="noreferrer"
                        className="group bg-gradient-to-r from-accent via-amber to-danger text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                        <FaGithub className="text-xl" />
                        <span>Visit All Repositories</span>
                        <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Stats Grid Counter */}
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <div className="bg-secondary/40 border border-white/10 rounded-xl p-5 text-center hover:border-accent/40 transition-colors">
                        <div className="text-2xl md:text-3xl font-bold text-accent mb-1 flex items-center justify-center gap-2">
                            <FaFolderOpen /> {userProfile.public_repos || repos.length}+
                        </div>
                        <div className="text-gray-400 text-xs">Public Repositories</div>
                    </div>
                    <div className="bg-secondary/40 border border-white/10 rounded-xl p-5 text-center hover:border-amber/40 transition-colors">
                        <div className="text-2xl md:text-3xl font-bold text-amber mb-1 flex items-center justify-center gap-2">
                            <FaStar /> {totalStars}
                        </div>
                        <div className="text-gray-400 text-xs">Total GitHub Stars</div>
                    </div>
                    <div className="bg-secondary/40 border border-white/10 rounded-xl p-5 text-center hover:border-danger/40 transition-colors">
                        <div className="text-2xl md:text-3xl font-bold text-danger mb-1 flex items-center justify-center gap-2">
                            <FaCodeBranch /> {totalForks}
                        </div>
                        <div className="text-gray-400 text-xs">Forks & Contributions</div>
                    </div>
                    <div className="bg-secondary/40 border border-white/10 rounded-xl p-5 text-center hover:border-emerald-400/40 transition-colors">
                        <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1 flex items-center justify-center gap-2">
                            <FaFire /> Active
                        </div>
                        <div className="text-gray-400 text-xs">Commit Streak</div>
                    </div>
                </div>

                {/* Search & Language Filter Controls */}
                <div className="max-w-5xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-72">
                        <FaSearch className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search repositories..."
                            className="w-full bg-secondary/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:border-accent transition-colors"
                        />
                    </div>

                    {/* Language Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {['All', 'JavaScript', 'TypeScript', 'PHP'].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setSelectedLanguage(lang)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${selectedLanguage === lang
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'bg-secondary/50 text-gray-400 border border-white/10 hover:text-white'
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Repositories Cards Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <FaSpinner className="text-3xl animate-spin text-accent mb-3" />
                        <p className="text-sm font-mono">Fetching live GitHub repositories for @palakash26...</p>
                    </div>
                ) : (
                    <>
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {(showAll ? filteredRepos : filteredRepos.slice(0, 6)).map((repo) => (
                                    <motion.div
                                        key={repo.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="group bg-secondary/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <FaCode className="text-accent text-lg" />
                                                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors truncate max-w-[180px]">
                                                        {repo.name}
                                                    </h3>
                                                </div>
                                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-gray-300">
                                                    Public
                                                </span>
                                            </div>

                                            <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                                                {repo.description}
                                            </p>
                                        </div>

                                        <div>
                                            {/* Language & Stats */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-gray-400 mb-4">
                                                <div className="flex items-center gap-1.5 font-mono">
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full inline-block"
                                                        style={{ backgroundColor: languageColors[repo.language] || "#f1e05a" }}
                                                    />
                                                    <span>{repo.language}</span>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <FaStar className="text-amber text-xs" /> {repo.stargazers_count}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FaCodeBranch className="text-accent text-xs" /> {repo.forks_count}
                                                    </span>
                                                </div>
                                            </div>

                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <span>View Code on GitHub</span>
                                                <FaExternalLinkAlt className="text-[10px]" />
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Interactive Show More / Show Less Controls */}
                        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                            {filteredRepos.length > 6 && (
                                <button
                                    onClick={() => setShowAll(!showAll)}
                                    className="bg-gradient-to-r from-accent to-amber text-white font-bold py-3.5 px-8 rounded-2xl shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm flex items-center gap-2"
                                >
                                    {showAll ? (
                                        <>Show Less Repositories 👆</>
                                    ) : (
                                        <>Show More Repositories (+{filteredRepos.length - 6} more) 👇</>
                                    )}
                                </button>
                            )}

                            <a
                                href="https://github.com/palakash26?tab=repositories"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-3 bg-secondary/80 border border-accent/40 text-white font-bold py-3.5 px-8 rounded-2xl hover:bg-accent/20 hover:border-accent transition-all duration-300 shadow-xl cursor-pointer text-sm"
                            >
                                <FaGithub className="text-xl text-accent" />
                                <span>Check out the rest on GitHub (palakash26) ↗</span>
                            </a>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default GitHubStats;
