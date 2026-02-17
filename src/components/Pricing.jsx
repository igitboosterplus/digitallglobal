import React from 'react';
import { Rocket, Check, X, Award } from 'lucide-react';
import './Pricing.css';

const Pricing = ({ onOrder }) => {
    // Feature lists 
    const accessFeatures = [
        { text: "Votre Agence Digitale : Tout pour réussir", included: true },
        { text: "Liste de prestataires", included: true },
        { text: "Accès à votre espace membre dédié", included: true },
        { text: "Création d'un logo professionnel sur-mesure", included: true },
        { text: "4 services digitaux prêts à vendre dès aujourd'hui", included: true },
        { text: "3 packs métiers exclusifs pour vos clients", included: true },
        { text: "5 Tutoriels vidéos exclusifs", included: true },
        { text: "5 templates de campagnes publicitaires (édition 2025)", included: true },
        { text: "4 techniques gratuites pour acquérir vos premiers clients", included: true },
        { text: "Accès à des stratégies & ressources inédites", included: true },
        { text: "Installation complète sur notre hébergement", included: true },
        { text: "Accès à des bonus exclusifs", included: false },
        { text: "1 heure de coaching individuel", included: false },
        { text: "Accès administrateur immédiat", included: false },
        { text: "Accès direct a la Fondatrice", included: false },
        { text: "3 Mois de maintenance", included: false },
    ];

    const premiumFeatures = [
        { text: "Votre Agence Digitale : Tout pour réussir", included: true },
        { text: "Liste de prestataires premium", included: true },
        { text: "Accès à votre espace membre dédié", included: true },
        { text: "Création d'un logo professionnel sur-mesure", included: true },
        { text: "7 services digitaux prêts à vendre dès aujourd'hui", included: true },
        { text: "6 packs métiers exclusifs pour vos clients", included: true },
        { text: "10 Tutoriels vidéos exclusifs", included: true },
        { text: "8 templates de campagnes publicitaires (édition 2025)", included: true },
        { text: "4 techniques gratuites pour acquérir vos premiers clients", included: true },
        { text: "Accès à des stratégies & ressources inédites", included: true },
        { text: "1 heure de coaching individuel", included: true },
        { text: "Accès administrateur immédiat", included: true },
        { text: "Installation complète sur notre hébergement", included: true },
        { text: "Accès à des bonus exclusifs", included: true },
        { text: "Accès direct aux Fondateur", included: false },
        { text: "3 Mois de maintenance", included: false },

    ];

    const platiniumFeatures = [
        { text: "Votre Agence Digitale : Tout pour réussir", included: true },
        { text: "Liste de prestataires premium", included: true },
        { text: "Accès à votre espace membre dédié", included: true },
        { text: "Création d'un logo professionnel sur-mesure", included: true },
        { text: "+10 services digitaux prêts à vendre dès aujourd'hui", included: true },
        { text: "8 packs métiers exclusifs pour vos clients", included: true },
        { text: "+25 Tutoriels vidéos exclusifs", included: true },
        { text: "10 templates de campagnes publicitaires (édition 2025)", included: true },
        { text: "4 techniques gratuites pour acquérir vos premiers clients", included: true },
        { text: "Accès à des stratégies & ressources inédites", included: true },
        { text: "Accès administrateur immédiat", included: true },
        { text: "Installation complète sur notre hébergement", included: true },
        { text: "Accès à des bonus exclusifs", included: true },
        { text: "Accès direct a la Fondatrice", included: true },
        { text: "3 Mois de maintenance", included: true },
    ];


    return (
        <section className="pricing-section" id="tarifs">
            <div className="container">

                <div className="pricing-header">
                    <span className="section-label">INVESTISSEMENT & OFFRES</span>
                    <h2>Choisissez le plan adapté à votre <span className="text-gradient">ambition</span></h2>
                    <p>Trois niveaux d'accompagnement pour concrétiser votre projet d'agence.</p>
                </div>

                <div className="pricing-grid">

                    {/* ACCESS */}
                    <div className="pricing-card">
                        <div className="pricing-card-inner">
                            <h3>Offre Started</h3>
                            <div className="engagement-text">Engagement 6 mois</div>

                            <div className="price-block">
                                <span className="price-val">149€</span>
                                <span className="price-ht">HT / Mois</span>
                            </div>
                            <div className="sub-price">Pour un dbut prometeur et un accompagnement reussir</div>

                            <button
                                className="btn btn-navy btn-plan"
                                onClick={() => onOrder({ name: 'Offre Access', price: '149€', type: 'access', description: "Dès le 1er mois – Vous avez accès à votre espace membre pour découvrir les outils et la solution." })}
                            >
                                COMMANDER
                            </button>
                            <div className="tp-mini">
                                <span>Excellent</span> <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="stars" width="60" /> sur <strong>Trustpilot</strong>
                            </div>

                            <div className="features-list">
                                {accessFeatures.map((f, i) => (
                                    <div key={i} className={`feature-item ${!f.included ? 'excluded' : ''}`}>
                                        {f.included ? <Check size={16} className="check-icon" /> : <X size={16} className="cross-icon" />}
                                        <span>{f.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PREMIUM (Highlighted) */}
                    <div className="pricing-card premium">
                        <div className="popular-header">POPULAIRE</div>
                        <div className="pricing-card-inner">
                            <h3>Offre Pro</h3>
                            <div className="engagement-text">Annuelle</div>

                            <div className="price-block">
                                <span className="price-val">1599€</span>
                                <span className="price-ht">HT/Ans</span>
                            </div>

                            <div className="sub-desc premium-desc">
                                Une solution clé en main pour initier un projet d'agence web robuste et professionnel.
                            </div>

                            <button
                                className="btn btn-primary btn-plan"
                                onClick={() => onOrder({ name: 'Offre Premium', price: '1599€', type: 'premium', description: "Votre Agence Digitale Clé en Main. 8 modèles d'agences et 34 packs métier pour optimiser vos résultats." })}
                            >
                                COMMANDER
                            </button>
                            <div className="tp-mini">
                                <span>Excellent</span> <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="stars" width="60" /> sur <strong>Trustpilot</strong>
                            </div>

                            <div className="features-list">
                                {premiumFeatures.map((f, i) => (
                                    <div key={i} className={`feature-item ${!f.included ? 'excluded' : ''}`}>
                                        {f.included ? <Check size={16} className="check-icon" /> : <X size={16} className="cross-icon" />}
                                        <span>{f.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PLATINIUM */}
                    <div className="pricing-card">
                        <div className="pricing-card-inner">
                            <h3>Offre Prenium</h3>
                            <div className="engagement-text">Annuelle</div>

                            <div className="price-block">
                                <span className="price-val">2099€</span>
                                <span className="price-ht">HT/Ans</span>
                            </div>

                            <div className="sub-desc">
                                Un accompagnement et des ressources premium destinés à soutenir la montée en compétences...
                            </div>

                            <button
                                className="btn btn-navy btn-plan"
                                onClick={() => onOrder({ name: 'Offre Platinium', price: '2099€', type: 'platinium', description: "Un accompagnement ultime avec accès direct aux fondateurs." })}
                            >
                                COMMANDER
                            </button>
                            <div className="tp-mini">
                                <span>Excellent</span> <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="stars" width="60" /> sur <strong>Trustpilot</strong>
                            </div>

                            <div className="features-list">
                                {platiniumFeatures.map((f, i) => (
                                    <div key={i} className={`feature-item ${!f.included ? 'excluded' : ''}`}>
                                        {f.included ? <Check size={16} className="check-icon" /> : <X size={16} className="cross-icon" />}
                                        <span>{f.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Pricing;
