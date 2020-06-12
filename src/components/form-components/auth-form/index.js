import React from 'react';
import PropTypes from 'prop-types';
import CtrlLabel from '../ctrl-label';
import CtrlInput from '../ctrl-input';
import Button from '../../button';
import Sendsay from 'sendsay-api';

import './styles.scss';

const ctrlList = [
    {
        text:'Логин',
        subtext:'',
        name:'login',
        type:'text',
    },
    {
        text:'Сублогин',
        subtext:'Опционально',
        name:'sublogin',
        type:'text',
    },
    {
        text:'Пароль',
        subtext:'',
        name:'password',
        type:'password',
    },
];

class AuthForm extends React.Component {
    static propTypes = {
        onLogin: PropTypes.func,
    };

    static defaultProps = {
        onLogin: () => {},
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
        onLogin({
            login: 'rdmniko@gmail.com',
            sublogin: '',
            password: 'Sends-123',
        });
    }

    check = () => {
        //this.sendsay.setSession(this.sendsay.session); 
        
        //const sendsay = new Sendsay({ apiKey: '19mP7bRTzIrS1YFFXXJQ24qkKjOsErEqh00kn83XoZMCI0Nv1nLuI5tTXCa3gqZTH3w' });
        /*
        const sendsay = new Sendsay({
            auth: {
                login: 'rdmniko@gmail.com',
                password: 'Sends-123',
                password: 'Rdmitriy-222',
            }
        });
        
        sendsay.setSessionFromCookie();
        sendsay.request({ action: 'sys.user.list' })
            .then(function(res) {
                console.log(res.list['about.id']);
            })
        */
        
/*
        await this.sendsay.login({
            login: 'rdmniko@gmail.com',
            sublogin: '',
            password: 'Sends-1231',
        });
*/
        //sendsay.setSessionFromCookie('cookie_rdn');
        
       /*
        const resp1 = await fetch('https://api.sendsay.ru/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                apiversion:100,
                json:1,
                action: 'login',
                login: 'rdmniko@gmail.com',
                password: 'Sends-123',  
            })
        });*/
        //console.log("AuthForm -> onFormSubmit -> resp==", this.sendsay.getRequestData())
        //console.log("AuthForm -> onFormSubmit -> resp==", this.sendsay.getUsername())
        //console.log(document.cookie);
        //const cook = getCookie('sendsay_session')
        //console.log("AuthForm -> check -> cook=", cook)
     /*   this.sendsay.request({ action: 'sys.settings.get', list: ['about.id']}).then(function(res) {
            console.log(res);
        })*/
    }

    render() {
        const { state } = this;

        return (
            <form className='AuthForm' onSubmit={this.onFormSubmit}>
                <div className='AuthForm__content'>
                    <h1 className='AuthForm__title'>API-консолька</h1>
                    {ctrlList.map((item, index)=>{
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
                                    name={item.name}
                                    currentValue={state[item.name].value}
                                    onChange={(ev)=>this.onInputChange(item.name, ev)}
                                    isWarning={!state[item.name].isValid}
                                />
                            </div>
                        )
                    })}
                    <Button
                        type='submit'
                    >
                        Войти
                    </Button>
                    <Button
                        onClick={this.check}
                    >
                        Куки
                    </Button>
                </div>
            </form>
        )
    }
}

export default AuthForm;
