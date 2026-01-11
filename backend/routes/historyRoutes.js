const express = require('express');
const router = express.Router();

const requireAuth = require('../middlewares/requireAuth');
const { getUserHistory } = require('../controllers/historyController');

router.get('/', requireAuth, getUserHistory);

module.exports = router;
