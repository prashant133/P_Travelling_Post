const express = require('express');
const router = express.Router();
const {createPost, getAllPost, getPost , updatePost}= require('../controllers/postController')
const upload = require('../utils/fileUpload');
const { verifyAdmin } = require('../middleware/authoriztion');



// only admin can do some stuffs
router.post('/',verifyAdmin, upload.single('image'), createPost);
router.patch('/update/:id', upload.single("image"), updatePost)



router.get('/get-all-post', getAllPost );

router.get('/:id', getPost );

module.exports = router;
