import React from 'react';
import { Star, ArrowRight, CheckCircle2, Globe, Zap, Users, Target } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-split">
                    {/* Left: Content */}
                    <div className="hero-content">
                        <div className="hero-top-badge">
                            <span>L'édition Digitall VIP</span>
                        </div>
                        <h1 className="hero-main-title">
                            Votre agence <br />
                            digitale <span className="blue-italic">clé en main.</span>
                        </h1>
                        <p className="hero-description">
                            Digital global met à votre disposition une agence digitale clé en main, des outils et une expertise unique pour transformer votre vision en succès.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn btn-navy">Nos Offres</button>
                            <button className="btn btn-outline-orange">Vendre mhp</button>
                        </div>

                        <div className="hero-trust-badge">
                            <div className="avatar-stack">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="avatar">
                                        <img src={`https://i.pravatar.cc/150?u=hero${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <div className="trust-info">
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="#FFD700" color="#FFD700" />)}
                                </div>
                                <span>Excellent - 500+ avis</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Overhaul - Sophisticated Geometry */}
                    <div className="hero-visual">
                        <div className="visual-geometry-stack">
                            <div className="geometry-square glass-base"></div>
                            <div className="geometry-square main-navy"></div>
                            <div className="geometry-square accent-azure"></div>

                            <div className="image-portal-premium">
                                <img src="/hero-dashboard-laptop.png" alt="Premium Dashboard" />
                                <div className="image-overlay-glow"></div>
                            </div>

                            <div className="floating-badge-elite">
                                <CheckCircle2 size={16} />
                                <span>Maintenance VIP Incluse</span>
                            </div>

                            <div className="deco-dot dot-1"></div>
                            <div className="deco-dot dot-2"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Feature Grid */}
                <div className="hero-feature-grid">
                    <div className="feature-box navy">
                        <div className="feature-icon-wrap">
                            <Globe size={24} />
                        </div>
                        <div className="feature-text">
                            <h4>Écosystème de Réussite</h4>
                            <p>Web Entrepreneurs™ allie innovation et accompagnement pour mettre à votre disposition une structure clé en main dédiée à la vente de services digitaux.</p>
                        </div>
                    </div>
                    <div className="feature-box orange">
                        <div className="feature-icon-wrap">
                            <Zap size={24} />
                        </div>
                        <div className="feature-text">
                            <h4>Agence Nouvelle Génération</h4>
                            <p>Un site web conçu pour soutenir vos démarches commerciales et votre stratégie digitale. Prête à l’usage, avec une livraison sous dix (10) jours.</p>
                        </div>
                    </div>
                    <div className="feature-box navy">
                        <div className="feature-icon-wrap">
                            <Users size={24} />
                        </div>
                        <div className="feature-text">
                            <h4>Prestataires Qualifiés</h4>
                            <p>Déléguez les prestations à des experts qualifiés, sélectionnés pour leur savoir-faire, afin de proposer des services digitaux d'excellence. 💼</p>
                        </div>
                    </div>
                    <div className="feature-box navy">
                        <div className="feature-icon-wrap">
                            <Target size={24} />
                        </div>
                        <div className="feature-text">
                            <h4>Espace Membre Exclusif</h4>
                            <p>Un guide structuré pour vous orienter. Rudy partage des méthodes, des retours d'expérience et des outils concrets pour vous accompagner pas à pas. 🎯</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
