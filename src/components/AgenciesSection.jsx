import React from 'react';
import { Play } from 'lucide-react';
import './AgenciesSection.css';

const AgenciesSection = () => {
    const [previewUrl, setPreviewUrl] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const agencies = [
        { id: 1, name: "Orich Solutions", url: "https://oritchsolutions.com" },
        { id: 2, name: "Nutrition Expert", url: "#" },
        { id: 3, name: "Spa & Bien-être", url: "#" },
        { id: 4, name: "Immobilier Pro", url: "#" },
        { id: 5, name: "Crypto Vision", url: "#" },
        { id: 6, name: "Mode & Style", url: "#" },
        { id: 7, name: "Auto Moto", url: "#" },
        { id: 8, name: "Food Delivery", url: "#" }
    ];

    const handlePreview = (url) => {
        if (url === "#") return;
        setPreviewUrl(url);
        setIsLoading(true);
        // On simule un temps de chargement pour montrer le logo
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    };

    const closePreview = () => {
        setPreviewUrl(null);
        setIsLoading(false);
    };

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
                                <div
                                    key={agency.id}
                                    className="agency-mock-card"
                                    onClick={() => handlePreview(agency.url)}
                                >
                                    <div className="mock-badge">{agency.url === "#" ? "MODÈLE" : "PARTENAIRE"}</div>
                                    <div className="mock-image">
                                        {agency.url !== "#" ? (
                                            <img
                                                src={`https://api.microlink.io/?url=${agency.url}&screenshot=true&meta=false&embed=screenshot.url`}
                                                alt={agency.name}
                                                className="mock-screenshot"
                                            />
                                        ) : (
                                            <div className="mock-placeholder">
                                                <span>Aperçu de l'agence</span>
                                            </div>
                                        )}
                                        <div className="mock-overlay">
                                            <Play size={24} fill="white" />
                                            <span className="view-text">Explorer l'agence</span>
                                        </div>
                                    </div>
                                    <div className="mock-number">{agency.id}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Site Preview Modal */}
            {previewUrl && (
                <div className="site-preview-modal">
                    <div className="preview-overlay" onClick={closePreview}></div>
                    <div className="preview-container">
                        <button className="preview-close" onClick={closePreview}>×</button>

                        {isLoading ? (
                            <div className="preview-loader">
                                <img src="/logo-digitall.png" alt="Digitall Global" className="loader-logo" />
                                <div className="loader-spinner"></div>
                                <p>Préparation de votre agence...</p>
                            </div>
                        ) : (
                            <iframe
                                src={previewUrl}
                                title="Site Preview"
                                className="preview-iframe"
                                frameBorder="0"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default AgenciesSection;
