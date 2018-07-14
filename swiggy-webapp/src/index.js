import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Menu from "./containers/Menu";

ReactDOM.render(<Menu/>, document.getElementById('root'));
registerServiceWorker();
