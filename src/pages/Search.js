import React, { Component } from 'react';
import SearchResults from '../components/SearchResults';
import SearchBox from '../components/SearchBox';
import styles from '../pages/Start.css';
import PageWrapper from '../components/PageWrapper';
const lunchbotServiceUrl = 'https://lunchbot.tips';

export default class ListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.authenticate();
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
    const { error, searchResults } = this.state;
    return (
      <PageWrapper styles={styles} title="Search">
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
              {searchResults && <SearchResults searchResults={searchResults} />}
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
}
