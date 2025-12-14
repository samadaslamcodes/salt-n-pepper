import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartCount, setIsCartOpen }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="nav-box">
            <Link to="/">
                <img className="logo" src="/assets/navbar-logo.png" alt="Salt N Pepper Logo" />
            </Link>

            <ul className="nav-list">
                <li>
                    <Link to="/" className={isActive('/')}>Home</Link>
                </li>
                <li>
                    <Link to="/menu" className={isActive('/menu')}>Menu</Link>
                </li>
                <li>
                    <Link to="/about" className={isActive('/about')}>About</Link>
                </li>
                <li>
                    <Link to="/publications" className={isActive('/publications')}>Publications</Link>
                </li>
                <li>
                    <Link to="/feedback" className={isActive('/feedback')}>Feedback</Link>
                </li>
            </ul>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>

                {/* Admin Button */}
                <Link to="/admin" className="admin-btn" title="Admin Dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a5 5 0 0 1 5 5c0 2.4-1.8 4.6-4.3 5v.5h-1.4v-.5c-2.5-.4-4.3-2.6-4.3-5a5 5 0 0 1 5-5z"></path>
                        <path d="M4 22c0-3 5-5 8-5s8 2 8 5"></path>
                    </svg>
                </Link>

                {/* Cart Button */}
                <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>

                <Link to="/book-dining" className="button-1">
                    <span>Book a Table</span>
                </Link>
                <Link to="/menu" className="button-2">
                    <span>Order Online</span>
                    <span className="arrow-but">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
