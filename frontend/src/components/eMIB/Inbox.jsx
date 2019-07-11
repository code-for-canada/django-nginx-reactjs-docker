import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import EmailPreview from "./EmailPreview";
import Email from "./Email";
import "../../css/inbox.css";
import { HEADER_HEIGHT, FOOTER_HEIGHT, emailShape } from "./constants";
import { readEmail, changeCurrentEmail } from "../../modules/EmibInboxRedux";
import { Tab, Row, Col, Nav } from "react-bootstrap";

const INBOX_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`;

const styles = {
  bodyContent: {
    height: INBOX_HEIGHT
  },
  contentColumn: {
    paddingLeft: 0,
    overflowY: "scroll"
  },
  navIntemContainer: {
    width: "100%",
    height: INBOX_HEIGHT,
    overflow: "auto"
  },
  navItem: {
    width: "100%"
  },
  navLink: {
    padding: 0
  }
};

const EVENT_KEYS = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eigth",
  "nineth",
  "tenth"
];

class Inbox extends Component {
  static propTypes = {
    // Provided by redux
    emails: PropTypes.arrayOf(emailShape),
    emailSummaries: PropTypes.array.isRequired,
    currentEmail: PropTypes.number.isRequired,
    readEmail: PropTypes.func.isRequired,
    changeCurrentEmail: PropTypes.func.isRequired
  };

  changeEmail = eventKey => {
    const index = EVENT_KEYS.indexOf(eventKey);
    this.props.readEmail(this.props.currentEmail);
    this.props.changeCurrentEmail(index);
  };

  render() {
    const { emails, emailSummaries } = this.props;
    return (
      <div>
        <Tab.Container id="inbox-tabs" defaultActiveKey="first" onSelect={this.changeEmail}>
          <Row>
            <Col role="complementary" sm={4}>
              <Nav className="flex-column">
                <div style={styles.navIntemContainer}>
                  {emails.map((email, index) => (
                    <Nav.Item key={index} style={styles.navItem}>
                      <Nav.Link eventKey={EVENT_KEYS[index]} style={styles.navLink}>
                        <EmailPreview
                          email={email}
                          isRead={this.props.emailSummaries[index].isRead}
                          isRepliedTo={
                            emailSummaries[index].emailCount + emailSummaries[index].taskCount > 0
                          }
                          isSelected={index === this.props.currentEmail}
                        />
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </div>
              </Nav>
            </Col>
            <Col sm={8} tabIndex={0} style={styles.contentColumn}>
              <Tab.Content style={styles.bodyContent}>
                {emails.map((email, index) => (
                  <Tab.Pane eventKey={EVENT_KEYS[index]} key={index}>
                    <Email
                      email={email}
                      emailCount={emailSummaries[this.props.currentEmail].emailCount}
                      taskCount={emailSummaries[this.props.currentEmail].taskCount}
                    />
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

export { Inbox as UnconnectedInbox };
const mapStateToProps = (state, ownProps) => {
  return {
    emails: state.emibInbox.emails,
    emailSummaries: state.emibInbox.emailSummaries,
    currentEmail: state.emibInbox.currentEmail
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      readEmail,
      changeCurrentEmail
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inbox);
