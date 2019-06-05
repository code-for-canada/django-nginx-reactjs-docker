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
              <h3>Zoom (+/-)</h3>
              <ol>
                <li>Select the View button at the top left bar in Internet Explorer</li>
                <li>Select Zoom.</li>
                <li>
                  You can select a predefined zoom level, or a custom level by selecting Custom and
                  entering a zoom value.
                </li>
                <li>
                  Alternatively, you can hold down CTRL and the + / - keys on your keyboard to zoom
                  in or out.
                </li>
              </ol>
              <h3>Text size</h3>
              <ol>
                <li>Select the View button at the top left bar in Internet Explorer</li>
                <li>Select Text size.</li>
                <li>Choose to make text larger or smaller than the size on the screen.</li>
              </ol>
              If the text size has not changed:
              <ol>
                <li>
                  Select the Tools button, and select General tab, and then, under Appearance,
                  select Accessibility.
                </li>
                <li>Select the Ignore font sizes specified on webpages on the check box.</li>
                <li>Select OK, and then select OK again.</li>
              </ol>
              <h3>Font style</h3>
              <ol>
                <li>Select the Tools button at the top left bar in Internet Explorer.</li>
                <li>Select Internet options.</li>
                <li>In the General tab, under Appearance, select Accessibility. </li>
                <li>Select the Ignore font styles specified on webpages on the check box. </li>
                <li>Select OK.</li>
                <li>In the General tab, under Appearance, select Fonts.</li>
                <li>Select the fonts you want to use.</li>
                <li>Select OK, and then select OK again.</li>
              </ol>
              <h3>Text and background colour</h3>
              <ol>
                <li>Select the Tools button and select Internet options.</li>
                <li>In the General tab, under Appearance, select Accessibility. </li>
                <li>Select the Ignore colors specified on webpages on the check box. </li>
                <li>Select OK.</li>
                <li>In the General tab, under Appearance, select Colors.</li>
                <li>Uncheck the Use Windows colors check box.</li>
                <li>
                  For each color that you want to change, select the color box, select a new color,
                  and then select OK.
                </li>
                <li>Select OK, and then select OK again.</li>
              </ol>
            </div>
          }
          rightButtonType={BUTTON_TYPE.primary}
          rightButtonTitle={LOCALIZE.settings.okay}
          rightButtonAction={this.toggleDialog}
        />
      </div>
    );
  }
}

export default Settings;
