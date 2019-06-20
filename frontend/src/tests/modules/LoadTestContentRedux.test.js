import loadTestContent, {
  initialState,
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
