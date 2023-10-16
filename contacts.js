const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./db/contacts.json");
require("colors");

// Function to list contacts
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const contacts = JSON.parse(data);
    // Print the contact list in table form
    console.table(contacts);
  });
}

// Function to get a contact by ID
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const contacts = JSON.parse(data);
    // Search for the contact with the given ID
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      // If found, print the contact
      console.table([contact]);
    } else {
      // If not found, display an error message
      console.log(`No contact with id found ${contactId}`.yellow);
    }
    // console.table([contacts]);
  });
}

// Function to delete a contact by ID
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    let contacts = JSON.parse(data);
    // Check if the contact with the given ID exists
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      // If it exists, we delete it
      contacts.splice(contactIndex, 1);

      // Write the updated contacts back to the file
      fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8",
        (error) => {
          if (error) {
            throw error;
          }
          console.log(`Contact with ID ${contactId} removed.`.rainbow);
          console.table([contactId]);
        }
      );
    } else {
      // If it does not exist, we display an error message
      console.log(`No contact with id found: ${contactId}`.red);
    }
  });
}

// Function to add a new contact
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    let contacts = JSON.parse(data);
    // Create a new contact with a random ID and the data provided
    const newContact = { id: uuidv4(), name, email, phone };
    // const newContact = {
    //   id: Math.random().toString(36).substring(2, 9),
    //   name,
    //   email,
    //   phone,
    // };
    // Add the new contact to the contact list
    contacts.push(newContact);
    // Write the updated contacts back to the file
    fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8",
      (error) => {
        if (error) {
          throw error;
        }
        // console.log(`Contact added: ${JSON.stringify(newContact)}`.green);
        console.table([newContact]);
      }
    );
  });
}

// Export the functions so they can be used in other files
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
