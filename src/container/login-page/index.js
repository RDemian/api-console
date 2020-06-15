import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Logo } from '../../components/logo';
import { Link } from '../../components/link';
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
        const { fetching, fetchError } = this.props;
        return (
            <div className="LoginPage">
                
                <div className="LoginPage__content">
                    
                    <Logo />

                    <div className="LoginPage__form-wrap">
                        <AuthForm
                            onLogin={this.onLogin}
                            fetching={fetching}
                            fetchError={fetchError}
                        />
                    </div>

                    <Link
                        href='https://github.com/RDemian'
                        text='@link-to-your-github'
                    />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
        fetching: state.auth.fetching,
        fetchError: state.auth.fetchError,
    }
}

export default connect(mapStateToProps)(LoginPage)
