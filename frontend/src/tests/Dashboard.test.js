import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";
import LOCALIZE from "../text_resources";

describe("renders title and description", () => {
  localStorage.setItem("first_name", "Hello");
  localStorage.setItem("last_name", "World");
  it("renders title", () => {
    const wrapper = shallow(<Dashboard />);
    const title = (
      <h1>
        {LOCALIZE.formatString(
          LOCALIZE.dashboard.title,
          localStorage.first_name,
          localStorage.last_name
        )}
      </h1>
    );
    expect(wrapper.containsMatchingElement(title)).toEqual(true);
  });

  it("renders description", () => {
    const wrapper = shallow(<Dashboard />);
    const description = <p>{LOCALIZE.dashboard.description}</p>;
    expect(wrapper.contains(description)).toEqual(true);
  });
});
