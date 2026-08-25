import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaDatabase, FaJs, FaPhp, FaGitAlt,
    FaDocker, FaTerminal, FaCode, FaServer, FaTools, FaCheckCircle, FaLaptopCode
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs, SiTypescript, SiLaravel, SiPostgresql, SiRedis } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
    const { theme } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const skillsData = [
        // Frontend
        { name: 'React 18', category: 'Frontend', level: 95, icon: FaReact, color: '#61dafb' },
        { name: 'Next.js 14', category: 'Frontend', level: 90, icon: SiNextdotjs, color: '#ffffff' },
        { name: 'JavaScript (ES6+)', category: 'Frontend', level: 94, icon: FaJs, color: '#f7df1e' },
        { name: 'TypeScript', category: 'Frontend', level: 85, icon: SiTypescript, color: '#3178c6' },
        { name: 'Tailwind CSS', category: 'Frontend', level: 96, icon: SiTailwindcss, color: '#38bdf8' },

        // Backend & API
        { name: 'Node.js', category: 'Backend', level: 92, icon: FaNodeJs, color: '#339933' },
        { name: 'Express.js', category: 'Backend', level: 90, icon: SiExpress, color: '#ffffff' },
        { name: 'PHP / Laravel', category: 'Backend', level: 85, icon: SiLaravel, color: '#ff2d20' },
        { name: 'REST APIs', category: 'Backend', level: 95, icon: FaServer, color: '#f97316' },

        // Database
        { name: 'MongoDB', category: 'Database', level: 88, icon: SiMongodb, color: '#47a248' },
        { name: 'PostgreSQL', category: 'Database', level: 82, icon: SiPostgresql, color: '#4169e1' },
        { name: 'Redis', category: 'Database', level: 80, icon: SiRedis, color: '#dc382d' },

        // Tools & DevOps
        { name: 'Git & GitHub', category: 'DevOps', level: 92, icon: FaGitAlt, color: '#f05032' },
        { name: 'Docker', category: 'DevOps', level: 78, icon: FaDocker, color: '#2496ed' },
        { name: 'Vite & Build Tools', category: 'DevOps', level: 88, icon: FaTools, color: '#646cff' }
    ];

    const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

    const filteredSkills = selectedCategory === 'All'
        ? skillsData
        : skillsData.filter(s => s.category === selectedCategory);

    return (
        <section id="skills" className="py-16 bg-slate-950 relative overflow-hidden text-gray-200">
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px]"
                    style={{ backgroundColor: theme.colors.accent }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-2">
                            <FaTerminal /> Tech Capabilities & Mastery
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            <span className="text-amber">03.</span> Skills & Technologies
                        </h2>
                    </div>

                    {/* Category Selector Pills */}
                    <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 border border-white/10 p-1.5 rounded-2xl shadow-xl">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat
                                        ? 'bg-gradient-to-r from-accent to-amber text-slate-950 font-extrabold shadow-md scale-105'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Compact Interactive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.25, delay: index * 0.03 }}
                                    className="bg-slate-900/70 border border-white/10 hover:border-accent/60 p-3.5 rounded-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-white/5 border border-white/10 shrink-0 group-hover:scale-110 transition-transform"
                                                style={{ color: skill.color }}
                                            >
                                                <IconComponent />
                                            </div>
                                            <span className="text-xs font-bold text-white truncate group-hover:text-amber transition-colors">
                                                {skill.name}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-amber bg-amber/10 px-1.5 py-0.5 rounded border border-amber/20 shrink-0">
                                            {skill.level}%
                                        </span>
                                    </div>

                                    {/* Compact Progress Bar */}
                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 0.8, ease: 'easeOut' }}
                                            className="h-full rounded-full bg-gradient-to-r from-accent to-amber shadow-sm"
                                        />
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

export default Skills;
