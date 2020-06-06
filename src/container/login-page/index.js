import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthForm from '../../component/form-components/auth-form';
import './styles.scss';

class LoginPage extends React.Component {
    static defaultProps = {

    };

    static propTypes = {
        isLogged: PropTypes.bool.isRequired,
    };
    
    render() {
        return (
            <div className="LoginPage">
                <div className="LoginPage__content">
                    <AuthForm />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged,
    }
}

export default connect(mapStateToProps)(LoginPage)
