import React, { Component } from "react";
import PropTypes from "prop-types";
import Background from "./Background";
import Inbox from "./Inbox";
import LOCALIZE from "../../text_resources";
import InTestInstructions from "./InTestInstructions";
import Notepad from "../commons/Notepad";
import { Helmet } from "react-helmet";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

const styles = {
  container: {
    maxWidth: 1400,
    minWidth: 900,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    margin: "0px auto"
  },
  notepad: {
    paddingLeft: 0
  }
};

class EmibTabs extends Component {
  static propTypes = {
    currentTab: PropTypes.string.isRequired,
    switchTab: PropTypes.func.isRequired,
    /* used to disable specific tabs
    disabledTabsArray={[1, 2]} will disable the second and third tabs
    disabledTabsArray={[]} will keep all the tabs enabled */
    disabledTabsArray: PropTypes.array
  };

  render() {
    let TABS = [
      {
        key: "instructions",
        tabName: LOCALIZE.emibTest.tabs.instructionsTabTitle,
        body: <InTestInstructions />
      },
      {
        key: "background",
        tabName: LOCALIZE.emibTest.tabs.backgroundTabTitle,
        body: <Background />
      },
      {
        key: "inbox",
        tabName: LOCALIZE.emibTest.tabs.inboxTabTitle,
        body: <Inbox />
      }
    ];

    // Hide disabled tabs.
    TABS = TABS.filter((tab, index) => {
      return !(this.props.disabledTabsArray.indexOf(index) > -1);
    });
    return (
      <div style={styles.container}>
        <Helmet>
          <title>{LOCALIZE.titles.simulation}</title>
        </Helmet>
        <Container>
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="instructions"
                id="emib-tabs"
                activeKey={this.props.currentTab}
                onSelect={key => this.props.switchTab(key)}
              >
                {TABS.map((tab, index) => {
                  return (
                    <Tab key={index} eventKey={tab.key} title={tab.tabName}>
                      {tab.body}
                    </Tab>
                  );
                })}
              </Tabs>
            </Col>
            <Col md="auto" style={styles.notepad}>
              <Notepad />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EmibTabs;
