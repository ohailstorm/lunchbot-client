import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Start.css';
import { loadCurrentSuggestions } from '../actions';
import SingleSuggestion from '../components/SingleSuggestion';
import PageWrapper from '../components/PageWrapper';
// import shuffle from "../utils/shuffle";

const lunchbotServiceUrl = 'https://lunchbot.tips';
// const lunchbotServiceUrl = '/api';

class Start extends Component {
  constructor() {
    super();
    this.state = {
      suggestionNumber: 0
    };
  }

  componentDidMount() {
    this.props.loadCurrentSuggestions();
  }

  goPlaces(placeId) {
    fetch(`${lunchbotServiceUrl}/suggestion/${placeId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: {}
    })
      .then(res => res.json())
      .then(console.log);
  }

  search(searchTerm) {
    fetch(`${lunchbotServiceUrl}/search/${searchTerm}`, {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      mode: 'cors'
    })
      .then(res => res.json())
      .then(searchResults => this.setState({ searchResults, error: false }))
      .catch(() => this.setState({ searchResults: null, error: true }));
  }

  render() {
    const { places = [] } = this.props;
    const { suggestionNumber } = this.state;
    const place = places && places[suggestionNumber % places.length];
    return (
      <PageWrapper title="Lunchbot" styles={styles}>
        <div className={`${styles.content} container`}>
          {place && <SingleSuggestion place={place} />}
          <button
            onClick={() =>
              this.setState({
                suggestionNumber: suggestionNumber + 1
              })
            }
            className="btn btn-outline-secondary"
            type="button"
          >
            NEXT
          </button>
        </div>
      </PageWrapper>
    );
  }
}
const mapStateToProps = state => ({
  places: state.suggestions.currentSuggestions
});

const mapDispatchToProps = dispatch => ({
  loadCurrentSuggestions: () => dispatch(loadCurrentSuggestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
