import React from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-custom">
            <div className="container">
                <div className="footer-split-custom">
                    <div className="footer-col-main">
                        <div className="footer-logo">Digitall <span>global</span></div>
                        <p>L'écosystème premium pour propulser votre réussite digitale avec une approche clé en main.</p>
                    </div>

                    <div className="footer-col-links">
                        <h4>Liens</h4>
                        <ul>
                            <li><a href="#tarifs">Nos Offres</a></li>
                            <li><a href="#solution">Accès Clients</a></li>
                            <li><a href="#faq">Questions</a></li>
                        </ul>
                    </div>

                    <div className="footer-col-links">
                        <h4>Info</h4>
                        <ul>
                            <li><Link to="/mentions">Mentions légales</Link></li>
                            <li><Link to="/cgv">CGV</Link></li>
                            <li><Link to="/politique">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col-social">
                        <h4>Suivez-nous</h4>
                        <div className="social-row">
                            <Twitter size={20} />
                            <Instagram size={20} />
                            <Facebook size={20} />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-custom">
                    <p>&copy; {new Date().getFullYear()} Digitall global. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
