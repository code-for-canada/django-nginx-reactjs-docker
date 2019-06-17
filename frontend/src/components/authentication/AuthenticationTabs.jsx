import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import LOCALIZE from "../../text_resources";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

const styles = {
  loginComponent: {
    maxWidth: 600,
    marginBottom: 32
  },
  row: {
    display: "table",
    margin: "0 auto"
  }
};

class AuthenticationTabs extends Component {
  render() {
    const TABS = [
      {
        key: "login",
        tabName: LOCALIZE.authentication.login.title,
        body: <LoginForm />
      },
      {
        key: "account",
        tabName: LOCALIZE.authentication.createAccount.title,
        body: <RegistrationForm />
      }
    ];
    return (
      <div>
        <Container>
          <Row style={styles.row}>
            <Col style={styles.loginComponent}>
              <Tabs defaultActiveKey="login" id="login-tabs">
                {TABS.map((tab, index) => {
                  return (
                    <Tab key={index} eventKey={tab.key} title={tab.tabName}>
                      {tab.body}
                    </Tab>
                  );
                })}
              </Tabs>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AuthenticationTabs;
