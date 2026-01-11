const express = require('express');
const router = express.Router();
const {
    getReviewDecisions,
    getDecisionsByOutcome,
} = require('../controllers/decisionController');
const requireAuth = require('../middlewares/requireAuth');

router.get('/pending-review', requireAuth, getReviewDecisions);
router.post('/', requireAuth, getDecisionsByOutcome);
module.exports = router;
