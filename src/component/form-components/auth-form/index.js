import React from 'react';
import PropTypes from 'prop-types';
import CtrlLabel from '../ctrl-label';
import CtrlInput from '../ctrl-input';
import Button from '../../button';

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
    static defaultProps = {
        
    };

    static propTypes = {
        
    };

    constructor(props) {
        super(props);
        this.state = this.createState();
    }

    createState() {
        const stateObj = {};
        ctrlList.forEach((item) => {
            stateObj[item.name] = {
                value: '',
                isValid: true,
            };
        })

        return stateObj;
    }

    onInputChange = (name, ev) => {
        this.setState({
            [name]: {
                value: ev.target.value,
                isValid: true,
            }
        })
    }

    onFormSubmit = (ev) => {
        ev.preventDefault();
        console.log("AuthForm -> onFormSubmit -> ev", ev);
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
                </div>
            </form>
        )
    }
}

export default AuthForm;
