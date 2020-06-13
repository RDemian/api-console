import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class EditableField extends React.Component {
    static defaultProps = {
        
    };

    static propTypes = {
        
    };

    render() {
        const { style } = this.props;
        const text = '<div>Привет</br>Димон</div>'

        return (
            <div className='EditableField' style={style}>
                <div
                    className='EditableField__ctrl'
                    contentEditable
                    dangerouslySetInnerHTML={{
                        __html: text
                    }}
                />
            </div>
        )
    }
}

export { EditableField };
