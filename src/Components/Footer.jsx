import React, { useEffect, useState } from 'react'

const Footer = () => {
    const [resizes, setResizes] = new useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', screenSize());
        return () => window.removeEventListener('resize', screenSize());
    }, [])

    useEffect(() => { screenSize() }, [resizes]);

    const screenSize = () => {
        setResizes(window.innerWidth);
    };

    return (
        <footer className='footer-content display-center'>
            <div className="club-information display-center">
                <h4>Club de código - Tuesday 5:00 pm - 7:30 pm</h4>
                <p>Centro del Valle del Software (CVS) - San Javier</p>
                <p>&copy; All rights reserved</p>
            </div>
            {
                resizes > 500 && <div className="logotypes-content">
                    <img id='club-logotype' src="./Images/club_logotype.png" alt="Code club logotype" title='Code club logotype' />
                </div>
            }

        </footer>
    )
}
export default Footer