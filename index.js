const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // Call the function to list contacts
      listContacts();
      break;

    case "get":
      // Call the function to get a contact by ID
      getContactById(id);
      break;

    case "add":
      // Call the function to add a new contact
      addContact(name, email, phone);
      break;

    case "remove":
      // Call the function to delete a contact by ID
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Invokes the function with the arguments provided on the command line
invokeAction(argv);
