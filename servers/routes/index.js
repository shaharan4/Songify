const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>res.json({
    username:'eric',
    password:'gimothi',
}));
router.get('/group', (req, res)=>res.json({username:'erics'}));

module.exports = router;