import React from 'react';
import { Globe, BarChart3, Users } from 'lucide-react';
import './Services.css';

const Services = () => {
    return (
        <section className="solution-section" id="solution">
            <div className="container">
                <div className="solution-header">
                    <h2>La Solution Digitall global</h2>
                    <p>Produit et services de haute performance ré-adaptés pour votre réussite en ligne.</p>
                </div>

                <div className="solution-triple-grid">
                    <div className="solution-item">
                        <div className="sol-icon-top">
                            <Globe size={24} color="var(--color-azure-main)" />
                        </div>
                        <h3>Accompagnement Digitale</h3>
                        <p>Contenu à remplir</p>
                    </div>

                    <div className="solution-item">
                        <div className="sol-icon-top">
                            <BarChart3 size={24} color="var(--color-azure-main)" />
                        </div>
                        <h3>Outils Analytique</h3>
                        <p>Contenu à remplir</p>
                    </div>

                    <div className="solution-item">
                        <div className="sol-icon-top">
                            <Users size={24} color="var(--color-azure-main)" />
                        </div>
                        <h3>Expertise RH</h3>
                        <p>Contenu à remplir</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
