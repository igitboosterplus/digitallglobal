import React, { useState } from 'react';
import { Star, MessageSquare, LogIn } from 'lucide-react';
import CommentModal from './CommentModal';
import { useAuth } from '../context/AuthContext';
import './Testimonials.css';

const Testimonials = () => {
    const { isSubscribed, toggleSubscription } = useAuth();
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const [reviews, setReviews] = useState([
        {
            name: "Thomas D.",
            rating: 5,
            title: "Une agence au top !",
            content: "L'équipe est super réactive et le site livré est juste magnifique. Je recommande à 100% pour ceux qui veulent se lancer sans prise de tête.",
            date: "Il y a 2 jours"
        },
        {
            name: "Sarah M.",
            rating: 5,
            title: "Game changer",
            content: "J'hésitais à me lancer, mais leur accompagnement m'a rassuré. J'ai eu mon premier client 2 semaines après le lancement.",
            date: "Il y a 1 semaine"
        },
        {
            name: "Alexandre P.",
            rating: 5,
            title: "Professionnalisme exemplaire",
            content: "Tout est clé en main comme promis. Le support répond vite et les outils fournis sont très qualitatifs.",
            date: "Il y a 3 semaines"
        },
        {
            name: "Julie L.",
            rating: 5,
            title: "Accompagnement incroyable",
            content: "Je ne connaissais rien au digital, aujourd'hui j'ai ma propre structure et des revenus réguliers. Merci !",
            date: "Il y a 1 mois"
        },
        {
            name: "Marc R.",
            rating: 5,
            title: "Sérieux et efficace",
            content: "Le concept est génial. On gagne un temps fou sur la mise en place technique pour se concentrer sur les clients.",
            date: "Il y a 2 mois"
        }
    ]);

    const handleCommentSubmit = (newComment) => {
        const date = "À l'instant";
        setReviews([{ ...newComment, title: "Nouveau commentaire", date }, ...reviews]);
    };

    const handleCommentButtonClick = () => {
        if (isSubscribed) {
            setIsCommentModalOpen(true);
        } else {
            toggleSubscription();
        }
    };

    // Réduction du défilement : 2x au lieu de 4x
    const displayReviews = [...reviews, ...reviews];

    return (
        <section className="testimonials-section" id="avis">
            <div className="container">
                <div className="testimonials-header">
                    <span className="section-label">Témoignages</span>
                    <h2>Ce que disent nos <span className="blue-text">preneurs</span></h2>
                    <p>Découvrez les retours d'expérience de ceux qui ont osé franchir le pas.</p>
                </div>
            </div>

            <div className="infinite-scroll-container">
                <div className="scroll-track">
                    {displayReviews.map((review, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="card-top">
                                <div className="stars-row">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? "#FFD700" : "transparent"}
                                            color={i < review.rating ? "#FFD700" : "#CBD5E1"}
                                        />
                                    ))}
                                </div>
                                <span className="review-date">{review.date}</span>
                            </div>
                            <p className="review-content">"{review.content}"</p>
                            <div className="author-info">
                                <span className="author-name">{review.name}</span>
                                <span className="verified-text">Client vérifié</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container">
                <div className="comment-action-container">
                    {isSubscribed ? (
                        <button
                            className="btn btn-comment-primary"
                            onClick={handleCommentButtonClick}
                        >
                            <MessageSquare size={20} />
                            Laisser un avis
                        </button>
                    ) : (
                        <button
                            className="btn btn-comment-secondary"
                            onClick={handleCommentButtonClick}
                        >
                            <LogIn size={20} />
                            Se connecter pour laisser un avis
                        </button>
                    )}
                </div>
            </div>

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                onSubmit={handleCommentSubmit}
            />
        </section>
    );
};

export default Testimonials;
