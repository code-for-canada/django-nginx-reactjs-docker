import { LANGUAGES } from "../modules/LocalizeRedux";

// Transform addressBook (list of names - strings) into a list of
// options. This option list (addressBookOptionShape) is what's required as the choices
// for the react-super-select input component.
export function transformAddressBook(addressBook) {
  let options = [];
  for (let i = 0; i < addressBook.length; i++) {
    options.push({ name: addressBook[i], id: i });
  }
  return options;
}

// Get the transformed name, or an empty string if it is not found
export function contactNameFromId(addressBook, id) {
  return addressBook[id] || "";
}

// From an array of indexes, create an options list for the
// to and cc fields. The option list (addressBookOptionShape) is what's required
// by the react-super-selct input component.
export function optionsFromIds(addressBook, ids) {
  let options = [];
  ids = ids || [];
  for (let id of ids) {
    const name = contactNameFromId(addressBook, id);
    options.push({ name: name, id: id });
  }
  return options;
}

// Returns an array of objects (in the current language) with the following properties
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
  const treeContent =
    currentLanguage === LANGUAGES.english ? treeViewContent_en : treeViewContent_fr;
  const tree = recursivelyProcessTree(treeContent, treeType, 1, 0);
  return tree;
};

// Recursively process tree from API into tree needed for accessible tree view
// component.
// Exported only for tests.
export const recursivelyProcessTree = (treeContent, treeType, level, id, parent) => {
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

      // Update the processed set of the tree.
      processedTree.push(newNode);
      processedTree = processedTree.concat(childNodes);

      // Increase the id by 1 plus the number of children ids
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

// Converts org chart trees into an address book (flattened array of strings).
export const recursivelyCreateAddressBook = (treeContent, treeType) => {
  let processedTree = [];
  // For each node in the tree, process the node to the expected output for the tree view.
  for (let i = 0; i < treeContent.length; i++) {
    const treeNode = treeContent[i];

    // If this node has children.
    if (treeNode[treeType]) {
      // Update the processed set of the tree.
      processedTree.push(treeNode.text);

      const childNodes = recursivelyCreateAddressBook(treeNode[treeType], treeType);
      processedTree = processedTree.concat(childNodes);
    } else {
      // This is a leaf node of the tree.
      processedTree.push(treeNode.text);
    }
  }
  return processedTree;
};
