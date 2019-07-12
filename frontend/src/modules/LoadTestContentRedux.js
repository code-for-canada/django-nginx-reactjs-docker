import { recursivelyCreateAddressBook } from "../helpers/transformations";

// Action Types
const UPDATE_TEST_META_DATA = "emibInbox/UPDATE_TEST_META_DATA";
const UPDATE_TEST_BACKGROUND = "emibInbox/UPDATE_TEST_BACKGROUND";

// Action Creators
const updateTestMetaDataState = testMetaData => ({ type: UPDATE_TEST_META_DATA, testMetaData });
const updateTestBackgroundState = testBackground => ({
  type: UPDATE_TEST_BACKGROUND,
  testBackground
});

// API Calls
const getTestMetaData = testName => {
  return async function() {
    let metaDataContent = await fetch(`/api/test-meta-data/?test_name=${testName}`, {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "default"
    });
    return await metaDataContent.json();
  };
};
const getTestContent = testName => {
  return async function() {
    let testContent = await fetch(`/api/test-questions/?test_name=${testName}`, {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "default"
    });
    return await testContent.json();
  };
};

// Initial State
// isMetaLoading - boolean determining if the metadata has been initialized
// testMetaData - contains the name of the test and the overview page content
// testBackground - contains all the background information
// addressBook - an object containing arrays of strings representing
// an address book of contacts in each language
const initialState = {
  isMetaLoading: true,
  testMetaData: {},
  testBackground: {},
  addressBook: { en: [], fr: [] }
};

// Reducer
const loadTestContent = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEST_META_DATA:
      return {
        ...state,
        testMetaData: action.testMetaData,
        isMetaLoading: false
      };
    case UPDATE_TEST_BACKGROUND:
      return {
        ...state,
        testBackground: action.testBackground,
        addressBook: processAddressBook(action.testBackground)
      };

    default:
      return state;
  }
};

// Converts the org charts in the background into an addressBook
// to put into the redux store.
const processAddressBook = testBackground => {
  return { en: [], fr: [] };
  // Get the org chart arrays out of the background content.
  const enOrgCharts = testBackground.en.background[0].tree_view;
  const frOrgCharts = testBackground.fr.background[0].tree_view;

  // Flatten the trees and format as an array of names (strings).
  const enAddressBook = recursivelyCreateAddressBook(
    enOrgCharts[0].organizational_structure_tree_child,
    "organizational_structure_tree_child"
  ).concat(
    recursivelyCreateAddressBook(
      enOrgCharts[1].team_information_tree_child,
      "team_information_tree_child"
    )
  );

  const frAddressBook = recursivelyCreateAddressBook(
    frOrgCharts[0].organizational_structure_tree_child,
    "organizational_structure_tree_child"
  ).concat(
    recursivelyCreateAddressBook(
      frOrgCharts[1].team_information_tree_child,
      "team_information_tree_child"
    )
  );

  // Return the formatted address book for each language.
  return { en: enAddressBook, fr: frAddressBook };
};

// Filters - used to get a filtered version of the state in the
// mapStateToProps in the components.

// Returns the address book in the current language.
export const getAddressInCurrentLanguage = state => {
  const lang = state.localize.language;
  const addressBook = state.loadTestContent.addressBook;
  return addressBook[lang];
};

// Returns the background info in the current language.
export const getBackgroundInCurrentLanguage = state => {
  const lang = state.localize.language;
  const testBackground = state.loadTestContent.testBackground;
  return testBackground[lang].sections[0].section;
};

export default loadTestContent;
export {
  initialState,
  updateTestMetaDataState,
  getTestMetaData,
  updateTestBackgroundState,
  getTestContent
};
