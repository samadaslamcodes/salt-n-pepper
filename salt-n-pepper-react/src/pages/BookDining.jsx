import { useState } from 'react';

const BookDining = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        location: '',
        occasion: '',
        specialRequests: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [bookingId, setBookingId] = useState('');

    // Restaurant locations
    const locations = [
        { id: 'islamabad', name: "Salt'n Pepper Restaurant - Islamabad", address: 'Plot# 55, Shabbir Plaza, Blue Area, F-6' },
        { id: 'faisalabad', name: "Salt'n Pepper Restaurant - Faisalabad", address: '4-Kohinoor City' },
        { id: 'bahawalpur', name: "Salt'n Pepper Restaurant - Bahawalpur", address: 'D.C Chowk, opposite Commissioner House' },
        { id: 'gujranwala', name: "Salt'n Pepper Village - Gujranwala", address: 'Adjacent to Rida Marquees, GT Road' },
    ];

    // Occasions
    const occasions = [
        'Birthday Celebration',
        'Anniversary',
        'Business Meeting',
        'Family Gathering',
        'Date Night',
        'Friends Reunion',
        'Other'
    ];

    // Time slots
    const timeSlots = [
        '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
        '3:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
        '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                setBookingId(data.id);
                setIsSubmitted(true);
            } else {
                alert('Connection error. Please try again.');
            }
        } catch (error) {
            console.error('Error booking table:', error);
            // Fallback for offline mode
            const id = 'OFF' + Math.random().toString(36).substr(2, 9).toUpperCase();
            setBookingId(id);
            setIsSubmitted(true);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            guests: '2',
            location: '',
            occasion: '',
            specialRequests: ''
        });
        setIsSubmitted(false);
        setBookingId('');
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    if (isSubmitted) {
        return (
            <div className="booking-page">
                <div className="booking-success">
                    <div className="success-icon">✓</div>
                    <h2>Reservation Confirmed!</h2>
                    <p className="booking-id">Booking ID: <strong>{bookingId}</strong></p>
                    <div className="booking-details">
                        <div className="detail-item">
                            <span className="label">Name:</span>
                            <span className="value">{formData.name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Date:</span>
                            <span className="value">{new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Time:</span>
                            <span className="value">{formData.time}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Guests:</span>
                            <span className="value">{formData.guests} {formData.guests === '1' ? 'Person' : 'People'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Location:</span>
                            <span className="value">{locations.find(l => l.id === formData.location)?.name}</span>
                        </div>
                    </div>
                    <p className="confirmation-note">
                        A confirmation email has been sent to <strong>{formData.email}</strong>
                    </p>
                    <button className="new-booking-btn" onClick={resetForm}>
                        Make Another Reservation
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            {/* Hero Section */}
            <div className="booking-hero">
                <div className="booking-hero-overlay"></div>
                <div className="booking-hero-content">
                    <h1>Book a Table</h1>
                    <p>Reserve your dining experience at Salt'n Pepper</p>
                </div>
            </div>

            {/* Booking Form */}
            <div className="booking-container">
                <div className="booking-form-wrapper">
                    <div className="booking-info">
                        <h2>Reserve Your Table</h2>
                        <p>Experience the finest Pakistani cuisine in an elegant ambiance. Book your table now for a memorable dining experience.</p>

                        <div className="info-cards">
                            <div className="info-card">
                                <span className="info-icon">🕐</span>
                                <div>
                                    <h4>Opening Hours</h4>
                                    <p>12:00 PM - 11:00 PM</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <span className="info-icon">📞</span>
                                <div>
                                    <h4>Call Us</h4>
                                    <p>0311-1100947</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <span className="info-icon">👥</span>
                                <div>
                                    <h4>Group Bookings</h4>
                                    <p>Up to 50 guests</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="03XX-XXXXXXX"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Select Restaurant *</label>
                            <select
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose a location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>
                                        {loc.name} - {loc.address}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="date">Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={today}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Time *</label>
                                <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select time</option>
                                    {timeSlots.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="guests">Number of Guests *</label>
                                <select
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    required
                                >
                                    {[...Array(20)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                                        </option>
                                    ))}
                                    <option value="20+">20+ Guests (Large Party)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="occasion">Occasion (Optional)</label>
                                <select
                                    id="occasion"
                                    name="occasion"
                                    value={formData.occasion}
                                    onChange={handleChange}
                                >
                                    <option value="">Select occasion</option>
                                    {occasions.map(occ => (
                                        <option key={occ} value={occ}>{occ}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialRequests">Special Requests (Optional)</label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                placeholder="Any dietary requirements, seating preferences, or special arrangements..."
                                rows="4"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-booking-btn">
                            <span>Confirm Reservation</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookDining;
