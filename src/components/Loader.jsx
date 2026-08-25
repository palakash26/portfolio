import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaTerminal, FaCode } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Loader = () => {
    const { theme } = useTheme();
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    const statusMessages = [
        "Initializing Akash's Portfolio Core...",
        "Connecting to GitHub API (@palakash26)...",
        "Booting Real-time ChatGPT & Gemini Engine...",
        "Loading MERN Stack Modules & Projects...",
        "Rendering Glassmorphic UI Tokens...",
        "System Ready 🚀"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const next = prev + Math.floor(Math.random() * 8) + 6;
                return next > 100 ? 100 : next;
            });
        }, 70);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress > 85) setStatusIndex(5);
        else if (progress > 65) setStatusIndex(4);
        else if (progress > 45) setStatusIndex(3);
        else if (progress > 25) setStatusIndex(2);
        else if (progress > 10) setStatusIndex(1);
    }, [progress]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center text-white overflow-hidden select-none"
            style={{ backgroundColor: theme.colors.primary }}
        >
            {/* Ambient Animated Cyber Glow Orbs */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px]"
                    style={{ backgroundColor: theme.colors.accent }}
                />
                <motion.div
                    animate={{
                        scale: [1.3, 1, 1.3],
                        rotate: [360, 180, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full blur-[120px]"
                    style={{ backgroundColor: theme.colors.amber }}
                />
            </div>

            {/* Futuristic Holographic Ring & Logo */}
            <div className="relative flex items-center justify-center mb-8">
                {/* Rotating Outer Hex Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center shadow-2xl"
                    style={{
                        borderColor: `${theme.colors.accent}60`,
                        borderTopColor: theme.colors.accent,
                        boxShadow: `0 0 30px ${theme.colors.accent}40`
                    }}
                />

                {/* Counter Rotating Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-32 h-32 rounded-full border"
                    style={{
                        borderColor: `${theme.colors.amber}40`,
                        borderBottomColor: theme.colors.amber
                    }}
                />

                {/* Center Brand Icon */}
                <div className="absolute flex flex-col items-center justify-center">
                    <motion.div
                        animate={{ scale: [0.95, 1.1, 0.95] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl border border-white/20"
                        style={{
                            background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`
                        }}
                    >
                        <FaLaptopCode />
                    </motion.div>
                </div>
            </div>

            {/* Title & Live Counter */}
            <div className="text-center space-y-2 mb-8 relative z-10">
                <h1
                    className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent"
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.amber}, ${theme.colors.danger})`
                    }}
                >
                    AKASH PAL
                </h1>
                <p className="text-xs font-mono text-gray-400 flex items-center justify-center gap-1.5">
                    <FaCode style={{ color: theme.colors.accent }} className="text-xs" /> Full-Stack MERN Developer
                </p>
            </div>

            {/* Cyber Progress Bar Card */}
            <div
                className="w-80 sm:w-96 backdrop-blur-xl p-5 rounded-2xl shadow-2xl space-y-3 relative z-10 border"
                style={{
                    backgroundColor: `${theme.colors.secondary}CC`,
                    borderColor: `${theme.colors.accent}30`
                }}
            >
                <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400 flex items-center gap-1.5">
                        <FaTerminal style={{ color: theme.colors.accent }} /> SYSTEM BOOT
                    </span>
                    <span className="font-bold text-sm" style={{ color: theme.colors.amber }}>{progress}%</span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <motion.div
                        className="h-full rounded-full shadow-md"
                        style={{
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.amber})`
                        }}
                        transition={{ ease: 'easeOut', duration: 0.1 }}
                    />
                </div>

                {/* Terminal Status Line */}
                <p className="text-[11px] font-mono truncate pt-1" style={{ color: theme.colors.amber }}>
                    {`> ${statusMessages[statusIndex]}`}
                </p>
            </div>
        </motion.div>
    );
};

export default Loader;
