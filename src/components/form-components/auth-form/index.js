import React from 'react';
import PropTypes from 'prop-types';
import { CtrlLabel } from '../ctrl-label';
import { CtrlInput } from '../ctrl-input';
import { Button } from '../../button';
import Sendsay from 'sendsay-api';

import './styles.scss';

const ctrlList = [
    {
        text: 'Логин',
        subtext: '',
        name: 'login',
        type: 'text',
    },
    {
        text: 'Сублогин',
        subtext: 'Опционально',
        name: 'sublogin',
        type: 'text',
    },
    {
        text: 'Пароль',
        subtext: '',
        name: 'password',
        type: 'password',
    },
];

class AuthForm extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func,
        fetching: PropTypes.bool,
        fetchError: PropTypes.object,
    };

    static defaultProps = {
        onLogin: () => {},
        fetching: false,
        fetchError: {}
    };

    constructor(props) {
        super(props);

        const createState = () => {
            const stateObj = {};
            ctrlList.forEach((item) => {
                stateObj[item.name] = {
                    value: '',
                    isValid: true,
                };
            })

            return stateObj;
        }

        this.state = createState();
        this.sendsay = new Sendsay();
    }

    isLoginValid(value) {
        console.log("AuthForm -> isLoginValid -> value=", value)
        const reg = /^[a-zA-Z0-9@_.]+$/;
        const res = reg.test(value);
        console.log("AuthForm -> isLoginValid -> res=", res)
        this.setState(state => ({
            login: {
                value: state.login.value,
                isValid: res,
            }
        }))
        return res;
    }

    isPasswordValid(value) {
        const reg = /^[a-zA-Z0-9-_. ]+$/;
        const res = reg.test(value);
        this.setState(state => ({
            password: {
                value: state.password.value,
                isValid: res,
            }
        }))
        return res;
    }

    onInputChange = (name, ev) => {
        this.setState({
            [name]: {
                value: ev.target.value,
                isValid: true,
            }
        })
    }

    onFormSubmit = async (ev) => {
        ev.preventDefault();
        const { login, sublogin, password } = this.state;
        const { onLogin } = this.props;
        const isLoginValid = this.isLoginValid(login.value);
        const isPasswordValid = this.isPasswordValid(password.value);
        if (isLoginValid && isPasswordValid) {
            onLogin({
                login: login.value,
                sublogin: sublogin.value,
                password: password.value,
            });
        }
    }

    render() {
        const { fetching, fetchError } = this.props;
        const { state } = this;

        return (
            <form className='AuthForm' onSubmit={this.onFormSubmit}>
                <div className='AuthForm__content'>
                    <h1 className='AuthForm__title'>API-консолька</h1>

                    {fetchError &&
                        <div className='AuthForm__error'>
                            <div className='AuthForm__error-title'>Вход не вышел</div>
                            <div className='AuthForm__error-desc'>{`id: ${fetchError.id}, explain: ${fetchError.explain}`}</div>
                        </div>
                    }

                    {ctrlList.map((item, index) => {
                        return (
                            <div key={index} className='AuthForm__ctrl-wrap'>
                                <CtrlLabel
                                    forId={item.name}
                                    text={item.text}
                                    subtext={item.subtext}
                                    isWarning={!state[item.name].isValid}
                                />
                                <CtrlInput
                                    id={item.name}
                                    type={item.type}
                                    name={item.name}
                                    currentValue={state[item.name].value}
                                    onChange={(ev) => this.onInputChange(item.name, ev)}
                                    isWarning={!state[item.name].isValid}
                                />
                            </div>
                        )
                    })}
                    <Button
                        type='submit'
                        isLoading={fetching}
                    >
                        Войти
                    </Button>
                </div>
            </form>
        )
    }
}

export default AuthForm;
