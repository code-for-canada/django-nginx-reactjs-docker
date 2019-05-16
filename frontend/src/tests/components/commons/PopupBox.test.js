import React from "react";
import { mount } from "enzyme";
import PopupBox, { BUTTON_TYPE } from "../../../components/commons/PopupBox";

it("calls button actions on click", () => {
  const submitMock1 = jest.fn();
  const submitMock2 = jest.fn();
  const wrapper = mount(
    <PopupBox
      show={true}
      handleClose={function() {}}
      title={"title"}
      description={"description"}
      leftButtonType={BUTTON_TYPE.primary}
      leftButtonTitle={"left button"}
      leftButtonAction={submitMock1}
      rightButtonType={BUTTON_TYPE.secondary}
      rightButtonTitle={"right button"}
      rightButtonAction={submitMock2}
    />
  );
  wrapper.find("#unit-test-left-btn").simulate("click");
  wrapper.find("#unit-test-right-btn").simulate("click");
  expect(submitMock1).toHaveBeenCalledTimes(1);
  expect(submitMock2).toHaveBeenCalledTimes(1);
});
