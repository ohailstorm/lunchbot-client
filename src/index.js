import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/list/">About</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={App} />
      <Route path="/list/" component={App} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
