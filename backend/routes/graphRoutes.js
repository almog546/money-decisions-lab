const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');
const {
    getConfidenceByoutcome,
    getAmountByoutcome,
    gettypeByoutcome,
} = require('../controllers/graphController');
router.get('/confidence-by-outcome', requireAuth, getConfidenceByoutcome);
router.get('/amount-by-outcome', requireAuth, getAmountByoutcome);
router.get('/type-by-outcome', requireAuth, gettypeByoutcome);

module.exports = router;
