import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class AuthForm extends React.Component {
    static defaultProps = {
        
    };

    static propTypes = {
        
    };

    render() {
        const { state } = this;
        const text = '<div>Привет</br>Димон</div>'

        return (
            <form className='AuthForm' onSubmit={this.onFormSubmit}>
                <div className='AuthForm__content'>
                    <div
                        className='textEdit'
                        contentEditable
                        dangerouslySetInnerHTML={{
                            __html: text
                        }}
                    />
                </div>
            </form>
        )
    }
}

export default AuthForm;
