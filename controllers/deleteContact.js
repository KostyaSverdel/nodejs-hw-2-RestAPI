const {
    removeContact,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');

  const deleteContact = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const result = await removeContact(contactId);
  
      if (!result) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    deleteContact,
  };