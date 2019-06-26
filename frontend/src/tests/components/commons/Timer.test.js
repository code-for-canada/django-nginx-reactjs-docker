import React from "react";
import { mount } from "enzyme";
import Timer from "../../../components/commons/Timer";

it("defaults to showing the time", () => {
  const wrapper = mount(<Timer />);
  expect(wrapper.find("#unit-test-time").exists()).toEqual(true);
});
