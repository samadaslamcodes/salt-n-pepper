import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-first-box">
                <img className="footer-logo" src="/assets/navbar-logo.png" alt="Salt N Pepper Logo" />
                <p style={{ fontSize: '14px' }}>
                    The Salt'n Pepper Restaurants are an example of gracious dining,
                    outstanding service, extraordinary classic and contemporary cuisine.
                    The restaurants have become the ultimate dining destinations in
                    Lahore. From family occasions to business dinner and moments of the
                    heart, this place is where unforgettable memories are made.
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <p className="footer-links"><a href="#">Terms & conditions</a></p>
                    <p className="footer-links"><a href="#">Privacy policy</a></p>
                </div>
                <p style={{ marginTop: '80px', fontSize: '1.4rem' }}>@ 2023 Salt'n Pepper Restaurant</p>
            </div>

            <div className="footer-second-box">
                <p style={{ fontSize: '1.6rem' }} className="headings">Site links</p>
                <ul>
                    <li className="footer-links">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="footer-links">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="footer-links">
                        <Link to="/publications">Publications</Link>
                    </li>
                    <li className="footer-links">Get a Franchise</li>
                    <li className="footer-links">
                        <Link to="/feedback">Feedback</Link>
                    </li>
                </ul>
            </div>

            <div>
                <p className="headings">Contact Us</p>
                <p className="headings">Head office Address</p>
                <p className="footer-links">23-Usman Block, New</p>
                <p className="footer-links">GardenTown, Lahore, Pakistan</p>
                <p className="headings">Head office number</p>
                <p className="footer-links">+92 42 358 509 31</p>
                <p className="footer-links">+92 42 358 509 30</p>
                <p className="headings">Email Address</p>
                <p className="footer-links">snpfood@brain.net.pk</p>
                <p className="headings">Free delivery number</p>
                <p className="footer-links">+92 42 111 100 678</p>
                <p className="footer-links">+92 03 111 444 610</p>
            </div>

            <div>
                <p className="headings">FOLLOW US</p>
                <div style={{ display: 'flex', gap: '5px', marginLeft: '12px' }}>
                    <div className="social-icon-circle">
                        <img className="fb-logo" src="/assets/black fb.png" alt="Facebook" />
                    </div>
                    <div className="social-icon-circle">
                        <img className="ig-logo" src="/assets/insta-1.webp" alt="Instagram" />
                    </div>
                    <div className="social-icon-circle">
                        <img className="twit-logo" src="/assets/twitter-logo-transparent-background-2.png" alt="Twitter" />
                    </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <img style={{ height: '44px' }} src="/assets/appstore.png" alt="App Store" />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <img style={{ height: '44px' }} src="/assets/googleplay.png" alt="Google Play" />
                </div>
            </div>

            <h1 style={{ width: '100%', textAlign: 'center', marginTop: '40px', fontSize: '1.5rem' }}>
                Powered by: ABDUL SAMAD
            </h1>
        </footer>
    );
};

export default Footer;
