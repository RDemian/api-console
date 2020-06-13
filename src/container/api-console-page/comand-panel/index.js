import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/button';
import './styles.scss';

class ComandPanel extends React.Component {
    render() {
        return (
            <div className="ComandPanel">
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

export default connect(mapStateToProps)(ComandPanel)
