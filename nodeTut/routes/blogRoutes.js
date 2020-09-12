const express = require('express');
const blogController = require('../controllers/blogController.js');

const router = express.Router();

router.get('/', blogController.blogs);
router.get('/create', blogController.createBlogReq);
router.get('/:id', blogController.getBlog);
router.post('/', blogController.blogPost);
router.get('/edit/:id', blogController.editBlogReq);
router.post('/edit/:id', blogController.editBlogPost);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

