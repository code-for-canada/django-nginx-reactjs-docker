import React from "react";
import { shallow } from "enzyme";
import { UnconnectedActionViewTask } from "../../../components/eMIB/ActionViewTask";
import { ACTION_TYPE } from "../../../components/eMIB/constants";

const actionStub = {
  actionType: ACTION_TYPE.task,
  task: "Liste of my tasks here...",
  reasonsForAction: "Reasons for action here..."
};

const emailStub = {
  id: 0,
  to: "To 1",
  from: "From 1",
  subject: "hello team",
  date: "Date 1",
  body: "body"
};

describe("renders component's content", () => {
  const deleteMock = jest.fn();
  const wrapper = shallow(
    <UnconnectedActionViewTask
      action={actionStub}
      actionId={0}
      email={emailStub}
      deleteTask={deleteMock}
    />
  );

  it("task content", () => {
    const taskContent = <p>{"Liste of my tasks here..."}</p>;
    expect(wrapper.containsMatchingElement(taskContent)).toEqual(true);
  });

  it("reasons for action content", () => {
    const reasonsForActionContent = <p>{"Reasons for action here..."}</p>;
    expect(wrapper.containsMatchingElement(reasonsForActionContent)).toEqual(true);
  });
});

describe("check that the disabled prop works as expected", () => {
  const actionStub = {
    actionType: ACTION_TYPE.task,
    task: "Liste of my tasks here...",
    reasonsForAction: "Reasons for action here..."
  };
  it("buttons are present if flag is not present", () => {
    const wrapper = shallow(
      <UnconnectedActionViewTask
        action={actionStub}
        actionId={0}
        email={emailStub}
        deleteTask={() => {}}
      />
    );
    expect(wrapper.find("#unit-test-view-task-edit-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-view-task-delete-button").exists()).toEqual(true);
  });

  it("buttons are present if flag is set to false", () => {
    const wrapper = shallow(
      <UnconnectedActionViewTask
        action={actionStub}
        actionId={0}
        email={emailStub}
        deleteTask={() => {}}
        disabled={false}
      />
    );
    expect(wrapper.find("#unit-test-view-task-edit-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-view-task-delete-button").exists()).toEqual(true);
  });

  it("buttons are not present if flag is set to true", () => {
    const wrapper = shallow(
      <UnconnectedActionViewTask
        action={actionStub}
        actionId={0}
        email={emailStub}
        deleteTask={() => {}}
        disabled={true}
      />
    );
    expect(wrapper.find("#unit-test-view-task-edit-button").exists()).toEqual(false);
    expect(wrapper.find("#unit-test-view-task-delete-button").exists()).toEqual(false);
  });
});

it("it renders when the email is undefined", () => {
  shallow(
    <UnconnectedActionViewTask
      actionId={0}
      action={{ actionType: ACTION_TYPE.task }}
      email={emailStub}
      deleteTask={() => {}}
      disabled={false}
    />
  );
});
