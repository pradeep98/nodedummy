const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes.js')

const app = express();

const dbURL = 'mongodb+srv://blogger:blogger@cluster0.pynp5.mongodb.net/nodejs?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true })
	.then((result) =>{
		console.log('db connected');
		app.listen(8080);
	})
	.catch((err) => {
		console.log(err.message);
	});


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.render('index', {title: 'Home'})
});

app.get('/about', (req, res) => {
	res.render('about', {title: 'About'});
});

app.use('/blogs', blogRouter);

app.use((req, res) => {
	res.status(404).send("404, Page not found");
});
