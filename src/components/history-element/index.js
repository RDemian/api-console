import React from 'react';
import PropTypes from 'prop-types';
import { HistoryButton } from './history-button';
import { DropButton } from './drop-button';
import './styles.scss';

const HistoryElement = ({ onCopy, onExecute, onDelete, actionName }) => {
    return (
        <div className={`HistoryElement`}>
            <HistoryButton
                className={`HistoryElement__btn`}
                actionName={actionName}
            />
            <div className={`HistoryElement__drop-list`}>
                <DropButton actionName='Выполнить' />
                <DropButton actionName='Скопировать' />
                <DropButton actionName='Удалить' />
            </div>
        </div>
    )
}

HistoryElement.propTypes = {
    onCopy: PropTypes.func,
}

HistoryElement.defaultProps = {
    onCopy: ()=>{},
}

export { HistoryElement };
