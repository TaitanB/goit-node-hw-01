const { readFile, writeFile } = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readContacts = await readFile(contactsPath);
    const allContacts = JSON.parse(readContacts);

    return allContacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const getContact = allContacts.find(({ id }) => id === contactId);

    return getContact;
  } catch (error) {
    console.error(error);
  }
}

async function updateContacts(data) {
  try {
    writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const deletedContact = allContacts.filter(({ id }) => id === contactId);
    const updateList = allContacts.filter(({ id }) => id !== contactId);
    updateContacts(updateList);

    return deletedContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const addedContact = {
      id: v4(),
      name: name,
      email: email,
      phone: phone,
    };
    const updateList = [...allContacts, addedContact];
    updateContacts(updateList);

    return addedContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  updateContacts,
  removeContact,
  addContact,
};
