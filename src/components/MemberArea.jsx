import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import './MemberArea.css';

const MemberArea = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayClick = () => {
        console.log("Play button clicked");
        setIsPlaying(true);
    };

    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play().catch(err => {
                console.error("Video play failed:", err);
            });
        }
    }, [isPlaying]);

    return (
        <section className="member-area">
            <div className="container">
                <div className="member-header">
                    <h2>Découvrez l'espace membre</h2>
                    <p>Votre portail central pour piloter votre agence digitale en toute simplicité.</p>
                </div>

                <div className="laptop-mockup">
                    {/* Laptop Screen */}
                    <div className="laptop-screen">
                        <div className="laptop-camera"></div>
                        <div className="laptop-content">
                            {!isPlaying ? (
                                <>
                                    {/* Preview Image/UI */}
                                    <div className="member-app-ui">
                                        <div className="app-sidebar">
                                            <div className="side-dot"></div>
                                            <div className="side-item"></div>
                                            <div className="side-item"></div>
                                            <div className="side-item"></div>
                                        </div>
                                        <div className="app-main">
                                            <div className="app-header">
                                                <div className="app-search">Sélectionner un service...</div>
                                            </div>
                                            <div className="app-content" onClick={handlePlayClick} style={{ cursor: 'pointer' }}>
                                                <div
                                                    className="play-button-central"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Play fill="white" color="white" size={32} />
                                                </div>
                                                <div className="app-footer-bar" style={{ pointerEvents: 'none' }}>
                                                    <div className="footer-icon"></div>
                                                    <span>Accès à l'espace membre personnalisé</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <video
                                    ref={videoRef}
                                    className="video-player"
                                    src="/assets/providers/video.mp4"
                                    title="Espace Membre Demo"
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', background: '#000' }}
                                ></video>
                            )}
                        </div>
                    </div>

                    {/* Laptop Base */}
                    <div className="laptop-base">
                        <div className="laptop-notch"></div>
                    </div>

                    {/* Laptop Bottom */}
                    <div className="laptop-bottom"></div>
                </div>
            </div>
        </section>
    );
};

export default MemberArea;
