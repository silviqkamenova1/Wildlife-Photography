const router = require('express').Router();

const authService = require('../services/authService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorutils');

router.get('/login', (req, res) => {
   res.render('auth/login');
});

router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const token = await authService.login(email, password);
      res.cookie('auth', token);
      res.redirect('/');
   } catch (error) {
      return res.status(404).render('photo/login', { error: getErrorMessage(error) });
   }
});

router.get('/register', (req, res) => {
   res.render('auth/register');
});

router.post('/register', async (req, res) => {
   const { firstName, lastName, email, password, repeatPassword } = req.body;

   try {
      const token = await authService.register(firstName, lastName, email, password, repeatPassword);
      //await authService.login(username, password)
      res.cookie('auth', token);
      res.redirect('/');
   } catch (error) {
      return res.status(404).render('auth/register', { error: getErrorMessage(error) });

   }


});

router.get('/logout', isAuth, (req, res) => {
   res.clearCookie('auth');
   res.redirect('/');
});

module.exports = router;