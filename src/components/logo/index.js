import React from 'react';
import logo from './logo.png';
import './styles.scss';

const Logo = () => {
    return (
        <div className='Logo'>
            <img src={logo} className='Logo__image' alt='logotype' />
        </div>
    );
}

export { Logo };
