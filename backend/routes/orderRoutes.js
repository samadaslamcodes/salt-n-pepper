const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/orders.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]');
        return [];
    }
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
};

// GET all orders (for Admin)
router.get('/', (req, res) => {
    try {
        const orders = readData();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new order
router.post('/', (req, res) => {
    try {
        const orders = readData();
        const newOrder = {
            id: 'ORD' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'Pending'
        };

        orders.unshift(newOrder); // Add to beginning
        fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
