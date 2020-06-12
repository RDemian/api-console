import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CtrlInput = ({ type, currentValue, onChange, isWarning, ...props }) => {
    return (
        <input
            type={type}
            className={`CtrlInput ${isWarning ? 'CtrlInput_warning' : ''}`}
            value={currentValue}
            onChange={onChange}
            {...props}
        />
    )
}

CtrlInput.propTypes = {
    type: PropTypes.string,
    currentValue: PropTypes.string,
    onChange: PropTypes.func,
    isWarning: PropTypes.bool,
}

CtrlInput.defaultProps = {
    type: 'text',
    currentValue: '',
    onChange: () => {},
    isWarning: false,
}

export { CtrlInput };
