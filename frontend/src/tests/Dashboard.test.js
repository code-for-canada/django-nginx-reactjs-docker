import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";
import LOCALIZE from "../text_resources";

describe("renders title and description", () => {
  it("renders title", () => {
    const wrapper = shallow(<Dashboard />);
    const title = <h1>{LOCALIZE.dashboard.title}</h1>;
    expect(wrapper.containsMatchingElement(title)).toEqual(true);
  });

  it("renders description", () => {
    const wrapper = shallow(<Dashboard />);
    const description = <p>{LOCALIZE.dashboard.description}</p>;
    expect(wrapper.contains(description)).toEqual(true);
  });
});
