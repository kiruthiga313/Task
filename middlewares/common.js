const multer = require('multer')
const fs = require('fs')
const path = require('path')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');


// add other strategies for more authentication flexibility
passport.use('user', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
},
    function (email, password, done) {
        User.findOne({
            email: email
        }, async function (err, user) {

            if (!user) {
                return done(null, false, {
                    message: 'This email is not registered.'
                });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return done(null, false, {
                    message: 'This password is not correct.'
                });
            }
            
            return done(null, user);
        });
    }
));


// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    // serialize user
    done(null, { id: user._id });
});

// used to deserialize the user
passport.deserializeUser(function (login, done) {

        User.findById(login.id, function (err, user) {
            done(err, user);
        });
    
});











