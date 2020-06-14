import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const DropButton = ({ onClick, actionName, isDestruct }) => {
    return (
        <button
            type='button'
            className={`DropButton ${isDestruct ? 'DropButton_destruct':''}`}
            onClick={onClick}
        >
            {actionName}
        </button>
    )
}

DropButton.propTypes = {
    actionName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isDestruct: PropTypes.bool,
}

DropButton.defaultProps = {
    onClick: ()=>{},
    isDestruct: false,
}

export { DropButton };
