import { emailsJson, addressBookJson } from "./sampleEmibJson";
import { SET_LANGUAGE } from "./LocalizeRedux";
import { ACTION_TYPE } from "../components/eMIB/constants";

// Initializers
export const initializeEmailSummaries = length => {
  let emailSummaries = [];
  for (let i = 0; i < length; i++) {
    emailSummaries.push({ isRead: false, emailCount: 0, taskCount: 0 });
  }
  return emailSummaries;
};

const initializeEmailActions = length => {
  let emailActions = [];
  for (let i = 0; i < length; i++) {
    emailActions.push([]);
  }
  return emailActions;
};

// Action Types
const READ_EMAIL = "emibInbox/READ_EMAIL";
const ADD_EMAIL = "emibInbox/ADD_EMAIL";
const ADD_TASK = "emibInbox/ADD_TASK";
const UPDATE_EMAIL = "emibInbox/UPDATE_EMAIL";
const UPDATE_TASK = "emibInbox/UPDATE_TASK";
const DELETE_EMAIL = "emibInbox/DELETE_EMAIL";
const DELETE_TASK = "emibInbox/DELETE_TASK";
const CHANGE_CURRENT_EMAIL = "emibInbox/CHANGE_CURRENT_EMAIL";

// Action Creators
const readEmail = emailIndex => ({ type: READ_EMAIL, emailIndex });
// emailIndex refers to the index of the original parent email and emailAction is an actionShape
const addEmail = (emailIndex, emailAction) => ({ type: ADD_EMAIL, emailIndex, emailAction });
// emailIndex refers to the index of the original parent email and taskAction is an actionShape
const addTask = (emailIndex, taskAction) => ({ type: ADD_TASK, emailIndex, taskAction });
// emailIndex refers to the index of the original parent email, responseId is the id of the response that is being edited and emailAction is an actionShape
const updateEmail = (emailIndex, responseId, emailAction) => ({
  type: UPDATE_EMAIL,
  emailIndex,
  responseId,
  emailAction
});
// emailIndex refers to the index of the original parent email, responseId is the id of the response that is being edited, and taskAction is an actionShape
const updateTask = (emailIndex, responseId, taskAction) => ({
  type: UPDATE_TASK,
  emailIndex,
  responseId,
  taskAction
});
// emailIndex refers to the index of the original parent email and responseId is the id of the response that is being deleted
const deleteEmail = (emailIndex, responseId) => ({
  type: DELETE_EMAIL,
  emailIndex,
  responseId
});
// emailIndex refers to the index of the original parent email and responseId is the id of the response that is being deleted
const deleteTask = (emailIndex, responseId) => ({
  type: DELETE_TASK,
  emailIndex,
  responseId
});

// emailIndex refers to the index of the currently visible email
const changeCurrentEmail = emailIndex => ({
  type: CHANGE_CURRENT_EMAIL,
  emailIndex
});

// Initial State
// emails - represents an array of emailShape objects in the currently selected language.
// emailSummaries - represents an array of objects indicating read state of each email.
// emailActions - represents an array of arrays, each array contains actionShape objects, representing an ACTION_TYPE.
// addressBook - repesents an array of contactShape objects in the currently selected language
const initialState = {
  // Loads emails from a static JSON file until an API exists.
  emails: emailsJson.emailsEN,
  emailSummaries: initializeEmailSummaries(emailsJson.emailsEN.length),
  emailActions: initializeEmailActions(emailsJson.emailsEN.length),
  addressBook: addressBookJson.addressBookEN,
  currentEmail: 0
};

// Reducer
const emibInbox = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        emails: action.language === "fr" ? emailsJson.emailsFR : emailsJson.emailsEN,
        addressBook:
          action.language === "fr" ? addressBookJson.addressBookFR : addressBookJson.addressBookEN
      };
    case READ_EMAIL:
      let updatedEmailSummaries = Array.from(state.emailSummaries);
      updatedEmailSummaries[action.emailIndex].isRead = true;
      return {
        ...state,
        emailSummaries: updatedEmailSummaries
      };
    case ADD_EMAIL:
      let modifiedEmailSummaries = Array.from(state.emailSummaries);
      modifiedEmailSummaries[action.emailIndex].emailCount++;

      let modifiedEmailActions = Array.from(state.emailActions);
      modifiedEmailActions[action.emailIndex].push({
        ...action.emailAction,
        actionType: ACTION_TYPE.email
      });
      return {
        ...state,
        emailSummaries: modifiedEmailSummaries,
        emailActions: modifiedEmailActions
      };
    case ADD_TASK:
      let duplicatedEmailSummaries = Array.from(state.emailSummaries);
      duplicatedEmailSummaries[action.emailIndex].taskCount++;

      let duplicatedEmailActions = Array.from(state.emailActions);
      duplicatedEmailActions[action.emailIndex].push({
        ...action.taskAction,
        actionType: ACTION_TYPE.task
      });
      return {
        ...state,
        emailSummaries: duplicatedEmailSummaries,
        emailActions: duplicatedEmailActions
      };
    case UPDATE_EMAIL:
      let updatedEmailActions = Array.from(state.emailActions);
      updatedEmailActions[action.emailIndex][action.responseId] = {
        ...action.emailAction,
        actionType: ACTION_TYPE.email
      };
      return {
        ...state,
        emailActions: updatedEmailActions
      };
    case UPDATE_TASK:
      let emailActionsUpdated = Array.from(state.emailActions);
      emailActionsUpdated[action.emailIndex][action.responseId] = {
        ...action.taskAction,
        actionType: ACTION_TYPE.task
      };
      return {
        ...state,
        emailActions: emailActionsUpdated
      };
    case DELETE_EMAIL:
      let purgedEmailSummaries = Array.from(state.emailSummaries);
      purgedEmailSummaries[action.emailIndex].emailCount--;

      let purgedEmailActions = Array.from(state.emailActions);
      purgedEmailActions[action.emailIndex].splice(action.responseId, 1);
      return {
        ...state,
        emailSummaries: purgedEmailSummaries,
        emailActions: purgedEmailActions
      };
    case DELETE_TASK:
      let purifiedEmailSummaries = Array.from(state.emailSummaries);
      purifiedEmailSummaries[action.emailIndex].taskCount--;

      let purifiedEmailActions = Array.from(state.emailActions);
      purifiedEmailActions[action.emailIndex].splice(action.responseId, 1);
      return {
        ...state,
        emailSummaries: purifiedEmailSummaries,
        emailActions: purifiedEmailActions
      };
    case CHANGE_CURRENT_EMAIL:
      return {
        ...state,
        currentEmail: action.emailIndex
      };

    default:
      return state;
  }
};

// Selector functions
const selectEmailActions = (actionState, emailId) => {
  return actionState[emailId];
};

export default emibInbox;
export {
  initialState,
  readEmail,
  addEmail,
  addTask,
  updateEmail,
  updateTask,
  deleteEmail,
  deleteTask,
  selectEmailActions,
  changeCurrentEmail
};
