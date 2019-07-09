import loadTestContent, {
  initialState,
  updateTestMetaDataState,
  updateTestBackgroundState
} from "../../modules/LoadTestContentRedux";

// updateTestBackgroundState
describe("updateTestBackgroundState action", () => {
  it("should update testQuestions state with given data", () => {
    const action = updateTestBackgroundState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      isMetaLoading: true,
      testBackground: "Hello World"
    });
  });
});

// updateTestMetaDataState
describe("updateTestMetaDataState action", () => {
  it("should update testMetaData state with given data", () => {
    const action = updateTestMetaDataState("Hello World");
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: "Hello World",
      isMetaLoading: false,
      testBackground: {}
    });
  });
});
