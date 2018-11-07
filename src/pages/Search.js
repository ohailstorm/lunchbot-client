import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import styles from '../pages/Start.css';
import AppWrapper from '../components/AppWrapper';
import { search, addPlace } from '../actions';

const mapStateToProps = state => ({
  searchResults: path(['search', 'results'], state),
  error: path(['search', 'error'], state),
  isLoggedIn: path(['user', 'isLoggedIn'], state)
});

const mapDispatchToProps = dispatch => {
  return {
    search: searchTerm => {
      dispatch(search(searchTerm));
    },
    addPlace: placeId => {
      dispatch(addPlace(placeId));
    }
  };
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  search(searchTerm) {
    this.props.search(searchTerm);
  }

  render() {
    const { error, searchResults, addPlace, isLoggedIn } = this.props;
    return (
      <AppWrapper styles={styles} title="Search">
        <div className={`${styles.content} container`}>
          <div className="row">
            <div
              className={`col-12 justify-content-md-center ${
                styles['search-place']
              }`}
            >
              <h1>Search</h1>
              {isLoggedIn ? (
                <SearchBox
                  searchCallback={searchTerm => this.search(searchTerm)}
                />
              ) : (
                <p>You need to be logged in to be able to search.</p>
              )}
              {error && (
                <div className="col-12">
                  <h2>No results :(</h2>
                </div>
              )}
              {searchResults && (
                <SearchResults
                  searchResults={searchResults}
                  addPlace={placeId => addPlace(placeId)}
                />
              )}
            </div>
          </div>
        </div>
      </AppWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
