const lunchbotServiceUrl = 'https://lunchbot.tips';

/*
 * action types
 */

export const SEARCH_RESULTS_SUCCESS = 'SEARCH_RESULTS_SUCCESS';
export const SEARCH_RESULTS_FAIL = 'SEARCH_RESULTS_FAIL';
export const LOAD_ALL_SUGGESTIONS = 'LOAD_ALL_SUGGESTIONS';
export const LOAD_CURRENT_SUGGESTIONS = 'LOAD_CURRENT_SUGGESTIONS';
export const ADD_PLACE = 'ADD_PLACE';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGO';

/*
 * other constants
 */

/*
* action creators
*/

export const authenticate = ({ userName, password } = {}) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (token) dispatch({ type: USER_LOGIN_SUCCESS });

    const { user: { isLoggedIn } = {} } = getState();
    if (isLoggedIn) return true;

    if (!userName || !password) return null;

    fetch(`${lunchbotServiceUrl}/user/auth`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ userName, password })
    })
      .then(res => res.json())
      .then(res => {
        console.log('RES', res);
        localStorage.setItem('token', res.token);
        dispatch({ type: USER_LOGIN_SUCCESS });
      })
      .catch(e => {
        dispatch({ type: USER_LOGOUT });
        localStorage.removeItem('token');
      });
  };
};
export function logoutUser() {
  return { type: USER_LOGOUT };
}
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
