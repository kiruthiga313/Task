const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Must e atleast 6 characters'],
        trim: true,
    }
    
   
},{timestamps: true});

function validate(request) {

    const schema = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().min(3).required().label("Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().min(6).label("Password"),
    });

    return schema.validate(request);
}

exports.User = mongoose.model('users',userSchema)
exports.validate = validate