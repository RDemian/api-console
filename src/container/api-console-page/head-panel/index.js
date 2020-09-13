import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Logo } from '../../../components/logo';
import { IconButton } from '../../../components/icon-button';
import { getUserData } from '../../../store/user/actions';
import { logout } from '../../../store/auth/actions';
import { ReactComponent as IconLogout } from '../../../assets/image/svg/icon-logout.svg';
import { ReactComponent as IconFull } from '../../../assets/image/svg/icon-full-screen.svg';
import { ReactComponent as IconBase } from '../../../assets/image/svg/icon-base-screen.svg';
import './styles.scss';

class HeadPanel extends React.Component {
    static defaultProps = {
        session: '',
        dispatch: ()=>{},
        sendsayInstance: {},
        isFullScreen: false,
        user: {},
        onFullScreenChange: ()=>{},
    }

    static propTypes = {
        dispatch: PropTypes.func,
        sendsayInstance: PropTypes.object,
        session: PropTypes.string,
        isFullScreen: PropTypes.bool,
        user: PropTypes.object,
        onFullScreenChange: PropTypes.func,
    }

    componentDidMount = async() => {
        const { dispatch, sendsayInstance, session } = this.props;
        sendsayInstance.setSession(session);
        dispatch(getUserData(sendsayInstance));
    }

    onLogout = () => {
        const { dispatch, sendsayInstance, session } = this.props;
        sendsayInstance.setSession(session);
        dispatch(logout(sendsayInstance));
    }

    render() {
        const { isFullScreen, user, onFullScreenChange } = this.props;

        return (
            <div className='HeadPanel'>
                <Logo />

                <h1 className='HeadPanel__title'>API-консолька</h1>

                <div className='HeadPanel__user'>{`${user?.account} : ${user?.sublogin ? user?.sublogin : ''}`}</div>

                <div className='HeadPanel__logout'>
                    <IconButton
                        Icon={IconLogout}
                        text='Выйти'
                        firstText={true}
                        onClick={this.onLogout}
                    />
                </div>

                <IconButton
                    Icon={isFullScreen ? IconBase : IconFull}
                    onClick={onFullScreenChange}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(HeadPanel)