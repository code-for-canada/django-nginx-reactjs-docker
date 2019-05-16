import React from "react";
import { shallow } from "enzyme";
import PopupBox, { BUTTON_TYPE } from "../../../components/commons/PopupBox";

//also test that it renders without action
it("renders title, description, left button and right button titles", () => {
  const wrapper = shallow(
    <div id="root">
      <PopupBox
        title={"title"}
        description={"description"}
        leftButtonType={BUTTON_TYPE.primary}
        leftButtonTitle={"left button"}
        rightButtonType={BUTTON_TYPE.secondary}
        rightButtonTitle={"right button"}
      />
    </div>
  );
  expect(wrapper.find("#modal-heading").exists()).toEqual(true);
  expect(wrapper.find("#modal-description").exists()).toEqual(true);
  expect(wrapper.find("#unit-test-left-btn").exists()).toEqual(true);
  expect(wrapper.find("#unit-test-right-btn").exists()).toEqual(true);
});

it("renders only title, description and left button title", () => {
  const wrapper = shallow(
    <div id="root">
      <PopupBox
        title={"title"}
        description={"description"}
        leftButtonType={BUTTON_TYPE.secondary}
        leftButtonTitle={"left button"}
      />
    </div>
  );
  expect(wrapper.find("#modal-heading").exists()).toEqual(true);
  expect(wrapper.find("#modal-description").exists()).toEqual(true);
  expect(wrapper.find("#unit-test-left-btn").exists()).toEqual(true);
  expect(wrapper.find("#unit-test-right-btn").exists()).toEqual(false);
});

it("calls button actions on click", () => {
  const submitMock1 = jest.fn();
  const submitMock2 = jest.fn();
  const wrapper = shallow(
    <div id="root">
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
    </div>
  );
  wrapper.find("#unit-test-left-btn").simulate("click");
  wrapper.find("#unit-test-right-btn").simulate("click");
  expect(submitMock1).toHaveBeenCalledTimes(1);
  expect(submitMock2).toHaveBeenCalledTimes(1);
});
