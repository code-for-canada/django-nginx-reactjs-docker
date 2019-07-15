import loadTestContent, {
  initialState,
  updateTestMetaDataState,
  updateTestBackgroundState
} from "../../modules/LoadTestContentRedux";

describe("updateTestBackgroundState action", () => {
  it("should update test background and addressbook state with empty data", () => {
    const action = updateTestBackgroundState({
      en: {
        sections: [{ section: [] }]
      },
      fr: {
        sections: [{ section: [] }]
      }
    });
    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      isMetaLoading: true,
      testBackground: {
        en: {
          sections: [{ section: [] }]
        },
        fr: {
          sections: [{ section: [] }]
        }
      },
      addressBook: { en: [], fr: [] }
    });
  });

  it("should update test background/addressbook state", () => {
    const content = {
      en: {
        sections: [
          {
            section: [
              { id: 0, section_content: [{ id: 1, type: "markdown", text: "hello world" }] },
              {
                id: 2,
                section_content: [
                  {
                    id: 3,
                    type: "tree_view",
                    organizational_structure_tree_child: [
                      {
                        text: "Jenna Icard (President)",
                        id: 0,
                        organizational_structure_tree_child: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 4,
                section_content: [
                  {
                    id: 5,
                    type: "tree_view",
                    team_information_tree_child: [
                      {
                        text: "Bob McNutt (Finance Manager)",
                        id: 1,
                        team_information_tree_child: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      fr: {
        sections: [
          {
            section: [
              { id: 0, section_content: [{ id: 1, type: "markdown", text: "fr hello world" }] },
              {
                id: 2,
                section_content: [
                  {
                    id: 3,
                    type: "tree_view",
                    organizational_structure_tree_child: [
                      {
                        text: "FR Jenna Icard (President)",
                        id: 0,
                        organizational_structure_tree_child: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 4,
                section_content: [
                  {
                    id: 5,
                    type: "tree_view",
                    team_information_tree_child: [
                      {
                        text: "FR Bob McNutt (Finance Manager)",
                        id: 1,
                        team_information_tree_child: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    const action = updateTestBackgroundState(content);

    expect(loadTestContent(initialState, action)).toEqual({
      testMetaData: {},
      isMetaLoading: true,
      testBackground: content,
      addressBook: {
        en: ["Jenna Icard (President)", "Bob McNutt (Finance Manager)"],
        fr: ["FR Jenna Icard (President)", "FR Bob McNutt (Finance Manager)"]
      }
    });
  });
});

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
