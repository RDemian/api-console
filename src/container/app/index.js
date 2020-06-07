import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { setCookie } from '../../helpers/cookies-helpers';
import LoginPage from '../login-page';
import ApiConsolePage from '../api-console-page';

import './styles.scss';

const SESSION_COOKIE_NAME = 'session_id';
const HOUR_COUNT = 1;
const MAX_AGE = 3600 * HOUR_COUNT;

class App extends React.Component {
    componentDidUpdate() {
        const { session } = this.props;
        if (session) setCookie(SESSION_COOKIE_NAME, session, {'max-age': MAX_AGE});
    }

    setCookie(sessionId) {
        document.cookie = `${SESSION_COOKIE_NAME}=${sessionId}; max-age=${MAX_AGE}`;
        
    }

    render() {
        const { session } = this.props;
        console.log('App -> render -> session', session)
        const { pathname } = window.location;
        return (
            <div className='App'>
                <BrowserRouter>
                    {!!session && pathname !== '/api-console' &&
                        <Redirect to='/api-console' />
                    }
                    {!session && pathname === '/api-console' &&
                        <Redirect to='/login' />
                    }
                    {!session && pathname === '/' &&
                        <Redirect to='/login' />
                    }
                    
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/api-console' component={ApiConsolePage}/>
                </BrowserRouter>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(App);
