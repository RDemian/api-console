import React, { Component } from 'react';
import { connect } from 'react-redux';
import HistoryElement from '../../../components/history-element';
import { IconButton } from '../../../components/icon-button';
import { setRequestHistory } from '../../../store/requests/actions';
import { ReactComponent as IconCross } from '../../../assets/image/svg/icon-cross.svg';
import './styles.scss';

class HystoryPanel extends Component {
    lisfWrapRef = React.createRef();

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(setRequestHistory());
    }

    onListWheel = (event) => {
        const lisfWrap = this.lisfWrapRef.current;
        lisfWrap.scrollLeft += event.deltaY;
    }

    onHistoryClear = () => {}

    onCopy = () => {}
    onExecute = () => {}
    onDelete = () => {}

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
                                        actionName={request.action}
                                        actionOk={request.ok}
                                        onCopy={this.onCopy}
                                        onExecute={this.onExecute}
                                        onDelete={this.onDelete}
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
