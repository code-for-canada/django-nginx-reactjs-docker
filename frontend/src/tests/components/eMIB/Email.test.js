import React from "react";
import { shallow } from "enzyme";
import { UnconnectedEmail as Email } from "../../../components/eMIB/Email";
import CollapsingItemContainer from "../../../components/eMIB/CollapsingItemContainer";
import { EMAIL_TYPE, ACTION_TYPE } from "../../../components/eMIB/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const emailStub = {
  id: 0,
  to: "To 1",
  from: "From 1",
  subject: "Subject 1",
  date: "Date 1",
  body: "Body 1"
};

const hasAction = <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#00565E" }} />;

it("default email renders with subject as an h3", () => {
  const wrapper = shallow(
    <Email email={emailStub} emailCount={0} taskCount={0} emailActionsArray={[[]]} />
  );
  expect(wrapper.contains(hasAction)).toEqual(false);
});

it("shows action when email count is non zero", () => {
  const wrapper = shallow(
    <Email email={emailStub} emailCount={1} taskCount={0} emailActionsArray={[[]]} />
  );
  expect(wrapper.contains(hasAction)).toEqual(true);
});

it("shows action when task count is non zero", () => {
  const wrapper = shallow(
    <Email email={emailStub} emailCount={0} taskCount={2} emailActionsArray={[[]]} />
  );
  expect(wrapper.contains(hasAction)).toEqual(true);
});

describe("shows as many 'CollapsingItemContainer' as there are actions", () => {
  it("shows 1 'CollapsingItemContainer'", () => {
    const wrapper = shallow(
      <Email
        email={emailStub}
        emailCount={1}
        taskCount={0}
        emailActionsArray={[
          [
            {
              emailType: EMAIL_TYPE.reply,
              emailTo: "you",
              emailBody: "hi",
              actionType: ACTION_TYPE.email
            }
          ]
        ]}
      />
    );
    expect(wrapper.find(CollapsingItemContainer).length).toEqual(1);
  });
  it("shows 3 'CollapsingItemContainer'", () => {
    const wrapper = shallow(
      <Email
        email={emailStub}
        emailCount={3}
        taskCount={0}
        emailActionsArray={[
          [
            {
              emailType: EMAIL_TYPE.reply,
              emailTo: "you1",
              emailBody: "hi1",
              actionType: ACTION_TYPE.email
            },
            {
              emailType: EMAIL_TYPE.replyAll,
              emailTo: "you2",
              emailBody: "hi2",
              actionType: ACTION_TYPE.email
            },
            {
              emailType: EMAIL_TYPE.forward,
              emailTo: "you3",
              emailBody: "hi3",
              actionType: ACTION_TYPE.email
            }
          ]
        ]}
      />
    );
    expect(wrapper.find(CollapsingItemContainer).length).toEqual(3);
  });
});

describe("check that the disabled prop works as expected", () => {
  it("buttons are not disabled if flag is not present", () => {
    const wrapper = shallow(
      <Email email={emailStub} emailCount={0} taskCount={0} emailActionsArray={[[]]} />
    );
    expect(wrapper.find("#unit-test-email-reply-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-email-task-button").exists()).toEqual(true);
  });

  it("buttons are not disabled if flag is set to false", () => {
    const wrapper = shallow(
      <Email
        email={emailStub}
        emailCount={0}
        taskCount={0}
        emailActionsArray={[[]]}
        disabled={false}
      />
    );
    expect(wrapper.find("#unit-test-email-reply-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-email-task-button").exists()).toEqual(true);
  });

  it("buttons are disabled if flag is set to true", () => {
    const wrapper = shallow(
      <Email
        email={emailStub}
        emailCount={0}
        taskCount={0}
        emailActionsArray={[[]]}
        disabled={true}
      />
    );
    expect(wrapper.find("#unit-test-email-reply-button").exists()).toEqual(false);
    expect(wrapper.find("#unit-test-email-task-button").exists()).toEqual(false);
  });
});
