import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import styles from '../App.css';
import { loadCurrentSuggestions } from '../actions';
import SingleSuggestion from '../components/SingleSuggestion/SingleSuggestion';
import AppWrapper from '../components/AppWrapper/AppWrapper';

const mapStateToProps = state => ({
  places: path(['suggestions', 'currentSuggestions'], state)
});

const mapDispatchToProps = dispatch => ({
  loadCurrentSuggestions: () => dispatch(loadCurrentSuggestions())
});

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

  render() {
    const { places = [] } = this.props;
    const { suggestionNumber } = this.state;
    const place = places && places[suggestionNumber % places.length];
    return (
      <AppWrapper title="Lunchbot" styles={styles}>
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
      </AppWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
