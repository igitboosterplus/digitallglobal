import React from 'react';
import './HeroExtras.css';

const HeroExtras = () => {
    const cards = [
        { title: "Contenu à remplir", color: "#1A1A37" },
        { title: "Contenu à remplir", color: "#FF6B4A" },
        { title: "Contenu à remplir", color: "#1A1A37" },
        { title: "Contenu à remplir", color: "#1A1A37" }
    ];

    return (
        <section className="hero-extras">
            <div className="container">
                <div className="extras-grid">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="extra-card"
                            style={{ backgroundColor: card.color }}
                        >
                            <span className="extra-text">{card.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroExtras;
