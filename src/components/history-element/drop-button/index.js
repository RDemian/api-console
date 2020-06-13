import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const DropButton = ({ onClick, actionName }) => {
    return (
        <button
            type='button'
            className={`DropButton`}
            onClick={onClick}
        >
            {actionName}
        </button>
    )
}

DropButton.propTypes = {
    actionName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

DropButton.defaultProps = {
    onClick: ()=>{},
}

export { DropButton };
