import React from "react";
import { mount } from "enzyme";
import SystemMessage, {
  MESSAGE_TYPE,
  CLASS_NAME,
  styles
} from "../../../components/commons/SystemMessage";
import { faTimesCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

it("renders warning message", () => {
  const wrapper = mount(
    <SystemMessage messageType={MESSAGE_TYPE.warning} title={"title"} message={"message"} />
  );
  const warningAlertClassName = "alert-icon alert-warning";
  const warningIconClassName = faExclamationCircle;
  const title = <h5 style={styles.h5}>title</h5>;
  const message = <p>message</p>;
  expect(warningAlertClassName === CLASS_NAME.alert).toEqual(true);
  expect(warningIconClassName === CLASS_NAME.icon).toEqual(true);
  expect(wrapper.contains(title)).toEqual(true);
  expect(wrapper.contains(message)).toEqual(true);
});

it("renders default message (warning)", () => {
  const wrapper = mount(
    <SystemMessage messageType={"hello world"} title={"title"} message={"message"} />
  );
  const warningAlertClassName = "alert-icon alert-warning";
  const warningIconClassName = faExclamationCircle;
  const title = <h5 style={styles.h5}>title</h5>;
  const message = <p>message</p>;
  expect(warningAlertClassName === CLASS_NAME.alert).toEqual(true);
  expect(warningIconClassName === CLASS_NAME.icon).toEqual(true);
  expect(wrapper.contains(title)).toEqual(true);
  expect(wrapper.contains(message)).toEqual(true);
});

it("renders error message", () => {
  const wrapper = mount(
    <SystemMessage messageType={MESSAGE_TYPE.error} title={"title"} message={"message"} />
  );
  const errorAlertClassName = "alert-icon alert-danger";
  const errorIconClassName = faTimesCircle;
  const title = <h5 style={styles.h5}>title</h5>;
  const message = <p>message</p>;
  expect(errorAlertClassName === CLASS_NAME.alert).toEqual(true);
  expect(errorIconClassName === CLASS_NAME.icon).toEqual(true);
  expect(wrapper.contains(title)).toEqual(true);
  expect(wrapper.contains(message)).toEqual(true);
});
