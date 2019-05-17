import React from "react";
import { shallow } from "enzyme";
import { UnconnectedHome as Home } from "../Home";
import LOCALIZE from "../text_resources";
import Dashboard from "../Dashboard";

it("renders home page title if not authenticated", () => {
  const wrapper = shallow(<Home authenticated={false} />);
  const homePageTitle = <h1>{LOCALIZE.homePage.title}</h1>;
  expect(wrapper.containsMatchingElement(homePageTitle)).toEqual(true);
});

it("renders dashboard component if authenticated", () => {
  const wrapper = shallow(<Home authenticated={true} />);
  const dashboardComponent = <Dashboard />;
  expect(wrapper.containsMatchingElement(dashboardComponent)).toEqual(true);
});
