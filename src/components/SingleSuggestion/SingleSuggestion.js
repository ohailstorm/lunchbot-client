import React, { Component } from 'react';
import styles from './SingleSuggestion.css';

export default class SingleSuggestion extends Component {
  render() {
    const { place } = this.props;
    if (!place) return null;
    return (
      <div
        className={`row justify-content-md-center ${
          styles['current-suggestion']
        }`}
      >
        <div className="col-lg-12">
          <h1>Today's suggestion</h1>
          <div key={place.placeId}>
            <h3>
              <a target="_blank" href={place.mapUrl}>
                {place.name}
              </a>
            </h3>
            <button
              className={`btn-lg btn-${place.open ? 'success' : 'danger'}`}
            >
              Mark as visited
            </button>
            <p>
              Distance: {place.distance}, Time to walk: {place.time}
            </p>
            {place.photos &&
              place.photos.length && (
                <img
                  className="img-fluid mx-auto d-block rounded"
                  src={place.photos[0]}
                  alt=""
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}
