import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './pages/Start';
import Search from './pages/Search';
import ListAll from './pages/ListAll';
import Nav from './components/Nav';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Route path="/" exact component={Start} />
      <Route path="/list/" component={ListAll} />
      <Route path="/search/" component={Search} />
    </div>
  </Router>
);

export default App;
