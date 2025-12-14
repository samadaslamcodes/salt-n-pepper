import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ addToCart, setIsCartOpen }) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Hero slides data
    const heroSlides = [
        {
            image: '/assets/image-1.webp',
            title: 'Authentic Pakistani Cuisine',
            subtitle: 'Experience the Rich Flavors of Tradition',
            offer: '20% OFF on First Order'
        },
        {
            image: '/assets/islamabad-branch.png',
            title: 'Fine Dining Experience',
            subtitle: 'Celebrate Every Moment with Us',
            offer: 'Free Delivery on Orders Above Rs. 2000'
        },
        {
            image: '/assets/faisalabad.png',
            title: 'Fresh & Delicious',
            subtitle: 'Made with Love, Served with Pride',
            offer: 'Family Deals Starting from Rs. 1499'
        }
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    // Restaurant Franchises data
    const restaurantFranchises = [
        {
            city: 'I S L A M A B A D',
            name: "Salt'n Pepper Restaurant",
            address: 'Plot# 55, Shabbir Plaza, Blue Area, F-6, Islamabad',
            phone: 'Ph: 051-2604904-6',
            image: '/assets/islamabad-branch.png',
            imageFirst: false,
            mapUrl: 'https://www.google.com/maps/search/Salt+n+Pepper+Restaurant+Blue+Area+F-6+Islamabad',
        },
        {
            city: 'F A I S A L A B A D',
            name: "Salt'n Pepper Restaurant",
            address: '4-Kohinoor City, Faisalabad',
            phone: 'Ph: 041-8711404',
            image: '/assets/faisalabad.png',
            imageFirst: true,
            mapUrl: 'https://www.google.com/maps/search/Salt+n+Pepper+Restaurant+Kohinoor+City+Faisalabad',
        },
        {
            city: 'B A H A W A L P U R',
            name: "Salt'n Pepper Restaurant",
            address: 'D.C Chowk, opposite Commissioner House, Bahawalpur',
            phone: 'Ph: 062-2740271-2',
            image: '/assets/bhawalpur-branch.png',
            imageFirst: false,
            mapUrl: 'https://www.google.com/maps/search/Salt+n+Pepper+Restaurant+DC+Chowk+Bahawalpur',
        },
    ];

    // Express Franchises data
    const expressFranchises = [
        [
            { image: '/assets/emporium-mall.png', city: 'E M P O R I U M M A L L', address: '2nd Floor, Food Court Emporium Mall', phone: 'Ph: 0311 1100947' },
            { image: '/assets/gujranwala.png', city: 'G U J R A N W A L A', address: 'Sixteenth Avenue Mall', phone: 'Ph: 0300 6024000' },
            { image: '/assets/sargodha.png', city: 'S A R G O D H A', address: 'Opposite Sargodha Arts Council', phone: 'Ph: (048) 3725500' },
        ],
        [
            { image: '/assets/jhelum.png', city: 'J H E L U M', address: 'Main GT Road, Jhelum', phone: 'Ph: 0311 1100947' },
            { image: '/assets/faisal-town.png', city: 'F A I S A L T O W N', address: 'Main Boulevard, Faisal Town', phone: 'Ph: 0311 1100947' },
            { image: '/assets/dha.png', city: 'D H A', address: 'Phase 5, DHA Lahore', phone: 'Ph: 0311 1100947' },
        ],
        [
            { image: '/assets/gujrat.webp', city: 'G U J R A T', address: 'Service Mor, Gujrat', phone: 'Ph: 0311-1124600' },
            { image: '/assets/sahiwal.webp', city: 'S A H I W A L', address: 'Opposite Main Gate Police Line, Sahiwal', phone: 'Ph: 040-4515485' },
        ],
    ];

    // Opening Soon locations
    const openingSoonLocations = [
        { name: "Salt'n Pepper Express", area: 'Al-Jalil Garden', city: 'Sadhoke' },
        { name: "Salt'n Pepper Express", area: 'Al-Jalil Garden', city: 'Sheikhupura' },
        { name: "Salt'n Pepper Express", area: 'Blue World City', city: 'Rawalpindi' },
        { name: "Salt'n Pepper Express", area: 'City Housing', city: 'Gujranwala' },
        { name: "Salt'n Pepper Express", area: 'City Housing', city: 'Sialkot' },
        { name: "Salt'n Pepper Express", area: 'Al-Jalil Garden', city: 'Sharqpur' },
        { name: "Salt'n Pepper Express", area: 'Al-Jalil Garden', city: 'Sadhoke' },
    ];

    // Social food images
    const socialFoodImages = [
        '/assets/social-food-1 (1).png',
        '/assets/social-food-2.png',
        '/assets/social-food-3.png',
        '/assets/social-food-4png 1.webp',
        '/assets/social-food-5.png',
    ];

    return (
        <>
            {/* Enhanced Hero Banner Section */}
            <section className="hero-banner">
                {/* Slides */}
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="hero-overlay"></div>
                    </div>
                ))}

                {/* Hero Content */}
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    {/* Promotional Badge */}
                    <div className="promo-badge">
                        <span className="promo-icon">🔥</span>
                        <span className="promo-text">{heroSlides[currentSlide].offer}</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="hero-title" key={`title-${currentSlide}`}>
                        {heroSlides[currentSlide].title}
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle" key={`subtitle-${currentSlide}`}>
                        {heroSlides[currentSlide].subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-cta-group">
                        <button className="hero-btn primary" onClick={() => navigate('/menu')}>
                            <span>Order Now</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                        <button className="hero-btn secondary" onClick={() => navigate('/menu')}>
                            <span>View Menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                <line x1="14" y1="1" x2="14" y2="4"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Features Strip */}
                    <div className="hero-features">
                        <div className="feature-item">
                            <span className="feature-icon">🚚</span>
                            <span>Free Delivery</span>
                        </div>
                        <div className="feature-divider"></div>
                        <div className="feature-item">
                            <span className="feature-icon">⏰</span>
                            <span>30 Min Delivery</span>
                        </div>
                        <div className="feature-divider"></div>
                        <div className="feature-item">
                            <span className="feature-icon">⭐</span>
                            <span>4.8 Rating</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button className="hero-nav-btn prev" onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button className="hero-nav-btn next" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                {/* Slide Indicators */}
                <div className="hero-indicators">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator">
                    <span>Scroll to Explore</span>
                    <div className="scroll-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </section>

            {/* Welcome Section */}
            <div className="welcome-section">
                <p className="text-1">
                    "Welcome to " <span className="futurak-font">Salt n Pepper</span>
                </p>
                <p className="text-2">Restaurants! Our brands</p>
                <p className="text-3">
                    Please click our brands below for further information, reservations or to order online!
                </p>
            </div>

            {/* Brand Cards */}
            <div className="page-2">
                <div className="three-images-div">
                    {[1, 2, 3].map((num) => (
                        <div key={num}>
                            <img src={`/assets/three img-${num}.png`} alt={`Brand ${num}`} />
                            <p className="order-now-button">order now</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restaurant Franchises */}
            <div className="page-3">
                <div>
                    <p className="text-4">Salt'n Pepper</p>
                    <p className="text-5">Restaurant Franchises</p>
                    <p className="text-6">
                        Each of our franchises are individually managed. For further details,
                        kindly contact them directly.
                    </p>
                </div>

                {restaurantFranchises.map((franchise, index) => (
                    <div className="islamabad" key={index}>
                        {franchise.imageFirst ? (
                            <>
                                <div>
                                    <img src={franchise.image} alt={franchise.name} style={{ maxWidth: '450px' }} />
                                </div>
                                <div className="islamabad-address">
                                    <p className="isl-text-1">{franchise.city}</p>
                                    <p className="isl-text-2">{franchise.name}</p>
                                    <p className="isl-text-3">
                                        <img style={{ width: '20px', height: 'auto' }} src="/assets/arrow.png" alt="location" />
                                        {franchise.address}
                                    </p>
                                    <p className="isl-text-4">
                                        <img style={{ width: '20px', height: 'auto' }} src="/assets/cell.png" alt="phone" />
                                        {franchise.phone}
                                    </p>
                                    <div className="get-direction">
                                        <a href={franchise.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                        <img style={{ width: '25px', height: 'auto', marginLeft: '10px' }} src="/assets/left arrrow.png" alt="arrow" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="islamabad-address">
                                    <p className="isl-text-1">{franchise.city}</p>
                                    <p className="isl-text-2">{franchise.name}</p>
                                    <p className="isl-text-3">
                                        <img style={{ width: '20px', height: 'auto' }} src="/assets/arrow.png" alt="location" />
                                        {franchise.address}
                                    </p>
                                    <p className="isl-text-4">
                                        <img style={{ width: '20px', height: 'auto' }} src="/assets/cell.png" alt="phone" />
                                        {franchise.phone}
                                    </p>
                                    <div className="get-direction">
                                        <a href={franchise.mapUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                        <img style={{ width: '25px', height: 'auto', marginLeft: '10px' }} src="/assets/left arrrow.png" alt="arrow" />
                                    </div>
                                </div>
                                <div>
                                    <img src={franchise.image} alt={franchise.name} style={{ maxWidth: '450px' }} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Express Franchises */}
            <div className="page-4">
                <div>
                    <p className="exp-text-1">Salt'n Pepper</p>
                    <p className="exp-text-2">Express Franchises</p>
                </div>

                {expressFranchises.map((row, rowIndex) => (
                    <div className="exp-sec-1" key={rowIndex}>
                        {row.map((franchise, index) => (
                            <div key={index}>
                                <img className="franchise-images" src={franchise.image} alt={franchise.city} />
                                <p className="franchise-text-1">{franchise.city}</p>
                                <p className="franchise-text-2">Salt'n Pepper Express</p>
                                <p className="franchise-text-3">{franchise.address}</p>
                                <p className="franchise-text-4">{franchise.phone}</p>
                                <p className="franchise-get-direction">get directions</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Village Franchise */}
            <div className="page-5">
                <p style={{ fontSize: '7rem', textAlign: 'center', marginTop: '50px' }}>
                    Salt'n Pepper
                </p>
                <p style={{ fontSize: '6rem', textAlign: 'center', marginBottom: '20px' }}>
                    Village Franchise
                </p>
                <div className="village-franchise">
                    <div>
                        <img style={{ maxWidth: '100%', height: 'auto' }} src="/assets/gujranwala-village.png" alt="Village Franchise" />
                    </div>
                    <div className="islamabad-address">
                        <p className="isl-text-1">G U J R A N W A L A</p>
                        <p className="isl-text-2">Salt'n Pepper Village</p>
                        <p className="isl-text-3">
                            <img style={{ width: '20px', height: 'auto' }} src="/assets/arrow.png" alt="location" />
                            Adjacent to Rida Marquees, GT Road Gujranwala Cantt
                        </p>
                        <p className="isl-text-4">
                            <img style={{ width: '20px', height: 'auto' }} src="/assets/cell.png" alt="phone" />
                            Ph: 055-3884500 | 055-3880400
                        </p>
                        <div className="get-direction">
                            <a href="#">Get Directions</a>
                            <img style={{ width: '25px', height: 'auto', marginLeft: '10px' }} src="/assets/left arrrow.png" alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Opening Soon */}
            <div className="page-6">
                <p style={{ fontSize: '7rem', textAlign: 'center', marginTop: '50px' }}>
                    Salt'n Pepper
                </p>
                <p style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '20px' }}>
                    Village Franchise (opening soon)
                </p>

                {/* First row of 3 */}
                <div className="three-white-boxes">
                    {openingSoonLocations.slice(0, 3).map((location, index) => (
                        <div className="white-box" key={index}>
                            <img className="white-box-location" src="/assets/white-location.png" alt="location" style={{ width: '40px' }} />
                            <p className="white-box-text-1">OPENING SOON</p>
                            <p className="white-box-text-2">{location.name}</p>
                            <p className="white-box-text-3">{location.area}</p>
                            <p className="white-box-text-4">{location.city}</p>
                        </div>
                    ))}
                </div>

                {/* Second row of 3 */}
                <div className="three-white-boxes">
                    {openingSoonLocations.slice(3, 6).map((location, index) => (
                        <div className="white-box" key={index}>
                            <img className="white-box-location" src="/assets/white-location.png" alt="location" style={{ width: '40px' }} />
                            <p className="white-box-text-1">OPENING SOON</p>
                            <p className="white-box-text-2">{location.name}</p>
                            <p className="white-box-text-3">{location.area}</p>
                            <p className="white-box-text-4">{location.city}</p>
                        </div>
                    ))}
                </div>

                {/* Last row */}
                <div className="three-white-boxes">
                    {openingSoonLocations.slice(6).map((location, index) => (
                        <div className="white-box" key={index}>
                            <img className="white-box-location" src="/assets/white-location.png" alt="location" style={{ width: '40px' }} />
                            <p className="white-box-text-1">OPENING SOON</p>
                            <p className="white-box-text-2">{location.name}</p>
                            <p className="white-box-text-3">{location.area}</p>
                            <p className="white-box-text-4">{location.city}</p>
                        </div>
                    ))}
                </div>

                {/* Social Food */}
                <p style={{ textAlign: 'center', fontSize: '3rem', margin: '40px' }}>
                    SOCIAL FOOD
                </p>
                <div className="five-images">
                    {socialFoodImages.map((image, index) => (
                        <img key={index} className="social-food-image" src={image} alt={`Social Food ${index + 1}`} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
