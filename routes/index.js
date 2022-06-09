const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const movieController = require('../controllers/movie.controller')
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

router.get('/movie',  isLoggedIn,(req, res ) => {
    movieController.listMovie(req,res);
})


router.get('/addMovie',isLoggedIn,(req,res)=> {
    movieController.addMovie(req,res);
})

router.post('/createMovie',isLoggedIn,(req,res)=> {
    movieController.createMovie(req,res);
})

router.get('/editMovie/:id', isLoggedIn,(req, res) => {
    movieController.getMovie(req, res);
})

router.get('/deleteMovie/:id', isLoggedIn,(req, res) => {
    movieController.deleteMovie(req, res);
})

router.post('/updateMovie',isLoggedIn,(req,res)=> {
    movieController.updateMovie(req,res);
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