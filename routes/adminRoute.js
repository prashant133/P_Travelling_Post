const express = require('express');
const defaultAdmin = require('../controllers/adminController')

const router = express.Router();


router.post('/default-admin', defaultAdmin)




module.exports = router;