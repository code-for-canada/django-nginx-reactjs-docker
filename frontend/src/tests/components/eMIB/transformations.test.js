import React from "react";
import {
  transformAddressBook,
  transformContact,
  transformContactName,
  contactNameFromId
} from "../../../helpers/transformations";

const addressBook = [
  { id: 0, name: "Joe", role: "Developer" },
  { id: 1, name: "Bob", role: "Developer" },
  { id: 2, name: "Smithers", role: "Butler" },
  { id: 3, name: "Arthur", role: "King of Britain" },
  { id: 4, name: "Richard", role: "Lionheart" },
  { id: 5, name: "Robert", role: "The Bruce" }
];

it("Check transformContact", () => {
  const contact = { id: 100, name: "Bob WhatHisName", role: "He Works Here" };
  const option = { name: "Bob WhatHisName (He Works Here)", id: 100 };
  expect(transformContact(contact)).toEqual(option);
});

it("Check transformContactName", () => {
  expect(transformContactName(addressBook[0])).toEqual("Joe (Developer)");
});

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
