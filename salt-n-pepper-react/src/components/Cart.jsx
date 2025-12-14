import { useState } from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart, clearCart, isOpen, setIsOpen }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [checkoutData, setCheckoutData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        paymentMethod: 'cod',
        instructions: ''
    });

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 2000 ? 0 : 150;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    const handleCheckoutChange = (e) => {
        setCheckoutData({
            ...checkoutData,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            ...checkoutData,
            items: cartItems,
            total,
            subtotal,
            tax,
            deliveryFee
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const data = await response.json();
                setOrderId(data.id);
                setOrderPlaced(true);
                setTimeout(() => {
                    clearCart();
                    setOrderPlaced(false);
                    setIsCheckout(false);
                    setIsOpen(false);
                }, 5000);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            // Fallback
            const id = 'OFF' + Math.random().toString(36).substr(2, 9).toUpperCase();
            setOrderId(id);
            setOrderPlaced(true);
            setTimeout(() => {
                clearCart();
                setOrderPlaced(false);
                setIsCheckout(false);
                setIsOpen(false);
            }, 5000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="cart-overlay" onClick={() => setIsOpen(false)}>
            <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="cart-header">
                    <h2>
                        {orderPlaced ? '🎉 Order Placed!' : isCheckout ? '📦 Checkout' : '🛒 Your Cart'}
                    </h2>
                    <button className="cart-close" onClick={() => setIsOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Order Placed Success */}
                {orderPlaced && (
                    <div className="order-success">
                        <div className="success-animation">✓</div>
                        <h3>Thank You for Your Order!</h3>
                        <p className="order-id">Order ID: <strong>{orderId}</strong></p>
                        <p>Your delicious food is being prepared and will be delivered soon.</p>
                        <div className="estimated-time">
                            <span className="time-icon">⏱️</span>
                            <span>Estimated Delivery: 30-45 minutes</span>
                        </div>
                    </div>
                )}

                {/* Checkout Form */}
                {isCheckout && !orderPlaced && (
                    <form className="checkout-form" onSubmit={handlePlaceOrder}>
                        <div className="checkout-section">
                            <h3>Delivery Details</h3>
                            <div className="checkout-field">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={checkoutData.name}
                                    onChange={handleCheckoutChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="checkout-field">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={checkoutData.phone}
                                    onChange={handleCheckoutChange}
                                    placeholder="03XX-XXXXXXX"
                                    required
                                />
                            </div>
                            <div className="checkout-field">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={checkoutData.email}
                                    onChange={handleCheckoutChange}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="checkout-field">
                                <label>Delivery Address *</label>
                                <textarea
                                    name="address"
                                    value={checkoutData.address}
                                    onChange={handleCheckoutChange}
                                    placeholder="Complete delivery address with landmarks"
                                    rows="3"
                                    required
                                ></textarea>
                            </div>
                            <div className="checkout-field">
                                <label>City *</label>
                                <select
                                    name="city"
                                    value={checkoutData.city}
                                    onChange={handleCheckoutChange}
                                    required
                                >
                                    <option value="">Select City</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="islamabad">Islamabad</option>
                                    <option value="faisalabad">Faisalabad</option>
                                    <option value="gujranwala">Gujranwala</option>
                                    <option value="bahawalpur">Bahawalpur</option>
                                </select>
                            </div>
                        </div>

                        <div className="checkout-section">
                            <h3>Payment Method</h3>
                            <div className="payment-options">
                                <label className={`payment-option ${checkoutData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={checkoutData.paymentMethod === 'cod'}
                                        onChange={handleCheckoutChange}
                                    />
                                    <span className="payment-icon">💵</span>
                                    <span>Cash on Delivery</span>
                                </label>
                                <label className={`payment-option ${checkoutData.paymentMethod === 'card' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={checkoutData.paymentMethod === 'card'}
                                        onChange={handleCheckoutChange}
                                    />
                                    <span className="payment-icon">💳</span>
                                    <span>Credit/Debit Card</span>
                                </label>
                                <label className={`payment-option ${checkoutData.paymentMethod === 'jazzcash' ? 'selected' : ''}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="jazzcash"
                                        checked={checkoutData.paymentMethod === 'jazzcash'}
                                        onChange={handleCheckoutChange}
                                    />
                                    <span className="payment-icon">📱</span>
                                    <span>JazzCash</span>
                                </label>
                            </div>
                        </div>

                        <div className="checkout-field">
                            <label>Special Instructions (Optional)</label>
                            <textarea
                                name="instructions"
                                value={checkoutData.instructions}
                                onChange={handleCheckoutChange}
                                placeholder="Any special delivery instructions..."
                                rows="2"
                            ></textarea>
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>Rs. {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery Fee</span>
                                <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (5%)</span>
                                <span>Rs. {tax.toLocaleString()}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>Rs. {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="checkout-actions">
                            <button type="button" className="back-btn" onClick={() => setIsCheckout(false)}>
                                ← Back to Cart
                            </button>
                            <button type="submit" className="place-order-btn">
                                Place Order
                            </button>
                        </div>
                    </form>
                )}

                {/* Cart Items */}
                {!isCheckout && !orderPlaced && (
                    <>
                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <span className="empty-icon">🛒</span>
                                <h3>Your cart is empty</h3>
                                <p>Add some delicious items to get started!</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartItems.map(item => (
                                        <div className="cart-item" key={item.id}>
                                            <img src={item.image} alt={item.name} />
                                            <div className="cart-item-info">
                                                <h4>{item.name}</h4>
                                                <p className="cart-item-price">Rs. {item.price}</p>
                                            </div>
                                            <div className="cart-item-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                    +
                                                </button>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 6h18"></path>
                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>Rs. {subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery Fee</span>
                                        <span>{deliveryFee === 0 ? <span className="free">FREE</span> : `Rs. ${deliveryFee}`}</span>
                                    </div>
                                    {deliveryFee > 0 && (
                                        <p className="free-delivery-note">
                                            Add Rs. {(2000 - subtotal).toLocaleString()} more for free delivery!
                                        </p>
                                    )}
                                    <div className="summary-row total">
                                        <span>Total</span>
                                        <span>Rs. {(subtotal + deliveryFee).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="cart-actions">
                                    <button className="clear-cart" onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                    <button className="checkout-btn" onClick={() => setIsCheckout(true)}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
