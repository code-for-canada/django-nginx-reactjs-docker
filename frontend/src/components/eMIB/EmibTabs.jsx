import React, { Component } from "react";
import Background from "./Background";
import Inbox from "./Inbox";
import LOCALIZE from "../../text_resources";
import TabNavigation from "../commons/TabNavigation";
import InTestInstructions from "./InTestInstructions";
import Notepad from "../commons/Notepad";
import "../../css/emib-tabs.css";

const styles = {
  container: {
    maxWidth: 1400,
    minWidth: 900,
    margin: "0px auto",
    paddingTop: 20,
    display: "flex",
    paddingRight: 20,
    paddingLeft: 20
  },
  tabNavigation: {
    height: "calc(100vh - 241px)",
    backgroundColor: "white",
    borderWidth: "1px 1px 0 1px",
    borderStyle: "solid",
    borderColor: "#00565e",
    borderTopColor: "white"
  }
};

class EmibTabs extends Component {
  render() {
    const TABS = [
      {
        id: 0,
        tabName: LOCALIZE.emibTest.tabs.instructionsTabTitle,
        body: <InTestInstructions />
      },
      {
        id: 1,
        tabName: LOCALIZE.emibTest.tabs.backgroundTabTitle,
        body: <Background />
      },
      {
        id: 2,
        tabName: LOCALIZE.emibTest.tabs.inboxTabTitle,
        body: <Inbox />
      }
    ];
    return (
      <div style={styles.container}>
        <TabNavigation
          tabSpecs={TABS}
          currentTab={1}
          menuName={LOCALIZE.ariaLabel.tabMenu}
          style={styles.tabNavigation}
        />
        <Notepad />
      </div>
    );
  }
}

export default EmibTabs;
