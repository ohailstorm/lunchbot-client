import React, { Component } from 'react';

export default class SearchBox extends Component {
  render() {
    const { searchCallback = () => false } = this.props;
    const { searchTerm } = this.state || {};
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            id="basic-addon1"
            role="img"
            aria-label="search-icon"
          >
            🔎
          </span>
        </div>
        <input
          onChange={e => this.setState({ searchTerm: e.target.value })}
          type="text"
          className="form-control"
          placeholder="Search for a place"
          aria-label="Place id"
          aria-describedby="basic-addon1"
          value={searchTerm}
        />
        <div className="input-group-append">
          <button
            onClick={() => searchCallback(searchTerm)}
            className="btn btn-outline-secondary"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
