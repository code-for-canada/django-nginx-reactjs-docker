import {
  transformAddressBook,
  contactNameFromId,
  recursivelyProcessTree
} from "../../../helpers/transformations";

const addressBook = [
  "Joe (Developer)",
  "Bob (Developer)",
  "Smithers (Butler)",
  "Arthur (King of Britain)",
  "Richard (Lionheart)",
  "Robert (The Bruce)"
];

it("Check transformAddressBook", () => {
  const options = [
    { name: "Joe (Developer)", id: 0 },
    { name: "Bob (Developer)", id: 1 },
    { name: "Smithers (Butler)", id: 2 },
    { name: "Arthur (King of Britain)", id: 3 },
    { name: "Richard (Lionheart)", id: 4 },
    { name: "Robert (The Bruce)", id: 5 }
  ];
  expect(transformAddressBook(addressBook)).toEqual(options);
});

describe("Check contactNameFromId", () => {
  it("returns the name when id is in the address book", () => {
    expect(contactNameFromId(addressBook, 3)).toEqual("Arthur (King of Britain)");
  });

  it("returns an empty string when the id is not in the address book", () => {
    expect(contactNameFromId(addressBook, 6)).toEqual("");
  });
});

describe("recursivelyProcessTree", () => {
  it("returns a processed array for single level tree", () => {
    const treeContent = [
      {
        id: 0,
        text: "Claude Huard (Quality Assurance Manager - You)",
        team_information_tree_child: []
      }
    ];
    const array = recursivelyProcessTree(treeContent, "team_information_tree_child", 1, 0);
    expect(array).toEqual([
      {
        id: 0,
        level: 1,
        name: "Claude Huard (Quality Assurance Manager - You)",
        groups: [],
        parent: undefined
      }
    ]);
  });

  it("returns a processed array for double level tree", () => {
    const treeContent = [
      {
        id: 0,
        text: "Claude Huard (Quality Assurance Manager - You)",
        team_information_tree_child: [
          {
            text: "Danny McBride (QA Analyst)",
            id: 0
          },
          {
            text: "Serge Duplessis (QA Analyst)",
            id: 1
          }
        ]
      }
    ];
    const array = recursivelyProcessTree(treeContent, "team_information_tree_child", 1, 0);
    expect(array).toEqual([
      { id: 0, level: 1, name: "Claude Huard (Quality Assurance Manager - You)", groups: [1, 2] },
      { id: 1, level: 2, name: "Danny McBride (QA Analyst)", parent: 0 },
      { id: 2, level: 2, name: "Serge Duplessis (QA Analyst)", parent: 0 }
    ]);
  });
});
