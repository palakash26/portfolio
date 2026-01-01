import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const themes = {
    default: {
        name: 'Default',
        colors: {
            primary: '#1a1a1a',
            secondary: '#2d2d2d',
            accent: '#f97316',
            amber: '#f59e0b',
            danger: '#dc2626',
            text: '#ffffff',
        },
        gradient: 'from-accent via-amber to-danger',
    },
    ocean: {
        name: 'Blue Ocean',
        colors: {
            primary: '#0f1729',
            secondary: '#1e293b',
            accent: '#3b82f6',
            amber: '#60a5fa',
            danger: '#1e40af',
            text: '#ffffff',
        },
        gradient: 'from-blue-500 via-sky-400 to-blue-700',
    },
    purple: {
        name: 'Purple Night',
        colors: {
            primary: '#1a0f2e',
            secondary: '#2d1b4e',
            accent: '#a855f7',
            amber: '#c084fc',
            danger: '#7c3aed',
            text: '#ffffff',
        },
        gradient: 'from-purple-500 via-purple-400 to-purple-700',
    },
    forest: {
        name: 'Green Forest',
        colors: {
            primary: '#0f1a14',
            secondary: '#1a2e23',
            accent: '#10b981',
            amber: '#34d399',
            danger: '#059669',
            text: '#ffffff',
        },
        gradient: 'from-emerald-500 via-green-400 to-emerald-600',
    },
    sunset: {
        name: 'Sunset Gold',
        colors: {
            primary: '#1a0f05',
            secondary: '#2d1b0f',
            accent: '#fbbf24',
            amber: '#fcd34d',
            danger: '#fb923c',
            text: '#fef3c7',
        },
        gradient: 'from-yellow-400 via-amber-400 to-orange-400',
    },
    coral: {
        name: 'Coral Breeze',
        colors: {
            primary: '#1a0a0a',
            secondary: '#2d1414',
            accent: '#FF9B54',
            amber: '#ffb380',
            danger: '#ff7b3d',
            text: '#ffe6d5',
        },
        gradient: 'from-orange-400 via-orange-300 to-amber-400',
    },
};

export const fonts = {
    inter: { name: 'Inter', class: 'font-inter' },
    roboto: { name: 'Roboto', class: 'font-roboto' },
    poppins: { name: 'Poppins', class: 'font-poppins' },
    outfit: { name: 'Outfit', class: 'font-outfit' },
    montserrat: { name: 'Montserrat', class: 'font-montserrat' },
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [currentFont, setCurrentFont] = useState('inter');

    // Load from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('portfolio-theme');
        const savedFont = localStorage.getItem('portfolio-font');

        if (savedTheme && themes[savedTheme]) {
            setCurrentTheme(savedTheme);
        }
        if (savedFont && fonts[savedFont]) {
            setCurrentFont(savedFont);
        }
    }, []);

    // Apply theme to CSS variables
    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Save to localStorage
        localStorage.setItem('portfolio-theme', currentTheme);
    }, [currentTheme]);

    // Apply font
    useEffect(() => {
        localStorage.setItem('portfolio-font', currentFont);
    }, [currentFont]);

    const changeTheme = (themeName) => {
        if (themes[themeName]) {
            setCurrentTheme(themeName);
        }
    };

    const changeFont = (fontName) => {
        if (fonts[fontName]) {
            setCurrentFont(fontName);
        }
    };

    const value = {
        currentTheme,
        currentFont,
        theme: themes[currentTheme],
        font: fonts[currentFont],
        changeTheme,
        changeFont,
        themes,
        fonts,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
