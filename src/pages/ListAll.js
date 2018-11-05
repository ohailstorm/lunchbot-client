import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllSuggestions } from '../actions';
import PlacesList from '../components/PlacesList';
import AppWrapper from '../components/AppWrapper';
import styles from '../pages/Start.css';

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
const mapStateToProps = state => ({
  list: state.suggestions.allPlaces
});

const mapDispatchToProps = dispatch => ({
  loadAllSuggestions: () => dispatch(loadAllSuggestions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListAll);
