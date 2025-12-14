import { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('reservations');
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const resResponse = await fetch('http://localhost:5000/api/reservations');
            const ordResponse = await fetch('http://localhost:5000/api/orders');

            if (resResponse.ok) setReservations(await resResponse.json());
            if (ordResponse.ok) setOrders(await ordResponse.json());
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="admin-dashboard-page">
            <div className="admin-container">
                <header className="admin-header">
                    <h1>Admin Dashboard</h1>
                    <button onClick={fetchData} className="refresh-btn">
                        🔄 Refresh Data
                    </button>
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
                    padding: 80px 20px;
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
                    align-items: center;
                    margin-bottom: 30px;
                }
                .refresh-btn {
                    background: #333;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .refresh-btn:hover { background: #444; }
                
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
            `}</style>
        </div>
    );
};

export default AdminDashboard;
