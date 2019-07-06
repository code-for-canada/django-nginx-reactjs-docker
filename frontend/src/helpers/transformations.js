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
  const treeContent = currentLanguage === "en" ? treeViewContent_en : treeViewContent_fr;
  const tree = recursivelyProcessTree(treeContent, treeType, 1, 0);
  return tree;
};

// Recursively process tree from API into tree needed for accessible tree view
// component.
const recursivelyProcessTree = (treeContent, treeType, level, id, parent) => {
  let processedTree = [];
  // For each node in the tree, process the node to the expected output for the tree view.
  for (let i = 0; i < treeContent.length; i++) {
    let treeNode = treeContent[i];

    // If this node has children.
    if (treeNode[treeType]) {
      // Create a groups array after processing children.
      const newNode = {
        id: id,
        name: treeNode.text,
        level: level,
        parent: parent
      };

      const childNodes = recursivelyProcessTree(
        treeNode[treeType],
        treeType,
        level + 1,
        id + 1,
        id
      );
      // Create a groups array for the latest element.
      // Grab the list of ids with parent === id.
      let groupArray = [];
      for (let j = 0; j < childNodes.length; j++) {
        if (childNodes[j].parent === id) {
          groupArray.push(childNodes[j].id);
        }
      }
      newNode.groups = groupArray;

      // Update the array
      processedTree.push(newNode);
      processedTree = processedTree.concat(childNodes);

      id = id + 1 + childNodes.length;
    } else {
      // This is a leaf node of the tree.
      processedTree.push({
        id: id,
        name: treeNode.text,
        level: level,
        parent: parent
      });
      id++;
    }
  }

  return processedTree;
};
