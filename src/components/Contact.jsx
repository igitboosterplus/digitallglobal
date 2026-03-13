import React, { useState } from "react";
import { Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_3sbp81p", // remplace par ton service ID
            "template_99sk3py", // remplace par ton template ID
            formData,
            "DdwKfozQwPryVCO3u" // remplace par ta public key
        )
            .then(() => {
                alert("Message envoyé avec succès !");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
            })
            .catch((error) => {
                console.error(error);
                alert("Erreur lors de l'envoi.");
            });
    };

    return (
        <section className="contact-section" id="contact-form">
            <div className="container contact-container">

                <div className="contact-info">
                    <div className="contact-badge">DIGITALL GLOBAL</div>
                    <h2>Une question ?</h2>

                    <div className="contact-text">
                        <p>Vous avez des questions ou besoin d'informations supplémentaires ?</p>
                    </div>

                    <div className="email-card">
                        <div className="email-icon">
                            <Mail size={24} color="#6C5CE7" />
                        </div>

                        <div className="email-details">
                            <span className="email-label">Email</span>
                            <a href="mailto:contact@digitallglobal.com" className="email-link">
                                contact@digitallglobal.com
                            </a>
                        </div>

                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <h3>Réponse sous 24h</h3>

                    <form className="contact-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Nom"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Téléphone"
                                className="form-input"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                className="form-input form-textarea"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-submit">
                            ENVOYER
                        </button>

                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;