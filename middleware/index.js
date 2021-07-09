const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifikasi = require('./verifikasi');

router.post('/news/register', auth.register);
router.post('/news/login', auth.login);

// alamat yang perlu otorisasi
router.get('/news', verifikasi(1), auth.getNewsWithAuth);
router.post('/news', verifikasi(1), auth.insertNews);
router.put('/news', verifikasi(1), auth.updateNews);
router.delete('/news/:id', verifikasi(1), auth.deleteNews);

module.exports = router;