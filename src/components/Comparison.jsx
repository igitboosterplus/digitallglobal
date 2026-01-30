import React from 'react';
import { X, Check } from 'lucide-react';
import './Comparison.css';

const Comparison = () => {
    return (
        <section className="comparison" id="comparison">
            <div className="container">
                <div className="section-header text-center">
                    <span className="subtitle">L'ÉCOSYSTÈME COMPLET</span>
                    <h2>Une solution pensée pour être <span className="highlight-text">accessible</span></h2>
                    <p className="description">Nous avons simplifié tout ce qui pouvait l'être pour vous permettre de réussir.</p>
                </div>

                <div className="comparison-grid">
                    {/* Card 1: Traditional Method */}
                    <div className="compare-card traditional">
                        <div className="card-badge-top">Agence Classique</div>
                        <ul>
                            <li className="negative"><X size={18} /> Investissement lourd (5k€+)</li>
                            <li className="negative"><X size={18} /> Compétences techniques requises</li>
                            <li className="negative"><X size={18} /> Gestion de projet complexe</li>
                            <li className="negative"><X size={18} /> Délai de mise en place long</li>
                            <li className="negative"><X size={18} /> Risque financier élevé</li>
                        </ul>
                    </div>

                    {/* Card 2: Web Entrepreneurs Method */}
                    <div className="compare-card we-solution">
                        <div className="card-badge-top active">Notre Écosystème</div>
                        <ul>
                            <li className="positive"><Check size={18} /> Investissement maîtrisé</li>
                            <li className="positive"><Check size={18} /> Aucune compétence technique</li>
                            <li className="positive"><Check size={18} /> Tout est déjà prêt (Clé en main)</li>
                            <li className="positive"><Check size={18} /> Lancement en 7 jours ou moins</li>
                            <li className="positive"><Check size={18} /> Risque quasi-nul (Garantie)</li>
                        </ul>
                    </div>

                    {/* Card 3: Another feature stack or summary */}
                    <div className="compare-card feature-stack">
                        <div className="card-icon">🚀</div>
                        <h3>Prêt à décoller ?</h3>
                        <p>Rejoignez des centaines d'entrepreneurs qui ont fait le choix de la liberté.</p>
                        <button className="btn btn-primary btn-full">Commencer maintenant</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
