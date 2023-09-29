const PostModel = require('../models/PostModel');
const User = require('../models/User');

exports.getAll = () => PostModel.find({}).lean();

exports.getOne = (publicationId) => PostModel.findById(publicationId).lean();

exports.create = async (ownerId, photoData) =>{ 
    photoData.author = ownerId
    const photo = await PostModel.create({...photoData, owner: ownerId})

}
exports.getOneDetailed = (photoId) => PostModel.findById(photoId).populate('firstName');;



exports.getUserId = (userId) => User.findById(userId).lean()

exports.share = async (userId, publicationId) => {
    const publication = await Publication.findById(publicationId);
    publication.usersShared.push(userId);
    return publication.save()
}
exports.addPublication = async (userId, publicationId) => {
    return User.updateOne({_id: userId }, { $push: { myPublications: publicationId}})
   
   
    // const user = await User.findById(userId);
    // user.myPublications.push(publication);

    // await user.save()
    
}


exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, { runValidators: true})

exports.delete =  (publicationId) =>  Publication.findByIdAndDelete(publicationId)