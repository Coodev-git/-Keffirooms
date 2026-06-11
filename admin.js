const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

router.use(authenticate, authorize(['admin']));

router.get('/stats', adminController.getStats);
router.get('/verifications', adminController.getAgentVerifications);
router.patch('/listings/:id/status', adminController.updateListingStatus);

module.exports = router;
