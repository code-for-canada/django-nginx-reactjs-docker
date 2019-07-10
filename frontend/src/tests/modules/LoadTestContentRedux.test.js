import loadTestContent, {
  initialState,
  updateTestMetaDataState,
  updateTestBackgroundState
} from "../../modules/LoadTestContentRedux";

// updateTestBackgroundState
describe("updateTestBackgroundState action", () => {
  it("should update test background and addressbook state with empty data", () => {
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

  it("should update test background/addressbook state", () => {
    const action = updateTestBackgroundState({
      en: {
        background: [
          {
            tree_view: [
              {
                organizational_structure_tree_child: [{ text: "Jenna Icard (President)", id: 0 }]
              },
              { team_information_tree_child: [{ text: "Bob McNutt (Finance Manager)", id: 1 }] }
            ]
          }
        ]
      },
      fr: {
        background: [
          {
            tree_view: [
              {
                organizational_structure_tree_child: [{ text: "FR Jenna Icard (President)", id: 0 }]
              },
              {
                team_information_tree_child: [{ text: "FR Bob McNutt (Finance Manager)", id: 1 }]
              }
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
                {
                  organizational_structure_tree_child: [{ text: "Jenna Icard (President)", id: 0 }]
                },
                { team_information_tree_child: [{ text: "Bob McNutt (Finance Manager)", id: 1 }] }
              ]
            }
          ]
        },
        fr: {
          background: [
            {
              tree_view: [
                {
                  organizational_structure_tree_child: [
                    { text: "FR Jenna Icard (President)", id: 0 }
                  ]
                },
                {
                  team_information_tree_child: [{ text: "FR Bob McNutt (Finance Manager)", id: 1 }]
                }
              ]
            }
          ]
        }
      },
      addressBook: {
        en: ["Jenna Icard (President)", "Bob McNutt (Finance Manager)"],
        fr: ["FR Jenna Icard (President)", "FR Bob McNutt (Finance Manager)"]
      }
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
