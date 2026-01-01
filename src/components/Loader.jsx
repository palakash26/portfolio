import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-primary"
        >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        background: [
                            'linear-gradient(45deg, var(--color-accent) 0%, var(--color-amber) 50%, var(--color-danger) 100%)',
                            'linear-gradient(90deg, var(--color-amber) 0%, var(--color-danger) 50%, var(--color-accent) 100%)',
                            'linear-gradient(135deg, var(--color-danger) 0%, var(--color-accent) 50%, var(--color-amber) 100%)',
                            'linear-gradient(45deg, var(--color-accent) 0%, var(--color-amber) 50%, var(--color-danger) 100%)',
                        ],
                        scale: [1, 1.2, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 opacity-10 blur-3xl"
                />
            </div>

            {/* Loader Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Animated Logo/Text */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent via-amber to-danger bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                    >
                        AP
                    </motion.h1>
                </motion.div>

                {/* Animated Dots */}
                <div className="flex gap-3">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-amber"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Loading Text */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-gray-400 text-sm tracking-wider uppercase"
                >
                    Loading Experience...
                </motion.p>
            </div>

            {/* Shimmer Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                }}
                animate={{
                    x: ['-100%', '200%'],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                }}
            />
        </motion.div>
    );
};

export default Loader;
