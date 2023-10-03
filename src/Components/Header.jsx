import React from 'react'

const Header = () => {
    return (
        <header className="content-header display-center">
            <h1 className='image-header-title display-center'>
                <img src="./Images/gif.png"
                    alt="Icon gif"
                    title='Icon-gif'
                    id='img-header' />
            </h1>
            <form action="" id="form-header">
                <label className="search-title" htmlFor='input-header'>Busca un gif</label>
                <input type="text" id="input-header" placeholder='Escribe aquí' />
                <button type='submit' id="search-header">Buscar</button>
            </form>
        </header>
    )
}
export default Header; 