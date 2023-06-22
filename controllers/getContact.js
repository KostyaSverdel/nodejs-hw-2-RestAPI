const {
    getContactById,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');

  const getContact = async (req, res, next) => {
    try {
      const contactId = req.params.id;
      const contact = await getContactById(contactId);
  
      if (!contact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    getContact,
  };