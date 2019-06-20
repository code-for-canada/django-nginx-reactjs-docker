import loadTestContent, {
  initialState,
  updateTestInstructionsState
} from "../../modules/LoadTestContentRedux";

// updateTestInstructionsState
describe("updateTestInstructionsState action", () => {
  it("should update testInstructions state with given data", () => {
    const action = updateTestInstructionsState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      testInstructions: "Hello World"
    });
  });
});
