import React from "react";
import { shallow } from "enzyme";
import TestFooter from "../../../components/commons/TestFooter";

it("calls submit test and quit test when the buttons are clicked", () => {
  const submitMock1 = jest.fn();
  const submitMock2 = jest.fn();
  const wrapper = shallow(<TestFooter submitTest={submitMock1} quitTest={submitMock2} />);
  wrapper.find("#unit-test-submit-btn").simulate("click");
  wrapper.find("#unit-test-quit-btn").simulate("click");
  expect(submitMock1).toHaveBeenCalledTimes(1);
  expect(submitMock2).toHaveBeenCalledTimes(1);
});
