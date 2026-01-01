import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPaperPlane, FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const contactRef = useRef(null);
    const headingRef = useRef(null);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();
    const { sendNotification } = useNotification();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: 'top 80%',
                },
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from(formRef.current.children, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 80%',
                },
                x: (index) => (index % 2 === 0 ? -50 : 50),
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Animate button on hover
            const button = buttonRef.current;
            button.addEventListener('mouseenter', () => {
                gsap.to(button.querySelector('.plane-icon'), {
                    x: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button.querySelector('.plane-icon'), {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }, contactRef);

        return () => ctx.revert();
    }, []);

    // Mouse tracking for parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const contactElement = contactRef.current;
            if (!contactElement) return;

            const rect = contactElement.getBoundingClientRect();
            const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((clientY - rect.top) / rect.height - 0.5) * 2;

            setMousePosition({ x, y });

            gsap.to('.contact-orb-1', {
                x: x * 65,
                y: y * 55,
                duration: 2.1,
                ease: 'power2.out',
            });

            gsap.to('.contact-orb-2', {
                x: -x * 75,
                y: -y * 65,
                duration: 2.4,
                ease: 'power2.out',
            });
        };

        const contactElement = contactRef.current;
        contactElement?.addEventListener('mousemove', handleMouseMove);

        return () => {
            contactElement?.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Button click animation
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                // Start flying paper plane animation
                flyPaperPlaneToMascot();
            }
        });
    };

    const flyPaperPlaneToMascot = () => {
        // Get button position
        const buttonRect = buttonRef.current.getBoundingClientRect();

        // Get mascot button position (fixed at bottom-right)
        const mascotButton = document.querySelector('[data-mascot-button]');
        if (!mascotButton) {
            // If mascot not found, just send notification
            sendNotification(`Thanks ${formData.name}! Your message has been received. I'll get back to you soon!`);
            resetForm();
            return;
        }

        const mascotRect = mascotButton.getBoundingClientRect();

        // Create flying paper plane element - MUCH LARGER AND MORE VISIBLE
        const flyingPlane = document.createElement('div');
        flyingPlane.className = 'flying-plane-animation';
        flyingPlane.style.cssText = `
            position: fixed;
            left: ${buttonRect.left + buttonRect.width / 2}px;
            top: ${buttonRect.top + buttonRect.height / 2}px;
            font-size: 80px;
            color: ${theme.colors.accent};
            z-index: 10000;
            pointer-events: none;
            filter: drop-shadow(0 0 20px ${theme.colors.accent}) drop-shadow(0 0 40px ${theme.colors.amber});
            transform-style: preserve-3d;
        `;
        flyingPlane.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="80" height="80"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>';

        // Create motion trail elements
        const trails = [];
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                left: ${buttonRect.left + buttonRect.width / 2}px;
                top: ${buttonRect.top + buttonRect.height / 2}px;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: radial-gradient(circle, ${theme.colors.accent}66, transparent);
                z-index: 9999;
                pointer-events: none;
                opacity: ${0.6 - i * 0.1};
            `;
            document.body.appendChild(trail);
            trails.push(trail);
        }

        document.body.appendChild(flyingPlane);

        // Calculate positions for looping flight path
        const startX = buttonRect.left + buttonRect.width / 2;
        const startY = buttonRect.top + buttonRect.height / 2;
        const endX = mascotRect.left + mascotRect.width / 2;
        const endY = mascotRect.top + mascotRect.height / 2;

        // Get form center for looping around
        const formRect = formRef.current.getBoundingClientRect();
        const formCenterX = formRect.left + formRect.width / 2;
        const formCenterY = formRect.top + formRect.height / 2;

        // Create looping path: button -> loop around form -> fly to mascot
        const loopRadius = 250; // Radius of the circular loops

        // Create circular loop path points
        const loopPath = [
            { x: startX, y: startY }, // Start at button

            // First loop - go up and around
            { x: formCenterX - loopRadius, y: formCenterY - loopRadius * 0.5 },
            { x: formCenterX - loopRadius * 0.7, y: formCenterY - loopRadius },
            { x: formCenterX, y: formCenterY - loopRadius * 1.2 },
            { x: formCenterX + loopRadius * 0.7, y: formCenterY - loopRadius },
            { x: formCenterX + loopRadius, y: formCenterY - loopRadius * 0.5 },

            // Second loop - continue around
            { x: formCenterX + loopRadius, y: formCenterY + loopRadius * 0.5 },
            { x: formCenterX + loopRadius * 0.7, y: formCenterY + loopRadius * 0.8 },
            { x: formCenterX, y: formCenterY + loopRadius },
            { x: formCenterX - loopRadius * 0.7, y: formCenterY + loopRadius * 0.8 },
            { x: formCenterX - loopRadius, y: formCenterY + loopRadius * 0.5 },

            // Third smaller loop
            { x: formCenterX - loopRadius * 0.6, y: formCenterY },
            { x: formCenterX, y: formCenterY - loopRadius * 0.6 },
            { x: formCenterX + loopRadius * 0.6, y: formCenterY },

            // Transition to mascot
            { x: formCenterX + loopRadius, y: formCenterY },
            { x: (formCenterX + endX) / 2, y: (formCenterY + endY) / 2 - 100 },
            { x: endX - 50, y: endY - 50 },
            { x: endX, y: endY } // End at mascot
        ];

        // Animate paper plane flight with looping 3D rotation and trail effect
        const timeline = gsap.timeline({
            onComplete: () => {
                // Remove flying plane and trails
                flyingPlane.remove();
                trails.forEach(trail => trail.remove());

                // MASCOT LANDING ANIMATION
                const landingTimeline = gsap.timeline();

                // Bounce and scale effect
                landingTimeline
                    .to(mascotButton, {
                        y: -30,
                        duration: 0.3,
                        ease: 'power2.out'
                    })
                    .to(mascotButton, {
                        y: 0,
                        duration: 0.4,
                        ease: 'bounce.out'
                    })
                    .to(mascotButton, {
                        scale: [1, 1.3, 1.1, 1.2, 1],
                        rotation: [0, -10, 10, -5, 0],
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    }, '-=0.4');

                // Create sparkle particles on landing
                for (let i = 0; i < 12; i++) {
                    const particle = document.createElement('div');
                    const angle = (i / 12) * Math.PI * 2;
                    particle.style.cssText = `
                        position: fixed;
                        left: ${mascotRect.left + mascotRect.width / 2}px;
                        top: ${mascotRect.top + mascotRect.height / 2}px;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: ${i % 3 === 0 ? theme.colors.accent : i % 3 === 1 ? theme.colors.amber : theme.colors.danger};
                        z-index: 10001;
                        pointer-events: none;
                        box-shadow: 0 0 10px currentColor;
                    `;
                    document.body.appendChild(particle);

                    gsap.to(particle, {
                        x: Math.cos(angle) * 100,
                        y: Math.sin(angle) * 100,
                        opacity: 0,
                        scale: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        onComplete: () => particle.remove()
                    });
                }

                // Send notification to mascot
                sendNotification(`Thanks ${formData.name}! Your message has been received. I'll get back to you soon!`);

                // Reset form
                resetForm();
            }
        });

        // Animate the airplane with 3D rotation along the looping path
        timeline.to(flyingPlane, {
            motionPath: {
                path: loopPath,
                type: 'soft',
                autoRotate: true, // Airplane points in direction of movement
            },
            rotationY: 1080, // Multiple 3D flips during loops
            rotationZ: 720, // Multiple spins
            duration: 4.5, // Longer duration for the loops
            ease: 'power1.inOut',
        });

        // Animate trails to follow the airplane along the looping path
        trails.forEach((trail, index) => {
            gsap.to(trail, {
                motionPath: {
                    path: loopPath,
                    type: 'soft',
                },
                duration: 4.5,
                delay: index * 0.05, // Stagger the trails
                ease: 'power1.inOut',
            });
        });

        // Fade out the airplane as it reaches the mascot
        timeline.to(flyingPlane, {
            scale: 0.3,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        }, '-=0.3');
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', message: '' });

        // Show success feedback
        gsap.to(formRef.current, {
            opacity: 0.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1
        });
    };

    return (
        <section
            ref={contactRef}
            id="contact"
            className="py-20 bg-gradient-to-t from-secondary/30 to-primary relative overflow-hidden"
        >
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="contact-orb-1 absolute top-1/4 right-1/5 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.accent}33` }}
                />
                <div
                    className="contact-orb-2 absolute bottom-1/3 left-1/5 w-80 h-80 rounded-full blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: `${theme.colors.danger}33` }}
                />

                {/* Floating particles */}
                <div
                    className="absolute w-2 h-2 rounded-full opacity-50 transition-all duration-1000"
                    style={{
                        backgroundColor: theme.colors.amber,
                        left: `${30 + mousePosition.x * 7}%`,
                        top: `${60 + mousePosition.y * 5}%`,
                        boxShadow: `0 0 12px ${theme.colors.amber}cc`,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center"
                >
                    <span className="text-accent">05.</span>{' '}
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Get In Touch
                    </span>
                </h2>

                <div className="max-w-2xl mx-auto">
                    <p className="text-gray-400 text-center mb-12 text-lg">
                        Have a project in mind or want to collaborate? I'd love to hear from you! Drop me a message and let's create something amazing together.
                    </p>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
                    >
                        {/* Name Field */}
                        <div>
                            <label className="block text-white mb-2 font-medium flex items-center gap-2">
                                <FaUser className="text-accent" />
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-primary/50 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:border-accent focus:outline-none transition-colors"
                                style={{ color: '#000000ff' }}
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-white mb-2 font-medium flex items-center gap-2">
                                <FaEnvelope className="text-amber" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-primary/50 border border-white/10 rounded-lg text-black placeholder:text-gray-400 focus:border-amber focus:outline-none transition-colors"
                                style={{ color: '#000000ff' }}
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-white mb-2 font-medium flex items-center gap-2">
                                <FaComment className="text-danger" />
                                Message
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows="5"
                                className="w-full px-4 py-3 bg-primary/50 border border-white/10 rounded-lg text-white placeholder:text-gray-400 focus:border-danger focus:outline-none transition-colors resize-none"
                                style={{ color: '#020101ff' }}
                                placeholder="Your message..."
                                required
                            ></textarea>
                        </div>

                        {/* Submit Button - VERY PROMINENT */}
                        <div className="pt-4">
                            <button
                                ref={buttonRef}
                                type="submit"
                                className="group w-full bg-gradient-to-r from-accent via-amber to-danger text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-lg relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>Send Message</span>
                                    <FaPaperPlane className="plane-icon text-xl" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-danger via-amber to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
