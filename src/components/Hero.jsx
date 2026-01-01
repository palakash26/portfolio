import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const heroRef = useRef(null);
    const h1Ref = useRef(null);
    const pRef = useRef(null);
    const cursorDotRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content on load
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from(h1Ref.current, {
                y: 50,
                opacity: 0,
                duration: 1,
            })
                .from(pRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                }, '-=0.6');
        }, heroRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const heroElement = heroRef.current;

            if (!heroElement) return;

            const rect = heroElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            // Smooth parallax on orbs - more subtle and attractive
            gsap.to('.orb-1', {
                x: x * 80,
                y: y * 60,
                duration: 2,
                ease: 'power2.out',
            });

            gsap.to('.orb-2', {
                x: -x * 100,
                y: -y * 80,
                duration: 2.5,
                ease: 'power2.out',
            });

            gsap.to('.orb-3', {
                x: x * 60,
                y: y * 100,
                duration: 2.2,
                ease: 'power2.out',
            });

            // Gentle tilt on heading
            if (h1Ref.current) {
                gsap.to(h1Ref.current, {
                    rotationY: x * 3,
                    rotationX: -y * 3,
                    duration: 1,
                    ease: 'power2.out',
                });
            }

            // Animated cursor trail effect
            if (cursorDotRef.current) {
                gsap.to(cursorDotRef.current, {
                    x: clientX - rect.left,
                    y: clientY - rect.top,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            }
        };

        const heroElement = heroRef.current;
        heroElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            heroElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary"
        >
            {/* Interactive Cursor Trail */}
            <div
                ref={cursorDotRef}
                className="absolute w-4 h-4 rounded-full pointer-events-none z-20"
                style={{
                    background: `radial-gradient(circle, ${theme.colors.accent}99 0%, ${theme.colors.accent}33 50%, transparent 100%)`,
                    boxShadow: `0 0 20px ${theme.colors.accent}66`,
                    filter: 'blur(2px)',
                }}
            />

            {/* Animated Background Orbs - Interactive with Theme Colors */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.accent}33` }}
                />
                <div
                    className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.danger}33` }}
                />
                <div
                    className="orb-3 absolute top-1/2 right-1/3 w-72 h-72 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.amber}33` }}
                />

                {/* Additional floating particles with theme colors */}
                <div
                    className="absolute w-2 h-2 rounded-full opacity-60 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.accent,
                        left: `${50 + mousePosition.x * 10}%`,
                        top: `${30 + mousePosition.y * 5}%`,
                        boxShadow: `0 0 10px ${theme.colors.accent}cc`,
                    }}
                />
                <div
                    className="absolute w-3 h-3 rounded-full opacity-40 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.amber,
                        left: `${70 - mousePosition.x * 8}%`,
                        top: `${60 - mousePosition.y * 6}%`,
                        boxShadow: `0 0 15px ${theme.colors.amber}99`,
                    }}
                />
                <div
                    className="absolute w-2 h-2 rounded-full opacity-50 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.danger,
                        left: `${40 + mousePosition.x * 6}%`,
                        top: `${80 + mousePosition.y * 4}%`,
                        boxShadow: `0 0 12px ${theme.colors.danger}b3`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 z-10 text-center">
                <h1
                    ref={h1Ref}
                    className="text-5xl md:text-7xl font-bold mb-6"
                    style={{
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    <span className="block mb-2">Hi, I'm</span>
                    <span className={`block bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                        Akash Pal
                    </span>
                </h1>

                <p ref={pRef} className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{ color: theme.colors.text }}>
                    Full Stack Developer specializing in building exceptional digital experiences.
                    Expert in MERN stack, creating scalable and performant web applications.
                </p>

                <div className="flex justify-center space-x-6 text-2xl mt-8" style={{ color: theme.colors.text }}>
                    <a
                        href="#"
                        className="hover:text-accent transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
                    >
                        <FaGithub />
                    </a>
                    <a
                        href="#"
                        className="hover:text-amber transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="#"
                        className="hover:text-danger transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 cursor-pointer"
                    >
                        <FaEnvelope />
                    </a>
                </div>
            </div>

            {/* Scroll Indicator with theme color */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 rounded-full flex justify-center" style={{ borderColor: `${theme.colors.accent}80` }}>
                    <div className="w-1.5 h-3 rounded-full mt-2 animate-pulse" style={{ backgroundColor: theme.colors.accent }}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
