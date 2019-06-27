import React from "react";
import { shallow } from "enzyme";
import Status from "../Status";
import { LANGUAGES } from "../modules/LocalizeRedux";
import LOCALIZE from "../text_resources";

it("renders Status Page Welcome Message in English", () => {
  LOCALIZE.setLanguage(LANGUAGES.english);
  const wrapper = shallow(<Status />);
  const statusPageWelcomeMsg = <p>{LOCALIZE.statusPage.welcomeMsg}</p>;
  expect(wrapper.contains(statusPageWelcomeMsg)).toEqual(true);
});

it("renders Status Page Welcome Message in French", () => {
  LOCALIZE.setLanguage(LANGUAGES.french);
  const wrapper = shallow(<Status />);
  const statusPageWelcomeMsg = <p>{LOCALIZE.statusPage.welcomeMsg}</p>;
  expect(wrapper.contains(statusPageWelcomeMsg)).toEqual(true);
});
