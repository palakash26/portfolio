import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaCheckCircle, FaLaptopCode, FaRocket, FaTerminal } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
    const { theme } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedIndex, setExpandedIndex] = useState(null);

    const experiences = [
        {
            id: 1,
            title: 'Senior Full Stack MERN Developer',
            company: 'Tripora & Freelance Tech',
            category: 'Full Stack',
            period: '2024 - Present',
            location: 'Remote / India',
            summary: 'Leading end-to-end full-stack web application development, real-time AI API integration, and database query optimization.',
            highlights: [
                'Architected Tripora travel platform using Next.js 14, React 18, and MongoDB serverless backend.',
                'Integrated real-time OpenAI & Gemini AI chat engine with stream processing & fallback knowledge base.',
                'Decreased API response latency by 45% using Redis caching and optimized database indexes.'
            ],
            tech: ['React 18', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Redis', 'TailwindCSS'],
            metrics: '🚀 45% Latency Reduction'
        },
        {
            id: 2,
            title: 'Full Stack Web Developer & E-Commerce Lead',
            company: 'Fabric E-Commerce Hub',
            category: 'Full Stack',
            period: '2023 - 2024',
            location: 'India',
            summary: 'Built scalable e-commerce portals with PayPal & Stripe payment integrations and Cloudinary media asset management.',
            highlights: [
                'Created role-based inventory management dashboard handling 10,000+ monthly orders.',
                'Engineered PayPal checkout pipeline with webhook automated order state machine.',
                'Designed responsive glassmorphism UI with Tailwind CSS and Framer Motion micro-interactions.'
            ],
            tech: ['React', 'Node.js', 'Express', 'PayPal API', 'Cloudinary', 'MongoDB'],
            metrics: '💳 10k+ Transactions Handled'
        },
        {
            id: 3,
            title: 'Backend API Specialist & Laravel Developer',
            company: 'Wanderlust Lodging Systems',
            category: 'Backend',
            period: '2022 - 2023',
            location: 'India',
            summary: 'Developed RESTful microservices, authentication systems, and database schema migrations using Node.js, Express, and PHP/Laravel.',
            highlights: [
                'Built secure JWT authentication and role-based access control (RBAC) middleware.',
                'Optimized SQL/NoSQL aggregation pipelines for complex search & filter queries.',
                'Automated unit & integration testing pipelines to maintain 95%+ code coverage.'
            ],
            tech: ['PHP', 'Laravel', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
            metrics: '⚡ 99.9% Uptime API'
        },
        {
            id: 4,
            title: 'Frontend UI/UX Specialist & Interactive Craftsman',
            company: 'Creative Web Innovations',
            category: 'Frontend',
            period: '2021 - 2022',
            location: 'India',
            summary: 'Crafted ultra-fast, responsive web interfaces, custom GSAP scroll-driven animations, and accessible design systems.',
            highlights: [
                'Designed modular component libraries used across 15+ production projects.',
                'Improved Google Lighthouse SEO & performance scores from 65 to 98/100.',
                'Implemented interactive canvas particles, dark mode themes, and custom typography.'
            ],
            tech: ['React', 'JavaScript (ES6+)', 'GSAP', 'TailwindCSS', 'HTML5/CSS3'],
            metrics: '🎨 98/100 Lighthouse Score'
        }
    ];

    const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];

    const filteredExperiences = selectedCategory === 'All'
        ? experiences
        : experiences.filter(exp => exp.category === selectedCategory);

    return (
        <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden text-gray-200">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                    className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.accent }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-amber text-xs font-mono mb-4">
                        <FaTerminal /> Career & Professional History
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-accent">02.</span>{' '}
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Work Experience
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        Proven track record in full-stack MERN engineering, scalable backend API design, and interactive frontend creation.
                    </p>

                    {/* Interactive Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat
                                        ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                                        : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cat} Roles
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="max-w-4xl mx-auto space-y-8">
                    <AnimatePresence mode="wait">
                        {filteredExperiences.map((exp, index) => {
                            const isExpanded = expandedIndex === exp.id;
                            return (
                                <motion.div
                                    key={exp.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-accent/50 transition-all duration-300 shadow-xl relative group overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                                                    style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})` }}
                                                >
                                                    <FaBriefcase />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <p className="text-xs font-semibold text-amber flex items-center gap-2">
                                                        <span>{exp.company}</span>
                                                        <span className="text-gray-500">•</span>
                                                        <span className="text-gray-400">{exp.location}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent font-mono text-xs font-bold">
                                                {exp.metrics}
                                            </span>
                                            <span className="text-xs font-mono text-gray-400 flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                                <FaCalendarAlt className="text-amber" /> {exp.period}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                        {exp.summary}
                                    </p>

                                    {/* Highlights List */}
                                    <div className="space-y-2 mb-6">
                                        {exp.highlights.map((item, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                                <FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Badges */}
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                                        {exp.tech.map((t, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:border-amber/40 transition-colors"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Experience;
