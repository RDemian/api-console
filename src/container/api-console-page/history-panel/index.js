import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HistoryElement } from '../../../components/history-element';
import { IconButton } from '../../../components/icon-button';
import { ReactComponent as IconCross } from '../../../assets/image/svg/icon-cross.svg';
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
    {
        id: 6,
        name: 'pong',
        ok: true,
    },
    {
        id: 7,
        name: 'sys.settings.get',
        ok: false,
    },
    {
        id: 8,
        name: 'sys.settings.get',
        ok: true,
    },
    {
        id: 9,
        name: 'track.get',
        ok: false,
    },
    {
        id: 10,
        name: 'track.get',
        ok: true,
    },
    {
        id: 11,
        name: 'sys.settings.get',
        ok: true,
    },
    {
        id: 12,
        name: 'track.get',
        ok: false,
    },
    {
        id: 13,
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

    onHistoryClear = () => {}

    render() {
        return (
            <div className="HystoryPanel">
                <div className="HystoryPanel__list-wrap" ref={this.lisfWrapRef}>
                    <ul className="HystoryPanel__list" onWheel={this.onListWheel}>
                        {actions.map( action => {
                            return (
                                <li className="HystoryPanel__item">
                                    <HistoryElement
                                        key={action.id}
                                        actionName={action.name}
                                        actionOk={action.ok}
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
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(HystoryPanel)
