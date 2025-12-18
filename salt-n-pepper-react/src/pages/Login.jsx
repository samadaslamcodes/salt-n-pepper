import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('isAdminAuthenticated', 'true');
                navigate('/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Admin Access</h1>
                <p>Please log in to continue</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label>Username / Email</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="samadcodes57@gmail.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Log In</button>
                    <div className="back-link">
                        <a href="/">← Back to Home</a>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #1a1a1a;
                    padding: 20px;
                    color: white;
                }
                .login-container {
                    background: #252525;
                    padding: 40px;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    border: 1px solid #333;
                }
                h1 {
                    color: #d4af37;
                    margin-bottom: 10px;
                }
                p {
                    color: #888;
                    margin-bottom: 30px;
                }
                .form-group {
                    margin-bottom: 20px;
                    text-align: left;
                }
                label {
                    display: block;
                    margin-bottom: 8px;
                    color: #aaa;
                    font-size: 0.9rem;
                }
                input {
                    width: 100%;
                    padding: 12px;
                    background: #333;
                    border: 1px solid #444;
                    border-radius: 6px;
                    color: white;
                    font-size: 1rem;
                    transition: 0.3s;
                }
                input:focus {
                    outline: none;
                    border-color: #d4af37;
                    background: #2a2a2a;
                }
                .login-btn {
                    width: 100%;
                    padding: 12px;
                    background: #d4af37;
                    color: black;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: 0.3s;
                    margin-top: 10px;
                }
                .login-btn:hover {
                    background: #b5952f;
                }
                .error-message {
                    background: rgba(255, 87, 87, 0.1);
                    color: #ff5757;
                    padding: 10px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    font-size: 0.9rem;
                    border: 1px solid rgba(255, 87, 87, 0.2);
                }
                .back-link {
                    margin-top: 20px;
                }
                .back-link a {
                    color: #888;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: 0.3s;
                }
                .back-link a:hover {
                    color: #d4af37;
                }
            `}</style>
        </div>
    );
};

export default Login;
