import React from 'react';
import './LegalPage.css';
import SEO from './SEO';

const LegalPage = ({ type }) => {
    const getContent = () => {
        switch (type) {
            case 'mentions':
                return {
                    title: 'Mentions Légales',
                    description: 'Informations légales concernant Digitall Global.',
                    content: (
                        <>
                            <h2>1. Présentation du site</h2>
                            <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site digitallglobal.com l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
                            <p><strong>Propriétaire :</strong> Digitall Global – France</p>
                            <p><strong>Responsable publication :</strong> Rudy – Contact@digitallglobal.com</p>
                            <p><strong>Hébergeur :</strong> Vercel Inc. – 340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>

                            <h2>2. Conditions générales d’utilisation du site et des services proposés</h2>
                            <p>L’utilisation du site digitallglobal.com implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment.</p>

                            <h2>3. Propriété intellectuelle et contrefaçons</h2>
                            <p>Digitall Global est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.</p>
                            <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : Digitall Global.</p>
                        </>
                    )
                };
            case 'cgv':
                return {
                    title: 'Conditions Générales de Vente (CGV)',
                    description: 'Consultez nos conditions générales de vente.',
                    content: (
                        <>
                            <h2>1. Objet</h2>
                            <p>Les présentes conditions générales de vente visent à définir les relations contractuelles entre Digitall Global et l'acheteur et les conditions applicables à tout achat effectué par le biais du site marchand digitallglobal.com.</p>

                            <h2>2. Tarifs</h2>
                            <p>Les prix figurant sur le site sont des prix TTC en euros tenant compte de la TVA applicable au jour de la commande ; tout changement du taux pourra être répercuté sur le prix des services.</p>

                            <h2>3. Commandes</h2>
                            <p>L’acheteur, qui souhaite acheter un produit ou un service doit obligatoirement :</p>
                            <ul>
                                <li>Remplir la fiche d’identification sur laquelle il indiquera toutes les coordonnées demandées ;</li>
                                <li>Valider sa commande après l’avoir vérifiée ;</li>
                                <li>Effectuer le paiement dans les conditions prévues ;</li>
                                <li>Confirmer sa commande et son règlement.</li>
                            </ul>
                        </>
                    )
                };
            case 'politique':
                return {
                    title: 'Politique de Confidentialité',
                    description: 'Votre vie privée est importante pour nous. Découvrez comment nous gérons vos données.',
                    content: (
                        <>
                            <h2>1. Collecte de l'information</h2>
                            <p>Nous recueillons des informations lorsque vous vous inscrivez sur notre site, lorsque vous vous connectez à votre compte, faites un achat, et / ou lorsque vous vous déconnectez.</p>

                            <h2>2. Utilisation des informations</h2>
                            <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                            <ul>
                                <li>Personnaliser votre expérience et répondre à vos besoins individuels ;</li>
                                <li>Fournir un contenu publicitaire personnalisé ;</li>
                                <li>Améliorer notre site Web ;</li>
                                <li>Améliorer le service client et vos besoins de prise en charge.</li>
                            </ul>

                            <h2>3. Confidentialité du commerce en ligne</h2>
                            <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quel raison, sans votre consentement.</p>
                        </>
                    )
                };
            default:
                return { title: 'Page Légale', description: 'Informations légales.', content: <p>Contenu en cours de rédaction.</p> };
        }
    };

    const { title, description, content } = getContent();

    return (
        <div className="legal-page">
            <SEO title={title} description={description} path={`/${type}`} />
            <div className="container">
                <header className="legal-header">
                    <h1>{title}</h1>
                    <div className="header-line"></div>
                </header>
                <div className="legal-content">
                    {content}
                </div>
                <div className="legal-footer">
                    <button onClick={() => window.history.back()} className="btn btn-secondary">Retour</button>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
