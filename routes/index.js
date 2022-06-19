const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const middleware = require('../middlewares/common')


const path = require('path')
// const authenticate = require('../middlewares/authenticate')

router.get('/', forwardAuthenticated, function (req, res,next) {
    res.render('login', { req: req });
});

router.post('/login', forwardAuthenticated, (req, res, next) => {
    authController.login(req, res, next);
})


router.get('/register',(req,res) => {
    authController.index(req,res);
})

router.post('/registerUser',(req,res) => {
    authController.create(req,res);
})

router.get('/dashboard',  isLoggedIn,(req, res ) => {
    res.render('dashboard', { req: req });
})





function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        req.isLogged = true
        return next();
    }
    res.redirect('/');
}

function forwardAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard');
}




module.exports = router