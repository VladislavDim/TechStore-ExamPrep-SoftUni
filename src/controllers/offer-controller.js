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
    const isPreferred = offer.preferredList.includes(req.user.id);
    res.render('details', { offer, isOwner, isPreferred });
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

offerController.post('/edit/:offerId', async (req, res) => {
    const offerData = req.body;
    const offerId = req.params.offerId;
    console.log(offerData);
    try {
        await offerService.updateOfferById(offerId, offerData);
    } catch (err) {
        //TODO: add error handling and display error message
        return res.render('edit', { offer: offerData });
    }
    //TODO: add catalog page and redirect to it
    res.redirect('/');
});

offerController.get('/prefer/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    await offerService.addToPreferredList(offerId, req.user.id);

    res.redirect(`/offer/details/${offerId}`);
});

offerController.get('/unprefer/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    await offerService.removeFromPreferredList(offerId,req.user.id);

    res.redirect(`/offer/details/${offerId}`);
});

export default offerController;