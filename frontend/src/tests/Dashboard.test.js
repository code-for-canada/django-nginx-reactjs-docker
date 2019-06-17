import React from "react";
import { shallow } from "enzyme";
import { UnconnectedDashboard } from "../Dashboard";
import LOCALIZE from "../text_resources";

describe("renders title and description", () => {
  const wrapper = shallow(
    <UnconnectedDashboard
      getUserInformation={jest.fn(() => {
        return Promise.reject();
      })}
    />
  );
  it("renders title", () => {
    const title = <h1>{LOCALIZE.formatString(LOCALIZE.dashboard.title, "", "")}</h1>;
    expect(wrapper.containsMatchingElement(title)).toEqual(true);
  });

  it("renders description", () => {
    const description = <p>{LOCALIZE.dashboard.description}</p>;
    expect(wrapper.contains(description)).toEqual(true);
  });
});
