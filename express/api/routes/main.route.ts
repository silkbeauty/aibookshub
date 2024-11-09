const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'components', 'home.htm'));
});


router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', 'components', 'about.htm'));
});

module.exports = router;