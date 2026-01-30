import React, { useState } from 'react';
import { Star, Send, User, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import Modal from './Modal';
import { validateComment } from '../utils/commentFilter';
import { useAuth } from '../context/AuthContext';
import './CommentModal.css';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
    const { userName } = useAuth();
    const [newComment, setNewComment] = useState({
        name: userName || '',
        rating: 5,
        content: ''
    });
    const [validationMessage, setValidationMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Valider le commentaire
        const validation = validateComment(newComment.rating, newComment.content);

        if (!validation.isValid) {
            setValidationMessage({
                type: 'error',
                text: validation.reason
            });
            return;
        }

        // Soumettre le commentaire
        onSubmit(newComment);

        // Afficher un message de succès
        setValidationMessage({
            type: 'success',
            text: 'Merci pour votre avis ! Il a été publié avec succès.'
        });

        // Réinitialiser le formulaire et fermer après un délai
        setTimeout(() => {
            setNewComment({ name: userName || '', rating: 5, content: '' });
            setValidationMessage(null);
            onClose();
        }, 2000);
    };

    const handleClose = () => {
        setNewComment({ name: userName || '', rating: 5, content: '' });
        setValidationMessage(null);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="comment-modal-container">
                <div className="comment-modal-header">
                    <h3>Laissez un commentaire</h3>
                    <p>Votre avis compte énormément pour nous et pour la communauté.</p>
                </div>

                {validationMessage && (
                    <div className={`validation-message ${validationMessage.type}`}>
                        {validationMessage.type === 'error' ? (
                            <AlertCircle size={20} />
                        ) : (
                            <CheckCircle size={20} />
                        )}
                        <span>{validationMessage.text}</span>
                    </div>
                )}

                <form className="comment-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="input-group">
                            <label><User size={16} /> Votre Nom</label>
                            <input
                                type="text"
                                placeholder="Ex: Jean Dupont"
                                value={newComment.name}
                                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label><Star size={16} /> Note</label>
                            <select
                                value={newComment.rating}
                                onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value) })}
                            >
                                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} étoiles</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="input-group full-width">
                        <label><MessageSquare size={16} /> Votre message</label>
                        <textarea
                            placeholder="Partagez votre expérience..."
                            rows="4"
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-navy submit-btn">
                        Envoyer mon avis <Send size={16} />
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default CommentModal;
