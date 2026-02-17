import React, { useState } from 'react';
import { Mail, Lock, Loader, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/member-area');
        } else {
            setError(result.message || 'Identifiants invalides.');
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Header />
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h2>Espace Membre Sécurisé</h2>
                        <p>Veuillez entrer vos identifiants pour accéder à votre tableau de bord.</p>
                    </div>

                    {error && (
                        <div className="login-error">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email</label>
                            <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="votre@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Mot de passe</label>
                            <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-login"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader className="spinner" size={20} />
                            ) : (
                                <>Se connecter <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <div className="secure-badge">
                            <ShieldCheck size={14} />
                            <span>Connexion sécurisée SSL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
