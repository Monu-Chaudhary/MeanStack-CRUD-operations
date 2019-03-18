const LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    User = require('../models/User');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username'}, ( username, hash, done) => {
            //Match user
            User.findOne({
                username: username
            }).then(user => {
                if(!user){
                    return done(null, false, {message: 'The username is not refistered'});
                }

                bcrypt.compare(hash, user.hash, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }
                    else{
                        return done(null, false, {message: 'Password incorrect'});
                    }
                });
            });
        })
    );

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
        user.findById(id, function(err, user){
            done(err, user);
        });
    });
}


