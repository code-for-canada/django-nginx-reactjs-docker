import React, { Component } from 'react';
import { Jumbotron, Button, Panel } from 'react-bootstrap';
import StatusCheck from './components/status/StatusCheck.jsx';
import SystemCheck from './components/status/SystemCheck.jsx';
import detectBrowser from './helpers/detectBrowser';
import getIeVersion from './helpers/getIeVersion';
import getScreenResolution from './helpers/getScreenResolution';
import logo from './logo.png';

const styles = {
  container: {
    width: '50%',
    margin: '0 auto',
  },
  panel: {
    padding: 0,
  },
  table: {
    width: '100%',
  },
  td: {
    border: '0.5px solid #dddddd',
  },
  logo: {
    margin: 20,
    width: 30,
    height: 30,
  },
};

const headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

// Valid browser other than IE
const VALID_BROWSERS = ['chrome', 'firefox'];
const IE_STRING = 'IE';

const BROWSER_STRING = detectBrowser();
const IE_VERSION = getIeVersion();

const SCREEN_RESOLUTION = getScreenResolution();
const SCREEN_HEIGHT = SCREEN_RESOLUTION[0];
const SCREEN_WIDTH = SCREEN_RESOLUTION[1];

// This component is intended for internal use only and does not use styles or
// components of public facing CAT system.
class Status extends Component {
  componentWillMount() {
    this.checkBackend();
    this.checkDatabase();
    this.checkJavascriptEnabled();
    this.validateBrowser();
    this.checkResolution();
  }

  /* Front end is always running successfully if this page loads so it will always be true */
  state = {
    backendStatus: false,
    databaseStatus: false,
    frontendStatus: true,
    javascriptStatus: false,
    browserStatus: false,
    screenResolutionStatus: false,
  }

  checkBackend = async () => {
    const test = await fetch('http://localhost:80/api/', {
      method: 'GET',
      headers,
      cache: 'default',
    });
    const testJson = await test.json();
    if (testJson && testJson.status) {
      this.setState({ backendStatus: true });
    }
  }

  checkDatabase = () => {
    // TODO(caleybrock): expose an endpoint to check database.
    this.setState({ databaseStatus: false });
  }

  // You must have JavaScript enabled to be able to run the app at all
  checkJavascriptEnabled = () => {
    if (<script type="javascript"></script>) {
      this.setState({ javascriptStatus: true });
    }
  }

  // Validates that the browser is IE 9+, Chrome or Firefox
  // TODO(fnormand): test with IE 8 and make sure it fails
  validateBrowser = () => {
    if (BROWSER_STRING === IE_STRING) {
      if (IE_VERSION >= 9) {
        this.setState({ browserStatus: true });
      }
    } else if (VALID_BROWSERS.indexOf(BROWSER_STRING) >= 0) {
      this.setState({ browserStatus: true });
    }
  }

  // Validates that screen resolution is at least 800 x 600
  checkResolution = () => {
    if (SCREEN_WIDTH >= 800 && SCREEN_HEIGHT >= 600) {
      this.setState({ screenResolutionStatus: true });
    }
  }

  render() {
    return (
      <div style={styles.container}>
        <Jumbotron>
          <h1>CAT Status</h1>
          <p>
            Internal status page to quickly determine the status / health
            of the Compotency Assessment Tool.
          </p>
          <p>
            <a href="https://github.com/code-for-canada/project-thundercat">
              <Button bsStyle="primary">GitHub Repository</Button>
            </a>
            <img src={logo} className='App-logo' style={styles.logo} alt='logo' />
          </p>
        </Jumbotron>

        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Service Status</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <StatusCheck
              description={'Front end application built and serving successfully'}
              isPassing={this.state.frontendStatus}
            />
            <StatusCheck
              description={'Back end application completing API requests successfully'}
              isPassing={this.state.backendStatus}
            />
            <StatusCheck
              description={'Database check not currently setup'}
              isPassing={this.state.databaseStatus}
            />
          </Panel.Body>
        </Panel>
        <Panel style={styles.panel}>
          <Panel.Heading>
            <Panel.Title componentClass="h3">System Status</Panel.Title>
          </Panel.Heading>
          <Panel.Body style={styles.panel}>
            <table style={styles.table}>
              <tbody>
                <tr>
                  {this.state.javascriptStatus === true
                    && <td style={styles.td}>
                      <SystemCheck
                        description={'JavaScript'}
                        isPassing={this.state.javascriptStatus}
                        currentSettingsDetails={'(Enabled)'}
                      />
                    </td>}
                  {this.state.javascriptStatus === false
                     && <td style={styles.td}>
                       <SystemCheck
                         description={'JavaScript'}
                         isPassing={this.state.javascriptStatus}
                         currentSettingsDetails={'(Disabled)'}
                       />
                     </td>}
                </tr>
                <tr>
                  {BROWSER_STRING === IE_STRING
                    && <td style={styles.td}>
                      <SystemCheck
                        description={'IE 9+, Chrome, Firefox'}
                        isPassing={this.state.browserStatus}
                        currentSettingsDetails={`(${BROWSER_STRING} v${IE_VERSION})`}
                      />
                    </td>}
                  {BROWSER_STRING !== IE_STRING
                    && <td style={styles.td}>
                      <SystemCheck
                        description={'IE 9+, Chrome, Firefox'}
                        isPassing={this.state.browserStatus}
                        currentSettingsDetails={`(${BROWSER_STRING})`}
                      />
                    </td>}
                </tr>
                <tr>
                  <td style={styles.td}>
                    <SystemCheck
                      description={'Screen resolution minimum of 800 x 600'}
                      isPassing={this.state.screenResolutionStatus}
                      currentSettingsDetails={`(${SCREEN_WIDTH} X ${SCREEN_HEIGHT})`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default Status;
