import { Router } from "express";
import offerService from "../services/offer-service.js";

const offerController = Router();

offerController.get('/create', (req, res) => {
    res.render('create');
});

offerController.post('/create', async (req, res) => {
    const newOffer = req.body;
    const userId = req.user?.id;

    try {
        await offerService.createOffer(newOffer, userId);
    } catch (error) {
        console.log(error)
        return res.render('create', { offer: newOffer });
    }

    res.redirect('/');
});

export default offerController;