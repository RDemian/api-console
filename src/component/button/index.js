import React from 'react';
import PropTypes from 'prop-types';
import loader from './loader.png';
import './styles.scss';

const Button = ({ type, children, onClick, isLoading, disabled, ...props }) => {
    return (
        <button
            type={type}
            className={`Button ${isLoading ? 'Button_loading' : ''}`}
            onClick={onClick}
            disabled={isLoading || disabled}
            {...props}
        >
            {!isLoading && children}
            {isLoading &&
                <img className='Button__img' src={loader} width='24' height='24' alt='loader'/>
            }
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
}

Button.defaultProps = {
    type: 'button',
    onClick: () => {},
    disabled: false,
    children: null,
}

export default Button;
