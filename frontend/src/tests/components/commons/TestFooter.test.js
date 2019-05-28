import React from "react";
import { shallow } from "enzyme";
import TestFooter from "../../../components/commons/TestFooter";

describe("displays and calls the right buttons depending on the testIsStarted state", () => {
  const submitMock1 = jest.fn();

  it("test is not started - calls start test when the buttons is clicked", () => {
    const wrapper = shallow(<TestFooter startTest={submitMock1} testIsStarted={false} />);
    wrapper.find("#unit-test-start-btn").simulate("click");
    expect(wrapper.find("#unit-test-start-btn").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-submit-btn").exists()).toEqual(false);
    expect(submitMock1).toHaveBeenCalledTimes(1);
  });
});
