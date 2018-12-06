import React from 'react';
import ReactDOM from 'react-dom';
//CSS
import './index.css';
//Render App
import App from './App';
import * as serviceWorker from './serviceWorker';

//Add Store to the App
import RootStore from './store/RootStore'

// import { observable } from 'mobx';
import { Provider } from 'mobx-react';
const store = new RootStore();

//Provider warp the entire App with the store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();





