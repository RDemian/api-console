import React from 'react';
import Button from '../../components/button';
class ApiConsolePage extends React.Component {
    check() {}
    render() {
        return (
            <div className="ApiConsolePage page">
                ApiConsolePage
                <Button
                    onClick={this.check}
                >
                    Куки
                </Button>
            </div>
        )
    }
}

export default ApiConsolePage;