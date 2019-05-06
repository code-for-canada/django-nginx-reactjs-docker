// Action Types
export const SET_LOGIN_STATE = "localize/SET_LOGIN_STATE";
// URL
export const BACKENDURL = "localhost";
// AUTH ACTIONS
export const AUTHENTICATED = "AUTHENTICATED";
export const UNAUTHENTICATED = "UNAUTHENTICATED";
export const TESTING_TOKEN_REFRESH = "TESTING_TOKEN_REFRESH";
export const REGISTRATION_SUCCESS_MESSAGE = "REGISTRATION_SUCCESS_MESSAGE";
//CHANGE PASSWORD ACTIONS
export const IS_CHANGING_PASSWORD = "IS_CHANGING_PASSWORD";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// Action Creators
const setLoginState = loggedIn => ({ type: SET_LOGIN_STATE, loggedIn });

let url = process.env.REACT_APP_DEV_URL || BACKENDURL;

function authenticateAction(userData, dispatch, location, push) {
  return async function() {
    if (navigator.cookieEnabled) {
      localStorage.setItem("ecom_token", userData.token);
    }

    if (location === "/login") {
      push("/");
    }
    return dispatch({ type: AUTHENTICATED });
  };
}
function registrationSuccessMessage() {
  return { type: REGISTRATION_SUCCESS_MESSAGE };
}

function registerAction(data) {
  return async function() {
    let response = await fetch(`${url}/auth/users/create/`, {
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
    let response = await fetch(`${url}/auth/jwt/create/`, {
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
  localStorage.removeItem("ecom_token");
  return { type: UNAUTHENTICATED };
}

// Initial State
const initialState = {
  loggedIn: false,
  authenticated: false,
  registration_message: ""
};

const registration_message = "You have been registered successfully.";

// Reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    case AUTHENTICATED:
      return { authenticated: true, registration_message: "" };
    case UNAUTHENTICATED:
      return { authenticated: false, registration_message: "" };
    case REGISTRATION_SUCCESS_MESSAGE:
      return { ...state, registration_message: registration_message };

    default:
      return state;
  }
};

export default login;
export {
  setLoginState,
  initialState,
  registerAction,
  loginAction,
  authenticateAction,
  logoutAction,
  registrationSuccessMessage
};
