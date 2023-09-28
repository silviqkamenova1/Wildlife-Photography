const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

        required:  [true, 'First name is required']
    },
    lastName: {
        type: String,
        //minLength: 3,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,

        //ref: 'Publication',
        required: [true, 'Email is required'],
        
    },
    password: {
        type: String,
        //minLength: 3,
        required: [true, 'Password is required'],
    },
    myPosts: [{
        type: mongoose.Types.ObjectId,
        //minLength: 20,
        ref: 'PostModel',
    }],
})
const User = mongoose.model('User', userSchema);
module.exports = User;
//userSchema.virtual('repeatPassword')