import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { CommandPanel } from './command-panel';
import { EditableField } from '../../../components/editable-field';
import { sendRequest } from '../../../store/requests/actions';
import { setCookie, getCookie } from '../../../helpers/cookies-helpers';
import { isValidJson, jsonFormating, clearHTMLTags, delSpaces } from '../../../helpers/json-helpers';
import './styles.scss';

//const PANEL_WIDTH_KOEFF = 'panel_width_koeff';
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
        currContent: '',
        formatText: '{"action":"pong"}',
        isWarning: false,
    }

    componentDidMount() {
        //const koeff = localStorage.getItem(PANEL_WIDTH_KOEFF);
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
        //localStorage.setItem(PANEL_WIDTH_KOEFF, koeff);
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


    onSendAction = async() => {
        const { currContent } = this.state;
        const { sendsayInstance, dispatch } = this.props;

        if (isValidJson(currContent)) {
            try {
                //const result = await sendsayInstance.request(JSON.parse(currContent));
                const requestParams = JSON.parse(currContent);
                console.log("RequestPanel -> onSendAction -> requestParams=", requestParams)
                dispatch(sendRequest(sendsayInstance, requestParams));
            } catch(err) {
                console.log("RequestPanel -> onSendAction -> err=", err)
            }
        } else {
            this.setState({
                isWarning: true,
            });
        }
    }

    onValueChange = (ev) => {
        const currContent = delSpaces(clearHTMLTags(ev.target.innerHTML));
        this.setState({
            currContent,
            isWarning: false,
        })
    }

    onFormating = () => {
        const { currContent } = this.state;
        
        if (isValidJson(currContent)) {
            const result = jsonFormating(currContent)
            this.setState(state => ({
                formatText: result,
            }));
        } else {
            this.setState({
                isWarning: true,
            });
        }
    }

    render() {
        const { lastResponse } = this.props;
        const { formatText, isWarning } = this.state;
        
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
                            isEditable
                            onValueChange={this.onValueChange}
                            innerText={formatText}
                            isWarning={isWarning}
                        />
                    </div>

                    <div className="RequestPanel__editor-range" ref={this.editorRangeRef} onMouseDown={this.onStartDrag}>
                        <img src={'/images/dots.png'} width='6' height='22' alt='' />
                    </div>

                    <div className="RequestPanel__right-panel" ref={this.rightFieldRef}>
                        <div className="RequestPanel__field-name">Ответ:</div>
                        <EditableField
                            innerText={isEmpty(lastResponse) ? '' : jsonFormating(JSON.stringify(lastResponse))}
                        />
                    </div>
                </div>
                <CommandPanel
                    onSendAction={this.onSendAction}
                    onFormating={this.onFormating}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lastResponse: state.requests.lastResponse,
    }
}

export default connect(mapStateToProps)(RequestPanel)