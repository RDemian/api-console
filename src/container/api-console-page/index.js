import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeadPanel from './head-panel';
import HistoryPanel from './history-panel';
import RequestPanel from './request-panel';
import { Button } from '../../components/button';
import Sendsay from 'sendsay-api';
import './styles.scss';

class ApiConsolePage extends Component {
    constructor(props) {
        console.log('ApiConsolePage -> constructor -> props', props)
        super(props);
        this.sendsayInstance = new Sendsay();
        this.page = React.createRef();

        this.state = {
            isFullScreen: false,
        }
    }
    
    check = () => {
        //const { session } = this.props;
        //this.sendsayInstance.setSession(session); //установка сессии из куки
        //console.log('AuthForm -> check -> this.sendsay', this.sendsayInstance)
        console.log(this.page);
        this.page.current.requestFullscreen();
        setTimeout(()=>{
            console.log('ApiConsolePage -> check -> document.webkitExitFullscreen();')
            document.webkitExitFullscreen();
            
        }, 3000);
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
        const { session } = this.props;
        const { isFullScreen } = this.state;

        this.sendsayInstance.setSession(session);

        return (
            <div ref={this.page} className='ApiConsolePage'>
                <HeadPanel
                    sendsayInstance={this.sendsayInstance}
                    onFullScreenChange={this.onFullScreenChange}
                    isFullScreen={isFullScreen}
                />
                <HistoryPanel />
                <RequestPanel />
                <Button
                    onClick={this.check}
                >
                    Куки
                </Button>
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