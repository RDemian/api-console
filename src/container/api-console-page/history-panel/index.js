import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HistoryElement from '../../../components/history-element';
import { IconButton } from '../../../components/icon-button';
import { setRequestHistory, deleteRequestFromHistory, clearRequestHistory } from '../../../store/requests/actions';
import { ReactComponent as IconCross } from '../../../assets/image/svg/icon-cross.svg';
import './styles.scss';

class HystoryPanel extends Component {
    static propTypes = {
        onChangeDispayingText: PropTypes.func,
    }

    static defaultProps = {
        onChangeDispayingText: () => {},
    }

    lisfWrapRef = React.createRef();

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setRequestHistory());
    }

    getActionById(id) {
        const { requestActions } = this.props;
        const jsonObj = requestActions[id];
        delete (jsonObj.ok);
        delete (jsonObj.err);
        return JSON.stringify(jsonObj);
    }

    onListWheel = (event) => {
        const lisfWrap = this.lisfWrapRef.current;
        lisfWrap.scrollLeft += event.deltaY;
    }

    onHistoryClear = () => {
        const { dispatch } = this.props;
        dispatch(clearRequestHistory());
    }

    onCopy = (id) => {
        const { onChangeDispayingText } =this.props;
        onChangeDispayingText(this.getActionById(id));
    }

    onExecute = (id) => {
        const { onChangeDispayingText, onSendAction } = this.props;
        const currentAction = this.getActionById(id);
        onSendAction(currentAction);
        onChangeDispayingText(currentAction);
    }

    onDelete = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteRequestFromHistory(id));
    }

    render() {
        const { requestActions } = this.props;
        return (
            <div className="HystoryPanel">
                <div className="HystoryPanel__list-wrap" ref={this.lisfWrapRef}>
                    <ul className="HystoryPanel__list" onWheel={this.onListWheel}>
                        {requestActions.map( (request, index) => {
                            return (
                                <li key={index} className="HystoryPanel__item">
                                    <HistoryElement
                                        id={index}
                                        actionName={request.action}
                                        actionOk={request.ok}
                                        onCopy={()=>this.onCopy(index)}
                                        onExecute={()=>this.onExecute(index)}
                                        onDelete={()=>this.onDelete(index)}
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
