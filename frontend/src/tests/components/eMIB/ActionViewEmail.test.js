import React from "react";
import { shallow } from "enzyme";
import { UnconnectedActionViewEmail } from "../../../components/eMIB/ActionViewEmail";
import { EMAIL_TYPE, ACTION_TYPE } from "../../../components/eMIB/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faReplyAll, faShareSquare, faShare } from "@fortawesome/free-solid-svg-icons";

const addressBook = [
  "Joe (Developer)",
  "Bob (Developer)",
  "Smithers (Butler)",
  "Arthur (King of Britain)",
  "Richard (Lionheart)",
  "Robert (The Bruce)"
];
const ccValue = 3;

const emailStub = {
  id: 0,
  to: "To 1",
  from: "From 1",
  subject: "hello team",
  date: "Date 1",
  body: "body"
};

describe("Response types", () => {
  const reply = <FontAwesomeIcon icon={faReply} />;
  const replyAll = <FontAwesomeIcon icon={faReplyAll} />;
  const forward = <FontAwesomeIcon icon={faShareSquare} />;

  it("renders reply response", () => {
    const wrapper = genWrapper(EMAIL_TYPE.reply, [ccValue]);

    expect(wrapper.containsMatchingElement(reply)).toEqual(true);
    expect(wrapper.containsMatchingElement(replyAll)).toEqual(false);
    expect(wrapper.containsMatchingElement(forward)).toEqual(false);
  });

  it("renders reply all response", () => {
    const wrapper = genWrapper(EMAIL_TYPE.replyAll, [ccValue]);

    expect(wrapper.containsMatchingElement(reply)).toEqual(false);
    expect(wrapper.containsMatchingElement(replyAll)).toEqual(true);
    expect(wrapper.containsMatchingElement(forward)).toEqual(false);
  });

  it("renders forward response", () => {
    const wrapper = genWrapper(EMAIL_TYPE.forward, [ccValue]);

    expect(wrapper.containsMatchingElement(reply)).toEqual(false);
    expect(wrapper.containsMatchingElement(replyAll)).toEqual(false);
    expect(wrapper.containsMatchingElement(forward)).toEqual(true);
  });
});

describe("check that the disabled prop works as expected", () => {
  const actionStub = {
    actionType: ACTION_TYPE.email,
    reasonsForAction: "reasons",
    emailType: EMAIL_TYPE.reply,
    emailTo: [0],
    emailCc: [],
    emailBody: "reasons"
  };
  it("buttons are present if flag is not present", () => {
    const wrapper = shallow(
      <UnconnectedActionViewEmail
        actionId={0}
        action={actionStub}
        email={emailStub}
        deleteEmail={() => {}}
        addressBook={addressBook}
      />
    );
    expect(wrapper.find("#unit-test-view-email-edit-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-view-email-delete-button").exists()).toEqual(true);
  });

  it("buttons are present if flag is set to false", () => {
    const wrapper = shallow(
      <UnconnectedActionViewEmail
        actionId={0}
        action={actionStub}
        email={emailStub}
        deleteEmail={() => {}}
        addressBook={addressBook}
        disabled={false}
      />
    );
    expect(wrapper.find("#unit-test-view-email-edit-button").exists()).toEqual(true);
    expect(wrapper.find("#unit-test-view-email-delete-button").exists()).toEqual(true);
  });

  it("buttons are not present if flag is set to true", () => {
    const wrapper = shallow(
      <UnconnectedActionViewEmail
        actionId={0}
        action={actionStub}
        email={emailStub}
        deleteEmail={() => {}}
        addressBook={addressBook}
        disabled={true}
      />
    );
    expect(wrapper.find("#unit-test-view-email-edit-button").exists()).toEqual(false);
    expect(wrapper.find("#unit-test-view-email-delete-button").exists()).toEqual(false);
  });
});

function genWrapper(responseType, cc) {
  return createWrapper(responseType, cc, () => {});
}

function createWrapper(responseType, cc, deleteEmail) {
  const actionStub = {
    actionType: ACTION_TYPE.email,
    reasonsForAction: "reasons",
    emailType: responseType,
    emailTo: [0],
    emailCc: cc,
    emailBody: "reasons"
  };

  return shallow(
    <UnconnectedActionViewEmail
      actionId={0}
      action={actionStub}
      email={emailStub}
      deleteEmail={deleteEmail}
      addressBook={addressBook}
    />
  );
}

it("it renders when the email is undefined", () => {
  shallow(
    <UnconnectedActionViewEmail
      actionId={0}
      action={{ actionType: ACTION_TYPE.email }}
      email={emailStub}
      deleteEmail={() => {}}
      addressBook={addressBook}
    />
  );
});
