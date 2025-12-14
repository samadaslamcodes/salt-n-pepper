const About = () => {
    // Franchise locations data
    const franchiseLocations = [
        {
            city: 'Salt N Pepper Islamabad',
            description: "In February 2012, the first franchise of Salt'n Pepper restaurants was opened at the prime location of Blue Area, Islamabad. It was warmly welcomed by the residents of Islamabad as well as the neighboring towns.",
            image: '/assets/islambad address-1.webp',
            imageFirst: false,
        },
        {
            city: 'Salt N Pepper Faisalabad',
            description: "Faisalabad city, also known as Manchester of Pakistan also has a franchise of Salt n Pepper Restaurant since November 2016. This franchise is in the posh and upcoming locality of Kohinoor city. It is a large multi storied restaurant.",
            image: '/assets/add-faislabad.webp',
            imageFirst: true,
        },
        {
            city: 'Salt N Pepper Bahawalpur',
            description: "In the historic and swiftly developing city Bahawalpur restaurant is operational since January 2018. This restaurant will have 150 plus seating capacity including Al fresco seating. The menu is the same as Lahore Salt'n Pepper restaurants.",
            image: '/assets/add-bahawalpur.webp',
            imageFirst: false,
        },
    ];

    // Express franchise locations
    const expressFranchises = [
        {
            name: "Salt'n Pepper Bahria Town",
            address: 'Arwa Heights Building 19 Nishtar Block, Sector E, Bahria Town Lahore, Near Eiffel Tower',
            phone: 'Ph: 042 111-100-678',
            image: '/assets/fran-1.webp',
        },
        {
            name: "Salt'n Pepper Express Packages Mall",
            address: 'First Floor Packages Mall',
            phone: 'Ph: 0333-0310534',
            image: '/assets/fran-2.webp',
        },
        {
            name: "Salt'n Pepper Express Emporium Mall",
            address: '2nd Floor, Food Court Emporium Mall',
            phone: 'Ph: 0311-1100947',
            image: '/assets/fran-3.webp',
        },
        {
            name: "Salt'n Pepper Express Gujranwala",
            address: 'Sixteenth Avenue Mall',
            phone: 'Ph: 0300 6024000',
            image: '/assets/fran-4.webp',
        },
        {
            name: "Salt'n Pepper Express Sargodha",
            address: 'Opposite Sargodha Arts Council Babar Road',
            phone: 'Ph: (048) 3725500',
            image: '/assets/fran-5.webp',
        },
    ];

    return (
        <>
            {/* Introduction Section */}
            <div className="intro-page">
                <h1 className="intro">Introduction</h1>
                <p className="intro-text">
                    The Salt'n Pepper is Pakistan's most recognized and distinguished hospitality brand with a history of market
                    innovation and excellence in restaurants chain operation. The Salt'n Pepper Restaurants are regarded and
                    respected as the number one restaurant entity in Pakistan.
                </p>
                <p className="intro-text-1">
                    The Salt'n Pepper Restaurants are an example of gracious dining, outstanding service, extraordinary classic
                    and contemporary cuisine. The restaurants have become the ultimate dining destinations in Lahore. From
                    family occasions to business dinners and moments of the heart, it's a place where unforgettable memories are made.
                </p>
                <p className="intro-text-2">
                    The first Salt'n Pepper Restaurant on the Lahore Mall Road was established in 1983 by hotelier restaurant entrepreneur Mahmood Akbar,
                    considered by many as the pioneer hotelier and restaurateur in Pakistan.
                </p>
                <p className="intro-text-3">
                    Foodconsults (Pvt.) Limited the owning company of Salt'n Pepper Restaurants, which has its Headquarter in Lahore, prides itself on developing
                    Pakistan's first national chain of restaurants. For over 3 decades, the group's focus has been to provide their guests with an exceptional dining
                    experience. The group's profile includes expertise in Pakistani and Continental cuisine, along with Fast Food.
                </p>

                <h1 className="rest">Restaurant</h1>
                <p className="intro-text-4">
                    M/S. Foodconsults (Pvt.) Limited operates several different Salt'n Pepper Restaurants in Lahore. Each offering a unique dining experience. The
                    group's chronology of success is as follows:-
                </p>
            </div>

            {/* Restaurant History Section */}
            <div className="page-2">
                <div className="box">
                    <div className="text-box-page-1">
                        <h1 className="heading-page-1">Salt'n Pepper Restaurant</h1>
                        <p style={{ marginTop: '20px', fontSize: '1.6rem' }}>
                            The Salt'n Pepper Restaurants at Mall and Liberty Market Lahore, are considered to be the first proper
                            family style restaurants in the food industry of Pakistan. These restaurants pride themselves for being
                            symbolized as an eatery with a customer loyalty spanning over three generations. As a restaurant model, these
                            have inspired the set-up of numerous other restaurants across Pakistan.
                        </p>
                    </div>
                    <div>
                        <img className="page-1-image" src="/assets/info picture1.webp" alt="Salt'n Pepper Restaurant" />
                    </div>
                </div>

                <div className="box">
                    <div>
                        <img className="page-1-image" src="/assets/info pic2.webp" alt="Salt'n Pepper Village" />
                    </div>
                    <div className="text-box-page-1">
                        <h1 className="heading-page-1">Salt'n Pepper Restaurants (1992)</h1>
                        <p style={{ marginTop: '20px', fontSize: '1.6rem' }}>
                            The Salt'n Pepper Village Restaurant in Lahore is considered to be the restaurant that revolutionized dining
                            experiences in Pakistan. The Village offers classic and modern sub-continental dishes. The village restaurant
                            created a new concept of "Live Buffet" where everything is cooked in front of you in a 'bazaar' like
                            atmosphere. The Village is an acclaimed restaurant brand, credited with the promotion of the Pakistani cuisine
                            and the revival of some old recipes. The Village Lahore has a seating capacity of over 300 guests. This
                            restaurant has hosted countless lunches and dinners for local and foreign dignitaries and celebrities like the
                            late Princess Diana, late prime minister of Pakistan Benazir Bhutto, ex-president of Pakistan Gen. (R) Pervez
                            Musharraf and many more.
                        </p>
                    </div>
                </div>
            </div>

            {/* Franchise Section */}
            <div className="section-3">
                <h1 className="sec-01">
                    Salt'n Pepper is also started giving franchises of its restaurants
                </h1>
            </div>

            {/* Franchise Locations */}
            {franchiseLocations.map((location, index) => (
                <div className="direction" key={index}>
                    {location.imageFirst ? (
                        <>
                            <div>
                                <img src={location.image} alt={location.city} style={{ maxWidth: '450px', borderRadius: '10px' }} />
                            </div>
                            <div className="txt-address">
                                <h1 className="add-1">{location.city}</h1>
                                <p className="add-2">{location.description}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="txt-address">
                                <h1 className="add-1">{location.city}</h1>
                                <p className="add-2">{location.description}</p>
                            </div>
                            <div>
                                <img src={location.image} alt={location.city} style={{ maxWidth: '450px', borderRadius: '10px' }} />
                            </div>
                        </>
                    )}
                </div>
            ))}

            {/* Express Section */}
            <div className="txt-express">
                <h1 style={{ fontSize: '40px', marginTop: '120px' }}>Salt'n Pepper Express</h1>
                <p style={{ marginTop: '40px', fontSize: '20px' }}>
                    Salt n Pepper – the food connoisseur every food lover cherishes. A food brand like no other.
                </p>
            </div>

            <div className="parent-express">
                <div className="image-1express">
                    <img style={{ width: '450px', borderRadius: '10px' }} src="/assets/express-1.webp" alt="Express" />
                </div>
                <div className="paragraph-express">
                    <p className="adjust-text">
                        Salt'n Pepper Restaurants were founded in an effort to capitalize on the golden
                        opportunities created by the rapidly growing restaurant industry.
                        <br /><br />
                        Via our franchise programme, we are focused on further expanding our restaurant network.
                        <br /><br />
                        Salt'n Pepper intends to give franchise rights to the interested investors to establish Salt'n Pepper
                        Express Restaurants in different cities of Pakistan. The franchises shall be offered under the name
                        of 'Salt'n Pepper Express' only.
                        <br /><br />
                        With our vision to evolve with changing times, we are proud to offer a smart and practical concept as a
                        great addition to the food chain dynamics today:
                        <br /><br />
                        Our Express Business Model comprises of a smart but compact restaurant in terms of seating and kitchen.
                        This condensed model will offer a menu with a selected number of our most favorite and popular dishes
                        from our original menu. You may consider it as 'Salt n Pepper – Mini'.
                    </p>
                </div>
            </div>

            {/* Express Franchise Locations */}
            <div className="page-6" style={{ paddingTop: '50px' }}>
                <p style={{ fontSize: '32px', textAlign: 'center', marginBottom: '50px' }}>
                    Salt'n Pepper Express Franchises are operational at the following locations:
                </p>

                <div className="three-white-boxes">
                    {expressFranchises.slice(0, 3).map((franchise, index) => (
                        <div className="white-box" key={index} style={{ height: 'auto', padding: '20px' }}>
                            <img style={{ width: '300px', borderRadius: '6px' }} src={franchise.image} alt={franchise.name} />
                            <p className="white-box-text-1" style={{ marginTop: '15px' }}>{franchise.name}</p>
                            <p className="white-box-text-2" style={{ fontSize: '1.4rem' }}>{franchise.address}</p>
                            <p className="white-box-text-3" style={{ fontSize: '1.4rem' }}>{franchise.phone}</p>
                        </div>
                    ))}
                </div>

                <div className="three-white-boxes">
                    {expressFranchises.slice(3).map((franchise, index) => (
                        <div className="white-box" key={index} style={{ height: 'auto', padding: '20px' }}>
                            <img style={{ width: '300px', borderRadius: '6px' }} src={franchise.image} alt={franchise.name} />
                            <p className="white-box-text-1" style={{ marginTop: '15px' }}>{franchise.name}</p>
                            <p className="white-box-text-2" style={{ fontSize: '1.4rem' }}>{franchise.address}</p>
                            <p className="white-box-text-3" style={{ fontSize: '1.4rem' }}>{franchise.phone}</p>
                        </div>
                    ))}
                </div>

                {/* Village Franchise */}
                <p style={{ textAlign: 'center', fontSize: '4rem', marginTop: '80px' }}>
                    Salt'n Pepper Village Franchise
                </p>

                <div className="pg-last">
                    <div>
                        <img style={{ borderRadius: '6px', width: '460px' }} src="/assets/2nd last about.webp" alt="Village Franchise" />
                    </div>
                    <div>
                        <p className="last-1">G U J R A N W A L A</p>
                        <p className="last-2">Salt'n Pepper Village Franchise</p>
                        <p className="last-3">
                            <img src="/assets/arrow.png" width="20px" alt="location" />
                            Adjacent to Rida Marquees / DHA Main Gate, GT Road Gujranwala Cantt
                        </p>
                        <p className="last-4">
                            <img src="/assets/cell.png" width="20px" alt="phone" />
                            Ph: 055-3884500 | 055-3880400
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
