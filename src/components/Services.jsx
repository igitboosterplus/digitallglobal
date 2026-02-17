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
                        <h3>Notre Solution Clé en Main</h3>
                        <p>Nous vous offrons une agence digitale de nouvelle génération, prête à l'emploi. Accédez à une élite de prestataires, strucutrez vos ventes de services avec nos méthodes éprouvées et déployez des outils puissants pour maximiser votre visibilité commerciale.</p>
                    </div>

                    <div className="solution-item">
                        <div className="sol-icon-top">
                            <BarChart3 size={24} color="var(--color-azure-main)" />
                        </div>
                        <h3>L'Écosystème Digitall Global</h3>
                        <p>Plus qu'un accès, un véritable environnement de réussite. Digitall Global vous arme d'outils de pointe et de stratégies terrain, mais c'est votre régularité et l'application de nos méthodes qui transformeront ces ressources en résultats concrets.</p>
                    </div>

                    <div className="solution-item">
                        <div className="sol-icon-top">
                            <Users size={24} color="var(--color-azure-main)" />
                        </div>
                        <h3>Pourquoi Cette Approche ?</h3>
                        <p>Le marché digital évolue vite, et l'improvisation n'a pas sa place. Nous apportons une méthodologie structurée pour ceux qui visent une croissance durable. Pas de promesse miracle, mais une feuille de route claire pour bâtir un business solide.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
