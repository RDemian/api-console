import React from 'react';
import Sendsay from 'sendsay-api';


class App extends React.Component {

  onSendRequest = async () => {
    let sendsay = new Sendsay({ apiKey: '19mP7bRTzIrS1YFFXXJQ24qkKjOsErEqh00kn83XoZMCI0Nv1nLuI5tTXCa3gqZTH3w' });

    sendsay.request({ action: 'sys.settings.get', list: ['about.id']}).then(function(res) {
      console.log(res.list['about.id']);
    })
    /*
    const req = await sendsay.request({
      action: 'sys.settings.get',
      list: [
        'about.confirm',
        'about.id',
        'about.label.member',
        'about.name',
      ]
    });
    */
    //console.log("App -> onSendRequest -> req=", req)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.onSendRequest}>Sendsay ->>></button>
        </header>
      </div>
    );
  }
}

export default App;
