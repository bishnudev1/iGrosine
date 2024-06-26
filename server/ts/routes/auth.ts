import express from 'express';
import passport from 'passport';
const router = express.Router();
import cors from 'cors';

router.get('/google', cors(), passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
    (req, res) => {
        res.redirect('http://localhost:3000/profile');
    }
);

router.get('/logout', cors(), (req, res) => {
    req.logout((err) => {
        if (err) {
            // Handle any errors that may occur during the logout process
            console.error(err);
        }
        res.redirect('http://localhost:3000/');
    });
});

export default router;
