// Action Types
const ACTIVATE_TEST = "testStatus/ACTIVATE_TEST";
const DEACTIVATE_TEST = "testStatus/DEACTIVATE_TEST";
const QUIT_TEST = "testStatus/QUIT_TEST";

// Action Creators
const activateTest = () => ({ type: ACTIVATE_TEST });
const deactivateTest = () => ({ type: DEACTIVATE_TEST });
const quitTest = () => ({ type: QUIT_TEST });

const PAGES = {
  preTest: "preTest",
  emibTabs: "emibTabs",
  confirm: "confirm",
  quit: "quit"
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
    case QUIT_TEST:
      localStorage.removeItem("catLanguage");
      return {
        ...state,
        isTestActive: false,
        currentPage: PAGES.quit
      };

    default:
      return state;
  }
};

export default testStatus;
export { activateTest, initialState, deactivateTest, quitTest, PAGES };
