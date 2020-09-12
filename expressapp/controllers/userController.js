const express = require('express');
const app = express();
const morgan = require('morgan');

const { pool } = require('../dbConfig');
const bcrypt = require('bcrypt');


const passport = require('passport');

//const initializePassport = require('../passportConfig');

//initializePassport(passport);

app.use(morgan('dev'));

//app.use(passport.initialize());
//app.use(passport.session());



const login = (req, res)=> {
    res.render('users/login', {'title':'login'});
}

const register = (req, res)=> {
    res.render('users/register', {'title':'register'});
}

const registerPOST = (req, res)=> {
    let {email, name, password1,password2} = req.body;

    let error = [];
    if (!name || !email || !password1 || !password2){
        error.push({message:'Please enter all the fields'});
    }
    if (password1.length<6){
        error.push({message:'Password should be of atleast 6 characters!'});
    }
    if (password1!=password2){
        error.push({message:'Passwords do not match'});
    }

    if (error.length > 0){
        res.render('users/register',{'errors': error, 'title':'register'});
    }
    else{
        console.log({email, name, password1,password2});
        let hashedPassword = bcrypt.hash(password1, 10, (err, hash)=>{
            pool.query(
                `SELECT * FROM users WHERE email = $1`,[email], (err, result)=>{
                    if(err){
                        throw err;
                    }
                    if  (result.rows.length > 0){
                        error.push({'message':'Email already registered!'});
                        res.render('users/register',{'errors': error, 'title':'register'});
                    }
                    else{
                        console.log(hash);
                        pool.query(
                            `INSERT INTO users(email, name, password)
                            VALUES($1, $2, $3)
                            RETURNING id, password`, [email, name, hash], (err, result)=>{
                                if (err){
                                    throw err;
                                }
                                else{
                                    req.flash('success_message','${name} successfully registered!');
                                    res.redirect('/users/login');
                                }
                            }
                        );
                    }
                }
            );
        });

    }
}

const loginPOST = (passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/users/login",
    failureFlash: true
  }));

const logout = (req, res)=>{
    req.logout();
    req.flash('success_message','You are logged out!');
    res.redirect('/users/login');
}

module.exports = {
    login,
    register,
    registerPOST,
    loginPOST,
    logout
};