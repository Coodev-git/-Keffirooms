const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', listingController.getAllListings);
router.get('/:id', listingController.getListingById);
router.post('/', authenticate, authorize(['agent', 'admin']), listingController.createListing);

module.exports = router;
