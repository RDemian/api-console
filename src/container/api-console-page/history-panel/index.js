import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HistoryElement from '../../../components/history-element';
import { IconButton } from '../../../components/icon-button';
import { setRequestHistory, deleteRequestFromHistory, clearRequestHistory } from '../../../store/requests/actions';
import { ReactComponent as IconCross } from '../../../assets/image/svg/icon-cross.svg';
import './styles.scss';

class HystoryPanel extends Component {
    static defaultProps = {
        onChangeDispayingText: () => {},
        dispatch: ()=>{},
        onSendAction: ()=>{}, 
        requestActions: [],
    }

    static propTypes = {
        onChangeDispayingText: PropTypes.func,
        dispatch: PropTypes.func,
        onSendAction: PropTypes.func,
        requestActions: PropTypes.array,
    }

    lisfWrapRef = React.createRef();

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setRequestHistory());
    }

    getActionByName(actionName) {
        const { requestActions } = this.props;
        const jsonObj = requestActions.find(item => item.action === actionName);
        return jsonObj;
    }

    onListWheel = (event) => {
        const lisfWrap = this.lisfWrapRef.current;
        lisfWrap.scrollLeft += event.deltaY;
    }

    onHistoryClear = () => {
        const { dispatch } = this.props;
        dispatch(clearRequestHistory());
    }

    onCopy = (actionName) => {
        const { onChangeDispayingText } =this.props;
        onChangeDispayingText(this.getActionByName(actionName));
    }

    onExecute = (actionName) => {
        const { onChangeDispayingText, onSendAction } = this.props;
        const currentAction = this.getActionByName(actionName);
        onSendAction(currentAction);
        onChangeDispayingText(currentAction);
    }

    onDelete = (actionName) => {
        const { dispatch } = this.props;
        dispatch(deleteRequestFromHistory(actionName));
    }

    render() {
        const { requestActions } = this.props;
        return (
            <div className="HystoryPanel">
                <div className="HystoryPanel__list-wrap" ref={this.lisfWrapRef}>
                    <ul className="HystoryPanel__list" onWheel={this.onListWheel}>
                        {requestActions.map( request => {
                            return (
                                <li key={request.action} className="HystoryPanel__item">
                                    <HistoryElement
                                        actionName={request.action}
                                        actionOk={request.ok}
                                        onCopy={()=>this.onCopy(request.action)}
                                        onExecute={()=>this.onExecute(request.action)}
                                        onDelete={()=>this.onDelete(request.action)}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="HystoryPanel__last">
                    <IconButton
                        Icon={IconCross}
                        onClick={this.onHistoryClear}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        requestActions: state.requests.actions,
    }
}

export default connect(mapStateToProps)(HystoryPanel)
