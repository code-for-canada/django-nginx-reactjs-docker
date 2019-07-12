import React from "react";
import PropTypes from "prop-types";
import mini_banner from "./../../images/mini_banner.png";

const styles = {
  container: {
    maxWidth: 1140,
    margin: "0px auto",
    textAlign: "left",
    paddingTop: 20
  },
  banner: {
    width: "100%"
  }
};

// Manages displaying content within correct width and with a banner.
// Should be used whenever adding a new view to CAT.
const ContentContainer = props => {
  return (
    <div role="main">
      {!props.hideBanner && (
        <img role="presentation" src={mini_banner} alt="" style={styles.banner} />
      )}
      <div role="complementary" style={styles.container}>
        {props.children}
      </div>
    </div>
  );
};

ContentContainer.propTypes = {
  children: PropTypes.node,
  hideBanner: PropTypes.bool
};

export default ContentContainer;
