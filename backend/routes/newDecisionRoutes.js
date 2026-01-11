const express = require('express');
const router = express.Router();

const { createNewDecision } = require('../controllers/newDecisionController');
const requireAuth = require('../middlewares/requireAuth');
router.post('/', requireAuth, createNewDecision);

module.exports = router;
