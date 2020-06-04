import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import 'react-app-polyfill/stable'; //for ms edge

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

