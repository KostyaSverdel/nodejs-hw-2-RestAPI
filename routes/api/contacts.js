const express = require('express');
const router = express.Router();
const {
  getAllContacts,
} = require('../../controllers/contactsController');
const {getContact} = require('../../controllers/getContact');
const {createContact} = require('../../controllers/createContact');
const {deleteContact} = require('../../controllers/deleteContact');
const {updateContactById} = require('../../controllers/updateContact');
const {updateContactStatusById} = require('../../controllers/updateContactStatus');

router.get('/', getAllContacts);
router.get('/:id', getContact);
router.post('/', createContact);
router.delete('/:id', deleteContact);
router.put('/:id', updateContactById);
router.patch('/:contactId/favorite', updateContactStatusById);

module.exports = router;
