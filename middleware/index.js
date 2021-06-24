const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifikasi = require('./verifikasi');

router.post('/news/register', auth.register);
router.post('/news/login', auth.login);


// alamat yang perlu otorisasi
router.get('/news', verifikasi(), auth.getNewsWithAuth);
router.post('/news', verifikasi(), auth.insertNews);
router.put('/news', verifikasi(), auth.updateNews);
router.delete('/news', verifikasi(), auth.deleteNews);

module.exports = router;