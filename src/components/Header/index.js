import React from 'react';
import './Header.css';


export default ({black}) => {
    return (
        // <header className={black != null ? 'black' : ''}>
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="" alt='netflix'></img>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="" alt='usuário'></img>
                </a>
            </div>
        </header>
    )
}