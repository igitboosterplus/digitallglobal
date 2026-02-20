import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import './Checkout.css';

const Checkout = ({ plan, onClose }) => {
    const [formData, setFormData] = useState({
        type: 'particulier',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        phoneCode: '+33',
        address: '',
        zip: '',
        city: '',
        country: 'France',
        companyName: '',
        vatNumber: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        paymentMethod: 'card',
        terms: false
    });

    const [upsell, setUpsell] = useState(false);

    // Comprehensive list of countries and dial codes
    const countries = [
        { name: "Afghanistan", code: "+93" },
        { name: "Afrique du Sud", code: "+27" },
        { name: "Albanie", code: "+355" },
        { name: "Algérie", code: "+213" },
        { name: "Allemagne", code: "+49" },
        { name: "Andorre", code: "+376" },
        { name: "Angola", code: "+244" },
        { name: "Arabie saoudite", code: "+966" },
        { name: "Argentine", code: "+54" },
        { name: "Arménie", code: "+374" },
        { name: "Australie", code: "+61" },
        { name: "Autriche", code: "+43" },
        { name: "Azerbaïdjan", code: "+994" },
        { name: "Bahamas", code: "+1-242" },
        { name: "Bahreïn", code: "+973" },
        { name: "Bangladesh", code: "+880" },
        { name: "Barbade", code: "+1-246" },
        { name: "Belgique", code: "+32" },
        { name: "Belize", code: "+501" },
        { name: "Bénin", code: "+229" },
        { name: "Bhoutan", code: "+975" },
        { name: "Biélorussie", code: "+375" },
        { name: "Birmanie", code: "+95" },
        { name: "Bolivie", code: "+591" },
        { name: "Bosnie-Herzégovine", code: "+387" },
        { name: "Botswana", code: "+267" },
        { name: "Brésil", code: "+55" },
        { name: "Brunei", code: "+673" },
        { name: "Bulgarie", code: "+359" },
        { name: "Burkina Faso", code: "+226" },
        { name: "Burundi", code: "+257" },
        { name: "Cambodge", code: "+855" },
        { name: "Cameroun", code: "+237" },
        { name: "Canada", code: "+1" },
        { name: "Cap-Vert", code: "+238" },
        { name: "Chili", code: "+56" },
        { name: "Chine", code: "+86" },
        { name: "Chypre", code: "+357" },
        { name: "Colombie", code: "+57" },
        { name: "Comores", code: "+269" },
        { name: "Congo (Brazzaville)", code: "+242" },
        { name: "Congo (Kinshasa)", code: "+243" },
        { name: "Corée du Nord", code: "+850" },
        { name: "Corée du Sud", code: "+82" },
        { name: "Costa Rica", code: "+506" },
        { name: "Côte d'Ivoire", code: "+225" },
        { name: "Croatie", code: "+385" },
        { name: "Cuba", code: "+53" },
        { name: "Danemark", code: "+45" },
        { name: "Djibouti", code: "+253" },
        { name: "Dominique", code: "+1-767" },
        { name: "Égypte", code: "+20" },
        { name: "Émirats arabes unis", code: "+971" },
        { name: "Équateur", code: "+593" },
        { name: "Érythrée", code: "+291" },
        { name: "Espagne", code: "+34" },
        { name: "Estonie", code: "+372" },
        { name: "États-Unis", code: "+1" },
        { name: "Éthiopie", code: "+251" },
        { name: "Fidji", code: "+679" },
        { name: "Finlande", code: "+358" },
        { name: "France", code: "+33" },
        { name: "Gabon", code: "+241" },
        { name: "Gambie", code: "+220" },
        { name: "Géorgie", code: "+995" },
        { name: "Ghana", code: "+233" },
        { name: "Grèce", code: "+30" },
        { name: "Grenade", code: "+1-473" },
        { name: "Guatemala", code: "+502" },
        { name: "Guinée", code: "+224" },
        { name: "Guinée-Bissau", code: "+245" },
        { name: "Guinée équatoriale", code: "+240" },
        { name: "Guyana", code: "+592" },
        { name: "Haïti", code: "+509" },
        { name: "Honduras", code: "+504" },
        { name: "Hongrie", code: "+36" },
        { name: "Inde", code: "+91" },
        { name: "Indonésie", code: "+62" },
        { name: "Irak", code: "+964" },
        { name: "Iran", code: "+98" },
        { name: "Irlande", code: "+353" },
        { name: "Islande", code: "+354" },
        { name: "Israël", code: "+972" },
        { name: "Italie", code: "+39" },
        { name: "Jamaïque", code: "+1-876" },
        { name: "Japon", code: "+81" },
        { name: "Jordanie", code: "+962" },
        { name: "Kazakhstan", code: "+7" },
        { name: "Kenya", code: "+254" },
        { name: "Kirghizistan", code: "+996" },
        { name: "Kiribati", code: "+686" },
        { name: "Koweït", code: "+965" },
        { name: "Laos", code: "+856" },
        { name: "Lesotho", code: "+266" },
        { name: "Lettonie", code: "+371" },
        { name: "Liban", code: "+961" },
        { name: "Liberia", code: "+231" },
        { name: "Libye", code: "+218" },
        { name: "Liechtenstein", code: "+423" },
        { name: "Lituanie", code: "+370" },
        { name: "Luxembourg", code: "+352" },
        { name: "Macédoine du Nord", code: "+389" },
        { name: "Madagascar", code: "+261" },
        { name: "Malaisie", code: "+60" },
        { name: "Malawi", code: "+265" },
        { name: "Maldives", code: "+960" },
        { name: "Mali", code: "+223" },
        { name: "Malte", code: "+356" },
        { name: "Maroc", code: "+212" },
        { name: "Marshall", code: "+692" },
        { name: "Maurice", code: "+230" },
        { name: "Mauritanie", code: "+222" },
        { name: "Mexique", code: "+52" },
        { name: "Micronésie", code: "+691" },
        { name: "Moldavie", code: "+373" },
        { name: "Monaco", code: "+377" },
        { name: "Mongolie", code: "+976" },
        { name: "Monténégro", code: "+382" },
        { name: "Mozambique", code: "+258" },
        { name: "Namibie", code: "+264" },
        { name: "Nauru", code: "+674" },
        { name: "Népal", code: "+977" },
        { name: "Nicaragua", code: "+505" },
        { name: "Niger", code: "+227" },
        { name: "Nigeria", code: "+234" },
        { name: "Norvège", code: "+47" },
        { name: "Nouvelle-Zélande", code: "+64" },
        { name: "Oman", code: "+968" },
        { name: "Ouganda", code: "+256" },
        { name: "Ouzbékistan", code: "+998" },
        { name: "Pakistan", code: "+92" },
        { name: "Palaos", code: "+680" },
        { name: "Panama", code: "+507" },
        { name: "Papouasie-Nouvelle-Guinée", code: "+675" },
        { name: "Paraguay", code: "+595" },
        { name: "Pays-Bas", code: "+31" },
        { name: "Pérou", code: "+51" },
        { name: "Philippines", code: "+63" },
        { name: "Pologne", code: "+48" },
        { name: "Portugal", code: "+351" },
        { name: "Qatar", code: "+974" },
        { name: "République centrafricaine", code: "+236" },
        { name: "République dominicaine", code: "+1-809" },
        { name: "Roumanie", code: "+40" },
        { name: "Royaume-Uni", code: "+44" },
        { name: "Russie", code: "+7" },
        { name: "Rwanda", code: "+250" },
        { name: "Saint-Christophe-et-Niévès", code: "+1-869" },
        { name: "Sainte-Lucie", code: "+1-758" },
        { name: "Saint-Marin", code: "+378" },
        { name: "Saint-Vincent-et-les-Grenadines", code: "+1-784" },
        { name: "Salomon", code: "+677" },
        { name: "Salvador", code: "+503" },
        { name: "Samoa", code: "+685" },
        { name: "São Tomé-et-Príncipe", code: "+239" },
        { name: "Sénégal", code: "+221" },
        { name: "Serbie", code: "+381" },
        { name: "Seychelles", code: "+248" },
        { name: "Sierra Leone", code: "+232" },
        { name: "Singapour", code: "+65" },
        { name: "Slovaquie", code: "+421" },
        { name: "Slovénie", code: "+386" },
        { name: "Somalie", code: "+252" },
        { name: "Soudan", code: "+249" },
        { name: "Soudan du Sud", code: "+211" },
        { name: "Sri Lanka", code: "+94" },
        { name: "Suède", code: "+46" },
        { name: "Suisse", code: "+41" },
        { name: "Suriname", code: "+597" },
        { name: "Syrie", code: "+963" },
        { name: "Tadjikistan", code: "+992" },
        { name: "Tanzanie", code: "+255" },
        { name: "Tchad", code: "+235" },
        { name: "Tchéquie", code: "+420" },
        { name: "Thaïlande", code: "+66" },
        { name: "Timor oriental", code: "+670" },
        { name: "Togo", code: "+228" },
        { name: "Tonga", code: "+676" },
        { name: "Trinité-et-Tobago", code: "+1-868" },
        { name: "Tunisie", code: "+216" },
        { name: "Turkménistan", code: "+993" },
        { name: "Turquie", code: "+90" },
        { name: "Tuvalu", code: "+688" },
        { name: "Ukraine", code: "+380" },
        { name: "Uruguay", code: "+598" },
        { name: "Vanuatu", code: "+678" },
        { name: "Vatican", code: "+379" },
        { name: "Venezuela", code: "+58" },
        { name: "Vietnam", code: "+84" },
        { name: "Yémen", code: "+967" },
        { name: "Zambie", code: "+260" },
        { name: "Zimbabwe", code: "+263" }
    ];

    // Calculate totals
    const vatRate = 0.20;
    const basePrice = plan ? parseFloat(plan.price.replace('€', '').trim()) : 0;
    const upsellPrice = 379; // Pack référence upsell price

    let subtotal = basePrice;
    if (upsell) subtotal += upsellPrice;

    const vatAmount = subtotal * vatRate;
    const total = subtotal + vatAmount;

    // Helper to format currency
    const formatPrice = (p) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(p);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.terms) {
            alert("Veuillez accepter les conditions générales de vente.");
            return;
        }

        setLoading(true);

        try {
            // 🔒 Sécurité : On force le HTTPS si on est en production sur Vercel
            let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            if (apiUrl.includes('vercel.app')) {
                apiUrl = apiUrl.replace('http://', 'https://');
            }

            // 1. Create Checkout Session on Backend
            const response = await fetch(`${apiUrl}/api/payment/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 🔒 Sécurité : on envoie uniquement le TYPE de plan
                    // Le serveur détermine lui-même le price_id depuis ses variables d'environnement
                    planType: plan.type,   // 'access', 'premium', ou 'platinium'
                    planName: plan.name,
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                }),
            });

            const session = await response.json();

            if (session.error) {
                alert(`Erreur Stripe : ${session.error}`);
                throw new Error(session.error);
            }

            // 2. Redirect to Stripe Checkout directly via the URL provided
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error("Impossible de récupérer l'URL de paiement.");
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert(`Erreur technique : ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!plan) return null;

    return (
        <div className="checkout-wrapper">
            <div style={{ position: 'fixed', top: '30px', left: '30px', zIndex: 100000 }}>
                <button
                    onClick={onClose}
                    className="back-btn-hover"
                    style={{
                        background: 'white',
                        border: '1px solid #e2e8f0',
                        color: '#1e293b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        padding: '12px 20px',
                        borderRadius: '100px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.2s ease',
                    }}
                >
                    <ArrowLeft size={20} /> Retour
                </button>
            </div>

            {/* Left Column - Form */}
            <div className="checkout-main">
                <h2 className="checkout-title">Votre commande</h2>

                {/* Product Summary */}
                <div className="product-card">
                    <div className="product-row">
                        <div>
                            <div className="product-name">{plan.name}</div>
                            <div className="product-description">
                                {plan.description || "Accès complet à la plateforme et aux outils."}
                            </div>
                        </div>
                        <div className="product-price">{plan.price}</div>
                    </div>
                </div>

                {/* Coordonnées */}
                <div className="checkout-section">
                    <h3 className="section-title">Coordonnées</h3>

                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="type"
                                value="particulier"
                                checked={formData.type === 'particulier'}
                                onChange={handleInputChange}
                            />
                            Particulier
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="type"
                                value="societe"
                                checked={formData.type === 'societe'}
                                onChange={handleInputChange}
                            />
                            Société
                        </label>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Nom *"
                                className="form-input"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Prénom *"
                                className="form-input"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                className="form-input"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                            <select
                                name="phoneCode"
                                className="form-input"
                                style={{ width: 'auto', maxWidth: '140px', paddingRight: '25px', textOverflow: 'ellipsis' }}
                                value={formData.phoneCode}
                                onChange={handleInputChange}
                            >
                                {countries.map((c, i) => (
                                    <option key={i} value={c.code}>{c.name} ({c.code})</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Téléphone *"
                                className="form-input"
                                style={{ flex: 1 }}
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Adresse */}
                <div className="checkout-section">
                    <h3 className="section-title">Votre adresse</h3>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            name="address"
                            placeholder="Votre adresse"
                            className="form-input"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                name="zip"
                                placeholder="Code postal *"
                                className="form-input"
                                required
                                value={formData.zip}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="country"
                                className="form-input"
                                value={formData.country}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Choisir un pays</option>
                                {countries.map((c, i) => (
                                    <option key={i} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="city"
                            placeholder="Ville *"
                            className="form-input"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Société Section - Conditional */}
                {formData.type === 'societe' && (
                    <div className="checkout-section">
                        <h3 className="section-title">Votre société</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Votre société *"
                                    className="form-input"
                                    required
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="vatNumber"
                                    placeholder="Numéro de TVA Intracommunautaire"
                                    className="form-input"
                                    value={formData.vatNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Paiement */}
                <div className="checkout-section">
                    <h3 className="section-title">Paiement</h3>
                    <div className="payment-methods">
                        <div
                            className={`payment-method ${formData.paymentMethod === 'card' ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        >
                            <CreditCard className="payment-method-icon" />
                            <span>Carte Bancaire</span>
                        </div>
                        {/* Add other payment methods here if needed */}
                    </div>

                    {formData.paymentMethod === 'card' && (
                        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', marginTop: '10px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>Informations de paiement</h4>

                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="Numéro de carte"
                                        className="form-input"
                                        style={{ width: '100%', paddingRight: '40px', backgroundColor: '#fff' }}
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                    />
                                    <CreditCard size={20} color="#64748b" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="cardExpiry"
                                        placeholder="Date d'expiration (MMYY)"
                                        className="form-input"
                                        style={{ backgroundColor: '#fff' }}
                                        value={formData.cardExpiry}
                                        onChange={handleInputChange}
                                        maxLength="4"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="cardCvc"
                                        placeholder="Code de sécurité (CCV)"
                                        className="form-input"
                                        style={{ backgroundColor: '#fff' }}
                                        value={formData.cardCvc}
                                        onChange={handleInputChange}
                                        maxLength="3"
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Lock size={14} color="#6b7280" />
                                    <span>Paiement sécurisé par Stripe</span>
                                </div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {/* VISA Logo */}
                                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="20" rx="3" fill="#1A1F71" />
                                        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="900" fontFamily="sans-serif" fontStyle="italic">VISA</text>
                                    </svg>

                                    {/* Mastercard Logo */}
                                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="20" rx="3" fill="#0A2540" />
                                        <circle cx="11" cy="10" r="6" fill="#EB001B" />
                                        <circle cx="21" cy="10" r="6" fill="#F79E1B" />
                                        <path d="M16 14.5C14.5 14.5 13.1 13.9 12.1 12.9C13.5 11.2 13.5 8.7 12.1 7.1C13.1 6.1 14.5 5.5 16 5.5C17.5 5.5 18.9 6.1 19.9 7.1C18.5 8.7 18.5 11.2 19.9 12.9C18.9 13.9 17.5 14.5 16 14.5Z" fill="#FF5F00" />
                                    </svg>

                                    {/* CB Logo (Carte Bancaire) */}
                                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="20" rx="3" fill="#0055A4" />
                                        <path d="M8 5H24" stroke="white" strokeWidth="2" />
                                        {/* Simple CB Text as vector path approximation or just text */}
                                        <text x="50%" y="65%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="Arial">CB</text>
                                    </svg>

                                    {/* Maestro Logo */}
                                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="32" height="20" rx="3" fill="#0A2540" />
                                        <circle cx="11" cy="10" r="6" fill="#EB001B" />
                                        <circle cx="21" cy="10" r="6" fill="#00A4E0" />
                                        <path d="M16 14.5C14.5 14.5 13.1 13.9 12.1 12.9C13.5 11.2 13.5 8.7 12.1 7.1C13.1 6.1 14.5 5.5 16 5.5C17.5 5.5 18.9 6.1 19.9 7.1C18.5 8.7 18.5 11.2 19.9 12.9C18.9 13.9 17.5 14.5 16 14.5Z" fill="#8B4E9E" fillOpacity="0.5" />
                                        {/* Overlap area logic is complex, simpler representation: */}
                                        <circle cx="21" cy="10" r="6" fill="#00A4E0" />
                                    </svg>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '8px' }}>
                                En validant ce formulaire, vous acceptez les conditions de service de Stripe.
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Right Column - Summary */}
            <div className="checkout-sidebar">
                <div className="summary-card">
                    <h3 className="summary-title">Détail du prix</h3>

                    <div className="summary-row">
                        <span>Total HT</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="summary-row">
                        <span>TVA (20%)</span>
                        <span>{formatPrice(vatAmount)}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                    </div>

                    <button className="checkout-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Redirection...' : `Payer ${formatPrice(total)}`}
                    </button>

                    <div className="secure-payment">
                        <Lock size={14} />
                        <span>Paiement sécurisé</span>
                    </div>

                    <label className="terms-checkbox">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                        />
                        <span>
                            J'ai lu les conditions générales de vente et j'y adhère sans réserve.
                        </span>
                    </label>
                </div>

                {/* Special Offer Box (Upsell Example) */}
                {plan.name === 'Offre Premium' && ( // Only show for certain plans if needed
                    <div className="upsell-box" style={{ marginTop: '20px', padding: '15px', background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '8px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#92400e', marginBottom: '5px' }}>Offre spéciale</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b45309', marginBottom: '10px' }}>
                            Ajoutez le Pack Références (+379€) pour booster votre crédibilité immédiatement.
                        </p>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold' }}>
                            <input
                                type="checkbox"
                                checked={upsell}
                                onChange={(e) => setUpsell(e.target.checked)}
                            />
                            Oui, je profite de l'offre
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
