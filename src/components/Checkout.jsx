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
        paymentMethod: 'card',
        terms: false
    });

    const [upsell, setUpsell] = useState(false);

    // Comprehensive list of countries and dial codes
    const countries = [
        { name: "Afghanistan", code: "+93", iso: "AF" },
        { name: "Afrique du Sud", code: "+27", iso: "ZA" },
        { name: "Albanie", code: "+355", iso: "AL" },
        { name: "Algérie", code: "+213", iso: "DZ" },
        { name: "Allemagne", code: "+49", iso: "DE" },
        { name: "Andorre", code: "+376", iso: "AD" },
        { name: "Angola", code: "+244", iso: "AO" },
        { name: "Arabie saoudite", code: "+966", iso: "SA" },
        { name: "Argentine", code: "+54", iso: "AR" },
        { name: "Arménie", code: "+374", iso: "AM" },
        { name: "Australie", code: "+61", iso: "AU" },
        { name: "Autriche", code: "+43", iso: "AT" },
        { name: "Azerbaïdjan", code: "+994", iso: "AZ" },
        { name: "Bahamas", code: "+1-242", iso: "BS" },
        { name: "Bahreïn", code: "+973", iso: "BH" },
        { name: "Bangladesh", code: "+880", iso: "BD" },
        { name: "Barbade", code: "+1-246", iso: "BB" },
        { name: "Belgique", code: "+32", iso: "BE" },
        { name: "Belize", code: "+501", iso: "BZ" },
        { name: "Bénin", code: "+229", iso: "BJ" },
        { name: "Bhoutan", code: "+975", iso: "BT" },
        { name: "Biélorussie", code: "+375", iso: "BY" },
        { name: "Birmanie", code: "+95", iso: "MM" },
        { name: "Bolivie", code: "+591", iso: "BO" },
        { name: "Bosnie-Herzégovine", code: "+387", iso: "BA" },
        { name: "Botswana", code: "+267", iso: "BW" },
        { name: "Brésil", code: "+55", iso: "BR" },
        { name: "Brunei", code: "+673", iso: "BN" },
        { name: "Bulgarie", code: "+359", iso: "BG" },
        { name: "Burkina Faso", code: "+226", iso: "BF" },
        { name: "Burundi", code: "+257", iso: "BI" },
        { name: "Cambodge", code: "+855", iso: "KH" },
        { name: "Cameroun", code: "+237", iso: "CM" },
        { name: "Canada", code: "+1", iso: "CA" },
        { name: "Cap-Vert", code: "+238", iso: "CV" },
        { name: "Chili", code: "+56", iso: "CL" },
        { name: "Chine", code: "+86", iso: "CN" },
        { name: "Chypre", code: "+357", iso: "CY" },
        { name: "Colombie", code: "+57", iso: "CO" },
        { name: "Comores", code: "+269", iso: "KM" },
        { name: "Congo (Brazzaville)", code: "+242", iso: "CG" },
        { name: "Congo (Kinshasa)", code: "+243", iso: "CD" },
        { name: "Corée du Nord", code: "+850", iso: "KP" },
        { name: "Corée du Sud", code: "+82", iso: "KR" },
        { name: "Costa Rica", code: "+506", iso: "CR" },
        { name: "Côte d'Ivoire", code: "+225", iso: "CI" },
        { name: "Croatie", code: "+385", iso: "HR" },
        { name: "Cuba", code: "+53", iso: "CU" },
        { name: "Danemark", code: "+45", iso: "DK" },
        { name: "Djibouti", code: "+253", iso: "DJ" },
        { name: "Dominique", code: "+1-767", iso: "DM" },
        { name: "Égypte", code: "+20", iso: "EG" },
        { name: "Émirats arabes unis", code: "+971", iso: "AE" },
        { name: "Équateur", code: "+593", iso: "EC" },
        { name: "Érythrée", code: "+291", iso: "ER" },
        { name: "Espagne", code: "+34", iso: "ES" },
        { name: "Estonie", code: "+372", iso: "EE" },
        { name: "États-Unis", code: "+1", iso: "US" },
        { name: "Éthiopie", code: "+251", iso: "ET" },
        { name: "Fidji", code: "+679", iso: "FJ" },
        { name: "Finlande", code: "+358", iso: "FI" },
        { name: "France", code: "+33", iso: "FR" },
        { name: "Gabon", code: "+241", iso: "GA" },
        { name: "Gambie", code: "+220", iso: "GM" },
        { name: "Géorgie", code: "+995", iso: "GE" },
        { name: "Ghana", code: "+233", iso: "GH" },
        { name: "Grèce", code: "+30", iso: "GR" },
        { name: "Grenade", code: "+1-473", iso: "GD" },
        { name: "Guatemala", code: "+502", iso: "GT" },
        { name: "Guinée", code: "+224", iso: "GN" },
        { name: "Guinée-Bissau", code: "+245", iso: "GW" },
        { name: "Guinée équatoriale", code: "+240", iso: "GQ" },
        { name: "Guyana", code: "+592", iso: "GY" },
        { name: "Haïti", code: "+509", iso: "HT" },
        { name: "Honduras", code: "+504", iso: "HN" },
        { name: "Hongrie", code: "+36", iso: "HU" },
        { name: "Inde", code: "+91", iso: "IN" },
        { name: "Indonésie", code: "+62", iso: "ID" },
        { name: "Irak", code: "+964", iso: "IQ" },
        { name: "Iran", code: "+98", iso: "IR" },
        { name: "Irlande", code: "+353", iso: "IE" },
        { name: "Islande", code: "+354", iso: "IS" },
        { name: "Israël", code: "+972", iso: "IL" },
        { name: "Italie", code: "+39", iso: "IT" },
        { name: "Jamaïque", code: "+1-876", iso: "JM" },
        { name: "Japon", code: "+81", iso: "JP" },
        { name: "Jordanie", code: "+962", iso: "JO" },
        { name: "Kazakhstan", code: "+7", iso: "KZ" },
        { name: "Kenya", code: "+254", iso: "KE" },
        { name: "Kirghizistan", code: "+996", iso: "KG" },
        { name: "Kiribati", code: "+686", iso: "KI" },
        { name: "Koweït", code: "+965", iso: "KW" },
        { name: "Laos", code: "+856", iso: "LA" },
        { name: "Lesotho", code: "+266", iso: "LS" },
        { name: "Lettonie", code: "+371", iso: "LV" },
        { name: "Liban", code: "+961", iso: "LB" },
        { name: "Liberia", code: "+231", iso: "LR" },
        { name: "Libye", code: "+218", iso: "LY" },
        { name: "Liechtenstein", code: "+423", iso: "LI" },
        { name: "Lituanie", code: "+370", iso: "LT" },
        { name: "Luxembourg", code: "+352", iso: "LU" },
        { name: "Macédoine du Nord", code: "+389", iso: "MK" },
        { name: "Madagascar", code: "+261", iso: "MG" },
        { name: "Malaisie", code: "+60", iso: "MY" },
        { name: "Malawi", code: "+265", iso: "MW" },
        { name: "Maldives", code: "+960", iso: "MV" },
        { name: "Mali", code: "+223", iso: "ML" },
        { name: "Malte", code: "+356", iso: "MT" },
        { name: "Maroc", code: "+212", iso: "MA" },
        { name: "Marshall", code: "+692", iso: "MH" },
        { name: "Maurice", code: "+230", iso: "MU" },
        { name: "Mauritanie", code: "+222", iso: "MR" },
        { name: "Mexique", code: "+52", iso: "MX" },
        { name: "Micronésie", code: "+691", iso: "FM" },
        { name: "Moldavie", code: "+373", iso: "MD" },
        { name: "Monaco", code: "+377", iso: "MC" },
        { name: "Mongolie", code: "+976", iso: "MN" },
        { name: "Monténégro", code: "+382", iso: "ME" },
        { name: "Mozambique", code: "+258", iso: "MZ" },
        { name: "Namibie", code: "+264", iso: "NA" },
        { name: "Nauru", code: "+674", iso: "NR" },
        { name: "Népal", code: "+977", iso: "NP" },
        { name: "Nicaragua", code: "+505", iso: "NI" },
        { name: "Niger", code: "+227", iso: "NE" },
        { name: "Nigeria", code: "+234", iso: "NG" },
        { name: "Norvège", code: "+47", iso: "NO" },
        { name: "Nouvelle-Zélande", code: "+64", iso: "NZ" },
        { name: "Oman", code: "+968", iso: "OM" },
        { name: "Ouganda", code: "+256", iso: "UG" },
        { name: "Ouzbékistan", code: "+998", iso: "UZ" },
        { name: "Pakistan", code: "+92", iso: "PK" },
        { name: "Palaos", code: "+680", iso: "PW" },
        { name: "Panama", code: "+507", iso: "PA" },
        { name: "Papouasie-Nouvelle-Guinée", code: "+675", iso: "PG" },
        { name: "Paraguay", code: "+595", iso: "PY" },
        { name: "Pays-Bas", code: "+31", iso: "NL" },
        { name: "Pérou", code: "+51", iso: "PE" },
        { name: "Philippines", code: "+63", iso: "PH" },
        { name: "Pologne", code: "+48", iso: "PL" },
        { name: "Portugal", code: "+351", iso: "PT" },
        { name: "Qatar", code: "+974", iso: "QA" },
        { name: "République centrafricaine", code: "+236", iso: "CF" },
        { name: "République dominicaine", code: "+1-809", iso: "DO" },
        { name: "Roumanie", code: "+40", iso: "RO" },
        { name: "Royaume-Uni", code: "+44", iso: "GB" },
        { name: "Russie", code: "+7", iso: "RU" },
        { name: "Rwanda", code: "+250", iso: "RW" },
        { name: "Saint-Christophe-et-Niévès", code: "+1-869", iso: "KN" },
        { name: "Sainte-Lucie", code: "+1-758", iso: "LC" },
        { name: "Saint-Marin", code: "+378", iso: "SM" },
        { name: "Saint-Vincent-et-les-Grenadines", code: "+1-784", iso: "VC" },
        { name: "Salomon", code: "+677", iso: "SB" },
        { name: "Salvador", code: "+503", iso: "SV" },
        { name: "Samoa", code: "+685", iso: "WS" },
        { name: "São Tomé-et-Príncipe", code: "+239", iso: "ST" },
        { name: "Sénégal", code: "+221", iso: "SN" },
        { name: "Serbie", code: "+381", iso: "RS" },
        { name: "Seychelles", code: "+248", iso: "SC" },
        { name: "Sierra Leone", code: "+232", iso: "SL" },
        { name: "Singapour", code: "+65", iso: "SG" },
        { name: "Slovaquie", code: "+421", iso: "SK" },
        { name: "Slovénie", code: "+386", iso: "SI" },
        { name: "Somalie", code: "+252", iso: "SO" },
        { name: "Soudan", code: "+249", iso: "SD" },
        { name: "Soudan du Sud", code: "+211", iso: "SS" },
        { name: "Sri Lanka", code: "+94", iso: "LK" },
        { name: "Suède", code: "+46", iso: "SE" },
        { name: "Suisse", code: "+41", iso: "CH" },
        { name: "Suriname", code: "+597", iso: "SR" },
        { name: "Syrie", code: "+963", iso: "SY" },
        { name: "Tadjikistan", code: "+992", iso: "TJ" },
        { name: "Tanzanie", code: "+255", iso: "TZ" },
        { name: "Tchad", code: "+235", iso: "TD" },
        { name: "Tchéquie", code: "+420", iso: "CZ" },
        { name: "Thaïlande", code: "+66", iso: "TH" },
        { name: "Timor oriental", code: "+670", iso: "TL" },
        { name: "Togo", code: "+228", iso: "TG" },
        { name: "Tonga", code: "+676", iso: "TO" },
        { name: "Trinité-et-Tobago", code: "+1-868", iso: "TT" },
        { name: "Tunisie", code: "+216", iso: "TN" },
        { name: "Turkménistan", code: "+993", iso: "TM" },
        { name: "Turquie", code: "+90", iso: "TR" },
        { name: "Tuvalu", code: "+688", iso: "TV" },
        { name: "Ukraine", code: "+380", iso: "UA" },
        { name: "Uruguay", code: "+598", iso: "UY" },
        { name: "Vanuatu", code: "+678", iso: "VU" },
        { name: "Vatican", code: "+379", iso: "VA" },
        { name: "Venezuela", code: "+58", iso: "VE" },
        { name: "Vietnam", code: "+84", iso: "VN" },
        { name: "Yémen", code: "+967", iso: "YE" },
        { name: "Zambie", code: "+260", iso: "ZM" },
        { name: "Zimbabwe", code: "+263", iso: "ZW" }
    ];

    // Calculate totals
    const basePrice = plan ? parseFloat(plan.price.replace('€', '').trim()) : 0;
    const upsellPrice = 379; // Pack référence upsell price

    let total = basePrice;
    if (upsell) total += upsellPrice;

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
        if (e) e.preventDefault();

        // Validation des champs obligatoires
        const requiredFields = [
            { key: 'firstName', label: 'Prénom' },
            { key: 'lastName', label: 'Nom' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Téléphone' },
            { key: 'zip', label: 'Code postal' },
            { key: 'city', label: 'Ville' }
        ];

        for (const field of requiredFields) {
            if (!formData[field.key] || formData[field.key].trim() === '') {
                alert(`Veuillez remplir le champ : ${field.label}`);
                return;
            }
        }

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
                    lastName: formData.lastName,
                    address: formData.address,
                    zip: formData.zip,
                    city: formData.city,
                    countryIso: countries.find(c => c.name === formData.country)?.iso || 'FR'
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

                {/* Section de validation */}
                <div className="checkout-section" style={{ textAlign: 'center', padding: '30px', background: '#f8fafc', borderRadius: '12px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <ShieldCheck size={48} color="#2ecc71" style={{ margin: '0 auto 15px' }} />
                        <h3 style={{ margin: 0, color: '#1e293b' }}>Paiement 100% Sécurisé</h3>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                            Vous allez être redirigé vers la plateforme sécurisée de <strong>Stripe</strong> pour finaliser votre commande.
                        </p>
                    </div>
                </div>

            </div>

            {/* Right Column - Summary */}
            <div className="checkout-sidebar">
                <div className="summary-card">
                    <h3 className="summary-title">Détail du prix</h3>

                    <div className="summary-row">
                        <span>Prix de l'offre</span>
                        <span>{formatPrice(basePrice)}</span>
                    </div>
                    {upsell && (
                        <div className="summary-row">
                            <span>Pack Références</span>
                            <span>{formatPrice(upsellPrice)}</span>
                        </div>
                    )}

                    <div className="summary-total" style={{ borderTop: '2px solid #e2e8f0', paddingTop: '15px' }}>
                        <span>Total à payer</span>
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
