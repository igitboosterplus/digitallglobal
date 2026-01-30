// Liste de mots négatifs à filtrer
const negativeWords = [
    'arnaque', 'arnaquer', 'escroc', 'escroquerie',
    'nul', 'nulle', 'horrible', 'horribles',
    'mauvais', 'mauvaise', 'pire', 'catastrophe',
    'déçu', 'déçue', 'décevant', 'déception',
    'mensonge', 'menteur', 'faux', 'fake',
    'vol', 'voler', 'voleur', 'arnaqueur',
    'merde', 'pourri', 'pourrie', 'naze',
    'incompétent', 'incompétents', 'incapable',
    'éviter', 'fuyez', 'attention', 'danger'
];

/**
 * Vérifie si le contenu contient des mots négatifs
 * @param {string} content - Le contenu du commentaire
 * @returns {boolean} - true si des mots négatifs sont détectés
 */
export const containsNegativeWords = (content) => {
    const lowerContent = content.toLowerCase();
    return negativeWords.some(word => lowerContent.includes(word));
};

/**
 * Valide un commentaire basé sur la note et le contenu
 * @param {number} rating - La note donnée (1-5)
 * @param {string} content - Le contenu du commentaire
 * @returns {object} - { isValid: boolean, reason: string }
 */
export const validateComment = (rating, content) => {
    // Vérifier la note minimale
    if (rating < 3) {
        return {
            isValid: false,
            reason: 'Les commentaires avec moins de 3 étoiles sont soumis à modération.'
        };
    }

    // Vérifier les mots négatifs
    if (containsNegativeWords(content)) {
        return {
            isValid: false,
            reason: 'Votre commentaire contient des termes inappropriés et sera examiné par notre équipe.'
        };
    }

    return {
        isValid: true,
        reason: ''
    };
};
