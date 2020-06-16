import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../components/button';
import { IconButton } from '../../../../components/icon-button';
import { Link } from '../../../../components/link';
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

            <Link
                href='https://github.com/RDemian'
                text='https://github.com/RDemian'
            />

            <IconButton
                Icon={IconLogout}
                text='Форматировать'
                onClick={onFormating}
            />
        </div>
    )
}

CommandPanel.defaultProps = {
    onSendAction: () => {},
    onFormating: () => {},
    isLoading: false,
}

CommandPanel.propTypes = {
    onSendAction: PropTypes.func,
    onFormating: PropTypes.func,
    isLoading: PropTypes.bool,
}

export { CommandPanel };
