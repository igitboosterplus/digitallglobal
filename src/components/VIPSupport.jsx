import React from 'react';
import { Check } from 'lucide-react';
import './VIPSupport.css';

const VIPSupport = () => {
    return (
        <section className="vip-support-section">
            <div className="container">
                <div className="vip-split">
                    {/* Left: Content */}
                    <div className="vip-info">
                        <div className="vip-badge-custom">LE VIP SUPPORT</div>
                        <h2>Accompagnement VIP</h2>
                        <p>Bénéficiez d'un accompagnement intensif pour apprendre et maîtriser l'art de prendre en main votre propre agence. Nos coachs experts sont là pour vous guider pas à pas dans vos succès.</p>

                        <ul className="vip-list-custom">
                            <li><Check size={18} color="#00A3FF" strokeWidth={3} /> Plan d'action personnalisé</li>
                            <li><Check size={18} color="#00A3FF" strokeWidth={3} /> Coaching hebdomadaire</li>
                            <li><Check size={18} color="#00A3FF" strokeWidth={3} /> Support prioritaire 24/7</li>
                        </ul>

                        <button className="btn btn-azure-rounded">
                            Réserver votre place
                        </button>
                    </div>

                    {/* Right: Visual */}
                    <div className="vip-visual-custom">
                        <div className="vip-box-graphic">
                            <div className="vip-icon-placeholder">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="vip-floating-card">
                                <span>Votre accompagnement VIP commence ici <br /> <strong>(cliquez pour prendre rendez-vous)</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VIPSupport;
