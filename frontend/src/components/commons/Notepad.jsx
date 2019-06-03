import React, { Component } from "react";
import LOCALIZE from "../../text_resources";
import TextareaAutosize from "react-textarea-autosize";
import "../../css/emib-tabs.css";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "../eMIB/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const NOTEPAD_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT - 5}px)`;
const SECTION_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT + 40}px)`;

const styles = {
  windowPadding: {
    maxWidth: 300,
    marginTop: 38
  },
  label: {
    textAlign: "left",
    float: "left",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#00565e"
  },
  hideNotepadBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    float: "right"
  },
  hideNotepadBtnIcon: {
    paddingRight: 5
  },
  headerSection: {
    borderBottom: "1.5px solid #88C800",
    width: "100%",
    padding: "8px 12px",
    height: 40
  },
  content: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00565e",
    minWidth: 300,
    height: NOTEPAD_HEIGHT
  },
  hiddenContent: {
    width: 50
  },
  notepadSection: {
    overflow: "auto",
    width: "100%",
    height: SECTION_HEIGHT
  },
  textArea: {
    padding: "6px 12px",
    width: "100%",
    resize: "none",
    border: "none"
  },
  openNotepadBtn: {
    width: 60,
    height: NOTEPAD_HEIGHT,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    cursor: "pointer",
    whiteSpace: "normal",
    padding: 8,
    backgroundColor: "#00565e",
    borderColor: "#00565e"
  },
  openText: {
    color: "#FFFFFF"
  }
};

class Notepad extends Component {
  state = {
    notepadHidden: false,
    notepadContent: ""
  };

  toggleNotepad = () => {
    this.setState({ notepadHidden: !this.state.notepadHidden });
  };

  handleNotepadContent = event => {
    this.setState({ notepadContent: event.target.value });
  };

  render() {
    const { notepadHidden } = this.state;
    return (
      <div style={styles.windowPadding}>
        <div style={notepadHidden ? styles.hiddenContent : styles.content}>
          <div style={notepadHidden ? {} : styles.headerSection}>
            {!notepadHidden && (
              <div style={styles.label}>
                <label htmlFor={"text-area-notepad"}>
                  {LOCALIZE.commons.notepad.title.toUpperCase()}
                </label>
              </div>
            )}
            <button
              id="notepad-button"
              onClick={this.toggleNotepad}
              style={notepadHidden ? styles.openNotepadBtn : styles.hideNotepadBtn}
            >
              {!notepadHidden && (
                <span>
                  <FontAwesomeIcon style={styles.hideNotepadBtnIcon} icon={faMinusCircle} />
                  {LOCALIZE.commons.notepad.hideButton}
                </span>
              )}
              {notepadHidden && (
                <span style={styles.openText}>
                  <FontAwesomeIcon style={styles.hideNotepadBtnIcon} icon={faPlusCircle} />
                  {LOCALIZE.commons.notepad.openButton}
                </span>
              )}
            </button>
          </div>
          {!notepadHidden && (
            <div style={styles.notepadSection}>
              <TextareaAutosize
                id="text-area-notepad"
                maxLength="3000"
                className="text-area"
                style={styles.textArea}
                cols="45"
                minRows={16}
                placeholder={LOCALIZE.commons.notepad.placeholder}
                value={this.state.notepadContent}
                onChange={this.handleNotepadContent}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Notepad;
