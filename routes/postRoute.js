const express = require('express');
const router = express.Router();
const {createPost, getAllPost, getPost}= require('../controllers/postController')
const upload = require('../utils/fileUpload')

router.post('/', upload.single('image'), createPost);
router.get('/get-all-post', getAllPost );
router.get('/:id', getPost );

module.exports = router;
