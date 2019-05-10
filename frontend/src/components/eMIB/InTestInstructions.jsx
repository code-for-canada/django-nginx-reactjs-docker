import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import TipsOnTest from "./TipsOnTest";
import TestInstructions from "./TestInstructions";
import Evaluation from "./Evaluation";
import SideNavigation from "./SideNavigation";

//Returns array where each item indicates specifications related to How To Page including the title and the body
const getInstructionContent = () => {
  return [
    {
      menuString: LOCALIZE.emibTest.howToPage.testInstructions.title,
      body: <TestInstructions />
    },
    { menuString: LOCALIZE.emibTest.howToPage.tipsOnTest.title, body: <TipsOnTest /> },
    { menuString: LOCALIZE.emibTest.howToPage.evaluation.title, body: <Evaluation /> }
  ];
};

class InTestInstructions extends Component {
  render() {
    const specs = getInstructionContent();
    return <SideNavigation specs={specs} />;
  }
}

export default InTestInstructions;
