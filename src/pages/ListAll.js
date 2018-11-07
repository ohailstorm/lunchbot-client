import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from 'ramda';
import { loadAllSuggestions } from '../actions';
import PlacesList from '../components/PlacesList';
import AppWrapper from '../components/AppWrapper';
import styles from '../pages/Start.css';

const mapStateToProps = state => ({
  list: path(['suggestions', 'allPlaces'], state)
});

const mapDispatchToProps = dispatch => ({
  loadAllSuggestions: () => dispatch(loadAllSuggestions())
});

class ListAll extends Component {
  componentDidMount() {
    this.props.loadAllSuggestions();
  }

  render() {
    const { list } = this.props;
    return (
      <AppWrapper styles={styles}>
        <PlacesList list={list} />
      </AppWrapper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListAll);
