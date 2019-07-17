import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../eMIB/constants";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";

const BODY_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`;

let EVENT_KEYS = [];

const styles = {
  bodyContent: {
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: BODY_HEIGHT,
    textAlign: "left"
  },
  nav: {
    marginTop: 10,
    marginLeft: 10
  },
  tabContainer: {
    overflowY: "scroll"
  }
};

class SideNavigation extends Component {
  static propTypes = {
    startIndex: PropTypes.number.isRequired,
    specs: PropTypes.arrayOf(
      PropTypes.shape({
        menuString: PropTypes.string,
        body: PropTypes.object
      })
    ).isRequired
  };

  /* populating the event keys
  Instructions: from index 1 to index 10
  Background: from index 11 to index 20*/
  populateEventKeys = () => {
    for (let i = 1; i <= 20; i++) {
      EVENT_KEYS.push(`event_key_${i}`);
    }
  };

  componentWillMount = () => {
    this.populateEventKeys();
    // if background tab is rendered
    if (this.props.startIndex === 10) {
      // focusing on side navigation items of background tab
      document.getElementById("navigation-items-section").focus();
    }
  };

  render() {
    const { startIndex, specs } = this.props;
    return (
      <Tab.Container id="left-tabs-navigation" defaultActiveKey={EVENT_KEYS[startIndex]}>
        <Row>
          <Col role="region" aria-label={LOCALIZE.ariaLabel.sideNavigationSections} sm={3}>
            <Nav role="navigation" variant="pills" className="flex-column" style={styles.nav}>
              <div id="navigation-items-section" tabIndex={-1}>
                {specs.map((item, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={EVENT_KEYS[index + startIndex]}>
                        {specs[index].menuString}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </div>
            </Nav>
          </Col>
          <Col
            role="region"
            aria-label={LOCALIZE.ariaLabel.sideNavigationSectionContent}
            sm={9}
            style={styles.tabContainer}
          >
            <Tab.Content tabIndex={0}>
              {specs.map((item, index) => {
                return (
                  <Tab.Pane key={index} eventKey={EVENT_KEYS[index + startIndex]}>
                    <div style={styles.bodyContent}>{specs[index].body}</div>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default SideNavigation;
