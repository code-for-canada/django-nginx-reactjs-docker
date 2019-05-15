import React from "react";
import { shallow } from "enzyme";
import { UnconnectedInbox as Inbox } from "../../../components/eMIB/Inbox";
import { emailsJson } from "../../../modules/sampleEmibJson";
import EmailPreview from "../../../components/eMIB/EmailPreview";
import Email from "../../../components/eMIB/Email";

const INBOX_SPECS = emailsJson.emailsEN;

it("Displays 3 email previews when there are 3 emails", () => {
  const wrapper = shallow(
    <Inbox
      emails={INBOX_SPECS}
      emailSummaries={[
        { isRead: false, taskCount: 0, emailCount: 0 },
        { isRead: false, taskCount: 0, emailCount: 0 },
        { isRead: false, taskCount: 0, emailCount: 0 }
      ]}
      currentEmail={0}
      readEmail={() => {}}
      changeCurrentEmail={() => {}}
    />
  );
  expect(wrapper.find(EmailPreview).length).toEqual(INBOX_SPECS.length);
  expect(wrapper.find(Email).length).toEqual(1);
});
