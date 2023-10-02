const router = require('express').Router();
const mongoose = require('mongoose');


const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');
const { getErrorMessage } = require('../utils/errorutils');

router.get('/catalog', async (req, res) => {
    
    const photo = await publicationService.getAll();
    res.render('photo/catalog', { photo })
});

router.get('/profile', async (req, res) => {

        const data = await publicationService.getPostByAuthor(req.user._id);
        console.log(data);
        // console.log(user);
        res.render('photo/profile', {...data})

});

router.get('/:photoId/details', async (req, res) => {
    const photo = await publicationService.getOneDetailed(req.params.photoId).lean();

    ObjectId = photo.author._id;
    const isOwner = ObjectId.toString() == req.user?._id;
    const isVote = photo.votesOnPost?.some(id => id == req.user?._id);

    // let allVotes = Object.values(photo.votesOnPost.map(el => el._id.toString()))
    // allVotes = allVotes.join('')
    res.render('photo/details', { ...photo, isOwner, isVote})
});

router.get('/vote/:photoId/:type', isAuth, async (req, res) => {
    const value = req.params.type == 'upvote' ? 1 : -1;
    const userEmail = req.user.email
    //console.log(user);
     try{
        const data = await publicationService.vote(req.user._id, req.params.photoId,value);
        let emails = Object.entries(data)[2][1].votesOnPost
        data.emails = emails.map(el => el.email)
        console.log(data);
;
        // data.votesOnPost = {
        //     _id:req.user._id,
        //     email:req.useremail,
        // }
        //Object.values(data.votesOnPost).forEach(el => console.log(el))
        res.redirect(`/photo/${req.params.photoId}/details`)
    } catch(error){
        console.log(error);
        return res.render('404')    
    }

});

router.get('/:photoId/edit',isAuth, async (req, res) => {
    const photo = await publicationService.getOne(req.params.photoId);

    res.render('photo/edit', { ...photo })
});

router.post('/:photoId/edit', isAuth, async (req, res) => {
    const photo = req.body;
    await publicationService.edit(req.params.photoId, req.body);

    res.redirect(`/photo/${req.params.photoId}/details`)
});



router.get('/create', isAuth, (req, res) => {
    res.render('photo/create');
});

router.post('/create', isAuth, async (req, res) => {
    const userId = req.user._id
    const photoData = req.body;

    // const user = await publicationService.getById(userId)
    // photoData.author = {
    //     _id: userId,
    //     firstName: user.firstName,
    //     lastname: user.lastName
    // }
    
    try {
        await publicationService.create(req.user._id, photoData);
    } catch (error) {
        return res.status(400).render('photo/create', {error: getErrorMessage(error)})
    }
    
    res.redirect('/photo/catalog');
});

router.get('/:photoId/delete', isAuth, async (req, res) => {

    await publicationService.delete(req.params.photoId);
    res.redirect('/photo/catalog')

});


module.exports = router;