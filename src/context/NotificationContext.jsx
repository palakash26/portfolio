import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [triggerAnimation, setTriggerAnimation] = useState(false);

    const sendNotification = (message, type = 'success') => {
        setNotification({ message, type, timestamp: Date.now() });
        setTriggerAnimation(true);

        // Reset animation trigger after a short delay
        setTimeout(() => setTriggerAnimation(false), 100);
    };

    const clearNotification = () => {
        setNotification(null);
    };

    return (
        <NotificationContext.Provider
            value={{
                notification,
                sendNotification,
                clearNotification,
                triggerAnimation
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
