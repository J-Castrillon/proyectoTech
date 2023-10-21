import React, { useEffect, useRef, useState } from 'react'

const Header = ({ setSearch }) => {

    const [resizes, setResizes] = new useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', screenSize());
        return () => window.removeEventListener('resize', screenSize());
    }, [])

    useEffect(() => { screenSize() }, [resizes]);

    const screenSize = () => {
        setResizes(window.innerWidth);
    };

    const busqueda = useRef();

    const submits = (e) => {
        e.preventDefault();
        setSearch(busqueda.current.value);
    }

    return (
        <header className="content-header display-center">
            {
                resizes >= 500 && <h1 className='image-header-title display-center'>{resizes > 1100 ? 'GIFFINDER' : 'GIF'}</h1>
            }
            <form action="#"
                id="form-header"
                className='display-center'
                onSubmit={e => submits(e)}>
                <div className="search-input display-center">
                    <div className='magnifying-glass display-center'>
                        <img src="./Images/magnifying-glass.png" alt="Magnifying glass" id='glass-input' />
                    </div>
                    <input type="text" id="input-header" placeholder={resizes < 551 ? `GIFFIND - Search` : 'Search'} ref={busqueda} />
                </div>
                <div className="content-button display-center">
                    <button type='submit' id="search-header">Search</button>
                </div>
            </form>
        </header>
    )
}
export default Header; 