import React, { Component } from 'react';
import styles from './Start.css';
import SearchBox from '../components/SearchBox';
import SearchResults from '../components/SearchResults';
import SingleSuggestion from '../components/SingleSuggestion';
import PageWrapper from '../components/PageWrapper';

const lunchbotServiceUrl = 'https://lunchbot.tips';
// const lunchbotServiceUrl = '/api';

const shuffle = array => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

class Start extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      list: [{}],
      inputValue: '',
      searchTerm: '',
      suggestionNumber: 0
    };
  }

  componentDidMount() {
    this.authenticate();
    fetch(`${lunchbotServiceUrl}/suggestion`)
      .then(res => res.json())
      .then(places => {
        this.setState({ places: places.suggestions });
      });
    fetch(`${lunchbotServiceUrl}/suggestion/list`)
      .then(res => res.json())
      .then(list => {
        this.setState({ list: shuffle(list) });
      })
      .catch(console.log);
  }

  authenticate() {
    fetch(`${lunchbotServiceUrl}/user/auth`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ userName: 'Oscar', password: 'reggev-master' })
    })
      .then(res => res.json())
      .then(res => this.setState({ token: res.token }));
  }

  goPlaces(placeId) {
    console.log('go to:', placeId);
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

  addPlace(placeId) {
    console.log(this.state.inputValue);
    fetch(`${lunchbotServiceUrl}/suggestion/${placeId}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`
      },
      mode: 'cors',
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(response =>
        this.setState({
          list: [response, ...this.state.list],
          error: false
        })
      );
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
    const { places = [], suggestionNumber } = this.state;
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

export default Start;
