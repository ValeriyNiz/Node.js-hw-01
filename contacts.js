const { v4: uuidv4 } = require('uuid');
const path = require("path");
const fs = require("fs").promises;


const contactsPath = path.resolve("db", "contacts.json");

async function getContacts() {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return contacts;
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contact = JSON.parse(await fs.readFile(contactsPath, "utf-8")).filter(
      (contact) => contact.id === contactId
    );
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};