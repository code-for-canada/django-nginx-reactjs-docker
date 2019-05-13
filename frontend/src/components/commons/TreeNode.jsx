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
      //TODO uncomment when fixed
      //node.level = level;

      //TODO assign these...
      /*id: 0,
        parent: "",
        visable: true,
        expanded: false, // this will need more work.....
        groups: [1, 2, 3, 7, 8],
        */
      nodes.push(node);
    }
    console.log(nodes);
    return nodes;
  }

  onClickEvent(event) {
    //@TODO if this element does not have focus give it focus
    const oldID = this.state.tid;
    //get the id of the element from the data set
    if (event.target.dataset.id) {
      this.state.tid = parseInt(event.target.dataset.id);
    } else {
      console.log("error no data id on event, you must tab into tree view");
    }
    //clicked a childs span element not a node
    if (event.target.id == "span" + this.state.tid) {
      this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
    }
    this.setNodeVisibleState(this.state.tid);
    this.setState({ nodes: this.state.nodes });
    this.moveFocus(oldID, this.state.tid);
  }

  setNodeVisibleState(stateID) {
    const myID = stateID;
    if ("groups" in this.state.nodes[myID]) {
      this.state.nodes[myID].groups.forEach(element => {
        if (this.state.nodes[myID].expanded) {
          //visable is true
          this.state.nodes[element].visable = true;
          //if the node is expanded set the children to visible
          if (this.state.nodes[element].groups && this.state.nodes[element].expanded) {
            //console.log("setting id " + this.state.nodes[element].id + " children to searchable");
            this.state.nodes[element].groups.forEach(el => {
              this.state.nodes[el].visable = true;
            });
          }
        } else {
          //visible is false
          this.state.nodes[element].visable = false;
          //set child nodes to hiden
          if (this.state.nodes[element].groups && this.state.nodes[element].expanded) {
            //console.log("setting id " + this.state.nodes[element].id + " children to searchable");
            this.state.nodes[element].groups.forEach(el => {
              this.state.nodes[el].visable = false;
            });
          }
        }
      });
    } else {
      console.log("no groups");
    }
  }

  moveFocus(curID, nextID) {
    //remove focus from old element
    this.state.nodes[curID].focus = false;
    this.state.nodes[curID].tabIndex = -1;
    //set focus to current elem
    this.state.nodes[nextID].focus = true;
    this.state.nodes[nextID].tabIndex = 0;
    this.setState({ nodes: this.state.nodes });
    this.refs[nextID].focus();
  }

  onFocusEvent(e) {
    this.state.nodes[this.state.tid].focus = true;
    this.state.nodes[this.state.tid].tabIndex = 0;
    this.setState({ nodes: this.state.nodes });
  }

  onBlurEvent(e) {
    this.state.nodes[this.state.tid].focus = false;
    this.setState({ nodes: this.state.nodes });
  }

  findVisableInReverse(searchStart) {
    var id = this.state.tid;
    //find closest visable item
    for (var i = searchStart; i >= 0; --i) {
      if (this.state.nodes[i].visable == true) {
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

    if (e.keyCode == 32) {
      if ("expanded" in this.state.nodes[this.state.tid]) {
        e.preventDefault();
        this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
        this.setNodeVisibleState(this.state.tid);
      } else {
        //element can not expand ignore enter key
        console.log("element can not expand");
      }
    } else {
      switch (e.key) {
        /* ENTER KEY: --------------------------------------------------
					activates a node, i.e., performs its default action. 
					For parent nodes, one possible default action is to open or close the node. 
					In single-select trees where selection does not follow focus (see https://www.w3.org/TR/wai-aria-practices-1.1/#issue-container-generatedID-27), 
					the default action is typically to select the focused node.
				*/
        case "Enter":
          if ("expanded" in this.state.nodes[this.state.tid]) {
            this.state.nodes[this.state.tid].expanded = !this.state.nodes[this.state.tid].expanded;
            this.setNodeVisibleState(this.state.tid);
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
          var oldID = this.state.tid;
          if (this.state.nodes.length > this.state.tid + 1) {
            //find closest visable item
            for (var i = this.state.tid + 1; i < this.state.nodes.length; i++) {
              var elem = this.state.nodes[i];
              if ("visable" in elem && elem.visable == true) {
                this.state.tid = i;
                break;
              } else if (i == this.state.nodes.length - 1) {
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
          var oldID = this.state.tid;
          //update current target id
          //@TOD0 UPDATE THE TARGET ONLY IF ITS VISABLE
          if (this.state.tid > 0) {
            //find closest visable item to current node
            this.state.tid = this.findVisableInReverse(this.state.tid - 1);
          } else {
            //loop back to begining node
            console.log("beggining of nodes looping to botttom");
            this.state.tid = this.findVisableInReverse(this.state.nodes.length - 1);
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
          var oldID = this.state.tid;
          if (!("expanded" in this.state.nodes[this.state.tid])) {
            //end node
          } else if (this.state.nodes[this.state.tid].expanded == false) {
            //open the node
            this.state.nodes[this.state.tid].expanded = true;
            this.setNodeVisibleState(this.state.tid);
          } else {
            if ("groups" in this.state.nodes[this.state.tid]) {
              //move to first group
              this.state.tid = this.state.nodes[this.state.tid].groups[0];
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
          var oldID = this.state.tid;
          if (
            this.state.nodes[this.state.tid].parent === "" &&
            this.state.nodes[this.state.tid].expanded == false
          ) {
            console.log("root element");
            // When focus is on a root node that is also either an end node or a closed node, does nothing.
          } else if (this.state.nodes[this.state.tid].expanded == true) {
            console.log("expanded element closing");
            // When focus is on an open node, closes the node.
            this.state.nodes[this.state.tid].expanded = false;
            this.setNodeVisibleState(this.state.tid);
          } else {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            console.log("move to parent element");
            this.state.tid = this.state.nodes[this.state.tid].parent;
            this.setNodeVisibleState(this.state.tid);
          }
          this.moveFocus(oldID, this.state.tid);
          break;

        /* Home: ----------------------------------------------------------------
					Moves focus to the first node in the tree without opening or closing a node.
				*/
        case "Home":
          var oldID = this.state.tid;
          this.state.tid = 0;
          this.moveFocus(oldID, this.state.tid);
          console.log("not implimented");
          break;

        /* End: ---------------------------------------------------------------------
					Moves focus to the last node in the tree that is focusable without opening a node.
				*/
        case "End":
          console.log("not implimented");
          var oldID = this.state.tid;
          this.state.tid = this.findVisableInReverse(this.state.nodes.length - 1);
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
          var oldID = this.state.tid;
          var found = false;
          //start search from current node
          for (var i = this.state.tid + 1; i < this.state.nodes.length; i++) {
            var elem = this.state.nodes[i];
            if (
              "visable" in elem &&
              elem.visable == true &&
              e.key.toLowerCase() == elem.name[0].toLowerCase()
            ) {
              this.state.tid = i;
              found = true;
              break;
            }
          }
          //if not found search from beginning
          if (!found) {
            for (var i = 0; i < this.state.tid + 1; i++) {
              var elem = this.state.nodes[i];
              if (
                "visable" in elem &&
                elem.visable == true &&
                e.key.toLowerCase() == elem.name[0].toLowerCase()
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
    this.setState({ nodes: this.state.nodes });
  }

  //only supports tree nodes max - three levels deep
  render() {
    //get all root nodes
    var roots = this.state.nodes.filter((elem, i) => {
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
