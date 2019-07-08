import React from "react";
import { shallow, mount } from "enzyme";
import EditTask from "../../../components/eMIB/EditTask";
import { ACTION_TYPE, EDIT_MODE, EMAIL_TYPE } from "../../../components/eMIB/constants";

describe("char counts", () => {
  it("displays task char count of 0", () => {
    const wrapper = shallow(
      <EditTask
        onChange={() => {}}
        action={{ actionType: ACTION_TYPE.task, reasonsForAction: "", task: "" }}
      />
    );
    expect(wrapper.find("#unit-test-task-response").text()).toEqual("0/650");
  });

  it("displays task char count of 5", () => {
    const wrapper = shallow(
      <EditTask
        onChange={() => {}}
        action={{ actionType: ACTION_TYPE.task, reasonsForAction: "", task: "hello" }}
      />
    );
    expect(wrapper.find("#unit-test-task-response").text()).toEqual("5/650");
  });

  it("displays reason for action char count of 0", () => {
    const wrapper = shallow(
      <EditTask
        onChange={() => {}}
        action={{ actionType: ACTION_TYPE.task, reasonsForAction: "", task: "" }}
      />
    );
    expect(wrapper.find("#unit-test-task-rfa").text()).toEqual("0/650");
  });

  it("displays reason for action char count of 11", () => {
    const wrapper = shallow(
      <EditTask
        onChange={() => {}}
        action={{ actionType: ACTION_TYPE.task, reasonsForAction: "hello world", task: "" }}
      />
    );
    expect(wrapper.find("#unit-test-task-rfa").text()).toEqual("11/650");
  });

  it("renders and displays char count of 0 when undefined", () => {
    const wrapper = shallow(
      <EditTask
        onChange={() => {}}
        action={{ actionType: ACTION_TYPE.task, reasonsForAction: undefined, task: undefined }}
      />
    );
    expect(wrapper.find("#unit-test-task-response").text()).toEqual("0/650");
    expect(wrapper.find("#unit-test-task-rfa").text()).toEqual("0/650");
  });
});
