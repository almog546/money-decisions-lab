const express = require('express');
const router = express.Router();
const {
    submitReviewOutcome,
} = require('../controllers/reviewOutcomeController');
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, submitReviewOutcome);

module.exports = router;
