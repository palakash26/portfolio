import React, { useState, useEffect } from 'react';
import {
    FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaArrowUp,
    FaCode, FaTerminal, FaLaptopCode, FaCheckCircle
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { theme } = useTheme();
    const currentYear = new Date().getFullYear();
    const [timeStr, setTimeStr] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden text-gray-300">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                    className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl"
                    style={{ backgroundColor: theme.colors.accent }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Main Grid Header */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    {/* Column 1: Brand & Profile */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})` }}
                            >
                                <FaLaptopCode className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-white">Akash Pal</h3>
                                <p className="text-xs text-amber font-mono">Full-Stack MERN Developer & API Specialist</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-xs leading-relaxed max-w-md">
                            Crafting high-impact, scalable full-stack applications with MERN, Node.js, Express, MongoDB, and PHP/Laravel. Dedicated to intuitive design, fast performance, and clean architecture.
                        </p>

                        {/* Live Status Badge */}
                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs">
                            <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                                <FaCheckCircle className="text-emerald-400" /> Open for Opportunities
                            </span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-400 font-mono">🕒 {timeStr}</span>
                        </div>
                    </div>

                    {/* Column 2: Navigation Links */}
                    <div className="space-y-3">
                        <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <FaTerminal className="text-accent text-xs" /> Navigation
                        </h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            {[
                                { name: 'About Akash', href: '#about' },
                                { name: 'Work Experience', href: '#experience' },
                                { name: 'Tech Stack', href: '#skills' },
                                { name: 'Featured Projects', href: '#projects' },
                                { name: 'GitHub Repositories', href: '#github' },
                                { name: 'Contact Form', href: '#contact' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="hover:text-accent transition-colors flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <span className="text-accent text-[10px]">›</span> {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Social & Connect */}
                    <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                            <FaCode className="text-amber text-xs" /> Connect Directly
                        </h4>

                        <div className="flex flex-wrap gap-2.5">
                            <a
                                href="https://github.com/palakash26"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 rounded-xl text-white transition-all transform hover:scale-110 cursor-pointer"
                                title="GitHub @palakash26"
                            >
                                <FaGithub className="text-lg" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 bg-white/5 border border-white/10 hover:border-amber hover:bg-amber/10 rounded-xl text-amber transition-all transform hover:scale-110 cursor-pointer"
                                title="LinkedIn"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                            <a
                                href="mailto:pala68771@gmail.com"
                                className="p-3 bg-white/5 border border-white/10 hover:border-red-400 hover:bg-red-400/10 rounded-xl text-red-400 transition-all transform hover:scale-110 cursor-pointer"
                                title="Email Akash"
                            >
                                <FaEnvelope className="text-lg" />
                            </a>
                        </div>

                        <div className="bg-slate-900 border border-white/10 rounded-xl p-3 text-[11px] font-mono text-gray-400 space-y-1">
                            <p className="text-white font-bold">📬 Email Contact:</p>
                            <a href="mailto:pala68771@gmail.com" className="text-accent underline hover:text-white">
                                pala68771@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Tech Badges Row */}
                <div className="pt-6 pb-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-gray-400">
                        <span className="text-gray-500 uppercase font-bold">Tech Stack:</span>
                        {['React 18', 'Node.js', 'Express', 'MongoDB', 'PHP/Laravel', 'TailwindCSS', 'GSAP', 'Vite', 'Gemini AI'].map(tech => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="bg-accent/20 border border-accent hover:bg-accent text-white font-bold text-xs py-2 px-4 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
                    >
                        <FaArrowUp /> Back to Top
                    </button>
                </div>

                {/* Bottom Rights Attribution */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-3">
                    <p>© {currentYear} Akash Pal. Designed & Code Planned by Akash Pal.</p>
                    <p className="flex items-center gap-1.5 text-gray-400">
                        Crafted with <FaHeart className="text-red-500 animate-pulse" /> for an extraordinary web experience.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
