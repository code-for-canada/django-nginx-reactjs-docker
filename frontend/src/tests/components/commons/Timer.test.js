import React from "react";
import { mount } from "enzyme";
import Timer from "../../../components/commons/Timer";

it("defaults to showing the time", () => {
  const wrapper = mount(<Timer />);
  expect(wrapper.find("#unit-test-time").exists()).toEqual(true);
});

it("hides the time on click", () => {
  const wrapper = mount(<Timer />);
  wrapper
    .find("#unit-test-toggle-timer")
    .first()
    .simulate("click");
  expect(wrapper.find("#unit-test-time").exists()).toEqual(false);
});
