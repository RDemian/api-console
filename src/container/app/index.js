import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from '../login-page';
import ApiConsolePage from '../api-console-page';

import './styles.scss';

class App extends React.Component {
    render() {
        const auth = false;
        return (
            <div className="App">
                <BrowserRouter>
                    {auth && <Redirect to="/api-console" />}
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/api-console" component={ApiConsolePage}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
