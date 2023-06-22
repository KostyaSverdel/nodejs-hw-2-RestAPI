const {
  listContacts,
} = require('../models/contacts');
const { validateContact } = require('../helpers/helper');

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
};
