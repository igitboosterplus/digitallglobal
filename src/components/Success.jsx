import React, { useEffect, useState } from 'react';
import { CheckCircle, Mail, ArrowRight, Loader } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import './Success.css';

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (sessionId) {
            // Vérifier et traiter le paiement automatiquement
            verifyPayment();
        } else {
            setError("Session ID manquant");
            setProcessing(false);
        }
    }, [sessionId]);

    const verifyPayment = async () => {
        try {
            console.log('🔍 Vérification du paiement...');

            const response = await fetch(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/payment/verify-session/${sessionId}`
            );

            const data = await response.json();

            if (data.success) {
                console.log('✅ Paiement traité avec succès!');
                setProcessing(false);
            } else {
                console.error('❌ Paiement non complété:', data.message);
                setError(data.message);
                setProcessing(false);
            }
        } catch (err) {
            console.error('❌ Erreur lors de la vérification:', err);
            setError(`Erreur de vérification : ${err.message || 'Serveur injoignable'}`);
            setProcessing(false);
        }
    };

    if (processing) {
        return (
            <div className="success-page">
                <div className="success-card">
                    <div className="success-icon">
                        <Loader size={64} color="#0099CC" className="spinner" />
                    </div>
                    <h1 className="success-title">Traitement en cours...</h1>
                    <p className="success-message">
                        Nous finalisons votre commande et préparons vos accès.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="success-page">
                <div className="success-card">
                    <h1 className="success-title">Une erreur est survenue</h1>
                    <p className="success-message">{error}</p>
                    <button
                        className="back-home-btn"
                        onClick={() => window.location.href = '/'}
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="success-page">
            <div className="success-card">
                <div className="success-icon">
                    <CheckCircle size={64} color="#10b981" />
                </div>

                <h1 className="success-title">Paiement Réussi !</h1>
                <p className="success-message">
                    Merci pour votre confiance. Votre commande a été traitée avec succès.
                </p>

                <div className="info-box">
                    <div className="info-icon">
                        <Mail size={24} color="#0099CC" />
                    </div>
                    <div className="info-text">
                        <h3>Vérifiez votre boîte mail</h3>
                        <p>
                            Vos identifiants de connexion et les détails de votre commande viennent de vous être envoyés par email.
                            <strong> Pensez à vérifier vos courriers indésirables (spams)</strong> si vous ne voyez rien d'ici quelques minutes.
                        </p>
                    </div>
                </div>

                <div className="next-steps">
                    <h4>Prochaines étapes :</h4>
                    <ul>
                        <li>1. Ouvrez l'email de bienvenue "Digitall Global".</li>
                        <li>2. Utilisez le lien et le mot de passe temporaire fournis.</li>
                        <li>3. Changez votre mot de passe à la première connexion.</li>
                    </ul>
                </div>

                <button
                    className="back-home-btn"
                    onClick={() => window.location.href = '/'}
                >
                    Retour à l'accueil <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

export default Success;
