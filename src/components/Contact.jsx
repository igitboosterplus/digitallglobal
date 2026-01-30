import React from 'react';
import { Mail } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section" id="contact-form">
            <div className="container contact-container">

                {/* Left Column: Info */}
                <div className="contact-info">
                    <div className="contact-badge">DIGITALL GLOBAL</div>
                    <h2>Une question ?</h2>

                    <div className="contact-text">
                        <p>Vous avez des questions, des commentaires ou besoin d'informations supplémentaires ?</p>
                        <p>Nous sommes là pour vous aider. N'hésitez pas à nous contacter via le formulaire ou en utilisant les coordonnées ci-contre. Notre équipe se fera un plaisir de vous répondre dans les plus brefs délais.</p>
                        <p>Chez Global digital™, nous croyons en la puissance de la communication. Votre réussite est notre priorité, et nous sommes là pour vous accompagner à chaque étape de votre aventure entrepreneuriale. Alors, n'hésitez pas à entrer en contact avec nous. Nous avons hâte de vous entendre.</p>
                    </div>

                    <div className="email-card">
                        <div className="email-icon">
                            <Mail size={24} color="#6C5CE7" />
                        </div>
                        <div className="email-details">
                            <span className="email-label">Email</span>
                            <a href="mailto:devenir@web-entrepreneurs.com" className="email-link">devenir@web-entrepreneurs.com</a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="contact-form-wrapper">
                    <h3>Réponse sous 24h</h3>
                    <form className="contact-form">
                        <div className="form-group">
                            <input type="text" placeholder="Nom" className="form-input" />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" className="form-input" />
                        </div>
                        <div className="form-group">
                            <input type="tel" placeholder="Téléphone" className="form-input" />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Message" className="form-input form-textarea"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-submit">ENVOYER</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;
