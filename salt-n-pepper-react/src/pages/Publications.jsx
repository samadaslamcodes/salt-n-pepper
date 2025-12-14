const Publications = () => {
    // Branch information data
    const branches = [
        {
            name: "Salt'n Pepper Restaurant – Mall Road",
            address: '26, Mall Road, Lahore, Pakistan',
            phone: '04237244009',
        },
        {
            name: "Salt'n Pepper Restaurant – Liberty Market",
            address: '48 – Commercial Zone, Liberty Market, Lahore, Pakistan',
            phone: '04235752893',
        },
        {
            name: "Salt'n Pepper Village – Lahore",
            address: '103-B II, MM Alam Road, Lahore, Pakistan',
            phone: '04235750735',
        },
        {
            name: "Salt'n Pepper – Islamabad",
            address: 'Plot# 55, Shabbir Plaza, Blue Area, F-6, Islamabad',
            phone: '0512604904-6',
        },
        {
            name: "Salt'n Pepper – Faisalabad",
            address: '14-Kohinoor City, Faisalabad',
            phone: '0418711404',
        },
    ];

    return (
        <>
            {/* Books Section */}
            <div className="books">
                <div className="book-no-1">
                    <img src="/assets/book1.webp" width="448" alt="Book 1" />
                </div>
                <div className="book-no-1">
                    <img src="/assets/book2.webp" width="448" alt="Book 2" />
                </div>
            </div>

            {/* Branch Information */}
            <div className="informations-text">
                <p className="header">Available at following branches</p>

                {branches.map((branch, index) => (
                    <div key={index}>
                        <p className="txt-1" style={{ marginTop: index === 0 ? '0' : '30px' }}>
                            {branch.name}
                        </p>
                        <p className="txt-gray">
                            {branch.address}
                            <br />
                            {branch.phone}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Publications;
