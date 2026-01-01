import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const Experience = () => {
    const experienceRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();
    const experiences = [
        {
            title: 'Senior Full Stack Developer',
            company: 'Tech Solutions Inc.',
            period: '2023 - Present',
            description: 'Leading a team of 5 developers building scalable microservices. Implemented CI/CD pipelines and reduced deployment time by 40%.',
            tech: ['React', 'Node.js', 'AWS', 'Docker'],
        },
        {
            title: 'Full Stack Developer',
            company: 'Digital Innovations',
            period: '2021 - 2023',
            description: 'Developed and maintained multiple client projects. Integrated payment gateways and optimized database queries for high-traffic applications.',
            tech: ['MERN Stack', 'Redis', 'Stripe'],
        },
        {
            title: 'Frontend Developer',
            company: 'Creative Web Agency',
            period: '2020 - 2021',
            description: 'Collaborated with designers to implement pixel-perfect UIs. Improved site performance and SEO scores across 10+ projects.',
            tech: ['React', 'GSAP', 'Tailwind'],
        },
    ];

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const experienceElement = experienceRef.current;
            if (!experienceElement) return;

            const rect = experienceElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            gsap.to('.experience-orb-1', {
                x: x * 65,
                y: y * 55,
                duration: 2.2,
                ease: 'power2.out',
            });

            gsap.to('.experience-orb-2', {
                x: -x * 70,
                y: -y * 60,
                duration: 2.4,
                ease: 'power2.out',
            });
        };

        const experienceElement = experienceRef.current;
        experienceElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            experienceElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={experienceRef}
            id="experience"
            className="py-20 bg-primary relative overflow-hidden"
        >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="experience-orb-1 absolute top-1/4 left-1/5 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.accent}33` }}
                />
                <div
                    className="experience-orb-2 absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.amber}33` }}
                />

                {/* Floating particle */}
                <div
                    className="absolute w-2 h-2 rounded-full opacity-50 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.danger,
                        left: `${55 + mousePosition.x * 8}%`,
                        top: `${45 + mousePosition.y * 6}%`,
                        boxShadow: `0 0 12px ${theme.colors.danger}99`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="text-accent">02.</span>{' '}
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Experience
                    </span>
                </motion.h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* Central Line for Desktop */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-white/10"
                    ></motion.div>

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >

                            {/* Timeline Dot & Line (Mobile) */}
                            <div className="md:hidden absolute left-4 top-0 h-full w-0.5 bg-white/10 line"></div>
                            <div className="md:hidden absolute left-4 top-10 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 dot"></div>

                            {/* Content */}
                            <div className="flex-1 md:w-1/2 content">
                                <motion.div
                                    whileHover={{ scale: 1.02, borderColor: 'rgba(var(--color-accent), 0.4)' }}
                                    className={`bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}
                                >
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                                    <div className={`flex items-center gap-2 text-accent mb-4 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <FaBriefcase />
                                        <span>{exp.company}</span>
                                    </div>
                                    <p className="text-gray-400 mb-4 leading-relaxed">{exp.description}</p>

                                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                        {exp.tech.map((t, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Timeline Dot (Desktop) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: 0.2 + (index * 0.2) }}
                                className="hidden md:flex absolute left-1/2 top-[120px] transform -translate-x-1/2 justify-center items-center w-8 h-8 bg-primary border-2 border-accent rounded-full z-10 dot"
                            >
                                <div className="w-3 h-3 bg-accent rounded-full"></div>
                            </motion.div>

                            {/* Empty Space for alternating layout */}
                            <div className="hidden md:block flex-1"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
