const express = require('express')
const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport')
const db = require('../service/model')

exports.index = (req,res) => {
     return res.render('register');
}

exports.create = async(req,res) => {
    // console.log(req.body)
   
   let email = await User.findOne({ email: req.body.email });
   if(email){
    req.toastr.error("Email already exist")
    return res.redirect('/');
    }
    const user = {
        name : req.body.userName ,
        email: req.body.email
    }
 
    const salt = await bcrypt.genSalt(10);  
    user.password = await bcrypt.hash(req.body.password, salt);
    
   let users = await db._store(User, user);
   req.toastr.success('Registered Successfully !');

   return res.redirect('/')


}

exports.login = (req,res,next) => {

     try {
        

        passport.authenticate('user', function(err, user, info) {

            var error = err || info;
            // console.log(error);
            if (error)
            {
                console.log(error.message);
                req.toastr.error(error.message);
                return res.redirect('/');
            }

            req.logIn(user, function(err) {
                if (err) return res.send(err);
                res.redirect('/dashboard');
            });
        })(req, res, next);

    } catch (err) {
        // console.log(err);
        if (err[0] != undefined) {
            for (i in err.errors) {
                res.status(422).send(err.errors[i].message);
            }
        } else {
            res.status(422).send(err);
        }
    }
     
}