const PostModel = require('../models/PostModel');
const User = require('../models/User');


exports.getAll = () => PostModel.find({}).lean();

exports.getOne = (publicationId) => PostModel.findById(publicationId).lean();

exports.getPostByAuthor = (userId) => PostModel.find({author: userId}) 

exports.create = async (ownerId, photoData) => {
    const user = await this.getById(ownerId);
    photoData.author = {
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email
    };
    
    const photo = await PostModel.create({ ...photoData });
    
};
exports.getOneDetailed = (photoId) => PostModel.findById(photoId).populate('author');

exports.edit = (photoId, photoData) => PostModel.findByIdAndUpdate(photoId, photoData, { runValidators: true });

exports.delete = (photoId) => PostModel.findByIdAndDelete(photoId);


exports.getById = (userId) => User.findById(userId)//, {strictPopulate: false});

exports.vote = async (userId, photoId, value) => {
    const photo = await PostModel.findById(photoId).populate('votesOnPost', 'email');
    const user = await this.getById(userId);

    if (photo.votesOnPost.includes(user)) {
        throw new Error('User has already voted!');
    }
    photo.votesOnPost.push(user);
    photo.ratingOfPost += value;
    return photo.save();
}



