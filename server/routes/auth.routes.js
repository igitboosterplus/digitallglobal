const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email et mot de passe requis.' });
    }

    try {
        // Trouver l'utilisateur par email (MySQL : ? au lieu de $1)
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Identifiants incorrects.' });
        }

        const user = rows[0];

        // Vérifier le mot de passe
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Identifiants incorrects.' });
        }

        // Retourner les infos utilisateur (sans le mot de passe)
        const { password_hash, ...userInfo } = user;

        res.json({
            success: true,
            message: 'Connexion réussie.',
            user: userInfo
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Erreur serveur lors de la connexion.' });
    }
});

// Password change endpoint
router.post('/change-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Tous les champs sont requis.' });
    }

    try {
        // Trouver l'utilisateur
        const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        const user = rows[0];

        // Vérifier le mot de passe actuel
        const match = await bcrypt.compare(currentPassword, user.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Mot de passe actuel incorrect.' });
        }

        // Hasher le nouveau mot de passe
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Mettre à jour le mot de passe
        await pool.execute(
            'UPDATE users SET password_hash = ?, must_change_password = false WHERE id = ?',
            [hashedPassword, userId]
        );

        res.json({ success: true, message: 'Mot de passe mis à jour avec succès.' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Erreur lors du changement de mot de passe.' });
    }
});

module.exports = router;
