import { Router } from "express";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', (req, res) => {
    const userData = req.body;
    console.log(userData);
    res.redirect('/auth/register');
});

export default authController;