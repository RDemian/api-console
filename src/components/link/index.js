import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Link = ({ href, text }) => {
    return (
        <div className='Link'>
            <a className='Link__href' href={href} target='_blank' rel='noreferrer noopener'>{text}</a>
        </div>
    );
}

Link.defaultProps = {
    href: '',
    text: '',
}

Link.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string,
}

export { Link };
