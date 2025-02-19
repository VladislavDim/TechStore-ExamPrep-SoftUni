import { Router } from "express";

const profileController = Router();

profileController.get('/:username', (req, res) => {
    res.render('profile');
});

export default profileController;