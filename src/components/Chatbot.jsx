import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi! I'm Akash's AI assistant. Ask me anything about his skills, experience, or projects!",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const chatButtonRef = useRef(null);
    const { theme } = useTheme();

    // Chatbot responses
    const botResponses = {
        skills: "Akash is proficient in MERN stack (MongoDB, Express, React, Node.js), along with JavaScript, TypeScript, Tailwind CSS, and GSAP animations!",
        experience: "Akash has experience building full-stack web applications, implementing responsive designs, and creating interactive user interfaces with modern technologies.",
        projects: "Akash has worked on various projects including portfolio websites, e-commerce platforms, and dynamic web applications. Check out the Projects section for more details!",
        contact: "You can reach Akash through the Contact section below. Feel free to drop a message!",
        default: "I'm here to help! Ask me about Akash's skills, experience, projects, or how to contact him."
    };

    const getResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            return botResponses.skills;
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return botResponses.experience;
        } else if (lowerMessage.includes('project')) {
            return botResponses.projects;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return botResponses.contact;
        } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            return "Hello! How can I help you learn more about Akash today?";
        } else {
            return botResponses.default;
        }
    };

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMessage = {
            type: 'user',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');

        // Bot responds after a short delay
        setTimeout(() => {
            const botMessage = {
                type: 'bot',
                text: getResponse(inputText),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (chatButtonRef.current) {
            gsap.from(chatButtonRef.current, {
                scale: 0,
                duration: 0.5,
                delay: 1,
                ease: 'back.out(1.7)',
            });
        }
    }, []);

    return (
        <>
            {/* Chatbot Button */}
            <motion.div
                ref={chatButtonRef}
                className="fixed bottom-24 left-8 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative group cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                    }}
                >
                    {/* Animated rings */}
                    <span
                        className="absolute inset-0 w-16 h-16 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span
                        className="absolute inset-0 w-16 h-16 rounded-full animate-pulse opacity-30"
                        style={{ backgroundColor: theme.colors.amber }}
                    />

                    {/* Main button */}
                    <div
                        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 transition-colors duration-300"
                        style={{
                            background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                            borderColor: `${theme.colors.accent}40`
                        }}
                    >
                        <FaRobot className="text-3xl text-white" />
                    </div>

                    {/* Badge */}
                    <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold border-2"
                        style={{
                            backgroundColor: theme.colors.danger,
                            borderColor: theme.colors.primary
                        }}
                    >
                        AI
                    </span>
                </motion.button>
            </motion.div>

            {/* Chatbot Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-44 left-8 z-50 w-96 h-[500px] rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300"
                        style={{
                            backgroundColor: theme.colors.secondary,
                            border: `1px solid ${theme.colors.accent}40`
                        }}
                    >
                        {/* Header */}
                        <div
                            className="p-4 flex items-center justify-between transition-colors duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <FaRobot className="text-2xl text-white" />
                                <div>
                                    <h3 className="text-white font-bold">AI Assistant</h3>
                                    <p className="text-white/80 text-xs">Always here to help!</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors cursor-pointer"
                            >
                                <FaTimes className="text-lg" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-3"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                        <div className="flex items-start gap-2">
                                            {message.type === 'bot' && (
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: theme.colors.accent }}
                                                >
                                                    <FaRobot className="text-white text-sm" />
                                                </div>
                                            )}
                                            <div>
                                                <div
                                                    className={`rounded-2xl p-3 ${message.type === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} transition-colors duration-300`}
                                                    style={{
                                                        backgroundColor: message.type === 'user'
                                                            ? theme.colors.accent
                                                            : theme.colors.secondary,
                                                        color: message.type === 'user'
                                                            ? '#ffffff'
                                                            : theme.colors.text
                                                    }}
                                                >
                                                    <p className="text-sm">{message.text}</p>
                                                </div>
                                                <p
                                                    className="text-xs mt-1 px-1"
                                                    style={{ color: `${theme.colors.text}60` }}
                                                >
                                                    {message.time}
                                                </p>
                                            </div>
                                            {message.type === 'user' && (
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                                                    style={{ backgroundColor: theme.colors.amber }}
                                                >
                                                    <FaUser className="text-white text-sm" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div
                            className="p-4 border-t transition-colors duration-300"
                            style={{
                                backgroundColor: theme.colors.secondary,
                                borderColor: `${theme.colors.accent}20`
                            }}
                        >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 rounded-full outline-none transition-all duration-300 cursor-text"
                                    style={{
                                        backgroundColor: theme.colors.primary,
                                        color: theme.colors.text,
                                        border: `1px solid ${theme.colors.accent}30`
                                    }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    className="p-3 rounded-full text-white transition-all duration-300 cursor-pointer"
                                    style={{
                                        background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                                    }}
                                >
                                    <FaPaperPlane className="text-lg" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
