// Action Types
const UPDATE_TEST_META_DATA = "emibInbox/UPDATE_TEST_META_DATA";
const UPDATE_TEST_INSTRUCTIONS = "emibInbox/UPDATE_TEST_INSTRUCTIONS";
const UPDATE_TEST_QUESTIONS = "emibInbox/UPDATE_TEST_QUESTIONS";

// Action Creators
const updateTestMetaDataState = testMetaData => ({ type: UPDATE_TEST_META_DATA, testMetaData });

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

const updateTestInstructionsState = testInstructions => ({
  type: UPDATE_TEST_INSTRUCTIONS,
  testInstructions
});

const getTestInstructions = testName => {
  return async function() {
    let testInstructionsContent = await fetch(`/api/test-instructions/?test_name=${testName}`, {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "default"
    });
    return await testInstructionsContent.json();
  };
};

const updateTestQuestionsState = testQuestions => ({
  type: UPDATE_TEST_QUESTIONS,
  testQuestions
});

const getTestQuestions = testName => {
  return async function() {
    let testQuestionsContent = await fetch(`/api/test-questions/?test_name=${testName}`, {
      method: "GET",
      Accept: "application/json",
      "Content-Type": "application/json",
      cache: "default"
    });
    return await testQuestionsContent.json();
  };
};

// Initial State
const initialState = {
  testMetaData: "",
  testInstructions: "",
  testQuestions: ""
};

// Reducer
const loadTestContent = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEST_META_DATA:
      return {
        ...state,
        testMetaData: action.testMetaData
      };
    case UPDATE_TEST_INSTRUCTIONS:
      return {
        ...state,
        testInstructions: action.testInstructions
      };
    case UPDATE_TEST_QUESTIONS:
      return {
        ...state,
        testQuestions: action.testQuestions
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
  updateTestInstructionsState,
  getTestInstructions,
  updateTestQuestionsState,
  getTestQuestions
};
