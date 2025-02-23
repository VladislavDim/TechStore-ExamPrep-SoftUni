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

offerController.get('/details/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);
    const isOwner = offer.owner?.equals(req.user?.id);
    res.render('details', { offer, isOwner });
});

offerController.get('/delete/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);

    if (!offer.owner?.equals(req.user?.id)) {
        //TODO: helper function setError
        //res.setError('You are not the offer owner!')
        return res.redirect('/404');
    }

    await offerService.deleteOffer(offerId);
    res.redirect('/');
});

offerController.get('/edit/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);

    if (!offer.owner?.equals(req.user?.id)) {
        //TODO: helper function setError
        //res.setError('You are not the movie owner!')
        return res.redirect('/404');
    }

    res.render('edit', { offer });
});

export default offerController;