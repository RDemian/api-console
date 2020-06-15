import React from 'react';
import './styles.scss';

const Link = ({ href, text }) => {
    return (
        <div className='Link'>
            <a className='Link_href' href={href} target='_blank' rel='noreferrer noopener'>{text}</a>
        </div>
    );
}

export { Link };
