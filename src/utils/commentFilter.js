// Liste de mots négatifs à filtrer (étendue pour mieux contrôler les mauvais commentaires)
const negativeWords = [
    'arnaque', 'arnaquer', 'escroc', 'escroquerie',
    'nul', 'nulle', 'horrible', 'horribles',
    'mauvais', 'mauvaise', 'pire', 'catastrophe',
    'déçu', 'déçue', 'décevant', 'déception',
    'mensonge', 'menteur', 'faux', 'fake', 'fake news',
    'vol', 'voler', 'voleur', 'arnaqueur',
    'merde', 'pourri', 'pourrie', 'naze', 'chiant', 'con', 'connard',
    'incompétent', 'incompétents', 'incapable', 'incapables',
    'éviter', 'fuyez', 'attention', 'danger', 'méfiance',
    'publicité', 'spam', 'argent facile', 'casino', 'pari'
];

/**
 * Vérifie si le contenu contient des mots négatifs ou des motifs suspects
 * @param {string} content - Le contenu du commentaire
 * @returns {object} - { isBad: boolean, reason: string }
 */
export const checkToxicity = (content) => {
    const lowerContent = content.toLowerCase();

    // 1. Vérification des mots interdits
    if (negativeWords.some(word => lowerContent.includes(word))) {
        return { isBad: true, reason: 'termes inappropriés ou négatifs' };
    }

    // 2. Vérification des majuscules excessives (CRI)
    const upperCaseChars = content.replace(/[^A-Z]/g, "").length;
    if (upperCaseChars > content.length * 0.5 && content.length > 20) {
        return { isBad: true, reason: 'utilisation excessive de majuscules' };
    }

    // 3. Vérification des répétitions de caractères (ex: !!!!!!)
    if (/([!?.]){4,}/.test(content)) {
        return { isBad: true, reason: 'ponctuation excessive' };
    }

    return { isBad: false, reason: '' };
};

/**
 * Valide un commentaire basé sur la note et le contenu
 * @param {number} rating - La note donnée (1-5)
 * @param {string} content - Le contenu du commentaire
 * @returns {object} - { isValid: boolean, reason: string }
 */
export const validateComment = (rating, content) => {
    // Vérifier la longueur minimale
    if (content.trim().length < 10) {
        return {
            isValid: false,
            reason: 'Votre commentaire est trop court (minimum 10 caractères).'
        };
    }

    // Vérifier la note minimale (protection automatique)
    if (rating < 3) {
        return {
            isValid: false,
            reason: 'Désolé, nous n\'acceptons que les avis constructifs avec au moins 3 étoiles pour le moment.'
        };
    }

    // Vérifier la toxicité et les mots négatifs
    const toxicity = checkToxicity(content);
    if (toxicity.isBad) {
        return {
            isValid: false,
            reason: `Votre commentaire a été bloqué car il détecte : ${toxicity.reason}.`
        };
    }

    return {
        isValid: true,
        reason: ''
    };
};
