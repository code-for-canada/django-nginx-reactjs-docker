// Action Types
const UPDATE_TEST_META_DATA = "emibInbox/UPDATE_TEST_META_DATA";
const UPDATE_TEST_BACKGROUND = "emibInbox/UPDATE_TEST_BACKGROUND";

// Action Creators
const updateTestMetaDataState = testMetaData => ({ type: UPDATE_TEST_META_DATA, testMetaData });
const updateTestBackgroundState = testBackground => ({
  type: UPDATE_TEST_BACKGROUND,
  testBackground
});

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
const initialState = {
  testMetaData: {},
  testBackground: {}
};

// Reducer
const loadTestContent = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEST_META_DATA:
      return {
        ...state,
        testMetaData: action.testMetaData
      };
    case UPDATE_TEST_BACKGROUND:
      return {
        ...state,
        testBackground: action.testBackground
      };

    default:
      return state;
  }
};

export default loadTestContent;
export {
  initialState,
  updateTestMetaDataState,
  getTestMetaData,
  updateTestBackgroundState,
  getTestContent
};
