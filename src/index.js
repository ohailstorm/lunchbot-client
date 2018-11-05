import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ListAll from './pages/ListAll';
import Nav from './components/Nav';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
