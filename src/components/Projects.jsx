import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const projectsRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack MERN e-commerce with payment integration, admin dashboard, and real-time inventory.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            gradient: 'from-accent to-amber',
        },
        {
            title: 'Social Media App',
            description: 'Real-time social platform with posts, comments, likes, and user authentication.',
            tech: ['React', 'Express', 'Socket.io', 'JWT'],
            gradient: 'from-amber to-danger',
        },
        {
            title: 'Task Management System',
            description: 'Collaborative task manager with drag-and-drop, notifications, and team workspaces.',
            tech: ['React', 'Node.js', 'MongoDB', 'GSAP'],
            gradient: 'from-danger to-accent',
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 80%',
                },
                rotationX: -90,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.fromTo(gridRef.current.children,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 70%',
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'back.out(1.2)',
                }
            );
        }, projectsRef);

        return () => ctx.revert();
    }, []);

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const projectsElement = projectsRef.current;
            if (!projectsElement) return;

            const rect = projectsElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            gsap.to('.projects-orb-1', {
                x: x * 70,
                y: y * 60,
                duration: 2.2,
                ease: 'power2.out',
            });

            gsap.to('.projects-orb-2', {
                x: -x * 80,
                y: -y * 70,
                duration: 2.5,
                ease: 'power2.out',
            });
        };

        const projectsElement = projectsRef.current;
        projectsElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            projectsElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={projectsRef}
            id="projects"
            className="py-20 bg-gradient-to-b from-secondary/30 to-primary relative overflow-hidden"
        >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="projects-orb-1 absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.danger}33` }}
                />
                <div
                    className="projects-orb-2 absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.amber}33` }}
                />

                {/* Floating particle */}
                <div
                    className="absolute w-3 h-3 rounded-full opacity-40 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.accent,
                        left: `${50 + mousePosition.x * 10}%`,
                        top: `${70 + mousePosition.y * 6}%`,
                        boxShadow: `0 0 15px ${theme.colors.accent}cc`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="text-danger">03.</span>{' '}
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Featured Projects
                    </span>
                </h2>

                <div
                    ref={gridRef}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-accent/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-accent transition-colors transform hover:scale-110"
                                        >
                                            <FaGithub />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-gray-400 hover:text-amber transition-colors transform hover:scale-110"
                                        >
                                            <FaExternalLinkAlt />
                                        </a>
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-4 leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:border-accent/50 transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
