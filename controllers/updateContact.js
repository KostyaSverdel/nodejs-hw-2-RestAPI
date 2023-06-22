const {
    updateContact,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');

  const updateContactById = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const { name, email, phone } = req.body;
  
      if (!name && !email && !phone) {
        return res.status(400).json({ message: 'Missing fields' });
      }
  
      const updatedContact = await updateContact(contactId, {
        name,
        email,
        phone,
      });
  
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    updateContactById,
  };