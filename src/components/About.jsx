import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaRocket, FaLightbulb } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef(null);
    const headingRef = useRef(null);
    const contentRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();

    const highlights = [
        {
            icon: <FaCode className="text-4xl text-accent" />,
            title: 'Clean Code',
            description: 'Writing maintainable, scalable, and efficient code following industry best practices.',
        },
        {
            icon: <FaRocket className="text-4xl text-amber" />,
            title: 'Fast Performance',
            description: 'Optimized applications with lightning-fast load times and smooth user experiences.',
        },
        {
            icon: <FaLightbulb className="text-4xl text-danger" />,
            title: 'Innovative Solutions',
            description: 'Creative problem-solving with modern technologies and cutting-edge design patterns.',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Only animate heading and content, NOT the cards
            if (headingRef.current) {
                gsap.from(headingRef.current, {
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    scale: 0.5,
                    opacity: 0,
                    duration: 1,
                    ease: 'back.out(1.7)',
                });
            }

            if (contentRef.current && contentRef.current.children.length > 0) {
                gsap.from(contentRef.current.children, {
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 30,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            }
        }, aboutRef);

        return () => ctx.revert();
    }, []);

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const aboutElement = aboutRef.current;
            if (!aboutElement) return;

            const rect = aboutElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            gsap.to('.about-orb-1', {
                x: x * 60,
                y: y * 50,
                duration: 2,
                ease: 'power2.out',
            });

            gsap.to('.about-orb-2', {
                x: -x * 70,
                y: -y * 60,
                duration: 2.3,
                ease: 'power2.out',
            });
        };

        const aboutElement = aboutRef.current;
        aboutElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            aboutElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="py-20 bg-gradient-to-b from-secondary/30 to-primary relative overflow-hidden"
        >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="about-orb-1 absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.accent}33` }}
                />
                <div
                    className="about-orb-2 absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.amber}33` }}
                />

                {/* Floating particles */}
                <div
                    className="absolute w-2 h-2 rounded-full opacity-50 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.danger,
                        left: `${60 + mousePosition.x * 8}%`,
                        top: `${40 + mousePosition.y * 5}%`,
                        boxShadow: `0 0 10px ${theme.colors.danger}99`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    <span className="text-accent">01.</span>{' '}
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        About Me
                    </span>
                </h2>

                <div ref={contentRef} className="max-w-3xl mx-auto mb-16 space-y-6">
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Hi! I'm <span className="text-accent font-semibold">Akash Pal</span>, a passionate full-stack developer with expertise in modern web technologies.
                        I love crafting beautiful, functional, and user-centric digital experiences that make a difference.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        With a strong foundation in both frontend and backend development, I specialize in building
                        scalable web applications using the MERN stack. My focus is on writing clean, maintainable code
                        and delivering exceptional user experiences.
                    </p>
                </div>

                {/* Highlight Cards - NO GSAP ANIMATION, ALWAYS VISIBLE */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-accent/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 opacity-100"
                            style={{ visibility: 'visible' }}
                        >
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Experience Stats */}
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Years Experience', value: '3+' },
                        { label: 'Projects Completed', value: '50+' },
                        { label: 'Happy Clients', value: '30+' },
                        { label: 'Tech Stack', value: '15+' },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-secondary/30 rounded-xl border border-white/5 hover:border-accent/30 transition-all duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent via-amber to-danger bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
