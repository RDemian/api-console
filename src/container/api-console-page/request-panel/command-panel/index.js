import React, { Component } from 'react';
import { Button } from '../../../../components/button';
import { IconButton } from '../../../../components/icon-button';
import { ReactComponent as IconLogout } from '../../../../assets/image/svg/icon-format.svg';
import './styles.scss';

class CommandPanel extends Component {    
    onChange = (ev) => {
        console.log("CommandPanel -> onChange -> ev", ev)
        console.log("CommandPanel -> onChange -> ev.target", ev.target)
        console.log("CommandPanel -> onChange -> ev.target.value", ev.target.value)
    }
    render() {
        const { onSendAction, onFormating } = this.props;
        const formatText = '<div>Привет<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Димон</span></div>';
        return (
            <div className="ComandPanel">
                <Button
                    onClick={onSendAction}
                >
                    Отправить
                </Button>
                <div>@link-to-your-github</div>
                <IconButton
                    Icon={IconLogout}
                    text='Форматировать'
                    onClick={onFormating}
                />
            </div>
        )
    }
}

export { CommandPanel };
