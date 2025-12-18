const express = require('express');
const router = express.Router();

// Hardcoded admin credentials (fallback if env vars not set)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'samadcodes57@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'samad57';

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Simple success response
        res.json({ success: true, message: 'Login successful', token: 'dummy-admin-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
