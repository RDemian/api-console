import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class EditableField extends React.Component {
    static defaultProps = {
        
    };

    static propTypes = {
        
    };

    onChange(ev) {
        console.log("EditableField -> onChange -> onChange", ev.target.innerHTML);
    }

    renderInner(innerText) {
        const { isEditable, onValueChange } = this.props;
        return (
            <div
                className='EditableField__ctrl'
                contentEditable={isEditable}
                onInput={onValueChange}
                dangerouslySetInnerHTML={{
                    __html: innerText
                }}
            />
        )
    }

    render() {
        const { isWarning, innerText } = this.props;
        const text = '<div>Привет<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Димон</span></div>'

        return (
            <div className={`EditableField ${isWarning ? 'EditableField_warning':''}`}>
                {this.renderInner(innerText)}
            </div>
        )
    }
}

export { EditableField };
