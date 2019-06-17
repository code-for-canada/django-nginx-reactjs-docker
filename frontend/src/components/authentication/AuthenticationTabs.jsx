import React, { Component } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import LOCALIZE from "../../text_resources";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

const styles = {
  loginComponent: {
    maxWidth: 600,
    margin: "0 auto",
    position: "absolute",
    left: 0,
    right: 0
  },
  row: {
    position: "relative"
  },
  bottomMargin: {
    marginBottom: 32
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
              <div style={styles.bottomMargin}>
                <Tabs defaultActiveKey="login" id="login-tabs">
                  {TABS.map((tab, index) => {
                    return (
                      <Tab key={index} eventKey={tab.key} title={tab.tabName}>
                        {tab.body}
                      </Tab>
                    );
                  })}
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AuthenticationTabs;
