const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async ({ name, email, phone }) => {
  return await Contact.create({ name, email, phone });
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndDelete(contactId);
};

const updateContact = async (contactId, { name, email, phone }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
};

const updateContactStatus = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
};
