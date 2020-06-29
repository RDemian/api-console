import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import HeadPanel from './head-panel';
import HistoryPanel from './history-panel';
import RequestPanel from './request-panel';
import { sendRequest } from '../../store/requests/actions';
import { isValidJson, formatingByDisplay } from '../../helpers/json-helpers';
import Sendsay from 'sendsay-api';
import './styles.scss';

class ApiConsolePage extends Component {
    static defaultProps = {
        session: '',
        dispatch: ()=>{},
    }

    static propTypes = {
        dispatch: PropTypes.func,
        session: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.sendsayInstance = new Sendsay();
        this.page = React.createRef();

        this.state = {
            isFullScreen: false,
            displayingText: '',
        }
    }

    onChangeDispayingText = (currentAction) => {
        const displayObj = omit(currentAction, ['ok','key']);
        const formatText = formatingByDisplay(JSON.stringify(displayObj));
        this.setState({
            displayingText: formatText,
        })
    }

    onSendAction = (currentAction) => {
        const { session, dispatch } = this.props;
        this.sendsayInstance.setSession(session);

        if (isValidJson(JSON.stringify(currentAction))) {
            try {
                const requestParams = currentAction;
                dispatch(sendRequest(this.sendsayInstance, requestParams));
            } catch (err) {
                console.error(err)
            }
        } else {
            this.setState({
                isWarning: true,
            });
        }
    }

    onFullScreenChange = async () => {
        const { isFullScreen } = this.state;
        try {
            if (isFullScreen) {
                await document.webkitExitFullscreen();
                this.setState({
                    isFullScreen: false,
                });
            } else {
                await this.page.current.requestFullscreen();
                this.setState({
                    isFullScreen: true,
                });
            }
        } catch( err ) {
            console.info(err);
        }
    }

    render() {
        const { isFullScreen, displayingText } = this.state;

        return (
            <div ref={this.page} className='ApiConsolePage'>
                <HeadPanel
                    sendsayInstance={this.sendsayInstance}
                    onFullScreenChange={this.onFullScreenChange}
                    isFullScreen={isFullScreen}
                />
                <HistoryPanel
                    onChangeDispayingText={this.onChangeDispayingText}
                    onSendAction={this.onSendAction}
                />
                <RequestPanel
                    displayingText={displayingText}
                    onChangeDispayingText={this.onChangeDispayingText}
                    onSendAction={this.onSendAction}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(ApiConsolePage)