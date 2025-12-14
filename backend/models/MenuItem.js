const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'starters', 'bbq'
    price: { type: Number, required: true },
    originalPrice: { type: Number }, // Optional, mostly for specials
    description: { type: String, required: true },
    image: { type: String, required: true },
    popular: { type: Boolean, default: false },
    spicy: { type: Boolean, default: false },
    prepTime: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    ingredients: [{ type: String }],
    calories: { type: Number },
    badge: { type: String }, // For specials like "Chef's Special"
    isSpecial: { type: Boolean, default: false } // To distinguish chef's specials
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
