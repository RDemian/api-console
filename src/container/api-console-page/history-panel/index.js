import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/button';
import './styles.scss';

class HeadPanel extends React.Component {
    render() {
        return (
            <div className="HeadPanel">
                <Button />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.auth.session,
    }
}

export default connect(mapStateToProps)(HeadPanel)