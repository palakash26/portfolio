import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-t from-secondary to-primary border-t border-accent/20 py-12">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-accent via-amber to-danger bg-clip-text text-transparent mb-4">
                            Akash Pal
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Full Stack Developer building digital experiences with passion, creativity, and cutting-edge technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="block text-gray-400 hover:text-accent transition-colors duration-300"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect With Me</h4>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-accent hover:border-accent/50 transition-all duration-300 transform hover:scale-110"
                            >
                                <FaGithub className="text-xl" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-amber hover:border-amber/50 transition-all duration-300 transform hover:scale-110"
                            >
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-danger hover:border-danger/50 transition-all duration-300 transform hover:scale-110"
                            >
                                <FaTwitter className="text-xl" />
                            </a>
                            <a
                                href="mailto:contact@example.com"
                                className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-accent hover:border-accent/50 transition-all duration-300 transform hover:scale-110"
                            >
                                <FaEnvelope className="text-xl" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} Akash Pal. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                            Built with <FaHeart className="text-danger animate-pulse" /> using React, Tailwind & GSAP
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
