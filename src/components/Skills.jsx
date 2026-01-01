import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { gsap } from 'gsap';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
    const skillsRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();
    const skills = [
        { subject: 'React', A: 95, fullMark: 100 },
        { subject: 'Node.js', A: 90, fullMark: 100 },
        { subject: 'MongoDB', A: 85, fullMark: 100 },
        { subject: 'Express', A: 88, fullMark: 100 },
        { subject: 'Tailwind', A: 92, fullMark: 100 },
        { subject: 'JavaScript', A: 94, fullMark: 100 },
        { subject: 'GSAP', A: 80, fullMark: 100 },
        { subject: 'Git', A: 87, fullMark: 100 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-secondary/90 backdrop-blur-md border border-accent/30 p-3 rounded-lg shadow-xl">
                    <p className="text-accent font-bold mb-1">{label}</p>
                    <p className="text-white text-sm">
                        Proficiency: <span className="font-mono text-amber">{payload[0].value}%</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const skillsElement = skillsRef.current;
            if (!skillsElement) return;

            const rect = skillsElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            gsap.to('.skills-orb-1', {
                x: x * 75,
                y: y * 65,
                duration: 2.3,
                ease: 'power2.out',
            });

            gsap.to('.skills-orb-2', {
                x: -x * 85,
                y: -y * 70,
                duration: 2.6,
                ease: 'power2.out',
            });
        };

        const skillsElement = skillsRef.current;
        skillsElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            skillsElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={skillsRef}
            id="skills"
            className="py-20 bg-primary relative overflow-hidden"
        >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="skills-orb-1 absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.danger}33` }}
                />
                <div
                    className="skills-orb-2 absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.amber}33` }}
                />

                {/* Floating particles */}
                <div
                    className="absolute w-3 h-3 rounded-full opacity-40 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.accent,
                        left: `${65 + mousePosition.x * 9}%`,
                        top: `${50 + mousePosition.y * 7}%`,
                        boxShadow: `0 0 15px ${theme.colors.accent}cc`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                >
                    <span className="text-amber">02.</span>{' '}
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Skills & Technologies
                    </span>
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    {/* Chart Container */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-2/3 h-[400px] md:h-[500px] bg-secondary/20 backdrop-blur-sm rounded-3xl border border-white/5 p-4 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent rounded-3xl pointer-events-none"></div>

                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
                                <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis
                                    dataKey="subject"
                                    tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                />
                                <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, 100]}
                                    tick={false}
                                    axisLine={false}
                                />
                                <Radar
                                    name="Skill Level"
                                    dataKey="A"
                                    stroke="var(--color-accent)"
                                    strokeWidth={3}
                                    fill="var(--color-accent)"
                                    fillOpacity={0.3}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Legend / Description (Optional side content) */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full md:w-1/3 space-y-6"
                    >
                        <div className="bg-accent/10 border border-accent/20 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-2">Technical Proficiency</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                My expertise spans across the full MERN stack, with a strong focus on frontend performance and backend scalability. This radar chart visualizes my relative strengths in key technologies.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-amber/10 border border-amber/20 p-4 rounded-xl text-center">
                                <span className="block text-2xl font-bold text-amber mb-1">95%</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">React Mastery</span>
                            </div>
                            <div className="bg-danger/10 border border-danger/20 p-4 rounded-xl text-center">
                                <span className="block text-2xl font-bold text-danger mb-1">5+</span>
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Major Techs</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
