import React from 'react';
import './ProvidersSection.css';

const ProvidersSection = () => {
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const providerImages = [
        "/assets/providers/provider-1.png",
        "/assets/providers/provider-2.png",
        "/assets/providers/provider-3.png",
        "/assets/providers/provider-4.png",
        "/assets/providers/provider-5.png",
        "/assets/providers/provider-1.png", // Repeats for fullness if needed
        "/assets/providers/provider-2.png",
        "/assets/providers/provider-3.png",
    ];

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % providerImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + providerImages.length) % providerImages.length);
    };

    return (
        <section className="providers-section">
            <div className="container">
                <div className="providers-header">
                    <h2>Accédez aux prestataires <span className="blue-text">Digitall global</span></h2>
                </div>

                <div className="providers-gallery-grid">
                    {providerImages.map((img, i) => (
                        <div key={i} className="provider-gallery-item" onClick={() => openLightbox(i)}>
                            <img src={img} alt={`Provider ${i + 1}`} loading="lazy" />
                            <div className="gallery-overlay">
                                <span>Voir</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {lightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}> ✕</button>

                        <div className="lightbox-main">
                            <button className="lightbox-nav prev" onClick={prevImage}>❮</button>
                            <div className="lightbox-image-container">
                                <img src={providerImages[currentImageIndex]} alt="Provider Full" />
                            </div>
                            <button className="lightbox-nav next" onClick={nextImage}>❯</button>
                        </div>

                        <div className="lightbox-footer">
                            <p>Prestataire {currentImageIndex + 1} / {providerImages.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProvidersSection;
