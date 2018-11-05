import { combineReducers } from 'redux';
import {
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_FAIL,
  LOAD_ALL_SUGGESTIONS,
  LOAD_CURRENT_SUGGESTIONS,
  ADD_PLACE
} from './actions';

function search(state = {}, action) {
  switch (action.type) {
    case SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.results,
        error: false
      };
    case SEARCH_RESULTS_FAIL:
      return {
        ...state,
        results: null,
        error: true
      };
    default:
      return state;
  }
}

function suggestions(
  state = {
    allPlaces: [],
    currentSuggestions: []
  },
  action
) {
  switch (action.type) {
    case LOAD_ALL_SUGGESTIONS:
      return {
        ...state,
        allPlaces: action.list
      };
    case ADD_PLACE:
      return {
        ...state,
        allPlaces: [...state.allPlaces, action.place]
      };
    case LOAD_CURRENT_SUGGESTIONS:
      return {
        ...state,
        currentSuggestions: action.suggestions
      };
    default:
      return state;
  }
}

const todoApp = combineReducers({
  search,
  suggestions
});

export default todoApp;
