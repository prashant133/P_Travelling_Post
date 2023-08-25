const express = require('express');
const router = express.Router();
const createPost = require('../controllers/postController')
const upload = require('../utils/fileUpload')

router.post('/', upload.single('image'), createPost);

module.exports = router;
