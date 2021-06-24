const express = require('express');
const auth = require('./auth');
const router = express.Router();

router.post('/news/register', auth.register);
router.post('/news/login', auth.login);

module.exports = router;