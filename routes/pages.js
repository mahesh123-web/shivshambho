const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.getHome);
router.get('/packages', pageController.getPackages);
router.get('/booking', pageController.getBooking);
router.get('/contact', pageController.getContact);

module.exports = router;
