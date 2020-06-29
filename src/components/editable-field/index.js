import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const EditableField = ({ isWarning, innerText, isEditable, onValueChange, editFieldRef }) => {
    useEffect(() => {
        onValueChange();
    }, [innerText, onValueChange]);

    return (
        <div className={`EditableField ${isWarning ? 'EditableField_warning':''}`}>
            <div
                ref={editFieldRef}
                className='EditableField__ctrl'
                contentEditable={isEditable}
                onInput={onValueChange}
                dangerouslySetInnerHTML={{
                    __html: innerText
                }}
            />
        </div>
    )
}

EditableField.defaultProps = {
    onValueChange: ()=>{},
    isWarning: false,
    innerText: '',
    isEditable: true,
    editFieldRef: null,
}

EditableField.propTypes = {
    onValueChange: PropTypes.func,
    isWarning: PropTypes.bool,
    innerText: PropTypes.string,
    isEditable: PropTypes.bool,
    editFieldRef: PropTypes.object,
}

export { EditableField };
