import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/lib/tree.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Largely based on src/js/aria.js (https://github.com/psw58/aria-tree-react/blob/master/src/js/aria.jsx)
// From aria-tree-react project (https://github.com/psw58/aria-tree-react)

// The structure of a node in a treeview
export const treeNodeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  parent: PropTypes.number,
  groups: PropTypes.arrayOf(PropTypes.number),
  level: PropTypes.number.isRequired
});

//Could not store this in state
// onFocus and onBlur are automatically called when focus is move to a node
// this.state.<x> = <y> causes warnings in the console (state should be changed by this.setState)
// <x> is not updated by the time onBlur and onFocus are called, so they update the wrong node
//currently have to use a global variabel to track this value
let focusedNodeId = 0;

//Recursive tree building component. for each
class TreeNode extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(treeNodeShape).isRequired
  };

  state = {
    nodes: this.transformNodes(this.props.nodes)
  };

  // Added by Michael to auto-fill fields
  // with default values to prevent user error
  transformNodes(originalNodes) {
    let nodes = [];
    let tabIndex = 0;
    for (let node of originalNodes) {
      if (node.level === 1) {
        node.tabIndex = tabIndex;
        tabIndex += 1;
        node.visable = true;
      } else {
        node.tabIndex = -1;
        node.visable = false;
      }

      if (node.groups) {
        node.expanded = true;
      }

      //TODO auto generate:
      // - groups: child adds its own id to the parent's group
      // - level: parent sets child.level=parent.level+1
      node.focus = false;
      nodes.push(node);
    }
    return nodes;
  }

  // reset to 0 when component is re-mounted
  // prevents issue when switching form a larger org chart to a smaller one
  componentWillMount() {
    focusedNodeId = 0;
  }

  onClickEvent(event) {
    let nodes = this.state.nodes;
    //@TODO if this element does not have focus give it focus
    const oldID = focusedNodeId;
    //get the id of the element from the data set
    if (event.target.dataset.id) {
      focusedNodeId = parseInt(event.target.dataset.id);
    }
    //clicked a childs span element not a node
    if (event.target.id === "span" + focusedNodeId) {
      nodes[focusedNodeId].expanded = !nodes[focusedNodeId].expanded;
    }
    this.setNodeVisibleState(focusedNodeId);
    this.setState({ nodes: nodes });
    this.moveFocus(oldID, focusedNodeId);
  }

  setNodeVisibleState(stateID) {
    const myID = stateID;
    let nodes = this.state.nodes;
    if ("groups" in nodes[myID]) {
      nodes[myID].groups.forEach(element => {
        if (nodes[myID].expanded) {
          //visable is true
          nodes[element].visable = true;
          //if the node is expanded set the children to visible
          if (nodes[element].groups && nodes[element].expanded) {
            nodes[element].groups.forEach(el => {
              nodes[el].visable = true;
            });
          }
        } else {
          //visible is false
          nodes[element].visable = false;
          //set child nodes to hiden
          if (nodes[element].groups && nodes[element].expanded) {
            nodes[element].groups.forEach(el => {
              nodes[el].visable = false;
            });
          }
        }
      });
    }
    this.setState({ nodes: nodes });
  }

  moveFocus(curID, nextID) {
    let nodes = this.state.nodes;
    //remove focus from old element
    nodes[curID].focus = false;
    nodes[curID].tabIndex = -1;
    //set focus to current elem
    nodes[nextID].focus = true;
    nodes[nextID].tabIndex = 0;
    this.setState({ nodes: nodes });
    this.refs[nextID].focus();
  }

  onFocusEvent(e) {
    let nodes = this.state.nodes;
    nodes[focusedNodeId].focus = true;
    nodes[focusedNodeId].tabIndex = 0;
    this.setState({ nodes: nodes });
  }

  onBlurEvent(e) {
    let nodes = this.state.nodes;
    nodes[focusedNodeId].focus = false;
    this.setState({ nodes: nodes });
  }

  findVisableInReverse(searchStart) {
    let id = focusedNodeId;
    //find closest visable item
    for (let i = searchStart; i >= 0; --i) {
      if (this.state.nodes[i].visable === true) {
        id = i;
        break;
      }
    }
    return id;
  }

  onKeyPressedEvent(e) {
    /* SPACE KEY: --------------------------------------------------
			activates a node, i.e., performs its default action. 
			For parent nodes, one possible default action is to open or close the node. 
			In single-select trees where selection does not follow focus (see https://www.w3.org/TR/wai-aria-practices-1.1/#issue-container-generatedID-27), 
			the default action is typically to select the focused node.
    */
    let nodes = this.state.nodes;
    const oldID = focusedNodeId;

    if (e.keyCode === 32) {
      if ("expanded" in nodes[oldID]) {
        e.preventDefault();
        nodes[oldID].expanded = !nodes[oldID].expanded;
        this.setNodeVisibleState(oldID);
      }
    } else {
      let i;
      let elem;
      switch (e.key) {
        /* ENTER KEY: --------------------------------------------------
					activates a node, i.e., performs its default action. 
					For parent nodes, one possible default action is to open or close the node. 
					In single-select trees where selection does not follow focus (see https://www.w3.org/TR/wai-aria-practices-1.1/#issue-container-generatedID-27), 
					the default action is typically to select the focused node.
				*/
        case "Enter":
          if ("expanded" in nodes[oldID]) {
            nodes[oldID].expanded = !nodes[oldID].expanded;
            this.setNodeVisibleState(oldID);
          }
          break;

        /* Down Arrow: ---------------------------------------------------
					Moves focus to the next node that is focusable without opening or closing a node.
				*/
        case "ArrowDown":
          //save id to remove focus from last element
          if (nodes.length > oldID + 1) {
            //find closest visable item
            for (i = oldID + 1; i < nodes.length; i++) {
              elem = nodes[i];
              if ("visable" in elem && elem.visable === true) {
                focusedNodeId = i;
                break;
              } else if (i === nodes.length - 1) {
                //no loops are found
                focusedNodeId = 0;
              }
            }
          } else {
            //your on last node loop back to begining node
            focusedNodeId = 0;
          }
          //set focus to this element
          this.moveFocus(oldID, focusedNodeId);
          break;

        /* Up Arrow: --------------------------------------------------------
					Moves focus to the previous node that is focusable without opening or closing a node.
				*/
        case "ArrowUp":
          //save id to remove focus from last element
          //update current target id
          //@TOD0 UPDATE THE TARGET ONLY IF ITS VISABLE
          if (oldID > 0) {
            //find closest visable item to current node
            focusedNodeId = this.findVisableInReverse(oldID - 1);
          } else {
            //loop back to begining node
            focusedNodeId = this.findVisableInReverse(nodes.length - 1);
          }
          this.moveFocus(oldID, focusedNodeId);
          break;

        /* Right arrow: ------------------------------------------------------
					When focus is on a closed node, opens the node; focus does not move.
					When focus is on a open node, moves focus to the first child node.
					When focus is on an end node, does nothing.	
				*/

        case "ArrowRight":
          //save id to remove focus from last element
          if (!("expanded" in nodes[oldID])) {
            //end node
          } else if (nodes[oldID].expanded === false) {
            //open the node
            nodes[oldID].expanded = true;
            this.setNodeVisibleState(oldID);
          } else {
            if ("groups" in nodes[oldID]) {
              //move to first group
              focusedNodeId = nodes[oldID].groups[0];
            }
          }

          this.moveFocus(oldID, focusedNodeId);
          break;

        /* Left arrow: --------------------------------------------------------
					When focus is on an open node, closes the node.
					When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
					When focus is on a root node that is also either an end node or a closed node, does nothing.
				*/
        case "ArrowLeft":
          //save id to remove focus from last element
          if (nodes[oldID].parent === undefined && nodes[oldID].expanded === false) {
            // When focus is on a root node that is also either an end node or a closed node, does nothing.
          } else if (nodes[oldID].expanded === true) {
            // When focus is on an open node, closes the node.
            nodes[oldID].expanded = false;
            this.setNodeVisibleState(oldID);
          } else {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            focusedNodeId = nodes[oldID].parent;
            this.setNodeVisibleState(focusedNodeId);
          }
          this.moveFocus(oldID, focusedNodeId);
          break;

        /* Home: ----------------------------------------------------------------
					Moves focus to the first node in the tree without opening or closing a node.
				*/
        case "Home":
          focusedNodeId = 0;
          this.moveFocus(oldID, focusedNodeId);
          break;

        /* End: ---------------------------------------------------------------------
					Moves focus to the last node in the tree that is focusable without opening a node.
				*/
        case "End":
          focusedNodeId = this.findVisableInReverse(nodes.length - 1);
          this.moveFocus(oldID, focusedNodeId);
          break;

        /* CHARACTER: -----------------------------------------------------------------
					Type-ahead is recommended for all trees, especially for trees with more than 7 root nodes:
					Type a character: 
						focus moves to the next node with a name that starts with the typed character.
					* multiple characters not supported
					* (Optional): Expands all siblings that are at the same level as the current node.
				*/

        case (e.key.match(/^[a-zA-Z]{1}$/) || {}).input:
          let found = false;
          //start search from current node
          for (i = oldID + 1; i < nodes.length; i++) {
            elem = nodes[i];
            if (
              "visable" in elem &&
              elem.visable === true &&
              e.key.toLowerCase() === elem.name[0].toLowerCase()
            ) {
              focusedNodeId = i;
              found = true;
              break;
            }
          }
          //if not found search from beginning
          if (!found) {
            for (i = 0; i < oldID + 1; i++) {
              elem = nodes[i];
              if (
                "visable" in elem &&
                elem.visable === true &&
                e.key.toLowerCase() === elem.name[0].toLowerCase()
              ) {
                focusedNodeId = i;
                found = true;
                break;
              }
            }
          }
          if (found) {
            this.moveFocus(oldID, focusedNodeId);
          }
          break;

        // DEFAULT: -------------------------------------------------------------------
        default:
      }
    }
    this.setState({ nodes: nodes });
  }

  //only supports tree nodes max - three levels deep
  render() {
    //get all root nodes
    let roots = this.state.nodes.filter((elem, i) => {
      //root elements have no parent
      if (elem.parent === undefined) {
        return true;
      } else {
        return false;
      }
    });

    return (
      <div style={{ minWidth: 700 }}>
        <ul
          role="tree"
          aria-labelledby="treeLabel"
          aria-describedby="kbd_desc"
          onClick={e => this.onClickEvent(e)}
          onFocus={e => this.onFocusEvent(e)}
          onBlur={e => this.onBlurEvent(e)}
          onKeyDown={e => this.onKeyPressedEvent(e)}
        >
          {/* start render root elements */}
          {roots.map((elem, i) => {
            return this.renderRoots(elem, i + 1, roots.length);
          })}
        </ul>
      </div>
    );
  }

  renderRoots(elem, pos, len) {
    return (
      <li
        role="treeitem"
        key={elem.id}
        aria-expanded={elem.expanded}
        tabIndex={elem.tabIndex}
        ref={elem.id}
        data-visable={elem.visable}
        data-id={elem.id}
        aria-setsize={len}
        aria-posinset={pos}
        aria-level={elem.level}
      >
        <span className={elem.focus ? "focus" : ""} id={"span" + elem.id} data-id={elem.id}>
          <span style={{ float: "left" }}>
            {elem.expanded ? (
              <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            )}
          </span>
          <span className="wrapper">
            <span className="inline title">{elem.name}</span>
          </span>
        </span>
        {/* this assumes all root nodes will have at least on group */}
        <ul role="group">
          {elem.groups.map((group, i) => this.renderElement(group, i + 1, elem.groups.length))}
        </ul>
      </li>
    );
  }

  //test to see what element to render ( li with ul ) or li
  renderElement(elem, pos, len) {
    if ("groups" in this.state.nodes[elem]) {
      return (
        //GROUP
        this.renderGroup(elem, pos, len)
      );
    } else {
      //GROUPITEM
      return this.renderItem(elem, pos, len);
    }
  }

  // render the liste element and its ul
  //does not support sub group rendering
  renderGroup(elem, pos, len) {
    return (
      <li
        role="treeitem"
        aria-expanded={this.state.nodes[elem].expanded}
        tabIndex={this.state.nodes[elem].tabIndex}
        ref={this.state.nodes[elem].id}
        data-visable={this.state.nodes[elem].visable}
        data-id={this.state.nodes[elem].id}
        key={this.state.nodes[elem].id}
        aria-setsize={len}
        aria-posinset={pos}
        aria-level={this.state.nodes[elem].level}
      >
        <span
          className={this.state.nodes[elem].focus ? "focus" : ""}
          id={"span" + this.state.nodes[elem].id}
          data-id={this.state.nodes[elem].id}
        >
          <span style={{ float: "left" }}>
            {this.state.nodes[elem].expanded ? (
              <FontAwesomeIcon icon={faChevronDown} aria-hidden="true" />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            )}
          </span>
          <span className="wrapper">
            <span className="inline title">{this.state.nodes[elem].name}</span>
          </span>
        </span>
        <ul>{this.state.nodes[elem].groups.map(id => this.renderItem(id))}</ul>
      </li>
    );
  }

  // render list item
  renderItem(elem, pos, len) {
    return (
      <li
        role="treeitem"
        tabIndex={this.state.nodes[elem].tabIndex}
        className={this.state.nodes[elem].focus ? "focus doc" : "doc"}
        data-visable={this.state.nodes[elem].visable}
        data-id={this.state.nodes[elem].id}
        ref={this.state.nodes[elem].id}
        key={this.state.nodes[elem].id}
        aria-setsize={len}
        aria-posinset={pos}
        aria-level={this.state.nodes[elem].level}
      >
        {this.state.nodes[elem].name}
      </li>
    );
  }
}

export default TreeNode;
