import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const HistoryButton = ({ onClick, actionName, isWrong }) => {
    return (
        <button
            type='button'
            className={`HistoryButton ${isWrong ? 'HistoryButton_wrong':''}`}
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
