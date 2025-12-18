import { useState, useEffect, useRef } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 23, seconds: 47 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }
                if (hours < 0) {
                    hours = 23;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-timer">
            <span className="timer-label">Offer ends in:</span>
            <div className="timer-boxes">
                <div className="timer-box">
                    <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="timer-unit">HRS</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-box">
                    <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="timer-unit">MIN</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-box">
                    <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="timer-unit">SEC</span>
                </div>
            </div>
        </div>
    );
};

const Menu = ({ addToCart }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showQuickView, setShowQuickView] = useState(false);
    const [itemRatings, setItemRatings] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const menuRef = useRef(null);

    // Menu Categories with unique icons
    const categories = [
        { id: 'all', name: 'All', icon: '🍽️', color: '#d4af37' },
        { id: 'starters', name: 'Starters', icon: '🥗', color: '#4caf50' },
        { id: 'bbq', name: 'BBQ', icon: '🍖', color: '#ff5722' },
        { id: 'karahi', name: 'Karahi', icon: '🍲', color: '#e91e63' },
        { id: 'biryani', name: 'Biryani', icon: '🍚', color: '#9c27b0' },
        { id: 'chinese', name: 'Chinese', icon: '🥡', color: '#00bcd4' },
        { id: 'desserts', name: 'Desserts', icon: '🍨', color: '#ff9800' },
        { id: 'beverages', name: 'Drinks', icon: '🥤', color: '#2196f3' },
    ];

    // Chef's Special Items
    const initialChefsSpecials = [
        {
            id: 101,
            name: 'Royal Lamb Biryani',
            price: 899,
            originalPrice: 1299,
            description: 'Premium lamb cooked with aged basmati rice, saffron threads, and secret royal spices. A dish fit for royalty.',
            image: '/assets/chicken-biryani.png',
            badge: "Chef's Special",
            ingredients: ['Premium Lamb', 'Aged Basmati', 'Saffron', 'Royal Spices'],
            prepTime: '45 min',
            rating: 4.9,
            reviews: 234
        },
        {
            id: 102,
            name: 'Signature BBQ Platter',
            price: 1999,
            originalPrice: 2799,
            description: 'Our signature platter featuring 8 different BBQ items, each marinated for 24 hours in our secret blend.',
            image: '/assets/bbq-platter.png',
            badge: "Limited Time",
            ingredients: ['Chicken Tikka', 'Seekh Kabab', 'Lamb Chops', 'Fish Tikka'],
            prepTime: '35 min',
            rating: 4.8,
            reviews: 189
        },
    ];

    // Menu Items Data with enhanced details
    const initialMenuItems = [
        // Starters
        { id: 1, name: 'Chicken Tikka', category: 'starters', price: 650, description: 'Tender chicken marinated in special spices, grilled to perfection over charcoal', image: '/assets/chicken-tikka.png', popular: true, spicy: true, prepTime: '20 min', rating: 4.7, reviews: 156, ingredients: ['Chicken', 'Yogurt', 'Spices', 'Lemon'], calories: 320 },
        { id: 2, name: 'Seekh Kabab', category: 'starters', price: 550, description: 'Minced beef kebabs with aromatic herbs and spices, served sizzling hot', image: '/assets/seekh-kabab.png', popular: true, prepTime: '25 min', rating: 4.6, reviews: 142, ingredients: ['Beef', 'Onions', 'Green Chili', 'Coriander'], calories: 280 },
        { id: 3, name: 'Fish Tikka', category: 'starters', price: 850, description: 'Fresh river fish fillet marinated and grilled with exotic herbs', image: '/assets/fish-tikka.png', prepTime: '25 min', rating: 4.5, reviews: 98, ingredients: ['Fish', 'Gram Flour', 'Ajwain', 'Spices'], calories: 240 },
        { id: 4, name: 'Reshmi Kabab', category: 'starters', price: 600, description: 'Soft and creamy chicken kebabs with a melt-in-mouth texture', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', prepTime: '20 min', rating: 4.4, reviews: 87, ingredients: ['Chicken', 'Cream', 'Cheese', 'Spices'], calories: 350 },
        { id: 5, name: 'Malai Boti', category: 'starters', price: 750, description: 'Creamy chicken pieces with mild spices, perfect for all ages', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', popular: true, prepTime: '20 min', rating: 4.8, reviews: 203, ingredients: ['Chicken', 'Malai', 'Cream', 'Cardamom'], calories: 380 },

        // BBQ & Grill
        { id: 6, name: 'Full BBQ Platter', category: 'bbq', price: 2500, description: 'Assorted BBQ items including tikka, seekh kabab, and mutton chops - feeds 4', image: '/assets/bbq-platter.png', popular: true, prepTime: '35 min', rating: 4.9, reviews: 312, ingredients: ['Mixed Meats', 'Charcoal Grilled', 'Secret Spices'], calories: 1200 },
        { id: 7, name: 'Lamb Chops', category: 'bbq', price: 1200, description: 'Juicy lamb chops marinated overnight and grilled to perfection', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop', spicy: true, prepTime: '30 min', rating: 4.7, reviews: 178, ingredients: ['Lamb', 'Papaya', 'Spices', 'Herbs'], calories: 450 },
        { id: 8, name: 'Beef Steak', category: 'bbq', price: 1500, description: 'Premium beef steak with mushroom sauce and grilled vegetables', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop', prepTime: '25 min', rating: 4.5, reviews: 134, ingredients: ['Beef', 'Mushroom', 'Butter', 'Pepper'], calories: 520 },
        { id: 9, name: 'Chicken Sajji', category: 'bbq', price: 1800, description: 'Whole roasted chicken with special Balochi spices, served with rice', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop', popular: true, prepTime: '45 min', rating: 4.8, reviews: 267, ingredients: ['Whole Chicken', 'Balochi Spices', 'Rice'], calories: 890 },

        // Karahi & Handi
        { id: 10, name: 'Chicken Karahi', category: 'karahi', price: 1400, description: 'Traditional chicken karahi with fresh tomatoes and green chilies', image: '/assets/chicken-karahi.png', popular: true, spicy: true, prepTime: '30 min', rating: 4.9, reviews: 423, ingredients: ['Chicken', 'Tomatoes', 'Green Chili', 'Ginger'], calories: 680 },
        { id: 11, name: 'Mutton Karahi', category: 'karahi', price: 1800, description: 'Tender mutton cooked in traditional karahi style with rich gravy', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', spicy: true, prepTime: '40 min', rating: 4.7, reviews: 289, ingredients: ['Mutton', 'Tomatoes', 'Spices', 'Ghee'], calories: 750 },
        { id: 12, name: 'Beef Handi', category: 'karahi', price: 1600, description: 'Slow-cooked beef in traditional clay pot with rich creamy gravy', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&h=300&fit=crop', prepTime: '50 min', rating: 4.6, reviews: 156, ingredients: ['Beef', 'Cream', 'Onions', 'Spices'], calories: 820 },
        { id: 13, name: 'Prawn Karahi', category: 'karahi', price: 2200, description: 'Fresh prawns cooked in spicy karahi style with aromatic spices', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', prepTime: '25 min', rating: 4.5, reviews: 98, ingredients: ['Prawns', 'Tomatoes', 'Capsicum', 'Spices'], calories: 420 },

        // Biryani & Rice
        { id: 14, name: 'Chicken Biryani', category: 'biryani', price: 450, description: 'Aromatic basmati rice layered with tender chicken and saffron', image: '/assets/chicken-biryani.png', popular: true, prepTime: '35 min', rating: 4.8, reviews: 567, ingredients: ['Chicken', 'Basmati Rice', 'Saffron', 'Spices'], calories: 580 },
        { id: 15, name: 'Mutton Biryani', category: 'biryani', price: 550, description: 'Traditional mutton biryani with long grain rice and whole spices', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', prepTime: '45 min', rating: 4.7, reviews: 345, ingredients: ['Mutton', 'Basmati Rice', 'Fried Onions', 'Spices'], calories: 650 },
        { id: 16, name: 'Beef Pulao', category: 'biryani', price: 400, description: 'Flavorful beef pulao with whole spices and caramelized onions', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop', prepTime: '40 min', rating: 4.5, reviews: 187, ingredients: ['Beef', 'Rice', 'Whole Spices', 'Onions'], calories: 520 },
        { id: 17, name: 'Zeera Rice', category: 'biryani', price: 200, description: 'Fragrant cumin flavored basmati rice, perfect side dish', image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&fit=crop', prepTime: '15 min', rating: 4.4, reviews: 234, ingredients: ['Basmati Rice', 'Cumin', 'Ghee'], calories: 280 },

        // Chinese
        { id: 18, name: 'Chicken Manchurian', category: 'chinese', price: 750, description: 'Crispy chicken in tangy Indo-Chinese Manchurian sauce', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop', popular: true, prepTime: '20 min', rating: 4.6, reviews: 312, ingredients: ['Chicken', 'Soy Sauce', 'Ginger', 'Garlic'], calories: 420 },
        { id: 19, name: 'Chicken Chowmein', category: 'chinese', price: 650, description: 'Stir-fried noodles with vegetables and tender chicken strips', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', prepTime: '15 min', rating: 4.5, reviews: 256, ingredients: ['Noodles', 'Chicken', 'Vegetables', 'Soy'], calories: 480 },
        { id: 20, name: 'Beef Chilli Dry', category: 'chinese', price: 850, description: 'Spicy dry beef with bell peppers and hot sauce', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop', spicy: true, prepTime: '20 min', rating: 4.7, reviews: 189, ingredients: ['Beef', 'Bell Peppers', 'Chili', 'Soy'], calories: 380 },
        { id: 21, name: 'Fried Rice', category: 'chinese', price: 450, description: 'Classic Chinese fried rice with eggs and vegetables', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', prepTime: '15 min', rating: 4.4, reviews: 298, ingredients: ['Rice', 'Eggs', 'Vegetables', 'Soy'], calories: 350 },

        // Desserts
        { id: 22, name: 'Gulab Jamun', category: 'desserts', price: 250, description: 'Classic milk dumplings soaked in rose-flavored sugar syrup', image: 'https://images.unsplash.com/photo-1666190094762-2b5c0af28a84?w=400&h=300&fit=crop', popular: true, prepTime: '10 min', rating: 4.8, reviews: 456, ingredients: ['Milk Solids', 'Sugar', 'Rose Water', 'Cardamom'], calories: 320 },
        { id: 23, name: 'Kheer', category: 'desserts', price: 300, description: 'Creamy rice pudding with almonds, pistachios and saffron', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop', prepTime: '15 min', rating: 4.6, reviews: 234, ingredients: ['Rice', 'Milk', 'Sugar', 'Nuts'], calories: 280 },
        { id: 24, name: 'Gajar Ka Halwa', category: 'desserts', price: 350, description: 'Warm carrot dessert with khoya, nuts and a touch of cardamom', image: 'https://images.unsplash.com/photo-1605197540821-a2b1e8de47bd?w=400&h=300&fit=crop', prepTime: '20 min', rating: 4.9, reviews: 312, ingredients: ['Carrots', 'Khoya', 'Nuts', 'Cardamom'], calories: 380 },
        { id: 25, name: 'Firni', category: 'desserts', price: 280, description: 'Traditional ground rice pudding served in earthen pots', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop', prepTime: '15 min', rating: 4.5, reviews: 167, ingredients: ['Rice', 'Milk', 'Almonds', 'Pistachios'], calories: 260 },

        // Beverages
        { id: 26, name: 'Fresh Lime Mint', category: 'beverages', price: 150, description: 'Refreshing lime water with fresh mint and a hint of salt', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', prepTime: '5 min', rating: 4.6, reviews: 234, ingredients: ['Lime', 'Mint', 'Sugar', 'Salt'], calories: 80 },
        { id: 27, name: 'Mango Lassi', category: 'beverages', price: 200, description: 'Creamy mango yogurt drink, a summer favorite', image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop', popular: true, prepTime: '5 min', rating: 4.9, reviews: 456, ingredients: ['Yogurt', 'Mango', 'Sugar', 'Cardamom'], calories: 220 },
        { id: 28, name: 'Kashmiri Chai', category: 'beverages', price: 180, description: 'Pink tea with pistachios and almonds, a Kashmiri delicacy', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop', prepTime: '10 min', rating: 4.7, reviews: 312, ingredients: ['Green Tea', 'Milk', 'Nuts', 'Salt'], calories: 150 },
        { id: 29, name: 'Fresh Juice', category: 'beverages', price: 250, description: 'Seasonal fresh fruit juice made to order', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop', prepTime: '5 min', rating: 4.5, reviews: 189, ingredients: ['Seasonal Fruits', 'Ice'], calories: 120 },
        { id: 30, name: 'Oreo Shake', category: 'beverages', price: 350, description: 'Creamy Oreo milkshake topped with whipped cream', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop', prepTime: '5 min', rating: 4.8, reviews: 267, ingredients: ['Oreo', 'Ice Cream', 'Milk', 'Cream'], calories: 450 },
    ];

    const [chefsSpecials, setChefsSpecials] = useState(initialChefsSpecials);
    const [menuItems, setMenuItems] = useState(initialMenuItems);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const specialsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/menu/specials`);
                const menuResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/menu`);

                if (specialsResponse.ok && menuResponse.ok) {
                    const specialsData = await specialsResponse.json();
                    const menuData = await menuResponse.json();
                    setChefsSpecials(specialsData);
                    setMenuItems(menuData);
                }
            } catch (error) {
                console.log("Backend not connected, using static data");
            }
        };

        fetchMenuData();
    }, []);

    // Filter menu items
    const filteredItems = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Handle rating
    const handleRating = (itemId, rating) => {
        setItemRatings(prev => ({ ...prev, [itemId]: rating }));
    };

    // Handle add to cart with animation
    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedItems(prev => [...prev, item.id]);
        setTimeout(() => {
            setAddedItems(prev => prev.filter(id => id !== item.id));
        }, 1000);
    };

    // Open quick view
    const openQuickView = (item) => {
        setSelectedItem(item);
        setShowQuickView(true);
    };

    // Render stars
    const renderStars = (rating, itemId, interactive = false) => {
        const userRating = itemRatings[itemId] || 0;
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                    <span
                        key={star}
                        className={`star ${star <= (userRating || rating) ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
                        onClick={interactive ? () => handleRating(itemId, star) : undefined}
                    >
                        ★
                    </span>
                ))}
                <span className="rating-text">({rating})</span>
            </div>
        );
    };

    return (
        <div className="menu-page">
            {/* Floating Food Particles */}
            <div className="floating-particles">
                {['🍕', '🍔', '🌮', '🍜', '🍛', '🥘', '🍗', '🥙', '🧆', '🍖'].map((emoji, index) => (
                    <span
                        key={index}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${index * 0.5}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    >
                        {emoji}
                    </span>
                ))}
            </div>

            {/* Hero Section */}
            <div className="menu-hero">
                <div className="menu-hero-overlay"></div>
                <div className="menu-hero-content">
                    <span className="menu-hero-badge">🔥 Now Serving</span>
                    <h1>Discover Our Menu</h1>
                    <p>Authentic flavors crafted with passion</p>

                    {/* Live cooking indicator */}
                    <div className="live-cooking">
                        <span className="live-dot"></span>
                        <span>12 dishes being prepared right now</span>
                    </div>
                </div>
            </div>

            {/* Chef's Special Section */}
            <div className="chefs-special-section">
                <div className="chefs-special-header">
                    <div className="header-left">
                        <span className="chef-icon">👨‍🍳</span>
                        <div>
                            <h2>Chef's Special</h2>
                            <p>Limited time exclusive dishes</p>
                        </div>
                    </div>
                    <CountdownTimer />
                </div>


                <div className="chefs-special-cards">
                    {chefsSpecials.map(item => (
                        <div className="special-card" key={item.id}>
                            <div className="special-card-image">
                                <img src={item.image} alt={item.name} />
                                <span className="special-badge">{item.badge}</span>
                                <div className="special-overlay">
                                    <button onClick={() => openQuickView(item)}>Quick View</button>
                                </div>
                            </div>
                            <div className="special-card-content">
                                <div className="special-rating">
                                    {renderStars(item.rating, item.id)}
                                    <span className="review-count">{item.reviews} reviews</span>
                                </div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <div className="special-meta">
                                    <span className="prep-time">⏱️ {item.prepTime}</span>
                                    <span className="ingredients">🥗 {item.ingredients.length} ingredients</span>
                                </div>
                                <div className="special-footer">
                                    <div className="special-price">
                                        <span className="current-price">Rs. {item.price}</span>
                                        <span className="original-price">Rs. {item.originalPrice}</span>
                                        <span className="discount">-{Math.round((1 - item.price / item.originalPrice) * 100)}%</span>
                                    </div>
                                    <button
                                        className={`special-add-btn ${addedItems.includes(item.id) ? 'added' : ''}`}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        {addedItems.includes(item.id) ? '✓ Added' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

            {/* Search Bar */}
            < div className="menu-search-container" >
                <div className="menu-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for your favorite dish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
                    )}
                </div>
            </div >

            {/* Unique Radial Category Selector */}
            < div className="category-selector" >
                <div className="category-wheel">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                            style={{ '--category-color': category.color }}
                        >
                            <span className="category-icon">{category.icon}</span>
                            <span className="category-name">{category.name}</span>
                            {activeCategory === category.id && <span className="category-glow"></span>}
                        </button>
                    ))}
                </div>
            </div >

            {/* Results Count */}
            < div className="results-info" >
                <span className="results-count">{filteredItems.length} dishes found</span>
                {
                    activeCategory !== 'all' && (
                        <button className="clear-filter" onClick={() => setActiveCategory('all')}>
                            Clear filter ×
                        </button>
                    )
                }
            </div >

            {/* Menu Grid with 3D Cards */}
            < div className="menu-grid" ref={menuRef} >
                {
                    filteredItems.map((item, index) => (
                        <div
                            className={`menu-card-3d ${addedItems.includes(item.id) ? 'pulse' : ''}`}
                            key={item.id}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="card-inner">
                                {/* Front of Card */}
                                <div className="card-front">
                                    <div className="menu-card-image">
                                        <img src={item.image} alt={item.name} />
                                        <div className="image-overlay">
                                            <button className="quick-view-btn" onClick={() => openQuickView(item)}>
                                                👁️ Quick View
                                            </button>
                                        </div>
                                        {item.popular && <span className="badge popular">🔥 Popular</span>}
                                        {item.spicy && <span className="badge spicy">🌶️</span>}
                                        <span className="prep-badge">⏱️ {item.prepTime}</span>
                                    </div>
                                    <div className="menu-card-content">
                                        {renderStars(item.rating, item.id)}
                                        <h3>{item.name}</h3>
                                        <p className="menu-description">{item.description}</p>
                                        <div className="menu-card-footer">
                                            <div className="price-section">
                                                <span className="menu-price">Rs. {item.price}</span>
                                                <span className="calories">{item.calories} cal</span>
                                            </div>
                                            <button
                                                className={`add-to-cart-btn ${addedItems.includes(item.id) ? 'added' : ''}`}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                {addedItems.includes(item.id) ? (
                                                    <span className="added-text">✓</span>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M12 5v14M5 12h14"></path>
                                                        </svg>
                                                        <span>Add</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >

            {
                filteredItems.length === 0 && (
                    <div className="no-results">
                        <span className="no-results-icon">🔍</span>
                        <h3>No dishes found</h3>
                        <p>Try a different search term or category</p>
                        <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
                            Show all dishes
                        </button>
                    </div>
                )
            }

            {/* Quick View Modal */}
            {
                showQuickView && selectedItem && (
                    <div className="quick-view-overlay" onClick={() => setShowQuickView(false)}>
                        <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal" onClick={() => setShowQuickView(false)}>×</button>

                            <div className="modal-content">
                                <div className="modal-image">
                                    <img src={selectedItem.image} alt={selectedItem.name} />
                                    {selectedItem.popular && <span className="modal-badge">🔥 Popular Choice</span>}
                                </div>

                                <div className="modal-details">
                                    <div className="modal-rating">
                                        {renderStars(selectedItem.rating, selectedItem.id, true)}
                                        <span className="reviews">{selectedItem.reviews} reviews</span>
                                    </div>

                                    <h2>{selectedItem.name}</h2>
                                    <p className="modal-description">{selectedItem.description}</p>

                                    <div className="modal-meta">
                                        <div className="meta-item">
                                            <span className="meta-icon">⏱️</span>
                                            <span>{selectedItem.prepTime}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-icon">🔥</span>
                                            <span>{selectedItem.calories} calories</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-icon">{selectedItem.spicy ? '🌶️' : '😊'}</span>
                                            <span>{selectedItem.spicy ? 'Spicy' : 'Mild'}</span>
                                        </div>
                                    </div>

                                    <div className="modal-ingredients">
                                        <h4>Ingredients</h4>
                                        <div className="ingredients-list">
                                            {selectedItem.ingredients?.map((ing, i) => (
                                                <span key={i} className="ingredient-tag">{ing}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <div className="modal-price">
                                            <span className="price-label">Price</span>
                                            <span className="price-value">Rs. {selectedItem.price}</span>
                                        </div>
                                        <button
                                            className="modal-add-btn"
                                            onClick={() => {
                                                handleAddToCart(selectedItem);
                                                setShowQuickView(false);
                                            }}
                                        >
                                            Add to Cart
                                            <span className="btn-arrow">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Menu;
