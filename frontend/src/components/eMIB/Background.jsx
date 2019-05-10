import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import TeamInformation from "./TeamInformation";
import BackgroundInformation from "./BackgroundInformation";
import OrganizationalInformation from "./OrganizationalInformation";
import OrganizationalStructure from "./OrganizationalStructure";
import SideNavigation from "./SideNavigation";

export const getInstructionContent = () => {
  return [
    {
      menuString: LOCALIZE.emibTest.background.backgroundInformation.title,
      body: <BackgroundInformation />
    },
    {
      menuString: LOCALIZE.emibTest.background.organizationalInformation.title,
      body: <OrganizationalInformation />
    },
    {
      menuString: LOCALIZE.emibTest.background.organizationalStructure.title,
      body: <OrganizationalStructure />
    },
    {
      menuString: LOCALIZE.emibTest.background.teamInformation.title,
      body: <TeamInformation />
    }
  ];
};

class Background extends Component {
  render() {
    const specs = getInstructionContent();
    return <SideNavigation specs={specs} />;
  }
}

export default Background;
