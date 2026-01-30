import React from 'react';
import { Star } from 'lucide-react';
import './Mission.css';

const Mission = () => {
    return (
        <section className="mission-section">
            <div className="container">
                <div className="mission-split">
                    {/* Left: Visual Content */}
                    <div className="mission-visual">
                        <div className="mission-circle-wrap">
                            <div className="mission-circle">
                                <div className="circle-pattern"></div>
                            </div>
                            <div className="mission-rating-box">
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#4ADE80" color="#4ADE80" />)}
                                </div>
                                <p>"Vrai révolution digitale"</p>
                                <span>Salma - CEO Tech</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="mission-info">
                        <h2>Notre mission</h2>
                        <p className="mission-tagline">Chez Digitall Global™, notre mission va au-delà des chiffres et des modèles.
                            Nous accompagnons celles et ceux qui souhaitent construire un projet professionnel qui leur ressemble, en s’appuyant sur une structure claire, des méthodes éprouvées et un cadre structuré.

                            Grâce à une solution clé en main, conçue à partir de plus de dix années d’expérience, nous mettons à disposition des outils, des ressources et un accompagnement pensés pour structurer et développer une activité de services digitaux.

                            Notre approche vise à offrir un cadre de travail flexible, en phase avec les nouveaux usages du digital, tout en encourageant la création de projets durables, responsables et pérennes.

                            Parce que nous croyons qu’il est essentiel de rendre les opportunités du digital accessibles, dans un environnement en constante évolution.</p>

                        <div className="mission-numbers">
                            <div className="number-item">
                                <div className="num-box">1</div>
                                <div className="num-text">
                                    <h4>Liberté Totale</h4>
                                    <p>Devenez votre propre patron avec une flexibilité totale.</p>
                                </div>
                            </div>
                            <div className="number-item">
                                <div className="num-box">2</div>
                                <div className="num-text">
                                    <h4>Modèle Économique</h4>
                                    <p>Un business model prouvé pour une rentabilité maximale.</p>
                                </div>
                            </div>
                            <div className="number-item">
                                <div className="num-box">3</div>
                                <div className="num-text">
                                    <h4>VIP Entreprise</h4>
                                    <p>Un accompagnement haut de gamme pour votre croissance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
