import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            question: "Quels sont les prérequis pour commencer ?",
            answer: "Aucun prérequis technique n'est nécessaire. Un ordinateur, une connexion internet et votre motivation sont suffisants."
        },
        {
            question: "Le modèle est-il adapté aux débutants ?",
            answer: "Absolument. Tout a été conçu pour accompagner les débutants de A à Z avec des outils simplifiés et une méthodologie éprouvée."
        },
        {
            question: "En combien de temps puis-je lancer mon agence ?",
            answer: "La plupart de nos membres lancent leur agence en moins de 30 jours grâce à notre approche clé en main."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="faq-section-custom">
            <div className="container">
                <div className="faq-split-custom">
                    {/* Left: Accordion */}
                    <div className="faq-main-custom">
                        <h2>Questions fréquentes.</h2>
                        <div className="faq-list-custom">
                            {faqs.map((faq, index) => (
                                <div key={index} className={`faq-item-custom ${openIndex === index ? 'open' : ''}`}>
                                    <button
                                        className="faq-q-btn"
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    >
                                        <span>{faq.question}</span>
                                        {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                    </button>
                                    <div className="faq-a-box">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Contact Card */}
                    <div className="faq-side-card">
                        <div className="side-card-inner">
                            <h3>Vous ne trouvez pas de réponse dans notre FAQ ?</h3>
                            <p>Contactez-nous directement pour une réponse personnalisée sous 24h.</p>

                            <div className="phone-wrapper">
                                <Phone size={18} color="var(--color-azure-main)" />
                                <span>+33 6 98 07 56 74</span>
                            </div>

                            <button className="btn btn-orange-rounded">
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
