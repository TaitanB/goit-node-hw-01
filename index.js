const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contscts = await listContacts();
      console.table(contscts);
      break;

    case "get":
      const setContact = await getContactById(id);
      console.table(setContact);
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.table(addedContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
