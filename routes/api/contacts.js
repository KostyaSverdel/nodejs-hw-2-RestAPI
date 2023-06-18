const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateContactStatusById,
} = require('../../controllers/contactsController');

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.post('/', createContact);
router.delete('/:id', deleteContact);
router.put('/:id', updateContactById);
router.patch('/:contactId/favorite', updateContactStatusById);

module.exports = router;
