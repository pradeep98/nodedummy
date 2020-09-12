
const ensureAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','Please log in!');
    res.redirect('/users/login');
}

module.exports = {ensureAuthenticated};