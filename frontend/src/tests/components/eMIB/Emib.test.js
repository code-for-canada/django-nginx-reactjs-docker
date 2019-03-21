import React from "react";
import { mount } from "enzyme";
import Emib, { PAGES } from "../../../components/eMIB/Emib";
import Confirmation from "../../../components/eMIB/Confirmation";
import LOCALIZE from "../../../text_resources";

it("renders pre-test page", () => {
  const wrapper = mount(<Emib />);
  const emibTitle = <h1 className="green-divider">{LOCALIZE.emibTest.homePage.testTitle}</h1>;
  expect(wrapper.contains(emibTitle)).toEqual(true);
  expect(wrapper.state("curPage")).toEqual(PAGES.preTest);
});

it("renders pre-test page when state changed", () => {
  const wrapper = mount(<Emib />);
  wrapper.setState({ curPage: PAGES.preTest });
  const emibTitle = <h1 className="green-divider">{LOCALIZE.emibTest.homePage.testTitle}</h1>;
  expect(wrapper.contains(emibTitle)).toEqual(true);
});

it("renders confirm page", () => {
  const wrapper = mount(<Emib />);
  wrapper.setState({ curPage: PAGES.confirm });
  const confirmationComponent = <Confirmation />;
  expect(wrapper.contains(confirmationComponent)).toEqual(true);
});
