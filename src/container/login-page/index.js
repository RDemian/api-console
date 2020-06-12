import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthForm from '../../components/form-components/auth-form';
import { login } from '../../store/auth/actions';
import './styles.scss';

class LoginPage extends React.Component {
    static defaultProps = {
        session: null,
    };

    static propTypes = {
        session: PropTypes.string,
    };

    onLogin = (params) => {
        const { dispatch } = this.props;
        dispatch(login(params));
    }
    
    render() {
        return (
            <div className="LoginPage">
                <div className="LoginPage__content">
                    <AuthForm
                        onLogin={this.onLogin}
                    />
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

export default connect(mapStateToProps)(LoginPage)
