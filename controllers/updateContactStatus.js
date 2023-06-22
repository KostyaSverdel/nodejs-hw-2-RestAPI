const {
    updateContactStatus,
  } = require('../models/contacts');
  const { validateContact } = require('../helpers/helper');

  const updateContactStatusById = async (req, res, next) => {
    try {
      const contactId = req.params.contactId;
      const { favorite } = req.body;
  
      if (favorite === undefined) {
        return res.status(400).json({ message: 'missing field favorite' });
      }
  
      const updatedContact = await updateContactStatus(contactId, { favorite });
  
      if (!updatedContact) {
        return res.status(404).json({ message: 'Not found' });
      }
  
      res.status(200).json(updatedContact);
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    updateContactStatusById,
  };