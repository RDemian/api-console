import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { CommandPanel } from './command-panel';
import { EditableField } from '../../../components/editable-field';
import { isValidJson, formatingByDisplay, clearHTMLTags, delSpaces } from '../../../helpers/json-helpers';
import './styles.scss';

const PANEL_WIDTH_KOEFF = 'panel_width_koeff';

class RequestPanel extends React.Component {
    leftFieldRef = React.createRef();
    rightFieldRef = React.createRef();
    editorRef = React.createRef();
    editorRangeRef = React.createRef();
    editFieldRef = React.createRef();
    prevClientX = null;
    state = {
        isDrag: false,
        currContent: '',
        isWarning: false,
    }

    componentDidMount() {
        const koeff = localStorage.getItem(PANEL_WIDTH_KOEFF);
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
        localStorage.setItem(PANEL_WIDTH_KOEFF, koeff);
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

    onValueChange = (ev) => {
        const editField = this.editFieldRef?.current?.innerHTML;
        const currContent = delSpaces(clearHTMLTags(editField));
        this.setState({
            currContent,
            isWarning: false,
        })
    }

    onFormating = () => {
        const { onChangeDispayingText} = this.props;
        const { currContent } = this.state;

        if (isValidJson(currContent)) {
            onChangeDispayingText(currContent);
        } else {
            this.setState({
                isWarning: true,
            });
        }
    }

    sendActionHandler = () => {
        const { onSendAction } = this.props;
        const { currContent } = this.state;

        if (isValidJson(currContent)) {
            onSendAction(currContent);
        } else {
            this.setState({
                isWarning: true,
            });
        }
    }

    render() {
        const { displayingText, lastResponse, fetching } = this.props;
        const { isWarning } = this.state;
        
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
                        <div className="RequestPanel__field-name">Запрос:</div>
                        <EditableField
                            editFieldRef={this.editFieldRef}
                            onValueChange={this.onValueChange}
                            innerText={displayingText}
                            isWarning={isWarning}
                        />
                    </div>

                    <div className="RequestPanel__editor-range" ref={this.editorRangeRef} onMouseDown={this.onStartDrag}>
                        <img src={'/images/dots.png'} width='6' height='22' alt='' />
                    </div>

                    <div className="RequestPanel__right-panel" ref={this.rightFieldRef}>
                        <div className="RequestPanel__field-name">Ответ:</div>
                        <EditableField
                            isEditable={false}
                            innerText={isEmpty(lastResponse) ? '' : formatingByDisplay(JSON.stringify(lastResponse))}
                        />
                    </div>
                </div>
                <CommandPanel
                    onSendAction={this.sendActionHandler}
                    onFormating={this.onFormating}
                    isLoading={fetching}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lastResponse: state.requests.lastResponse,
        fetching: state.requests.fetching,
    }
}

export default connect(mapStateToProps)(RequestPanel)