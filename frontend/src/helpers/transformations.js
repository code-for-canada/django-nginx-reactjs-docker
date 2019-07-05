// transform addressBook (list of addressBookContactShape) into a list of display names (optionShapes)
export function transformAddressBook(addressBook) {
  let options = [];
  for (let contact of addressBook) {
    options.push(transformContact(contact));
  }
  return options;
}

// transform addressBookContactShape into optionShapes
export function transformContact(contact) {
  return { name: transformContactName(contact), id: contact.id };
}

// transform addressBookContactShape a display name for the optionShape
export function transformContactName(contact) {
  return contact.name + " (" + contact.role + ")";
}

// Get the transformed name, or an empty string if it is not found
export function contactNameFromId(addressBook, id) {
  for (let contact of addressBook) {
    if (contact.id === id) {
      return transformContactName(contact);
    }
  }
  return "";
}

// From an array of ids, create an options list for the
// to and cc fields.
export function optionsFromIds(addressBook, ids) {
  let options = [];
  ids = ids || [];
  for (let id of ids) {
    const name = contactNameFromId(addressBook, id);
    options.push({ name: name, id: id });
  }
  return options;
}

// Returns an array of objects with the following properties
// id (required): number in order indexed at 0
// name (required): string displayed in the tree
// groups: array of numbers of the children
// parent: number id of the parent
// level (required): number representing the level of the tree you are in
export const processTreeContent = (
  currentLanguage,
  treeViewContent_en,
  treeViewContent_fr,
  treeType
) => {
  let treeContent = currentLanguage === "en" ? treeViewContent_en : treeViewContent_fr;
  let processedTree = [];

  // Level counter.
  let level = 1;
  // Id counter - counts the number of names in the tree.
  let id = 0;
  // Id of the current parent node.
  let parent = 0;

  // For each node in the tree, process the node to the expected output for the tree view.
  for (let i = 0; i < treeContent.length; i++) {
    const treeNode = treeContent[i];

    // If this node has children.
    if (treeNode[treeType]) {
      // Create an array of the ids of the children of this node.
      const groupsArray = [...Array(treeNode[treeType].length).keys()].map(key => {
        return key + id + 1;
      });
      processedTree.push({
        id: id,
        name: treeNode.text,
        level: level,
        groups: groupsArray
      });
      parent = id;
      id++;

      // Increase the level of the tree.
      level++;
      // Reset the currentTree to the current node.
      const currentTree = treeNode[treeType];
      // Process the child nodes.
      for (let j = 0; j < currentTree.length; j++) {
        processedTree.push({
          id: id,
          name: currentTree[j].text,
          level: level,
          parent: parent
        });
        id++;
      }
    } else {
      // This is a leaf node of the tree.
      processedTree.push({
        id: id,
        name: treeNode.text,
        level: level
      });
      id++;
    }
  }
  console.log(processedTree);
  return processedTree;
};
