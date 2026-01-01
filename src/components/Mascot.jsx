import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPalette, FaFont, FaComments, FaFileDownload, FaPaperPlane, FaUser, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

const Mascot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [showBubble, setShowBubble] = useState(false);
    const [activeTab, setActiveTab] = useState('quick'); // quick, theme, font, chat, cv
    const [chatMessages, setChatMessages] = useState([
        {
            type: 'bot',
            text: "👋 Hi! I'm Akash's AI assistant! Ask me anything about his skills, experience, or projects!",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const { currentTheme, currentFont, theme, font, changeTheme, changeFont, themes, fonts } = useTheme();
    const { notification, clearNotification } = useNotification();

    // Handle incoming notifications
    useEffect(() => {
        if (notification) {
            // Auto-open mascot
            setIsOpen(true);
            // Switch to chat tab
            setActiveTab('chat');
            // Add notification message to chat
            setChatMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    text: notification.message,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            // Clear notification after handling
            setTimeout(() => clearNotification(), 100);
        }
    }, [notification, clearNotification]);

    const greetings = [
        { icon: FaRobot, text: "Hey there! Welcome to Akash's portfolio!" },
        { icon: FaRobot, text: "Ready to explore Akash's work?" },
        { icon: FaRobot, text: "Got questions? Ask me anything!" },
        { icon: FaRobot, text: "I'm Akash's AI! Click me for more!" },
        { icon: FaPalette, text: "Try changing the theme or chat with me!" },
        { icon: FaRobot, text: "Fast, modern, scalable - that's Akash!" },
        { icon: FaRobot, text: "Let's connect! Click to start chatting!" },
        { icon: FaRobot, text: "Thanks for visiting! Feel free to reach out!" },
    ];

    // Comprehensive CV-based knowledge base
    const cvData = {
        profile: "Akash Pal is a Full Stack Developer with strong skills in MERN stack development (MongoDB, Express.js, React.js, Node.js). He has a solid foundation in Java and modern JavaScript frameworks, proficient in building RESTful APIs, integrating databases, and writing clean, maintainable code.",

        currentRole: "As a PHP Full Stack Developer at Intrastar Technology LLC since June 2025, Akash engineered and deployed a robust, scalable web API using PHP (Laravel Framework), significantly contributing to the improvement of an existing processing module.",

        experience: {
            php: "Engineered RESTful APIs using PHP Laravel Framework, optimized database interactions, practiced agile development",
            intern: "Worked as Research and Development Intern at Tech Cryptor's from April to December 2024, collaborated on software features contributing 25% to development cycle, learned coding best practices"
        },

        skills: {
            languages: "JavaScript, PHP, Java, TypeScript",
            databases: "MySQL, MongoDB, Oracle DB",
            libraries: "React, Node.js, Bootstrap, Tailwind, Laravel, React Native",
            tools: "EditPlus, Git, GitHub, VS Code, Eclipse"
        },

        projects: [
            "Airbnb Clone - Responsive property booking platform with MERN Stack and CRUD operations",
            "Hotel Booking Website - Built with React and Next.js, role-based management, Clerk authentication, Stripe payments, handle 100+ listings",
            "Fabric E-commerce Website - Scalable e-commerce site with PayPal Gateway and Cloudinary image management"
        ],

        education: "Currently pursuing M.Sc. in Computer Science (2025-2027) from Mumbai University, Santacruz. Completed B.Sc. Computer Science (2022-2025) from Nasindas Khandwala College, Malad with CGPA 8.9/10.0",

        certificates: "PHP and MySQL Training Certificate by Spoken Tutorial, Full Stack Web development Certificate by Apna College, SDAC Infotech software development course Certificate",

        contact: {
            email: "palakash@gmail.com",
            phone: "+91 7710074199",
            linkedin: "akash-pal-29b198279"
        }
    };

    // Smart chatbot response system
    const getSmartResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        // Skills
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('know')) {
            return `Akash's Skills:\n\nLanguages: ${cvData.skills.languages}\nDatabases: ${cvData.skills.databases}\nFrameworks: ${cvData.skills.libraries}\nTools: ${cvData.skills.tools}\n\nHe's proficient in MERN stack and modern web technologies!`;
        }

        // Experience / Work
        if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('current role')) {
            return `Work Experience:\n\n${cvData.currentRole}\n\nPreviously, ${cvData.experience.intern}\n\nAkash has hands-on experience with Laravel, RESTful APIs, and agile development!`;
        }

        // Projects
        if (lowerMessage.includes('project')) {
            return `Featured Projects:\n\n1. ${cvData.projects[0]}\n\n2. ${cvData.projects[1]}\n\n3. ${cvData.projects[2]}\n\nAll built with modern tech stacks!`;
        }

        // Education
        if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree') || lowerMessage.includes('university')) {
            return `Education:\n\n${cvData.education}\n\nStrong academic background in Computer Science!`;
        }

        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('phone')) {
            return `Contact Akash:\n\nEmail: ${cvData.contact.email}\nPhone: ${cvData.contact.phone}\nLinkedIn: ${cvData.contact.linkedin}\n\nFeel free to reach out!`;
        }

        // About / Profile
        if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('profile')) {
            return `About Akash:\n\n${cvData.profile}\n\n${cvData.currentRole}`;
        }

        // Certificates
        if (lowerMessage.includes('certificate') || lowerMessage.includes('certification') || lowerMessage.includes('training')) {
            return `Certifications:\n\n${cvData.certificates}\n\nContinuously learning and improving!`;
        }

        // Greetings
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return "Hello! How can I help you learn more about Akash today? Ask me about his skills, experience, projects, or education!";
        }

        // Default
        return "I can help you learn about Akash! Ask me about:\n\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education\n• Contact Information\n• Certifications\n\nWhat would you like to know?";
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage = {
            type: 'user',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Bot responds
        setTimeout(() => {
            const botMessage = {
                type: 'bot',
                text: getSmartResponse(inputText),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages(prev => [...prev, botMessage]);
        }, 800);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (activeTab === 'chat') {
            scrollToBottom();
        }
    }, [chatMessages, activeTab]);

    useEffect(() => {
        const initialTimer = setTimeout(() => {
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 4000);
        }, 2000);

        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % greetings.length);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 4000);
        }, 15000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const getThemeIcon = (themeName) => {
        const themeData = themes[themeName];
        return (
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                    background: `linear-gradient(135deg, ${themeData.colors.accent}, ${themeData.colors.amber}, ${themeData.colors.danger})`
                }}
            />
        );
    };

    const handleDownloadCV = () => {
        try {
            console.log("Attempting to download CV...");
            // Download CV image (user can replace with PDF later)
            const link = document.createElement('a');
            link.href = '/Akash_Pal_CV.png'; // CV as image
            link.download = 'Akash_Pal_Resume.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log("Download triggered.");
        } catch (error) {
            console.error("Download failed:", error);
            alert("Sorry, the download failed. Please try again.");
        }
    };

    return (
        <>
            {/* Greeting Bubble */}
            <AnimatePresence>
                {showBubble && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed bottom-32 right-8 z-50 max-w-xs"
                    >
                        <div className="bg-gradient-to-r from-accent via-amber to-danger p-4 rounded-2xl shadow-2xl relative">
                            <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-danger"></div>
                            <div className="flex items-center gap-2">
                                {React.createElement(greetings[currentMessage].icon, { className: "text-white text-lg" })}
                                <p className="text-white font-medium text-sm">{greetings[currentMessage].text}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mascot Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="fixed bottom-8 right-8 z-[9999]"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    data-mascot-button
                    className="relative group cursor-pointer"
                >
                    <span className="absolute inset-0 w-16 h-16 bg-accent rounded-full animate-ping opacity-20"></span>
                    <span className="absolute inset-0 w-16 h-16 bg-amber rounded-full animate-pulse opacity-30"></span>

                    <div className="relative w-16 h-16 bg-gradient-to-br from-accent via-amber to-danger rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                        <FaRobot className="text-3xl text-white" />
                    </div>

                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-primary">
                        !
                    </span>
                </motion.button>
            </motion.div>

            {/* Mascot Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-28 right-8 z-[9999] w-96 bg-secondary/95 backdrop-blur-md border border-accent/30 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-accent via-amber to-danger p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FaRobot className="text-2xl text-white" />
                                <div>
                                    <h3 className="text-white font-bold">Akash's AI Assistant</h3>
                                    <p className="text-white/80 text-xs">Your portfolio companion!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-white/10 bg-primary/50 overflow-x-auto">
                            {[
                                { id: 'quick', icon: null, label: 'Links' },
                                { id: 'theme', icon: FaPalette, label: 'Theme' },
                                { id: 'font', icon: FaFont, label: 'Font' },
                                { id: 'chat', icon: FaComments, label: 'Chat' },
                                { id: 'cv', icon: FaFileDownload, label: 'CV' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 px-2 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {tab.icon && <tab.icon />}
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                            {/* Quick Links Tab */}
                            {activeTab === 'quick' && (
                                <>
                                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaRobot className="text-accent" />
                                            <p className="text-white text-sm font-semibold">Welcome!</p>
                                        </div>
                                        <p className="text-gray-300 text-xs">
                                            Navigate, customize themes & fonts, chat with AI, or download my CV!
                                        </p>
                                    </div>

                                    <div className="bg-amber/10 border border-amber/20 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaRobot className="text-amber" />
                                            <p className="text-white text-sm font-semibold">Quick Navigation</p>
                                        </div>
                                        <div className="space-y-2">
                                            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((link) => (
                                                <a
                                                    key={link}
                                                    href={`#${link.toLowerCase()}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-gray-300 hover:text-accent transition-colors text-xs cursor-pointer"
                                                >
                                                    → {link}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Theme Tab */}
                            {activeTab === 'theme' && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaPalette className="text-accent" />
                                        <p className="text-white text-sm font-medium">Choose Your Theme</p>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-4">
                                        Current: <span className="text-accent font-semibold">{theme.name}</span>
                                    </p>
                                    {Object.entries(themes).map(([key, themeData]) => (
                                        <motion.button
                                            key={key}
                                            onClick={() => changeTheme(key)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full p-4 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-3 ${currentTheme === key
                                                ? 'border-accent bg-accent/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {getThemeIcon(key)}
                                            <div className="text-left flex-1">
                                                <p className="text-white font-medium text-sm">{themeData.name}</p>
                                            </div>
                                            {currentTheme === key && (
                                                <span className="text-accent text-xl">✓</span>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Font Tab */}
                            {activeTab === 'font' && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaFont className="text-accent" />
                                        <p className="text-white text-sm font-medium">Choose Your Font</p>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-4">
                                        Current: <span className="text-accent font-semibold">{font.name}</span>
                                    </p>
                                    {Object.entries(fonts).map(([key, fontData]) => (
                                        <motion.button
                                            key={key}
                                            onClick={() => changeFont(key)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full p-4 rounded-lg border-2 transition-all cursor-pointer ${currentFont === key
                                                ? 'border-accent bg-accent/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="text-left flex items-center justify-between">
                                                <div>
                                                    <p className={`text-white font-medium text-lg ${fontData.class}`}>
                                                        {fontData.name}
                                                    </p>
                                                    <p className={`text-gray-400 text-sm ${fontData.class}`}>
                                                        The quick brown fox jumps
                                                    </p>
                                                </div>
                                                {currentFont === key && (
                                                    <span className="text-accent text-xl">✓</span>
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Chat Tab */}
                            {activeTab === 'chat' && (
                                <div className="space-y-3 -m-6">
                                    {/* Messages Area */}
                                    <div className="h-72 overflow-y-auto p-4 space-y-3 bg-primary/50">
                                        {chatMessages.map((message, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                                    <div className="flex items-start gap-2">
                                                        {message.type === 'bot' && (
                                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-accent">
                                                                <FaRobot className="text-white text-xs" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div
                                                                className={`rounded-2xl p-3 text-xs ${message.type === 'user' ? 'rounded-tr-none bg-accent text-white' : 'rounded-tl-none bg-secondary text-white'}`}
                                                            >
                                                                <p className="whitespace-pre-line">{message.text}</p>
                                                            </div>
                                                            <p className="text-xs mt-1 px-1 text-gray-500">{message.time}</p>
                                                        </div>
                                                        {message.type === 'user' && (
                                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-amber">
                                                                <FaUser className="text-white text-xs" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 border-t border-accent/20 bg-secondary">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={inputText}
                                                onChange={(e) => setInputText(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                placeholder="Ask me about Akash..."
                                                className="flex-1 px-3 py-2 rounded-full text-xs outline-none bg-primary text-white border border-accent/30 cursor-text"
                                            />
                                            <button
                                                onClick={handleSendMessage}
                                                className="p-2 rounded-full bg-gradient-to-r from-accent to-amber text-white cursor-pointer hover:scale-105 transition-transform"
                                            >
                                                <FaPaperPlane className="text-sm" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CV Download Tab */}
                            {activeTab === 'cv' && (
                                <div className="space-y-4">
                                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-center">
                                        <FaFileDownload className="text-4xl text-accent mx-auto mb-3" />
                                        <h3 className="text-white font-bold text-lg mb-2">Download My CV</h3>
                                        <p className="text-gray-300 text-sm mb-4">
                                            Get the full details about my experience, skills, and projects!
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <a
                                                href="/Akash_resume_ATS.pdf"
                                                download="Akash_Pal_Resume.pdf"
                                                className="w-full bg-gradient-to-r from-accent via-amber to-danger text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <FaFileDownload className="text-xl" />
                                                Download CV
                                            </a>

                                            <a
                                                href="/Akash_resume_ATS.pdf"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-secondary border border-accent/50 text-white font-bold py-2 px-6 rounded-lg hover:bg-accent/20 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-sm"
                                            >
                                                <FaEye className="text-lg" />
                                                View CV in Browser
                                            </a>
                                        </div>
                                    </div>

                                    <div className="bg-amber/10 border border-amber/20 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaFileDownload className="text-amber" />
                                            <p className="text-white text-sm font-semibold">What's Inside:</p>
                                        </div>
                                        <ul className="text-gray-300 text-xs space-y-1">
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Full Stack Developer Profile</li>
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Work Experience Details</li>
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Technical Skills & Tools</li>
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Projects Portfolio</li>
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Education & Certifications</li>
                                            <li className="flex items-center gap-2"><FaRobot className="text-accent text-xs" /> Contact Information</li>
                                        </ul>
                                    </div>

                                    <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
                                        <p className="text-gray-300 text-xs text-center flex items-center justify-center gap-2">
                                            <FaRobot className="text-amber" /> <span className="text-white font-semibold">Tip:</span> Try the Chat tab to ask me questions about Akash!
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div >
                )}
            </AnimatePresence >
        </>
    );
};

export default Mascot;
