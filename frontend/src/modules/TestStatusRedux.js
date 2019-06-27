// Action Types
const ACTIVATE_TEST = "testStatus/ACTIVATE_TEST";
const DEACTIVATE_TEST = "testStatus/DEACTIVATE_TEST";

// Action Creators
const activateTest = () => ({ type: ACTIVATE_TEST });
const deactivateTest = () => ({ type: DEACTIVATE_TEST });

const PAGES = {
  preTest: "preTest",
  emibTabs: "emibTabs",
  confirm: "confirm"
};

// Initial State
const initialState = {
  isTestActive: false,
  currentPage: PAGES.preTest
};

// Reducer
const testStatus = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_TEST:
      return {
        ...state,
        isTestActive: true,
        currentPage: PAGES.emibTabs
      };
    case DEACTIVATE_TEST:
      // Ensure local storage is cleaned up once test is complete.
      localStorage.removeItem("catLanguage");
      return {
        ...state,
        isTestActive: false,
        currentPage: PAGES.confirm
      };

    default:
      return state;
  }
};

export default testStatus;
export { activateTest, initialState, deactivateTest, PAGES };
