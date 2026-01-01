import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLaptopCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ['About', 'Experience', 'Skills', 'Projects', 'Contact'];

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`navbar-container fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-primary/95 backdrop-blur-lg border-b border-accent/20 py-3 shadow-lg shadow-accent/5'
                : 'bg-primary/80 backdrop-blur-md border-b border-accent/20 py-4'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-2 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <FaLaptopCode className="text-2xl text-accent" />
                    </motion.div>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                        Akash Pal
                    </span>
                </motion.div>

                {/* Desktop Menu with Stagger Animation */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((item, index) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index + 0.3, duration: 0.4 }}
                            className="hover:text-accent transition-colors duration-300 relative group font-medium text-sm cursor-pointer"
                            style={{ color: theme.colors.text }}
                            whileHover={{ y: -2 }}
                        >
                            {item}
                            <motion.span
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent to-amber"
                                initial={{ width: 0 }}
                                whileHover={{ width: '100%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Menu Button with Animation */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-2xl text-accent hover:text-amber transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </motion.div>
                </motion.button>
            </div>

            {/* Mobile Menu with Slide Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-secondary/95 backdrop-blur-md border-t border-accent/20"
                    >
                        <div className="container mx-auto px-6 py-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
                            {navLinks.map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block hover:text-accent transition-colors duration-300 font-medium cursor-pointer"
                                    style={{ color: theme.colors.text }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 10, color: '#f97316' }}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
