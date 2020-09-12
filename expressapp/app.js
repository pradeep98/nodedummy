const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
//const bodyParser = require('body-parser');
const passport = require('passport');

const initializePassport = require('./passportConfig');

initializePassport(passport);

const app = express();

// routes
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

app.listen(8000, ()=>{
    console.log('listening...');
});



app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
    if (req.isAuthenticated()){
        res.locals.loggedIn = req.user.name;  
        
    }
    else{
        res.locals.loggedIn = null;

    }
    console.log(res.locals.loggedIn);
    next();
});

app.use(flash());
//app.use(bodyParser.json());

//  calliing routes
app.use('/users',userRoutes);
app.use('/blogs',blogRoutes);