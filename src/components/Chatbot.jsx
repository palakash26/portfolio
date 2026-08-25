import React, { useState, useEffect, useRef } from 'react';
import {
    FaRobot, FaTimes, FaPaperPlane, FaUser, FaMicrophone, FaVolumeUp,
    FaVolumeMute, FaCopy, FaCheck, FaRedo, FaCog, FaTrash, FaMagic,
    FaExternalLinkAlt, FaPalette, FaFont, FaComments, FaFileDownload,
    FaEye, FaTerminal, FaStar, FaFolderOpen, FaThumbsUp, FaThumbsDown
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { gsap } from 'gsap';
import { getSystemPrompt, answerQueryLocal, AKASH_PROFILE } from '../data/chatbotKnowledge';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'theme', 'font', 'cv', 'links'
    const [messages, setMessages] = useState([
        {
            id: 'welcome-msg',
            type: 'bot',
            text: `Hi! I'm **Akash's AI Assistant** (powered by real-time ChatGPT & Gemini engine). 🚀\n\nAsk me anything about Akash's **MERN stack skills**, **featured projects**, **work experience**, or any tech question!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isComplete: true
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [autoSpeak, setAutoSpeak] = useState(false);
    const [aiMode, setAiMode] = useState('auto'); // 'auto', 'gemini', 'openai', 'local'
    const [geminiKey, setGeminiKey] = useState('');
    const [openaiKey, setOpenaiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [copiedMsgId, setCopiedMsgId] = useState(null);
    const [copiedCodeId, setCopiedCodeId] = useState(null);
    const [speechSupported, setSpeechSupported] = useState(false);

    const { currentTheme, currentFont, theme, font, changeTheme, changeFont, themes, fonts } = useTheme();
    const messagesEndRef = useRef(null);
    const chatButtonRef = useRef(null);
    const chatWindowRef = useRef(null);
    const recognitionRef = useRef(null);

    // Close chatbot when clicking anywhere outside the modal window
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                chatWindowRef.current &&
                !chatWindowRef.current.contains(event.target) &&
                chatButtonRef.current &&
                !chatButtonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    // Stop speech synthesis & voice recognition whenever chatbot closes
    useEffect(() => {
        if (!isOpen) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch (e) { }
            }
            setIsListening(false);
        }
    }, [isOpen]);

    // Helper for AI Voice Speech Synthesis
    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const cleanText = text.replace(/[*_#`[\]()]/g, '');
            const utterance = new SpeechSynthesisUtterance(cleanText);
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v =>
                (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Daniel')) && v.lang.startsWith('en')
            ) || voices.find(v => v.lang.startsWith('en'));

            if (preferredVoice) utterance.voice = preferredVoice;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Initial setup for Speech Recognition
    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            setSpeechSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        // Load saved preferences
        const savedGeminiKey = localStorage.getItem('akash_ai_gemini_key') || '';
        const savedOpenaiKey = localStorage.getItem('akash_ai_openai_key') || '';
        const savedMode = localStorage.getItem('akash_ai_mode') || 'auto';
        setGeminiKey(savedGeminiKey);
        setOpenaiKey(savedOpenaiKey);
        setAiMode(savedMode);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (activeTab === 'chat') {
            scrollToBottom();
        }
    }, [messages, isGenerating, activeTab]);

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

    // Call Real-time AI Service
    const fetchAIResponse = async (userPrompt) => {
        const systemPrompt = getSystemPrompt();

        // 1. Google Gemini API Key mode
        if (aiMode === 'gemini' && geminiKey.trim()) {
            try {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey.trim()}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [
                            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userPrompt}` }] }
                        ]
                    })
                });
                const data = await res.json();
                if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                    return data.candidates[0].content.parts[0].text;
                }
            } catch (err) {
                console.warn('Gemini API call failed, falling back to dynamic AI engine.', err);
            }
        }

        // 2. OpenAI Key mode
        if (aiMode === 'openai' && openaiKey.trim()) {
            try {
                const res = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${openaiKey.trim()}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt }
                        ]
                    })
                });
                const data = await res.json();
                if (data.choices && data.choices[0]?.message?.content) {
                    return data.choices[0].message.content;
                }
            } catch (err) {
                console.warn('OpenAI API failed, falling back.', err);
            }
        }

        // 3. Keyless Real-time AI endpoint with fallback
        if (aiMode !== 'local') {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 3500);

                const fullPrompt = `${systemPrompt}\n\nUSER QUESTION: ${userPrompt}\n\nANSWER:`;
                const encodedPrompt = encodeURIComponent(fullPrompt.slice(0, 1500));
                const res = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const text = await res.text();
                    if (text && text.trim().length > 5 && !text.includes("Cloudflare") && !text.includes("Turnstile")) {
                        return text.trim();
                    }
                }
            } catch (err) {
                // Silently fallback to intelligent local NLP engine
            }
        }

        // 4. Intelligent Local Knowledge Engine Fallback (Instant & Reliable)
        return answerQueryLocal(userPrompt);
    };

    // Stream text word by word (ChatGPT / Gemini style)
    const streamResponse = async (fullText, botMsgId) => {
        const words = fullText.split(' ');
        let currentText = '';

        for (let i = 0; i < words.length; i++) {
            currentText += (i === 0 ? '' : ' ') + words[i];
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === botMsgId
                        ? { ...msg, text: currentText, isComplete: false }
                        : msg
                )
            );
            await new Promise(resolve => setTimeout(resolve, 25)); // 25ms per word
        }

        setMessages(prev =>
            prev.map(msg =>
                msg.id === botMsgId
                    ? { ...msg, isComplete: true }
                    : msg
            )
        );

        if (autoSpeak) {
            speakText(fullText);
        }
    };

    const handleSend = async (customPrompt = null) => {
        const promptToSend = customPrompt || inputText;
        if (!promptToSend.trim() || isGenerating) return;

        setActiveTab('chat');
        const userMsgId = 'user-' + Date.now();
        const botMsgId = 'bot-' + Date.now();
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newMessages = [
            ...messages,
            { id: userMsgId, type: 'user', text: promptToSend, time: timeStr }
        ];

        setMessages(newMessages);
        if (!customPrompt) setInputText('');
        setIsGenerating(true);

        // Add empty bot message for streaming
        setMessages(prev => [
            ...prev,
            { id: botMsgId, type: 'bot', text: '', time: timeStr, isComplete: false }
        ]);

        const rawResponse = await fetchAIResponse(promptToSend);
        await streamResponse(rawResponse, botMsgId);
        setIsGenerating(false);
    };

    const toggleSpeechRecognition = () => {
        if (!speechSupported) {
            alert('Speech recognition is not supported in your browser.');
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setIsListening(true);
            recognitionRef.current?.start();
        }
    };



    const copyToClipboard = (text, id, isCode = false) => {
        navigator.clipboard.writeText(text);
        if (isCode) {
            setCopiedCodeId(id);
            setTimeout(() => setCopiedCodeId(null), 2000);
        } else {
            setCopiedMsgId(id);
            setTimeout(() => setCopiedMsgId(null), 2000);
        }
    };

    const saveSettings = () => {
        localStorage.setItem('akash_ai_gemini_key', geminiKey);
        localStorage.setItem('akash_ai_openai_key', openaiKey);
        localStorage.setItem('akash_ai_mode', aiMode);
        setShowSettings(false);
    };

    const clearChat = () => {
        setMessages([
            {
                id: 'welcome-msg-cleared',
                type: 'bot',
                text: `Chat cleared! Ask me anything about Akash's **MERN stack skills**, **projects**, or **experience**.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isComplete: true
            }
        ]);
    };

    // Quick suggestions chips
    const quickPrompts = [
        '🛠️ What is Akash\'s tech stack?',
        '💻 Show Akash\'s top projects',
        '💼 Work experience details',
        '📬 How can I contact Akash?',
        '💻 Show a React code sample'
    ];

    // Helper to render markdown inside messages
    const renderMarkdown = (text) => {
        if (!text) return null;

        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
            }
            parts.push({
                type: 'code',
                language: match[1] || 'javascript',
                code: match[2].trim()
            });
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < text.length) {
            parts.push({ type: 'text', content: text.slice(lastIndex) });
        }

        return parts.map((part, pIdx) => {
            if (part.type === 'code') {
                const codeId = `code-${pIdx}-${Date.now()}`;
                return (
                    <div key={pIdx} className="my-3 rounded-xl overflow-hidden border border-white/10 shadow-lg font-mono text-xs">
                        <div className="bg-slate-950 px-3 py-1.5 flex justify-between items-center text-gray-400 border-b border-white/10">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-accent">{part.language}</span>
                            <button
                                onClick={() => copyToClipboard(part.code, codeId, true)}
                                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[10px]"
                            >
                                {copiedCodeId === codeId ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                                {copiedCodeId === codeId ? 'Copied!' : 'Copy code'}
                            </button>
                        </div>
                        <pre className="p-3 bg-slate-900 text-emerald-300 overflow-x-auto leading-relaxed">
                            <code>{part.code}</code>
                        </pre>
                    </div>
                );
            }

            const lines = part.content.split('\n');
            return (
                <div key={pIdx} className="space-y-1.5">
                    {lines.map((line, lIdx) => {
                        if (!line.trim()) return <div key={lIdx} className="h-1" />;

                        if (line.startsWith('### ')) {
                            return (
                                <h3 key={lIdx} className="font-bold text-base text-amber mt-2 mb-1">
                                    {line.replace('### ', '')}
                                </h3>
                            );
                        }

                        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                            const bulletText = line.trim().substring(2);
                            return (
                                <div key={lIdx} className="flex items-start gap-2 pl-2 my-0.5">
                                    <span className="text-accent font-bold mt-1 text-xs">•</span>
                                    <span>{parseInlineMarkdown(bulletText)}</span>
                                </div>
                            );
                        }

                        if (/^\d+\.\s/.test(line.trim())) {
                            const match = line.trim().match(/^(\d+\.)\s*(.*)/);
                            return (
                                <div key={lIdx} className="flex items-start gap-2 pl-2 my-0.5">
                                    <span className="text-amber font-bold text-xs">{match[1]}</span>
                                    <span>{parseInlineMarkdown(match[2])}</span>
                                </div>
                            );
                        }

                        if (line.trim().startsWith('> ')) {
                            return (
                                <blockquote key={lIdx} className="border-l-2 border-accent pl-3 py-1 my-1 italic text-gray-300 bg-white/5 rounded-r">
                                    {parseInlineMarkdown(line.trim().substring(2))}
                                </blockquote>
                            );
                        }

                        return <p key={lIdx} className="leading-relaxed">{parseInlineMarkdown(line)}</p>;
                    })}
                </div>
            );
        });
    };

    const parseInlineMarkdown = (text) => {
        const parts = [];
        let remaining = text;
        let keyCounter = 0;

        while (remaining) {
            const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
            const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
            const codeMatch = remaining.match(/`(.*?)`/);

            let firstMatch = null;
            let type = null;

            if (boldMatch && (!firstMatch || boldMatch.index < firstMatch.index)) {
                firstMatch = boldMatch;
                type = 'bold';
            }
            if (linkMatch && (!firstMatch || linkMatch.index < firstMatch.index)) {
                firstMatch = linkMatch;
                type = 'link';
            }
            if (codeMatch && (!firstMatch || codeMatch.index < firstMatch.index)) {
                firstMatch = codeMatch;
                type = 'code';
            }

            if (!firstMatch) {
                parts.push(<span key={keyCounter++}>{remaining}</span>);
                break;
            }

            if (firstMatch.index > 0) {
                parts.push(<span key={keyCounter++}>{remaining.slice(0, firstMatch.index)}</span>);
            }

            if (type === 'bold') {
                parts.push(<strong key={keyCounter++} className="font-semibold text-accent">{firstMatch[1]}</strong>);
            } else if (type === 'link') {
                parts.push(
                    <a
                        key={keyCounter++}
                        href={firstMatch[2]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-amber underline font-medium hover:text-white transition-colors"
                    >
                        {firstMatch[1]} <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                );
            } else if (type === 'code') {
                parts.push(
                    <code key={keyCounter++} className="px-1.5 py-0.5 rounded bg-black/40 text-emerald-300 font-mono text-xs border border-white/10">
                        {firstMatch[1]}
                    </code>
                );
            }

            remaining = remaining.slice(firstMatch.index + firstMatch[0].length);
        }

        return parts;
    };

    // Screen boundary constraints state
    const [dragBounds, setDragBounds] = useState({ left: -800, right: 20, top: -600, bottom: 20 });

    useEffect(() => {
        const updateBounds = () => {
            if (typeof window !== 'undefined') {
                setDragBounds({
                    left: -window.innerWidth + 120,
                    right: 20,
                    top: -window.innerHeight + 120,
                    bottom: 20
                });
            }
        };
        updateBounds();
        window.addEventListener('resize', updateBounds);
        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    return (
        <motion.div
            ref={chatButtonRef}
            drag
            dragConstraints={dragBounds}
            dragElastic={0.05}
            dragMomentum={false}
            className="fixed bottom-8 right-8 z-[9999]"
        >
            {/* Main Chat Assistant Modal Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatWindowRef}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="absolute bottom-20 right-0 w-[92vw] max-w-[420px] h-[580px] max-h-[75vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl border transition-all duration-300"
                        style={{
                            backgroundColor: `${theme.colors.secondary}F2`,
                            borderColor: `${theme.colors.accent}40`
                        }}
                    >
                        {/* Header (Drag Bar) */}
                        <div
                            className="p-4 flex items-center justify-between shadow-md relative z-10 select-none cursor-grab active:cursor-grabbing"
                            style={{
                                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white">
                                        <FaRobot className="text-xl" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="text-white font-bold text-base leading-tight">Akash AI Assistant</h3>
                                        <span className="bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">✋ Drag Me</span>
                                    </div>
                                    <p className="text-white/90 text-xs flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" /> Live ChatGPT/Gemini Engine
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 text-white">
                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                    title="AI Settings & Models"
                                >
                                    <FaCog className="text-lg" />
                                </button>
                                <button
                                    onClick={clearChat}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                    title="Clear History"
                                >
                                    <FaTrash className="text-base" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                    title="Close Assistant"
                                >
                                    <FaTimes className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Navigation Tabs Bar */}
                        <div className="flex border-b border-white/10 bg-black/40 overflow-x-auto">
                            {[
                                { id: 'chat', icon: FaComments, label: 'AI Chat' },
                                { id: 'theme', icon: FaPalette, label: 'Theme' },
                                { id: 'font', icon: FaFont, label: 'Font' },
                                { id: 'cv', icon: FaFileDownload, label: 'Resume CV' },
                                { id: 'links', icon: FaExternalLinkAlt, label: 'Links' },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 px-2 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-accent border-b-2 border-accent bg-white/5'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <tab.icon className="text-xs" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Settings Overlay Drawer */}
                        <AnimatePresence>
                            {showSettings && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-slate-950 text-white p-4 text-xs space-y-3 border-b border-white/10 z-20"
                                >
                                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="font-bold text-amber flex items-center gap-1">
                                            <FaCog /> AI Engine Preferences
                                        </span>
                                        <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-1">Select AI Engine Mode:</label>
                                        <select
                                            value={aiMode}
                                            onChange={(e) => setAiMode(e.target.value)}
                                            className="w-full bg-slate-900 border border-white/20 rounded p-2 text-white outline-none"
                                        >
                                            <option value="auto">Auto (Keyless Dynamic AI + Fallback)</option>
                                            <option value="gemini">Google Gemini 1.5 Flash (API Key)</option>
                                            <option value="openai">OpenAI GPT-3.5 Turbo (API Key)</option>
                                            <option value="local">Local Intelligent NLP Engine</option>
                                        </select>
                                    </div>

                                    {aiMode === 'gemini' && (
                                        <div>
                                            <label className="block text-gray-300 mb-1">Gemini API Key:</label>
                                            <input
                                                type="password"
                                                value={geminiKey}
                                                onChange={(e) => setGeminiKey(e.target.value)}
                                                placeholder="AIzaSy..."
                                                className="w-full bg-slate-900 border border-white/20 rounded p-2 text-white outline-none"
                                            />
                                        </div>
                                    )}

                                    {aiMode === 'openai' && (
                                        <div>
                                            <label className="block text-gray-300 mb-1">OpenAI API Key:</label>
                                            <input
                                                type="password"
                                                value={openaiKey}
                                                onChange={(e) => setOpenaiKey(e.target.value)}
                                                placeholder="sk-..."
                                                className="w-full bg-slate-900 border border-white/20 rounded p-2 text-white outline-none"
                                            />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={autoSpeak}
                                                onChange={(e) => setAutoSpeak(e.target.checked)}
                                                className="rounded bg-slate-800 border-white/20 text-accent focus:ring-0"
                                            />
                                            Auto-read AI responses (Voice)
                                        </label>

                                        <button
                                            onClick={saveSettings}
                                            className="px-3 py-1 bg-accent hover:bg-accent/80 text-white rounded font-bold transition-colors cursor-pointer"
                                        >
                                            Save Settings
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content Area Based on Active Tab */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* 💬 AI CHAT TAB */}
                            {activeTab === 'chat' && (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[88%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                                                <div className="flex items-start gap-2.5">
                                                    {message.type === 'bot' && (
                                                        <div
                                                            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs shadow-md mt-1"
                                                            style={{
                                                                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`
                                                            }}
                                                        >
                                                            <FaRobot />
                                                        </div>
                                                    )}

                                                    <div>
                                                        <div
                                                            className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-lg ${message.type === 'user'
                                                                ? 'rounded-tr-none text-white'
                                                                : 'rounded-tl-none border border-white/10'
                                                                }`}
                                                            style={{
                                                                backgroundColor: message.type === 'user' ? theme.colors.accent : 'rgba(15, 23, 42, 0.85)',
                                                                color: message.type === 'user' ? '#ffffff' : theme.colors.text
                                                            }}
                                                        >
                                                            {message.type === 'bot' ? (
                                                                <div>
                                                                    {renderMarkdown(message.text)}
                                                                    {!message.isComplete && (
                                                                        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse">▌</span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="whitespace-pre-wrap font-medium">{message.text}</p>
                                                            )}
                                                        </div>

                                                        {/* Action bar for bot messages */}
                                                        {message.type === 'bot' && message.isComplete && message.text && (
                                                            <div className="flex items-center gap-3 mt-1.5 px-1 text-gray-400 text-[11px]">
                                                                <span>{message.time}</span>
                                                                <button
                                                                    onClick={() => copyToClipboard(message.text, message.id)}
                                                                    className="hover:text-white transition-colors cursor-pointer"
                                                                    title="Copy Response"
                                                                >
                                                                    {copiedMsgId === message.id ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                                                                </button>
                                                                <button
                                                                    onClick={() => speakText(message.text)}
                                                                    className="hover:text-white transition-colors cursor-pointer"
                                                                    title="Read Out Loud"
                                                                >
                                                                    <FaVolumeUp />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {message.type === 'user' && (
                                                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-white text-xs shadow-md mt-1">
                                                            <FaUser />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}

                            {/* 🎨 THEME TAB */}
                            {activeTab === 'theme' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaPalette className="text-accent" />
                                        <h4 className="text-white font-bold text-sm">Select Portfolio Theme</h4>
                                    </div>
                                    <p className="text-gray-400 text-xs mb-3">Current Active: <strong className="text-accent">{theme.name}</strong></p>
                                    {Object.entries(themes).map(([key, themeData]) => (
                                        <button
                                            key={key}
                                            onClick={() => changeTheme(key)}
                                            className={`w-full p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${currentTheme === key ? 'border-accent bg-accent/15' : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ background: `linear-gradient(135deg, ${themeData.colors.accent}, ${themeData.colors.amber})` }}
                                                />
                                                <span className="text-white font-semibold text-xs">{themeData.name}</span>
                                            </div>
                                            {currentTheme === key && <FaCheck className="text-accent" />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* 🔤 FONT TAB */}
                            {activeTab === 'font' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaFont className="text-accent" />
                                        <h4 className="text-white font-bold text-sm">Select Typography Font</h4>
                                    </div>
                                    {Object.entries(fonts).map(([key, fontData]) => (
                                        <button
                                            key={key}
                                            onClick={() => changeFont(key)}
                                            className={`w-full p-3.5 rounded-xl border transition-all cursor-pointer text-left flex items-center justify-between ${currentFont === key ? 'border-accent bg-accent/15' : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div>
                                                <p className={`text-white font-bold text-sm ${fontData.class}`}>{fontData.name}</p>
                                                <p className="text-gray-400 text-xs">Akash Pal | Full-Stack Developer</p>
                                            </div>
                                            {currentFont === key && <FaCheck className="text-accent" />}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* 📄 CV / RESUME TAB */}
                            {activeTab === 'cv' && (
                                <div className="space-y-4">
                                    <div className="bg-secondary/60 border border-accent/30 rounded-2xl p-5 text-center">
                                        <FaFileDownload className="text-4xl text-accent mx-auto mb-3" />
                                        <h3 className="text-white font-bold text-base mb-1">Download Akash's Resume (ATS PDF)</h3>
                                        <p className="text-gray-300 text-xs mb-4">Official full-stack developer resume optimized for ATS screeners.</p>

                                        <div className="space-y-2.5">
                                            <a
                                                href="/Akash_resume_ATS.pdf"
                                                download="Akash_Pal_Resume.pdf"
                                                className="w-full bg-gradient-to-r from-accent via-amber to-danger text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs cursor-pointer"
                                            >
                                                <FaFileDownload className="text-base" /> Download ATS Resume PDF
                                            </a>
                                            <a
                                                href="/Akash_resume_ATS.pdf"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-full bg-white/5 border border-white/10 hover:border-accent text-white font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
                                            >
                                                <FaEye /> View Resume in Browser ↗
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 🔗 QUICK LINKS TAB */}
                            {activeTab === 'links' && (
                                <div className="space-y-3">
                                    <h4 className="text-white font-bold text-xs mb-2">Direct Portfolio Section Links:</h4>
                                    {[
                                        { name: 'About Akash', href: '#about' },
                                        { name: 'Work Experience', href: '#experience' },
                                        { name: 'Technical Skills', href: '#skills' },
                                        { name: 'Featured Projects', href: '#projects' },
                                        { name: 'GitHub Repositories', href: '#github' },
                                        { name: 'Contact Form', href: '#contact' },
                                    ].map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-white text-xs font-semibold transition-all cursor-pointer"
                                        >
                                            → {link.name}
                                        </a>
                                    ))}

                                    <div className="pt-2">
                                        <a
                                            href="https://github.com/palakash26?tab=repositories"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-full bg-slate-900 border border-amber/40 text-amber hover:text-white font-bold p-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                                        >
                                            <FaStar /> Visit GitHub Repos (palakash26) ↗
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Suggestion Pills (Chat Tab Only) */}
                        {activeTab === 'chat' && (
                            <div className="px-3 py-2 border-t border-white/10 bg-slate-950/60 overflow-x-auto flex gap-2 no-scrollbar">
                                {quickPrompts.map((prompt, pIdx) => (
                                    <button
                                        key={pIdx}
                                        onClick={() => handleSend(prompt.replace(/^[^\w\s]+\s*/, ''))}
                                        disabled={isGenerating}
                                        className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium transition-all border border-white/10 hover:border-accent hover:bg-white/10 cursor-pointer disabled:opacity-40 flex-shrink-0 text-gray-300"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Chat Input Bar (Chat Tab Only) */}
                        {activeTab === 'chat' && (
                            <div
                                className="p-3 border-t relative"
                                style={{
                                    backgroundColor: theme.colors.secondary,
                                    borderColor: `${theme.colors.accent}30`
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={toggleSpeechRecognition}
                                        className={`p-2.5 rounded-full text-white transition-all cursor-pointer ${isListening ? 'bg-red-500 animate-bounce' : 'bg-white/10 hover:bg-white/20'
                                            }`}
                                        title={isListening ? 'Listening...' : 'Voice Input (Speech)'}
                                    >
                                        <FaMicrophone className={isListening ? 'text-white' : 'text-amber'} />
                                    </button>

                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={isListening ? 'Listening to voice...' : 'Ask Akash AI anything...'}
                                        disabled={isGenerating}
                                        className="flex-1 px-4 py-2.5 text-xs rounded-full outline-none transition-all duration-300 disabled:opacity-50"
                                        style={{
                                            backgroundColor: theme.colors.primary,
                                            color: theme.colors.text,
                                            border: `1px solid ${theme.colors.accent}40`
                                        }}
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSend()}
                                        disabled={isGenerating || !inputText.trim()}
                                        className="p-3 rounded-full text-white transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
                                        style={{
                                            background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                                        }}
                                        title="Send Message"
                                    >
                                        {isGenerating ? (
                                            <FaMagic className="text-sm animate-spin" />
                                        ) : (
                                            <FaPaperPlane className="text-xs" />
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Single Floating Launch Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative group cursor-grab active:cursor-grabbing select-none"
                aria-label="Open Akash AI Assistant"
            >
                {/* Glowing pulse rings */}
                <span
                    className="absolute inset-0 w-16 h-16 rounded-full animate-ping opacity-25"
                    style={{ backgroundColor: theme.colors.accent }}
                />
                <span
                    className="absolute inset-0 w-16 h-16 rounded-full animate-pulse opacity-40"
                    style={{ backgroundColor: theme.colors.amber }}
                />

                {/* Main Robot Button */}
                <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-2 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                    style={{
                        background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber})`,
                        borderColor: `${theme.colors.accent}60`
                    }}
                >
                    <FaRobot className="text-3xl text-white drop-shadow-md" />
                </div>

                {/* AI Badge */}
                <span
                    className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full flex items-center gap-1 text-white text-[10px] font-bold border shadow-lg"
                    style={{
                        background: `linear-gradient(90deg, #ec4899, #8b5cf6)`,
                        borderColor: theme.colors.primary
                    }}
                >
                    <FaMagic className="text-[9px] animate-spin" /> AI Live
                </span>
            </motion.button>
        </motion.div>
    );
};

export default Chatbot;
