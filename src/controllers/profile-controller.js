import { Router } from "express";
import profileService from "../services/profile-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const profileController = Router();

profileController.get('/:username', isAuth, async (req, res) => {
    const createdOffers = await profileService.getOffersCreatedByUser(req.user.id);
    const preferredOffers = await profileService.getPreferredOffersByUser(req.user.id);

    res.render('profile', { createdOffers, preferredOffers });
});

export default profileController;