const mongoose = require('mongoose');

const publicSchema = new mongoose.Schema({
    title: {
        type: String,
        //minLength: 6,
        required: [true, 'Title is required'],
    },
    keyword: {
        type: String,
        //mmaxLength: 15,
        required: [true, 'Keyword is required'],
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
    date: {
        type: String,
        
        required: [true, 'Date is required'],
    },
    image: {
        type: String,
        
        required: [true, 'Image is required'],
    },
    description: {
        type: String,
        
        required: [true, 'Description is required'],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    votesOnPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    ratingOfPost: {
        type: Number,
        default: 0,
    },
    
})


const Publication = mongoose.model('Publication', publicSchema);

module.exports = Publication;