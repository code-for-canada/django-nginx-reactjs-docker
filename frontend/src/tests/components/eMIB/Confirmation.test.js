import React from "react";
import { shallow } from "enzyme";
import Confirmation from "../../../components/eMIB/Confirmation";
import { LANGUAGES } from "../../../modules/LocalizeRedux";
import LOCALIZE from "../../../text_resources";

it("renders confirmation message in English", () => {
  LOCALIZE.setLanguage(LANGUAGES.english);
  const wrapper = shallow(<Confirmation />);
  const confirmationMsg = <p>{LOCALIZE.emibTest.confirmationPage.submissionConfirmed}</p>;
  expect(wrapper.contains(confirmationMsg)).toEqual(true);
});

it("renders confirmation message in French", () => {
  LOCALIZE.setLanguage(LANGUAGES.french);
  const wrapper = shallow(<Confirmation />);
  const confirmationMsg = <p>{LOCALIZE.emibTest.confirmationPage.submissionConfirmed}</p>;
  expect(wrapper.contains(confirmationMsg)).toEqual(true);
});
