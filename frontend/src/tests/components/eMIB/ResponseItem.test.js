import React from "react";
import { shallow } from "enzyme";
import ResponseItem, { RESPONSE_TYPE } from "../../../components/eMIB/ResponseItem";
import LOCALIZE from "../../../text_resources";

it("renders the right response types (reply, reply all, forward)", () => {
  //reply
  const replyWrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.reply}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  //reply all
  const replyAllWrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.replyAll}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  //forward
  const forwardWrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.forward}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  const reply = <span className="fas fa-reply" />;
  const replyAll = <span className="fas fa-reply-all" />;
  const forward = <span className="fas fa-share-square" />;

  //reply
  expect(replyWrapper.containsMatchingElement(reply)).toEqual(true);
  expect(replyWrapper.containsMatchingElement(replyAll)).toEqual(false);
  expect(replyWrapper.containsMatchingElement(forward)).toEqual(false);

  //reply all
  expect(replyAllWrapper.containsMatchingElement(reply)).toEqual(false);
  expect(replyAllWrapper.containsMatchingElement(replyAll)).toEqual(true);
  expect(replyAllWrapper.containsMatchingElement(forward)).toEqual(false);

  //forward
  expect(forwardWrapper.containsMatchingElement(reply)).toEqual(false);
  expect(forwardWrapper.containsMatchingElement(replyAll)).toEqual(false);
  expect(forwardWrapper.containsMatchingElement(forward)).toEqual(true);
});

it("renders email's header", () => {
  const wrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.reply}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  const headerContent = (
    <div>
      <div>
        <p>
          {LOCALIZE.emibTest.inboxPage.emailResponse.description}
          <>
            <span className="fas fa-reply" />
            <span>{LOCALIZE.emibTest.inboxPage.emailResponse.responseType.reply}</span>
          </>
        </p>
        <p>
          <span className="font-weight-bold">
            {LOCALIZE.emibTest.inboxPage.emailResponse.to}&nbsp;
          </span>
          <span>to</span>
        </p>
        <p>
          <span className="font-weight-bold">
            {LOCALIZE.emibTest.inboxPage.emailResponse.cc}&nbsp;
          </span>
          <span>cc</span>
        </p>
      </div>
    </div>
  );

  expect(wrapper.containsMatchingElement(headerContent)).toEqual(true);
});

it("renders email's response", () => {
  const wrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.reply}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  const responseContent = (
    <div>
      <div>
        <p>{LOCALIZE.emibTest.inboxPage.emailResponse.response}</p>
        <p>response</p>
      </div>
    </div>
  );

  expect(wrapper.containsMatchingElement(responseContent)).toEqual(true);
});

it("renders email's reasons for action", () => {
  const wrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.reply}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  const reasonsForActionContent = (
    <div>
      <div>
        <p>{LOCALIZE.emibTest.inboxPage.emailResponse.reasonsForAction}</p>
        <p>reasons</p>
      </div>
    </div>
  );

  expect(wrapper.containsMatchingElement(reasonsForActionContent)).toEqual(true);
});

it("renders email's buttons", () => {
  const wrapper = shallow(
    <ResponseItem
      responseType={RESPONSE_TYPE.reply}
      to={"to"}
      cc={"cc"}
      response={"response"}
      reasonsForAction={"reasons"}
    />
  );

  const buttonZoneContent = (
    <div>
      <button className="btn btn-primary">
        {LOCALIZE.emibTest.inboxPage.emailResponse.editButton}
      </button>
      <button className="btn btn-danger">
        {LOCALIZE.emibTest.inboxPage.emailResponse.deleteButton}
      </button>
    </div>
  );

  expect(wrapper.containsMatchingElement(buttonZoneContent)).toEqual(true);
});
