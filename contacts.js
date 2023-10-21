const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) return null;
  const [contactToRemove] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactToRemove;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
