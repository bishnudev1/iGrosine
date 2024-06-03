module.exports = {
    ensureAuth: function(req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect("http://localhost:3000/");
        }
    },
    ensureGuest: function(req,res,next) {
        if(!req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect("http://localhost:3000/log");
        }
    },
};