import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const HistoryButton = ({ onClick, actionName }) => {
    return (
        <button
            type='button'
            className={`HistoryButton`}
            onClick={onClick}
        >
            {actionName}
        </button>
    )
}

HistoryButton.propTypes = {
    actionName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

HistoryButton.defaultProps = {
    onClick: ()=>{},
}

export { HistoryButton };
