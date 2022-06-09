const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = mongoose.Schema({
    name : {
        type : String,
        
    },
    rating : {
        type : Number
    },
    cast : {
        type : Array
    },
    genre : {
        type : String
    },
    releaseDate :{
        type : Date
    }
},{timestamps : true})

exports.Movie = mongoose.model('movies',movieSchema) 