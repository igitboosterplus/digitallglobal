import React from 'react';
import { Play } from 'lucide-react';
import './AgenciesSection.css';

const AgenciesSection = () => {
    const agencies = [
        { id: 1, name: "Nutrition" },
        { id: 2, name: "Spa" },
        { id: 3, name: "Real Estate" },
        { id: 4, name: "Crypto" },
        { id: 5, name: "Fashion" },
        { id: 6, name: "Auto" },
        { id: 7, name: "Food" },
        { id: 8, name: "Travel" }
    ];

    return (
        <section className="agencies-section">
            <div className="container">
                <div className="agencies-split">
                    {/* Left: Content */}
                    <div className="agencies-content">
                        <h2>
                            Découvrez votre agence digitale clé en main
                            <span className="subtitle-tip">(cliquer sur les agences ci-dessous pour accéder à la démo)</span>
                        </h2>

                        <button className="btn btn-azure-rounded">
                            Découvrez tout court
                        </button>

                        <div className="agencies-notice">
                            <div className="notice-dot"></div>
                            <span>NOS MODÈLES SONT MIS À JOUR</span>
                        </div>
                    </div>

                    {/* Right: Grid */}
                    <div className="agencies-grid-wrap">
                        <div className="agencies-mock-grid">
                            {agencies.map((agency) => (
                                <div key={agency.id} className="agency-mock-card">
                                    <div className="mock-badge">NEW</div>
                                    <div className="mock-image">
                                        <div className="mock-overlay">
                                            <Play size={16} fill="white" />
                                        </div>
                                    </div>
                                    <div className="mock-number">{agency.id}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AgenciesSection;
