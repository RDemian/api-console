import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from "react-onclickoutside";
import { HistoryButton } from './history-button';
import { DropButton } from './drop-button';
import './styles.scss';

class HistoryElement extends Component {
    static propTypes = {
        onCopy: PropTypes.func,
    }

    static defaultProps = {
        onCopy: () => { },
    }

    state = {
        isDropOpen: false,
    }
    
    onDropToggle = () => {
        this.setState(state => ({
            isDropOpen: !state.isDropOpen,
        }))
    }

    handleClickOutside = ev => {
        ev.stopPropagation();
        const { isDropOpen } = this.state;
        if (isDropOpen) {
            this.setState({
                isDropOpen: false,
            });
        }
    };

    onActionClick = (func) => {
        if (typeof func === 'function') func();
    }

    render() {
        const { onCopy, onExecute, onDelete, actionName, actionOk } = this.props;
        const { isDropOpen } = this.state;
        return (
            <div className={`HistoryElement`}>
                <HistoryButton
                    className={`HistoryElement__btn`}
                    actionName={actionName}
                    onClick={this.onDropToggle}
                    isWrong={!actionOk}
                />
                {isDropOpen &&
                    <div className={`HistoryElement__drop-list`}>
                        <div className={`HistoryElement__drop-btn-wrap`}>
                            <DropButton onClick={() => this.onActionClick(onCopy)} actionName='Выполнить' />
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
}

export default onClickOutside(HistoryElement);
