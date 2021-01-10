const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Enter username'],
        unique: true,
    },
    email:{
        type: String,
        required: [true, 'Enter email'],
        unique: true, 
        validate: [isEmail, 'Enter valid email']
    },
    password:{
        type: String,
        required: [true, 'Enter password'],
        minlength: [8, 'Minimum length is 8 characters']
    },
});

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.passwordConfirm = async function(password, password_re){
    if(password === password_re)
        return true;
    throw Error('Password unconfirmed');
};

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect Email');
};

const User = mongoose.model('user', userSchema);

module.exports = User;