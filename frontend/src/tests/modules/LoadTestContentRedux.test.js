import loadTestContent, {
  initialState,
  updateTestMetaDataState,
  updateTestBackgroundState
} from "../../modules/LoadTestContentRedux";

// updateTestBackgroundState
describe("updateTestBackgroundState action", () => {
  it("should update testQuestions state with given data", () => {
    const action = updateTestBackgroundState({
      en: {
        background: [
          {
            tree_view: [
              { organizational_structure_tree_child: [] },
              { team_information_tree_child: [] }
            ]
          }
        ]
      },
      fr: {
        background: [
          {
            tree_view: [
              { organizational_structure_tree_child: [] },
              { team_information_tree_child: [] }
            ]
          }
        ]
      }
    });
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      isMetaLoading: true,
      testBackground: {
        en: {
          background: [
            {
              tree_view: [
                { organizational_structure_tree_child: [] },
                { team_information_tree_child: [] }
              ]
            }
          ]
        },
        fr: {
          background: [
            {
              tree_view: [
                { organizational_structure_tree_child: [] },
                { team_information_tree_child: [] }
              ]
            }
          ]
        }
      },
      addressBook: { en: [], fr: [] }
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
      testBackground: {},
      addressBook: { en: [], fr: [] }
    });
  });
});
