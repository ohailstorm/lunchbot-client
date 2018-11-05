const lunchbotServiceUrl = 'https://lunchbot.tips';

/*
 * action types
 */

export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_RESULTS_FAIL = 'SEARCH_RESULTS_FAIL';
export const LOAD_ALL_SUGGESTIONS = 'LOAD_ALL_SUGGESTIONS';
export const LOAD_CURRENT_SUGGESTIONS = 'LOAD_CURRENT_SUGGESTIONS';
export const ADD_PLACE = 'ADD_PLACE';

/*
 * other constants
 */
const authenticate = () => {
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
    .then(res => {
      this.setState({ token: res.token });
      localStorage.setItem('token', res.token);
    });
};

/*
 * action creators
 */

export function search(searchTerm) {
  const token = localStorage.getItem('token');
  return async dispatch => {
    if (!token) await authenticate();
    fetch(`${lunchbotServiceUrl}/search/${searchTerm}`, {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      mode: 'cors'
    })
      .then(res => res.json())
      .then(results =>
        dispatch({
          type: SEARCH_RESULTS_SUCCESS,
          results
        })
      )
      .catch(() =>
        dispatch({
          type: SEARCH_RESULTS_FAIL
        })
      );
  };
}
export function addPlace(placeId) {
  const token = localStorage.getItem('token');
  return async dispatch => {
    if (!token) await authenticate();
    const place = await fetch(`${lunchbotServiceUrl}/suggestion/${placeId}`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      mode: 'cors',
      body: JSON.stringify({})
    }).then(res => res.json());
    dispatch({
      type: ADD_PLACE,
      place
    });
  };
}

export function loadAllSuggestions() {
  const token = localStorage.getItem('token');
  return async dispatch => {
    if (!token) await authenticate();
    fetch(`${lunchbotServiceUrl}/suggestion/list`)
      .then(res => res.json())
      .then(list =>
        dispatch({
          type: LOAD_ALL_SUGGESTIONS,
          list
        })
      )
      .catch(() => {});
  };
}

export function loadCurrentSuggestions() {
  const token = localStorage.getItem('token');
  return async dispatch => {
    if (!token) await authenticate();
    fetch(`${lunchbotServiceUrl}/suggestion`)
      .then(res => res.json())
      .then(suggestionsList =>
        dispatch({
          type: LOAD_CURRENT_SUGGESTIONS,
          suggestions: suggestionsList.suggestions
        })
      )
      .catch(() => {});
  };
}
