import loadTestContent, {
  initialState,
  updateTestMetaDataState,
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
