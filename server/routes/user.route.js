const express = require('express'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

    const {ensureAuthenticated} = require('../_helpers/auth');
    const userRoutes = express.Router();

    //load User model
    const User = require('../models/User');

    // //login Page
    // userRoutes.route('/').get(function(req, res) {
    //     // res.redirect('/employee');
    //     // res.json("okay :*")
    // })

    // userRoutes.route('/register').get(function(req, res){
    //     // res.render('register');
    // })

    userRoutes.route('/register').post(function(req, res, next){
        
        User.findOne({username: req.body.username}).then(user => {
            if(user){
                // res.redirect('/user/register');
                return next(new Error('Username already taken.'));
            } else{
                let user = new User(req.body);
                // console.log(user);
                // res.json(req.body.username);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.hash, salt, (err, hash) =>{
                        if(err) throw err;
                        user.hash = hash;
                        user.save()
                        .then( user => {
                            //flash 
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/user');
                            // res.json('sucessfully saved');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    })

    //login
    userRoutes.route('/login').post(function(req, res, next){
        passport.authenticate('local', {
            successRedirect: '/employee',
            failureRedirect: '/user',
            failureFlash: true
        })(req, res, next);
    })

    //logout
    userRoutes.route('/logout').get(function(req, res){
        req.logOut();
        //flash
        // req.flash('success_msg', 'You are logged out');
        res.redirect('/user');
    })

    module.exports = userRoutes;