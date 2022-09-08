const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password:'', password_re:''};

    if(err.message === "Incorrect Email"){
        errors.email = "email not registered";
    }

    if(err.message === "Incorrect password"){
        errors.password = "password not registered";
    }

    if(err.message === "Password unconfirmed"){
        errors.password_re = "passwords do not match";
    }

    if(err.code === 11000){
        const dupList = err.message.substring(err.message.indexOf('dup key'),);
        //console.log(dupList);
        if(dupList.includes('username'))
            errors.username = "username already registered";
        if(dupList.includes('email'))
            errors.email = "email already registered";
        return errors;
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({id}, 'its a secret',{
        expiresIn: maxAge
    });
};

module.exports.signup_get = (req,res) => {
    res.render("authentication/signup", { title: 'signup'});
}; 

module.exports.signup_post = async (req,res) => {
    const { username, email, password, password_re } = req.body;
    try{
        const bool = await User.passwordConfirm(password, password_re);
        const user = await User.create({username, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}; 

module.exports.login_get = (req,res) =>{
    res.render("authentication/login", { title: 'login'});
};

module.exports.login_post = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
    
};

module.exports.logout_get = (req, res) =>{
    res.cookie('jwt', '', { maxAge:1 });
    res.redirect('/');
};