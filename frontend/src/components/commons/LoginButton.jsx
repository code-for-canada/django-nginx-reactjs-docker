import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { logoutAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PATH } from "../../App";
import { Nav } from "react-bootstrap";

const styles = {
  button: {
    marginRight: 15
  },
  navlink: {
    all: "unset"
  }
};

class LoginButton extends Component {
  static propTypes = {
    // Props from Redux
    authenticated: PropTypes.bool,
    logoutAction: PropTypes.func
  };

  handleLogout = () => {
    this.props.logoutAction();
  };

  render() {
    return (
      <div>
        {!this.props.authenticated && (
          <Nav.Link tabIndex="-1" href={PATH.login} style={styles.navlink}>
            {window.location.pathname !== PATH.login && (
              <button className="btn btn-primary" style={styles.button}>
                {LOCALIZE.commons.login}
              </button>
            )}
          </Nav.Link>
        )}
        {this.props.authenticated && (
          <Nav.Link tabIndex="-1" href={PATH.login} style={styles.navlink}>
            <button
              type="button"
              className="btn btn-primary"
              style={styles.button}
              onClick={this.handleLogout}
            >
              {LOCALIZE.commons.logout}
            </button>
          </Nav.Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authenticated: state.login.authenticated
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logoutAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);
