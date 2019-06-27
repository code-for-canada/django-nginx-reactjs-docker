import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import PopupBox, { BUTTON_TYPE } from "../commons/PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import LOCALIZE from "../../text_resources";

const styles = {
  button: {
    marginRight: 15
  }
};

class Settings extends Component {
  state = {
    isDialogOpen: false
  };

  static propTypes = {
    variant: PropTypes.string
  };

  toggleDialog = () => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  };

  render() {
    return (
      <div>
        <Button
          style={styles.button}
          variant={this.props.variant}
          onClick={this.toggleDialog}
          aria-label={LOCALIZE.settings.systemSettings}
        >
          <FontAwesomeIcon icon={faCog} />
        </Button>
        <PopupBox
          show={this.state.isDialogOpen}
          handleClose={this.toggleDialog}
          title={LOCALIZE.settings.systemSettings}
          description={
            <div>
              <h3>{LOCALIZE.settings.zoom.title}</h3>
              <ol>
                <li>{LOCALIZE.settings.zoom.instructionsListItem1}</li>
                <li>{LOCALIZE.settings.zoom.instructionsListItem2}</li>
                <li>{LOCALIZE.settings.zoom.instructionsListItem3}</li>
                <li>{LOCALIZE.settings.zoom.instructionsListItem4}</li>
              </ol>
              <h3>{LOCALIZE.settings.textSize.title}</h3>
              <ol>
                <li>{LOCALIZE.settings.textSize.instructionsListItem1}</li>
                <li>{LOCALIZE.settings.textSize.instructionsListItem2}</li>
                <li>{LOCALIZE.settings.textSize.instructionsListItem3}</li>
              </ol>
              {LOCALIZE.settings.textSize.notChanged}
              <ol>
                <li>{LOCALIZE.settings.textSize.instructionsListItem4}</li>
                <li>{LOCALIZE.settings.textSize.instructionsListItem5}</li>
                <li>{LOCALIZE.settings.textSize.instructionsListItem6}</li>
              </ol>
              <h3>{LOCALIZE.settings.fontStyle.title}</h3>
              <ol>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem1}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem2}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem3}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem4}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem5}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem6}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem7}</li>
                <li>{LOCALIZE.settings.fontStyle.instructionsListItem8}</li>
              </ol>
              <h3>{LOCALIZE.settings.color.title}</h3>
              <ol>
                <li>{LOCALIZE.settings.color.instructionsListItem1}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem2}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem3}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem4}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem5}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem6}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem7}</li>
                <li>{LOCALIZE.settings.color.instructionsListItem8}</li>
              </ol>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.commons.close}
          rightButtonAction={this.toggleDialog}
        />
      </div>
    );
  }
}

export default Settings;
