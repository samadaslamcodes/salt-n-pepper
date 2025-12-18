import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('reservations');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            const resResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/reservations`);
            const ordResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/orders`);

            if (resResponse.ok) setReservations(await resResponse.json());
            if (ordResponse.ok) {
                const allOrders = await ordResponse.json();
                const pendingOrders = allOrders.filter(order => order.status !== 'Delivered');
                setOrders(pendingOrders);
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('isAdminAuthenticated');
            navigate('/login');
        }
    };

    const handleOrderAction = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Refresh data to show updated status
                fetchData();
            } else {
                alert('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Error updating order status');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="admin-dashboard-page">
            <div className="admin-container">
                <header className="admin-header">
                    <div className="header-left">
                        <h1>Admin Dashboard</h1>
                        <p className="status-text">👋 Welcome back, Samad</p>
                    </div>
                    <div className="header-actions">
                        <button onClick={fetchData} className="refresh-btn" title="Refresh Data">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                            </svg>
                        </button>
                        <button onClick={handleLogout} className="logout-btn" title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </header>

                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reservations')}
                    >
                        📅 Table Reservations ({reservations.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        🛍️ Orders ({orders.length})
                    </button>
                </div>

                <div className="admin-content">
                    {loading && reservations.length === 0 && orders.length === 0 ? (
                        <div className="loading">Loading dashboard...</div>
                    ) : (
                        <>
                            {activeTab === 'reservations' && (
                                <div className="data-table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Date & Time</th>
                                                <th>Guests</th>
                                                <th>Location</th>
                                                <th>Contact</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reservations.length === 0 ? (
                                                <tr><td colSpan="7" className="empty-cell">No reservations found</td></tr>
                                            ) : (
                                                reservations.map(res => (
                                                    <tr key={res.id}>
                                                        <td><span className="id-badge">{res.id}</span></td>
                                                        <td>{res.name}</td>
                                                        <td>
                                                            <div className="datetime">
                                                                <span className="date">{res.date}</span>
                                                                <span className="time">{res.time}</span>
                                                            </div>
                                                        </td>
                                                        <td>{res.guests} people</td>
                                                        <td>{res.location}</td>
                                                        <td>
                                                            <div className="contact-info">
                                                                <span>{res.phone}</span>
                                                                <small>{res.email}</small>
                                                            </div>
                                                        </td>
                                                        <td><span className="status-badge confirmed">Confirmed</span></td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div className="data-table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Items</th>
                                                <th>Total</th>
                                                <th>Payment</th>
                                                <th>Address</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.length === 0 ? (
                                                <tr><td colSpan="7" className="empty-cell">No orders found</td></tr>
                                            ) : (
                                                orders.map(order => (
                                                    <tr key={order.id}>
                                                        <td><span className="id-badge">{order.id}</span></td>
                                                        <td>
                                                            <div className="contact-info">
                                                                <strong>{order.name}</strong>
                                                                <span>{order.phone}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="order-items-list">
                                                                {order.items && order.items.map((item, idx) => (
                                                                    <div key={idx} className="order-item-small">
                                                                        {item.quantity}x {item.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                        <td className="amount">Rs. {order.total}</td>
                                                        <td><span className="payment-badge">{order.paymentMethod}</span></td>
                                                        <td className="address-cell">{order.address}, {order.city}</td>
                                                        <td>{formatDate(order.createdAt)}</td>
                                                        <td>
                                                            <span className={`status-badge ${order.status?.toLowerCase() || 'pending'}`}>
                                                                {order.status || 'Pending'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {order.status !== 'Delivered' && (
                                                                <button
                                                                    className="action-btn"
                                                                    onClick={() => handleOrderAction(order.id, 'Delivered')}
                                                                >
                                                                    Mark Delivered
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .admin-dashboard-page {
                    padding: 130px 20px 80px;
                    background: #1a1a1a;
                    min-height: 100vh;
                    color: white;
                }
                .admin-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                .admin-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                    border-bottom: 1px solid #333;
                    padding-bottom: 20px;
                }
                .header-left h1 {
                    margin-bottom: 5px;
                    color: #d4af37;
                }
                .status-text {
                    color: #888;
                    margin: 0;
                    font-size: 0.9rem;
                }
                .header-actions {
                    display: flex;
                    gap: 12px;
                }
                .refresh-btn {
                    background: #2a2a2a;
                    color: #aaa;
                    border: 1px solid #444;
                    width: 42px;
                    height: 42px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .refresh-btn:hover {
                    background: #333;
                    color: white;
                    border-color: #666;
                }
                .logout-btn {
                    background: rgba(211, 47, 47, 0.1);
                    color: #ef5350;
                    border: 1px solid rgba(211, 47, 47, 0.3);
                    padding: 0 20px;
                    height: 42px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: 0.3s;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                }
                .logout-btn:hover {
                    background: rgba(211, 47, 47, 0.2);
                    border-color: #ef5350;
                }
                
                .admin-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #333;
                    padding-bottom: 1px;
                }
                .tab-btn {
                    padding: 12px 24px;
                    background: transparent;
                    color: #aaa;
                    border: none;
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    font-size: 1.1rem;
                    transition: 0.3s;
                }
                .tab-btn.active {
                    color: #fff;
                    border-bottom-color: #d4af37;
                }
                
                .data-table-container {
                    background: #252525;
                    border-radius: 12px;
                    overflow-x: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    min-width: 800px;
                }
                th {
                    text-align: left;
                    padding: 18px;
                    background: #333;
                    color: #d4af37;
                    font-weight: 600;
                }
                td {
                    padding: 16px;
                    border-bottom: 1px solid #333;
                }
                tr:last-child td { border-bottom: none; }
                tr:hover td { background: #2a2a2a; }
                
                .id-badge {
                    background: #333;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 0.9em;
                }
                .contact-info {
                    display: flex;
                    flex-direction: column;
                }
                .contact-info small { color: #888; }
                .amount { font-weight: bold; color: #4caf50; }
                .payment-badge {
                    text-transform: uppercase;
                    background: #333;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8em;
                }
                .status-badge.confirmed {
                    color: #4caf50;
                    background: rgba(76, 175, 80, 0.1);
                    padding: 6px 12px;
                    border-radius: 20px;
                }
                .address-cell { max-width: 200px; font-size: 0.9em; color: #aaa; }
                .empty-cell { text-align: center; padding: 40px; color: #666; }
                .order-items-list { font-size: 0.9em; color: #ddd; }
                
                .status-badge.pending { background: rgba(255, 193, 7, 0.1); color: #ffc107; padding: 4px 8px; border-radius: 4px; }
                .status-badge.delivered { background: rgba(76, 175, 80, 0.1); color: #4caf50; padding: 4px 8px; border-radius: 4px; }

                .action-btn {
                    background: #d4af37;
                    color: black;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85em;
                    transition: 0.2s;
                    white-space: nowrap;
                }
                .action-btn:hover {
                    background: #b5952f;
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
