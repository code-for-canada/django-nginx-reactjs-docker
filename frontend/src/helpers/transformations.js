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
