const PostModel = require('../models/PostModel');
const User = require('../models/User');

exports.getAll = () => PostModel.find({}).lean();

exports.getOne = (publicationId) => PostModel.findById(publicationId).lean();

exports.create = async (ownerId, photoData) =>{ 
    photoData.author = ownerId
    const photo = await PostModel.create({...photoData, owner: ownerId})

}
exports.getOneDetailed = (photoId) => PostModel.findById(photoId)//.populate('firstName').populate('lastName');;

exports.edit = (photoId, photoData) => PostModel.findByIdAndUpdate(photoId, photoData, { runValidators: true})

exports.delete =  (photoId) =>  PostModel.findByIdAndDelete(photoId)


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


