import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'

//router
import { Router } from 'react-router-dom'
import './assets/scss/socialv.scss'
//store

import { Provider } from 'react-redux';
//reducer
import Store from './store/index'
import { history } from './util/history';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';


ReactDOM.render(
  <React.StrictMode>
    <Router history={history} basename={process.env.PUBLIC_URL}>
    <DndProvider backend={HTML5Backend}>
      <Provider store={Store}>
            <App/>
        </Provider>  
    </DndProvider>
    
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
