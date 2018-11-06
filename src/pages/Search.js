import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import styles from '../pages/Start.css';
import AppWrapper from '../components/AppWrapper';
import { search, addPlace } from '../actions';

const mapStateToProps = state => ({
  searchResults: state.search.results,
  error: state.search.error
});

const mapDispatchToProps = dispatch => {
  return {
    search: searchTerm => {
      dispatch(search(searchTerm));
    },
    addPlace: placeId => {
      console.log('placeID');

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
    const { error, searchResults, addPlace } = this.props;
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
              <SearchBox
                searchCallback={searchTerm => this.search(searchTerm)}
              />
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
