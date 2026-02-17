import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        const savedUser = localStorage.getItem('dg_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                localStorage.setItem('dg_user', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Auth error:', error);
            return { success: false, message: 'Erreur de connexion au serveur.' };
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        if (!user) return { success: false, message: 'Non connecté.' };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, currentPassword, newPassword })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Password change error:', error);
            return { success: false, message: 'Erreur de connexion au serveur.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('dg_user');
    };

    const value = {
        user,
        isLoggedIn: !!user,
        isSubscribed: !!user, // For now, if logged in, they are considered members
        login,
        logout,
        changePassword,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
