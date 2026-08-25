import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLaptopCode, FaRocket, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    const navLinks = [
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'github', label: 'Repositories' },
        { id: 'contact', label: 'Contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Scrollspy active section detector
            const sections = navLinks.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-primary/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/50'
                    : 'bg-primary/60 backdrop-blur-md border-b border-white/5 py-4'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Brand Logo with Glowing Code Icon */}
                <a href="#">
                    <motion.div
                        className="flex items-center gap-3 cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12"
                            style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})` }}
                        >
                            <FaLaptopCode className="text-xl" />
                        </div>

                        <div>
                            <span className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent block leading-tight`}>
                                Akash Pal
                            </span>
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Available for Hire
                            </span>
                        </div>
                    </motion.div>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-1 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-md">
                    {navLinks.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative cursor-pointer ${isActive
                                        ? 'text-white font-bold'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activePill"
                                        className="absolute inset-0 rounded-full bg-accent/20 border border-accent/40 shadow-sm"
                                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Desktop Right Actions (ATS Resume & Hire CTA) */}
                <div className="hidden lg:flex items-center gap-3">
                    <a
                        href="/Akash_resume_ATS.pdf"
                        download="Akash_Pal_Resume.pdf"
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-300 border border-white/10 hover:border-amber hover:text-amber transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                        <FaFileDownload className="text-xs" /> Resume
                    </a>

                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-1.5"
                        style={{ background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})` }}
                    >
                        <FaRocket /> Hire Akash
                    </a>
                </div>

                {/* Mobile Menu Trigger Button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:text-accent transition-colors cursor-pointer"
                    whileTap={{ scale: 0.9 }}
                >
                    {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                </motion.button>
            </div>

            {/* Mobile Dropdown Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-secondary/95 backdrop-blur-2xl border-t border-white/10"
                    >
                        <div className="container mx-auto px-6 py-6 space-y-3">
                            {navLinks.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`block p-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${activeSection === item.id
                                            ? 'bg-accent/20 border border-accent text-accent'
                                            : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
                                        }`}
                                >
                                    → {item.label}
                                </a>
                            ))}

                            <div className="pt-2 flex gap-3">
                                <a
                                    href="/Akash_resume_ATS.pdf"
                                    download="Akash_Pal_Resume.pdf"
                                    className="flex-1 p-3 rounded-xl border border-amber/40 text-amber font-bold text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <FaFileDownload /> Resume PDF
                                </a>
                                <a
                                    href="#contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 p-3 rounded-xl bg-accent text-white font-bold text-xs text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                                >
                                    <FaRocket /> Hire Me
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
