import React, { Component } from "react";
import PropTypes from "prop-types";
import LOCALIZE from "../../text_resources";
import { logoutAction } from "../../modules/LoginRedux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PATH } from "../../App";

const styles = {
  navlink: {
    marginRight: 15
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
          <div>
            {window.location.pathname !== PATH.login && (
              <a tabIndex="-1" href={PATH.login} style={styles.navlink}>
                <button className="btn btn-primary">{LOCALIZE.commons.login}</button>
              </a>
            )}
          </div>
        )}
        {this.props.authenticated && (
          <a tabIndex="-1" href={PATH.login} style={styles.navlink}>
            <button type="button" className="btn btn-primary" onClick={this.handleLogout}>
              {LOCALIZE.commons.logout}
            </button>
          </a>
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
