import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './pages/Start';
import Search from './pages/Search';
import ListAll from './pages/ListAll';
import Login from './pages/Login';
import Nav from './components/Nav';
import { authenticate } from './actions';

export class App extends Component {
  static propTypes = {
    prop: PropTypes
  };

  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <div>
          <Nav isLoggedIn={isLoggedIn} />
          <Route path="/" exact component={Start} />
          <Route path="/list/" component={ListAll} />
          <Route path="/search/" component={Search} />
          <Route path="/login/" component={Login} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn
});

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
