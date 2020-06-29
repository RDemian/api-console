import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const CtrlLabel = ({ forId, text, subtext, isWarning }) => {
    return (
        <label 
            htmlFor={forId}
            className={`CtrlLabel`} 
        >
            <div className={`CtrlLabel__text ${isWarning ? 'CtrlLabel__text_warning' : ''}`} >{text}</div>
            <div className={`CtrlLabel__subtext`} >{subtext}</div>
        </label>
    )
}

CtrlLabel.propTypes = {
    forId: PropTypes.string,
    text: PropTypes.string,
    subtext: PropTypes.string,
    isWarning: PropTypes.bool,
}

CtrlLabel.defaultProps = {
    forId: '',
    text: '',
    subtext: '',
    isWarning: false,
}

export { CtrlLabel };
