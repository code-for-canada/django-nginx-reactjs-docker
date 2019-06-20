import loadTestContent, {
  initialState,
  updateTestMetaDataState,
  updateTestInstructionsState,
  updateTestQuestionsState
} from "../../modules/LoadTestContentRedux";

// updateTestQuestionsState
describe("updateTestQuestionsState action", () => {
  it("should update testQuestions state with given data", () => {
    const action = updateTestQuestionsState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      testInstructions: {},
      testQuestions: "Hello World"
    });
  });
});

// updateTestMetaDataState
describe("updateTestMetaDataState action", () => {
  it("should update testMetaData state with given data", () => {
    const action = updateTestMetaDataState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: "Hello World",
      testInstructions: {},
      testQuestions: {}
    });
  });
});

// updateTestInstructionsState
describe("updateTestInstructionsState action", () => {
  it("should update testInstructions state with given data", () => {
    const action = updateTestInstructionsState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      testInstructions: "Hello World",
      testQuestions: {}
    });
  });
});
