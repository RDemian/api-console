import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginPage from '../login-page';
import ApiConsolePage from '../api-console-page';

import './styles.scss';

class App extends React.Component {
    static defaultProps = {
        session: '',
    }

    static propTypes = {
        session: PropTypes.string,
    }

    render() {
        const { session } = this.props;
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
