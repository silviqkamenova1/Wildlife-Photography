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

        // const user = await publicationService.getUserId(req.user._id);
        // console.log(user);
        res.render('photo/profile')//, {...user})

});

router.get('/:photoId/details', async (req, res) => {
    const photo = await publicationService.getOneDetailed(req.params.photoId).lean();
    ObjectId = photo.author._id;
    console.log(photo);

    const isOwner = ObjectId.toString() == req.user?._id;
    const isVote = photo.votesOnPost?.some(id => id == req.user?._id)
    res.render('photo/details', { ...photo, isOwner, isVote})//, 
});

// router.get('/:publicationId/shared', isAuth, async (req, res) => {
//     try{
//         await publicationService.share(req.user._id, req.params.publicationId);
//     } catch(error){
//         return res.render('404')    
//     }

//     res.redirect('/')
// });

// router.get('/:publicationId/edit',isAuth, async (req, res) => {
//     const publication = await publicationService.getOne(req.params.publicationId);


//     res.render('art/edit', { ...publication })
// });

// router.post('/:publicationId/edit', isAuth, async (req, res) => {
//     const publication = req.body;
//     await publicationService.edit(req.params.publicationId, req.body);

//     res.redirect(`/art/${req.params.publicationId}/details`)
// });



router.get('/create', isAuth, (req, res) => {
    res.render('photo/create');
});

router.post('/create', isAuth, async (req, res) => {
    const photoData = req.body;
    
    try {
        await publicationService.create(req.user._id, photoData);
    } catch (error) {
        return res.status(400).render('photo/create', {error: getErrorMessage(error)})
    }
    
    res.redirect('/photo/catalog');
});

// router.get('/:publicationId/delete', isAuth, async (req, res) => {

//     await publicationService.delete(req.params.publicationId);
//     res.redirect('/art/catalog')

// });


module.exports = router;