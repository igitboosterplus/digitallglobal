import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Globe, MessageSquare, Settings, Users, ArrowUpRight, Shield, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import './MemberDashboard.css';

const MemberDashboard = () => {
    const { user, logout, changePassword } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Password change state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passStatus, setPassStatus] = useState({ loading: false, error: '', success: '' });

    const handlePassChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setPassStatus({ ...passStatus, error: 'Les nouveaux mots de passe ne correspondent pas.' });
            return;
        }

        setPassStatus({ loading: true, error: '', success: '' });
        const result = await changePassword(passwords.current, passwords.new);

        if (result.success) {
            setPassStatus({ loading: false, error: '', success: 'Mot de passe mis à jour avec succès !' });
            setPasswords({ current: '', new: '', confirm: '' });
        } else {
            setPassStatus({ loading: false, error: result.message || 'Erreur lors du changement.', success: '' });
        }
    };

    const stats = [
        { label: 'Visiteurs (30j)', value: '1,248', change: '+12%', icon: <Users size={20} /> },
        { label: 'Messages Chat', value: '42', change: '+5%', icon: <MessageSquare size={20} /> },
        { label: 'Statut du Site', value: 'Actif', change: 'Online', icon: <Globe size={20} /> },
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div className="sidebar-brand">
                    Digitall<span>global</span>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className="nav-item"><Globe size={20} /> Mon Site Web</button>
                    <button className="nav-item"><MessageSquare size={20} /> Inbox Chat</button>
                    <button className="nav-item"><Users size={20} /> Mes Clients</button>
                    <button
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings size={20} /> Paramètres
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={logout} className="btn-logout">
                        <LogOut size={18} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div>
                        <h1>Bonsoir, {user?.first_name || 'Entrepreneur'} ! 👋</h1>
                        <p>Voici les dernières statistiques de votre agence.</p>
                    </div>
                    <div className="user-profile">
                        <div className="avatar">{user?.first_name?.charAt(0) || 'E'}</div>
                        <div className="user-info">
                            <span className="user-name">{user?.first_name} {user?.last_name}</span>
                            <span className="user-email">{user?.email}</span>
                        </div>
                    </div>
                </header>

                {user?.must_change_password === 1 && activeTab !== 'settings' && (
                    <div className="security-alert">
                        <AlertCircle size={20} />
                        <div>
                            <strong>Action requise :</strong> Vous utilisez un mot de passe temporaire. Pour votre sécurité, veuillez le changer dans les paramètres.
                            <button onClick={() => setActiveTab('settings')} className="btn-inline-link">Changer maintenant</button>
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' ? (
                    <>
                        <section className="dashboard-stats">
                            {stats.map((stat, i) => (
                                <div key={i} className="stat-card">
                                    <div className="stat-icon">{stat.icon}</div>
                                    <div className="stat-info">
                                        <span className="stat-label">{stat.label}</span>
                                        <div className="stat-value-row">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-change">{stat.change}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        <section className="dashboard-content">
                            <div className="content-card wide">
                                <div className="card-header">
                                    <h3>Gestion de votre site</h3>
                                    <button className="btn-link">Accéder au site <ArrowUpRight size={14} /></button>
                                </div>
                                <div className="site-preview-placeholder">
                                    <div className="site-mockup">
                                        <div className="mockup-header">
                                            <div className="mockup-dots"><span></span><span></span><span></span></div>
                                            <div className="mockup-url">votre-agence.digitall-global.com</div>
                                        </div>
                                        <div className="mockup-body">
                                            <div className="skeleton title"></div>
                                            <div className="skeleton line"></div>
                                            <div className="skeleton line"></div>
                                            <div className="skeleton box"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="content-side">
                                <div className="content-card">
                                    <h3>Support Prioritaire</h3>
                                    <p>Besoin d'aide ? Nos experts sont disponibles pour vous accompagner.</p>
                                    <button className="btn-primary-small">Contacter le support</button>
                                </div>

                                <div className="content-card urgent">
                                    <div className="badge-new">NEW</div>
                                    <h3>Formation Accélération</h3>
                                    <p>Apprenez à scaler votre agence de 0 à 10k/mois.</p>
                                    <button className="btn-outline-small">Voir le cours</button>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="settings-section">
                        <div className="settings-card">
                            <div className="settings-header">
                                <Shield className="header-icon" />
                                <div>
                                    <h3>Sécurité du compte</h3>
                                    <p>Gérez votre mot de passe et la sécurité de votre accès.</p>
                                </div>
                            </div>

                            <form onSubmit={handlePassChange} className="password-form">
                                {passStatus.error && <div className="pass-error">{passStatus.error}</div>}
                                {passStatus.success && <div className="pass-success"><CheckCircle size={16} /> {passStatus.success}</div>}

                                <div className="form-group">
                                    <label>Mot de passe actuel</label>
                                    <div className="input-box">
                                        <Lock size={18} />
                                        <input
                                            type="password"
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Nouveau mot de passe</label>
                                        <div className="input-box">
                                            <Shield size={18} />
                                            <input
                                                type="password"
                                                value={passwords.new}
                                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirmer le nouveau mot de passe</label>
                                        <div className="input-box">
                                            <Shield size={18} />
                                            <input
                                                type="password"
                                                value={passwords.confirm}
                                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary" disabled={passStatus.loading}>
                                    {passStatus.loading ? 'Mise à jour...' : 'Sauvegarder les modifications'}
                                </button>
                            </form>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default MemberDashboard;
