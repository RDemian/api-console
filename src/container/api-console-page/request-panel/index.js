import React from 'react';
import { connect } from 'react-redux';
import { setCookie, getCookie } from '../../../helpers/cookies-helpers';
import { EditableField } from '../../../components/editable-field';
import './styles.scss';

const WIDTH_KOEFF_COOKIE = 'panel_width_koeff';
const HOUR_COUNT = 8760;
const MAX_AGE = 3600 * HOUR_COUNT;
class RequestPanel extends React.Component {
    leftFieldRef = React.createRef();
    rightFieldRef = React.createRef();
    editorRef = React.createRef();
    editorRangeRef = React.createRef();
    prevClientX = null;
    state = {
        isDrag: false,
    }

    componentDidMount() {
        const koeff = getCookie(WIDTH_KOEFF_COOKIE);
        this.setWidthByKoeff(koeff);
    }

    getEditorWidth() {
        const editor = this.editorRef.current;
        const editorRange = this.editorRangeRef.current;
        const editorRangeWidth = editorRange.offsetWidth;
        
        return editor.offsetWidth - editorRangeWidth;
    }

    setWidthByKoeff(koeff) {
        const editorWidth = this.getEditorWidth();
        const leftField = this.leftFieldRef.current;
        const rightField = this.rightFieldRef.current;
        const left = Math.round(editorWidth / (1 + Number(koeff)));
        const right = editorWidth - left;
        leftField.style.width = `${left}px`;
        rightField.style.width = `${right}px`;
    }

    saveWidthKoeff() {
        const leftField = this.leftFieldRef.current;
        const rightField = this.rightFieldRef.current;
        const koeff = Math.round((rightField.offsetWidth / leftField.offsetWidth * 100)) / 100;

        setCookie(WIDTH_KOEFF_COOKIE, koeff, { 'max-age': MAX_AGE });
    }

    onStartDrag = (ev) => {
        const { isDrag } = this.state;
        if (!isDrag) {
            this.prevClientX = ev.clientX;
            this.setState({
                isDrag: true,
            });
        }
    }
    
    onEndDrag = () => {
        const { isDrag } = this.state;
        if (isDrag) {
            this.setState({
                isDrag: false,
            });
            this.saveWidthKoeff();
        }
    }

    onWidthChange = (ev) => {
        const { isDrag } = this.state;
        
        if (isDrag && this.prevClientX) {
            const currClientX = ev.clientX;
            const editorWidth = this.getEditorWidth();
            const leftField = this.leftFieldRef.current;
            const rightField = this.rightFieldRef.current;

            const shift = this.prevClientX - currClientX;
            const left = leftField.offsetWidth - shift;
            const right = editorWidth - left;

            leftField.style.width = `${left}px`;
            rightField.style.width = `${right}px`;

            this.prevClientX = currClientX;
        }
    }

    render() {
        return (
            <div className="RequestPanel">
                <div
                    className="RequestPanel__editor"
                    ref={this.editorRef}
                    onMouseMove={this.onWidthChange}
                    onMouseUp={this.onEndDrag}
                    onMouseLeave={this.onEndDrag}
                >
                    <div className="RequestPanel__left-panel" ref={this.leftFieldRef}>
                        <EditableField/>
                    </div>
                    <div className="RequestPanel__editor-range" ref={this.editorRangeRef} onMouseDown={this.onStartDrag}>*</div>
                    <div className="RequestPanel__right-panel" ref={this.rightFieldRef}>
                        <EditableField/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(RequestPanel)