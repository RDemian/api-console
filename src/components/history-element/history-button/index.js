import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const HistoryButton = ({ onClick, onDrop, actionName, isWrong }) => {
    const onDropClick = (ev) => {
        ev.stopPropagation();
        onDrop();
    }
    return (
        <button
            type='button'
            className={`HistoryButton ${isWrong ? 'HistoryButton_wrong':''}`}
            onClick={onClick}
        >
            <span className={`HistoryButton__text`}>{actionName}</span>
            <div className={`HistoryButton__img-wrap`} onClick={onDropClick}>
                <img className={`HistoryButton__img`} src={'/images/dots.png'} alt=''/>
            </div>
        </button>
    )
}

HistoryButton.propTypes = {
    actionName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    isWrong: PropTypes.bool,
}

HistoryButton.defaultProps = {
    onClick: ()=>{},
    onDrop: ()=>{},
    isWrong: false,
}

export { HistoryButton };
