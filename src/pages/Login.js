import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authenticate } from '../actions';
import AppWrapper from '../components/AppWrapper';

export class Login extends Component {
  static propTypes = {
    prop: PropTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  render() {
    const { userName, password } = this.state;
    return (
      <AppWrapper title="Login">
        <div className="form-inline">
          <label className="sr-only" htmlFor="inlineFormInputName2">
            Name
          </label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2"
            id="inlineFormInputName2"
            placeholder="Username"
            name="userName"
            value={this.state.userName}
            onChange={e => this.handleChange(e)}
          />
          <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">
            Username
          </label>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername2"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </div>
          <button
            className="btn btn-primary mb-2"
            onClick={() => authenticate({ userName, password })}
          >
            Submit
          </button>
        </div>
      </AppWrapper>
    );
  }
}

export default Login;
