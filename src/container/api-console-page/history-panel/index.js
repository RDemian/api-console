import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HistoryElement } from '../../../components/history-element';
import './styles.scss';

const actions = [
    {
        id: 1,
        name: 'pong',
        ok: true,
    },
    {
        id: 2,
        name: 'sys.settings.get',
        ok: false,
    },
    {
        id: 3,
        name: 'sys.settings.get',
        ok: true,
    },
    {
        id: 4,
        name: 'track.get',
        ok: false,
    },
    {
        id: 5,
        name: 'track.get',
        ok: true,
    },
]

class HystoryPanel extends Component {
    lisfWrapRef = React.createRef();
    onListWheel = (event) => {
        const lisfWrap = this.lisfWrapRef.current;
        lisfWrap.scrollLeft += event.deltaY;
    }

    render() {
        return (
            <div className="HystoryPanel">
                <div className="HystoryPanel__list-wrap" ref={this.lisfWrapRef}>
                    <ul className="HystoryPanel__list" onWheel={this.onListWheel}>
                        {actions.map( action => {
                            return (
                                <HistoryElement
                                    key={action.id}
                                    actionName={action.name}
                                    actionOk={action.ok}
                                />
                            )
                        })}
                    </ul>
                </div>
                <div className="HystoryPanel__last"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(HystoryPanel)
