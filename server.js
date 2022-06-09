const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const urlencoded = require('body-parser/lib/types/urlencoded')
const path = require('path')
const indexRoute = require('./routes/index')
const exp = require('constants')
const morgan = require('morgan')
var flash = require('connect-flash');
var toastr = require('express-toastr');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
var expressSession = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://Kiruthiga:Kiruthiga@cluster0.mdcbv.mongodb.net/great_vibes_task',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection

db.on('error' ,(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('Connected to db..')
})
app.listen(3000,()=>{
    console.log('server is running on port 3000')
})


app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set('view engine' , 'ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname, '/storage')));

app.use(morgan('dev'))

//app.use(cookieParser('secret'));

// Dependencies
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Set up Passport
app.use(expressSession( { secret: 'secret', resave: false, saveUninitialized: true ,cookie: {expires: new Date(Date.now() + 60 * 10000), maxAge: 16*60*60*1000 }} ));
require('./middlewares/common')
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(toastr());
app.use(cookieParser('secret'));

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  })
    
app.use('/',indexRoute)