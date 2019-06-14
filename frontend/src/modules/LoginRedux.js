import { PATH } from "../App";

// Action Types
// AUTH ACTIONS
export const AUTHENTICATED = "AUTHENTICATED";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const TESTING_TOKEN_REFRESH = "TESTING_TOKEN_REFRESH";
//CHANGE PASSWORD ACTIONS
export const IS_CHANGING_PASSWORD = "IS_CHANGING_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// saves the authentication token in local storage, redirects to dashbord page and update authenticated state to true
function handleAuthResponseAndState(response, dispatch, location, push) {
  return async function() {
    if (navigator.cookieEnabled) {
      localStorage.setItem("auth_token", response.token);
    }

    if (location === PATH.login) {
      push(PATH.dashboard);
    }
    return dispatch(authenticateAction(true));
  };
}

// updates authenticated state
const authenticateAction = authenticated => ({ type: AUTHENTICATED, authenticated });

function registerAction(data) {
  return async function() {
    let response = await fetch("/api/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = response.json();
    return responseJson;
  };
}

function loginAction(data) {
  return async function() {
    // encrypting user' credentials using base64 encryption
    const encryptedCredentials = new Buffer(data.username + ":" + data.password).toString("base64");
    // getting user's information (id, first name, last name, birth date, email, username and pri or military number)
    let accountInfo = await fetch("/api/auth/me/", {
      method: "GET",
      headers: {
        Authorization: "basic " + encryptedCredentials,
        Accept: "application/json",
        "Content-Type": "application/json",
        cache: "default"
      }
    });
    let accountInfoResponseJson = await accountInfo.json();
    // saving user's first name and last name in local storage
    localStorage.setItem("first_name", accountInfoResponseJson.first_name);
    localStorage.setItem("last_name", accountInfoResponseJson.last_name);
    // getting user's token
    let response = await fetch("/api/auth/jwt/create_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    return responseJson;
  };
}

// JWT tokens are not stored in our DB
function logoutAction() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("first_name");
  localStorage.removeItem("last_name");
  return { type: UNAUTHENTICATED };
}

// Initial State
const initialState = {
  authenticated: false
};

// Reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated
      };
    case UNAUTHENTICATED:
      return { authenticated: false };

    default:
      return state;
  }
};

export default login;
export {
  initialState,
  registerAction,
  loginAction,
  authenticateAction,
  handleAuthResponseAndState,
  logoutAction
};
