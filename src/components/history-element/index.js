import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HistoryButton } from './history-button';
import { DropButton } from './drop-button';
import './styles.scss';

const HistoryElement = ({ onCopy, onExecute, onDelete, actionName, actionOk }) => {
    const [ isDropOpen, setDropStatus ] = useState(false);

    return (
        <div className={`HistoryElement`}>
            <HistoryButton
                className={`HistoryElement__btn`}
                actionName={actionName}
                onClick={() => setDropStatus(!isDropOpen)}
                isWrong={!actionOk}
            />
            {isDropOpen &&
                <div className={`HistoryElement__drop-list`}>
                    <div className={`HistoryElement__drop-btn-wrap`}>
                        <DropButton actionName='Выполнить' />
                        <DropButton actionName='Скопировать' />
                    </div>
                    <div className={`HistoryElement__drop-btn-wrap`}>
                    <DropButton actionName='Удалить' isDestruct={true}/>
                    </div>
                </div>
            }
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
