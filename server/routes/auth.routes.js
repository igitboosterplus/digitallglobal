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
        // Find user by email
        const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'Identifiants incorrects.' });
        }

        const user = users[0];

        // Compare password
        const match = await bcrypt.compare(password, user.password_hash);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Identifiants incorrects.' });
        }

        // Return user info (excluding password)
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
        // Find user
        const [users] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });
        }

        const user = users[0];

        // Verify current password
        const match = await bcrypt.compare(currentPassword, user.password_hash);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Mot de passe actuel incorrect.' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password and clear must_change_password flag
        await pool.execute(
            'UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?',
            [hashedPassword, userId]
        );

        res.json({ success: true, message: 'Mot de passe mis à jour avec succès.' });

    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Erreur lors du changement de mot de passe.' });
    }
});

module.exports = router;
