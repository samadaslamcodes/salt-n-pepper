const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/menu.json');

// Helper to read data
const readData = () => {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
};

// GET all menu items
router.get('/', (req, res) => {
    try {
        const items = readData().filter(item => !item.isSpecial);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET chef's specials
router.get('/specials', (req, res) => {
    try {
        const specials = readData().filter(item => item.isSpecial);
        res.json(specials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new item (for future use)
router.post('/', (req, res) => {
    try {
        const items = readData();
        const newItem = req.body;
        // Simple ID generation
        newItem.id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;

        items.push(newItem);
        fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));

        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
