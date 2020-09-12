const express = require('express');
const blogController = require('../controllers/blogController.js');
const ensureAuthenticated = require('../auth');

const router = express.Router();
//allBlogs, createBlog, getBlog, editBlog, editBlogPOST
router.get('/', blogController.allBlogs);
router.get('/create', blogController.createBlog);
router.get('/:id', blogController.getBlog);
router.post('/create', blogController.createBlogPOST);
router.get('/edit/:id', blogController.editBlog);
router.post('/edit/:id', blogController.editBlogPOST);
router.get('/delete/:id', blogController.deletePage);
router.delete('/:id', blogController.deleteBlog);
router.get('/user:id', blogController.userBlogs);

module.exports = router;
