const Blog = require('../models/blogs.js');

const blogs = (req, res) => {
	Blog.find().sort({ createdAt: -1 })
	.then((result) => {
		res.render('blogs/index', {title: 'All Blogs', blogs: result});
	})
	.catch((err) => {
		console.log(err.message);
	});
}


const createBlogReq = (req, res) => {
	res.render('blogs/addBlog', {title:'Add Blog'});
}


const getBlog = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
	.then((result) => {
		res.render('blogs/single', {title: result.title, blog:result});
	})
	.catch((err) => {
		console.log(err.message);
	});
}


const blogPost = (req, res) => {
	blog = new Blog(req.body);
	blog.save()
	.then((result) => {
		res.redirect('/blogs');
	})
	.catch((err) => {
		console.log(err.message);
	});
}


const editBlogReq = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
	.then((result) => {
		res.render('blogs/update', {title: result.title + ' | Edit', blog: result});
	})
	.catch((err) => {
		console.log(err.message);
	});
}


const editBlogPost = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndUpdate(id, req.body, {new:true})
	.then((result) => {
		res.render('blogs/single', {title: result.title, blog: result});
	})
	.catch((err) => {
		console.log(err.message);
	});
}


const deleteBlog = (req, res) => {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
	.then((result) => {
		res.json({redirect: '/blogs'});
		console.log('==')
	})
	.catch((err) => {
		console.log(err.message);
	});
}

module.exports = {
	blogs,
	createBlogReq,
	getBlog,
	blogPost,
	editBlogReq,
	editBlogPost,
	deleteBlog
};
