import React from 'react';
import { Button } from '../../../../components/button';
import { IconButton } from '../../../../components/icon-button';
import { ReactComponent as IconLogout } from '../../../../assets/image/svg/icon-format.svg';
import './styles.scss';

const CommandPanel = ({ onSendAction, onFormating, isLoading }) => {    
    return (
        <div className="ComandPanel">
            <Button
                onClick={onSendAction}
                isLoading={isLoading}
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

export { CommandPanel };
