const {
    addContact,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');

  const createContact = async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
  
      if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newContact = await addContact({ name, email, phone });
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    createContact,
  };