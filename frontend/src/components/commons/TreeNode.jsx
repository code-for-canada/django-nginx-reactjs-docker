import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/lib/tree.css";

// Largely based on src/js/aria.js (https://github.com/psw58/aria-tree-react/blob/master/src/js/aria.jsx)
// From aria-tree-react project (https://github.com/psw58/aria-tree-react)

// The structure of a node in a treeview
export const treeNodeShape = PropTypes.shape({
  //text: PropTypes.string.isRequired
});

//treeNodeShape.children = PropTypes.arrayOf(treeNodeShape);

//Recursive tree building component. for each
class TreeNode extends Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(treeNodeShape).isRequired
  };

  state = {
    nodes: this.transformNodes(this.props.nodes, 1),
    tid: 0
  };

  // Added by Michael to auto-fill fields
  // with default values to prevent user error
  transformNodes(originalNodes, level) {
    let nodes = [];
    let tabIndex = 0;
    for (let node of originalNodes) {
      if (node.children) {
        console.log("um... how??");
        node.children = this.transformNodes(node.children, level + 1);
      }
      // TODO change to level when fixed
      if (node.level === 1) {
        node.tabIndex = tabIndex;
        tabIndex += 1;
        node.visable = true;
      } else {
        node.tabIndex = -1;
        node.visable = false;
      }
      node.focus = false;
      //TODO change to children when changed
      if (node.groups) {
        node.expanded = false;
      }
      //TODO uncomment when fixed
      //node.level = level;

      //TODO assign these...
      /*id: 0,
        parent: "",
        groups: [1, 2, 3, 7, 8],
        */
      nodes.push(node);
    }
    console.log(nodes);
    return nodes;
  }

  onClickEvent(event) {
    let nodes = this.state.nodes;
    //@TODO if this element does not have focus give it focus
    const oldID = this.state.tid;
    let tid = this.state.tid;
    //get the id of the element from the data set
    if (event.target.dataset.id) {
      tid = parseInt(event.target.dataset.id);
    } else {
      console.log("error no data id on event, you must tab into tree view");
    }
    //clicked a childs span element not a node
    if (event.target.id === "span" + tid) {
      nodes[tid].expanded = !nodes[tid].expanded;
    }
    this.setNodeVisibleState(tid);
    this.setState({ nodes: nodes, tid: tid });
    this.moveFocus(oldID, tid);
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
            //console.log("setting id " + nodes[element].id + " children to searchable");
            nodes[element].groups.forEach(el => {
              nodes[el].visable = true;
            });
          }
        } else {
          //visible is false
          nodes[element].visable = false;
          //set child nodes to hiden
          if (nodes[element].groups && nodes[element].expanded) {
            //console.log("setting id " + nodes[element].id + " children to searchable");
            nodes[element].groups.forEach(el => {
              nodes[el].visable = false;
            });
          }
        }
      });
    } else {
      console.log("no groups");
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
    nodes[this.state.tid].focus = true;
    nodes[this.state.tid].tabIndex = 0;
    this.setState({ nodes: nodes });
  }

  onBlurEvent(e) {
    let nodes = this.state.nodes;
    nodes[this.state.tid].focus = false;
    this.setState({ nodes: nodes });
  }

  findVisableInReverse(searchStart) {
    let id = this.state.tid;
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
    const oldID = this.state.tid;

    if (e.keyCode === 32) {
      if ("expanded" in nodes[oldID]) {
        e.preventDefault();
        nodes[oldID].expanded = !nodes[oldID].expanded;
        this.setNodeVisibleState(oldID);
      } else {
        //element can not expand ignore enter key
        console.log("element can not expand");
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
          } else {
            //element can not expand ignore enter key
            console.log("element can not expand");
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
                this.state.tid = i;
                break;
              } else if (i === nodes.length - 1) {
                //no loops are found
                console.log("no visable element found return to root");
                this.state.tid = 0;
              } else {
                console.log("error no visable elem");
              }
            }
          } else {
            //your on last node loop back to begining node
            console.log("beggining of nodes looping to root");
            this.state.tid = 0;
          }
          //set focus to this element
          this.moveFocus(oldID, this.state.tid);
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
            this.state.tid = this.findVisableInReverse(oldID - 1);
          } else {
            //loop back to begining node
            console.log("beggining of nodes looping to botttom");
            this.state.tid = this.findVisableInReverse(nodes.length - 1);
          }
          this.moveFocus(oldID, this.state.tid);
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
              this.state.tid = nodes[oldID].groups[0];
            } else {
              console.log("ERROR all expanded data nodes must have a group");
            }
          }

          this.moveFocus(oldID, this.state.tid);
          break;

        /* Left arrow: --------------------------------------------------------
					When focus is on an open node, closes the node.
					When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
					When focus is on a root node that is also either an end node or a closed node, does nothing.
				*/
        case "ArrowLeft":
          //save id to remove focus from last element
          if (nodes[oldID].parent === "" && nodes[oldID].expanded === false) {
            console.log("root element");
            // When focus is on a root node that is also either an end node or a closed node, does nothing.
          } else if (nodes[oldID].expanded === true) {
            console.log("expanded element closing");
            // When focus is on an open node, closes the node.
            nodes[oldID].expanded = false;
            this.setNodeVisibleState(oldID);
          } else {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            console.log("move to parent element");
            this.state.tid = nodes[oldID].parent;
            this.setNodeVisibleState(this.state.tid);
          }
          this.moveFocus(oldID, this.state.tid);
          break;

        /* Home: ----------------------------------------------------------------
					Moves focus to the first node in the tree without opening or closing a node.
				*/
        case "Home":
          this.state.tid = 0;
          this.moveFocus(oldID, this.state.tid);
          console.log("move to first node in the tree");
          break;

        /* End: ---------------------------------------------------------------------
					Moves focus to the last node in the tree that is focusable without opening a node.
				*/
        case "End":
          console.log("move to last node in the tree");
          this.state.tid = this.findVisableInReverse(nodes.length - 1);
          this.moveFocus(oldID, this.state.tid);
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
              this.state.tid = i;
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
                this.state.tid = i;
                found = true;
                break;
              }
            }
          }
          if (!found) {
            console.log("no search results found for " + e.key);
          } else {
            this.moveFocus(oldID, this.state.tid);
          }
          break;

        // DEFAULT: -------------------------------------------------------------------
        default:
          console.log(e.key);
      }
    }
    this.setState({ nodes: nodes });
  }

  //only supports tree nodes max - three levels deep
  render() {
    //get all root nodes
    let roots = this.state.nodes.filter((elem, i) => {
      //root elements have no parent
      if (elem.parent === "") {
        return true;
      } else {
        return false;
      }
    });

    return (
      <div>
        <h2 id="tree_label" aria-label="Org Chart press the tab key to enter the tree view">
          <span id="treeLabel">Org Chart</span>
        </h2>

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
          <span className="wrapper">
            <span className="inline title">{elem.title}</span>
            <span className="inline title">{elem.name}</span>
          </span>
          {elem.expanded ? (
            <i className="fas fa-chevron-down root" aria-hidden="true" />
          ) : (
            <i className="fas fa-chevron-right root" aria-hidden="true" />
          )}
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
          <span className="wrapper">
            <span className="inline title">{this.state.nodes[elem].title}</span>
            <span className="inline title">{this.state.nodes[elem].name}</span>
          </span>
          {this.state.nodes[elem].expanded ? (
            <i className="fas fa-chevron-down group" aria-hidden="true" />
          ) : (
            <i className="fas fa-chevron-right group" aria-hidden="true" />
          )}
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
        {this.state.nodes[elem].name} - {this.state.nodes[elem].title}
      </li>
    );
  }
}

export default TreeNode;
