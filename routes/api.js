const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/bookings', apiController.createBooking);
router.post('/contact', apiController.createContact);

module.exports = router;
