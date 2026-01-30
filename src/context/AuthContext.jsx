import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // Simule l'état d'abonnement de l'utilisateur
    // En production, ceci serait remplacé par une vraie authentification
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userName, setUserName] = useState('');

    const login = (name) => {
        setIsSubscribed(true);
        setUserName(name);
    };

    const logout = () => {
        setIsSubscribed(false);
        setUserName('');
    };

    const toggleSubscription = () => {
        if (isSubscribed) {
            logout();
        } else {
            // Simuler une connexion simple
            const name = prompt('Entrez votre nom pour vous connecter :');
            if (name) {
                login(name);
            }
        }
    };

    const value = {
        isSubscribed,
        userName,
        login,
        logout,
        toggleSubscription
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
