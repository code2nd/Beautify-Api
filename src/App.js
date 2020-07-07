import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const App = (props) => {

  return <Provider store={store}>
    <div className="App" style={{height: '100%'}}>
      {props.children}
    </div>
  </Provider>
}

export default App;
