import { useState } from 'react';

const Feedback = () => {
    const [formData, setFormData] = useState({
        title: '',
        comment: '',
        fullName: '',
        email: '',
        phone: '',
        favourite1: '',
        favourite2: '',
        favourite3: '',
        newItem1: '',
        newItem2: '',
        newItem3: '',
    });

    const [ratings, setRatings] = useState({
        foodQuality: 0,
        foodQuantity: 0,
        ambiance: 0,
        service: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRating = (category, rating) => {
        setRatings((prev) => ({
            ...prev,
            [category]: rating,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { formData, ratings });
        alert('Thank you for your feedback!');
    };

    const renderStars = (category, currentRating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <i
                key={star}
                className="fa-solid fa-star"
                style={{
                    color: star <= currentRating ? 'gold' : '#444',
                    cursor: 'pointer',
                    marginRight: '5px',
                    fontSize: '1.8rem',
                }}
                onClick={() => handleRating(category, star)}
                aria-hidden="true"
            />
        ));
    };

    return (
        <>
            {/* Hero Section */}
            <div className="main-image">
                <img src="/assets/feedback main pic.webp" alt="Feedback Background" />
                <div className="txt-inside">
                    <p style={{ fontSize: '3.4rem' }}>Salt'n Pepper</p>
                    <p style={{ fontSize: '6rem' }}>F e e d b a c k</p>
                    <p style={{ fontSize: '3.4rem' }}>We'd Love To Hear From You!</p>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-pg-1">
                <div>
                    <h1 className="txt-1">Rate Your Experience</h1>

                    <div className="txtpg">
                        <div className="txt-2">
                            <p>Food Quality</p>
                            <div>{renderStars('foodQuality', ratings.foodQuality)}</div>
                        </div>
                        <div className="txt-3">
                            <p>Food Quantity</p>
                            <div>{renderStars('foodQuantity', ratings.foodQuantity)}</div>
                        </div>
                        <div className="txt-4">
                            <p>Ambiance</p>
                            <div>{renderStars('ambiance', ratings.ambiance)}</div>
                        </div>
                        <div className="txt-5">
                            <p>Service</p>
                            <div>{renderStars('service', ratings.service)}</div>
                        </div>
                    </div>

                    <form className="form-pg-2" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="comment">Comment</label>
                        <input
                            type="text"
                            name="comment"
                            id="comment"
                            value={formData.comment}
                            onChange={handleInputChange}
                        />

                        <label htmlFor="fullName">
                            Full Name <span className="text-red">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="email">
                            Email <span className="text-red">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="phone">
                            Phone Number <span className="text-red">*</span>
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />

                        <div style={{ marginTop: '20px' }}>
                            <label>Kindly indicate your favourite items from our menu.</label>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="favourite1"
                                    placeholder="1."
                                    value={formData.favourite1}
                                    onChange={handleInputChange}
                                />
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="favourite2"
                                    placeholder="2."
                                    value={formData.favourite2}
                                    onChange={handleInputChange}
                                />
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="favourite3"
                                    placeholder="3."
                                    value={formData.favourite3}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label>If not, what new food items would you like us to add?</label>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="newItem1"
                                    placeholder="1."
                                    value={formData.newItem1}
                                    onChange={handleInputChange}
                                />
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="newItem2"
                                    placeholder="2."
                                    value={formData.newItem2}
                                    onChange={handleInputChange}
                                />
                                <input
                                    style={{ height: '36px', width: '90px' }}
                                    type="text"
                                    name="newItem3"
                                    placeholder="3."
                                    value={formData.newItem3}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <button className="button" type="submit">
                            SUBMIT
                        </button>
                    </form>
                </div>

                {/* Contact Info Sidebar */}
                <div className="pg-3">
                    <h3 className="fd-1">Foodconsults (PVT.) LTD.</h3>
                    <br />
                    <p className="fd-2">
                        Foodconsults (Pvt.) Ltd. was founded in 1983 by Mahmood Akbar,
                        considered by many as the pioneer restaurateur in Pakistan. The
                        organization, which has its headquarter in Lahore, prides itself on
                        developing and growing a unique chain of restaurants known as the Salt'n
                        Pepper Restaurants. Salt'n Pepper restaurants are Pakistan's most
                        recognized and distinguished hospitality brand with a history of market
                        innovation and excellence in restaurant chain operations.
                    </p>
                    <br />
                    <h3 className="fd-3">Contact Us</h3>
                    <br />
                    <img src="/assets/map-pic.jpeg" alt="Map" style={{ width: '100%', borderRadius: '5px' }} />
                    <h3 className="fd-4">Head Office</h3>
                    <p className="para-1">Ph: +92 316 3086 492</p>
                    <p className="para-1">snpfood@brain.net.pk</p>
                </div>
            </div>
        </>
    );
};

export default Feedback;
