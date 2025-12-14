const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/reservations.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]');
        return [];
    }
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
};

// GET all reservations (for Admin)
router.get('/', (req, res) => {
    try {
        const reservations = readData();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new reservation
router.post('/', (req, res) => {
    try {
        const reservations = readData();
        const newReservation = {
            id: 'RES' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'Confirmed'
        };

        reservations.unshift(newReservation); // Add to beginning
        fs.writeFileSync(dataPath, JSON.stringify(reservations, null, 2));

        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
