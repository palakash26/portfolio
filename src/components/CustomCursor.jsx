import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();

    useEffect(() => {
        const updateCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateFollower = (e) => {
            setTimeout(() => {
                setFollowerPosition({ x: e.clientX, y: e.clientY });
            }, 100);
        };

        window.addEventListener('mousemove', updateCursor);
        window.addEventListener('mousemove', updateFollower);

        return () => {
            window.removeEventListener('mousemove', updateCursor);
            window.removeEventListener('mousemove', updateFollower);
        };
    }, []);

    return (
        <>
            <div
                className="custom-cursor"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.amber}, ${theme.colors.danger})`,
                }}
            />
            <div
                className="custom-cursor-follower"
                style={{
                    left: `${followerPosition.x}px`,
                    top: `${followerPosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                    borderColor: theme.colors.accent,
                }}
            />
        </>
    );
};

export default CustomCursor;
