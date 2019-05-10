import React, { Component } from "react";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../eMIB/constants";
import PropTypes from "prop-types";

const BODY_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`;

const EVENT_KEYS = ["first", "second", "third", "fourth"];

const styles = {
  bodyContent: {
    overflow: "auto",
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    height: BODY_HEIGHT,
    textAlign: "left"
  },
  nav: {
    marginTop: 10,
    marginLeft: 10
  }
};

class SideNavigation extends Component {
  static propTypes = {
    specs: PropTypes.arrayOf(
      PropTypes.shape({
        menuString: PropTypes.string,
        body: PropTypes.object
      })
    ).isRequired
  };

  render() {
    const { specs } = this.props;
    return (
      <Tab.Container id="left-tabs-navigation" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column" style={styles.nav}>
              {specs.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={EVENT_KEYS[index]}>{specs[index].menuString}</Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {specs.map((item, index) => {
                return (
                  <Tab.Pane key={index} eventKey={EVENT_KEYS[index]}>
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
