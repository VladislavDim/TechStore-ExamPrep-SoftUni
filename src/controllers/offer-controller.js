import { Router } from "express";
import offerService from "../services/offer-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const offerController = Router();

offerController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

offerController.post('/create', isAuth, async (req, res) => {
    const newOffer = req.body;
    const userId = req.user?.id;

    try {
        await offerService.createOffer(newOffer, userId);
    } catch (error) {
        return res.render('create', { offer: newOffer, error: getErrorMessage(error) });
    }

    res.redirect('/offer/catalog');
});

offerController.get('/details/:offerId', async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);
    const isOwner = offer.owner?.equals(req.user?.id);
    const isPreferred = offer.preferredList?.includes(req.user?.id);
    res.render('details', { offer, isOwner, isPreferred });
});

offerController.get('/delete/:offerId', isAuth, async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);

    if (!offer.owner?.equals(req.user?.id)) {
        res.setError('You are not the offer owner!')
        return res.redirect('/404');
    }

    await offerService.deleteOffer(offerId);
    res.redirect('/');
});

offerController.get('/edit/:offerId', isAuth, async (req, res) => {
    const offerId = req.params.offerId;
    const offer = await offerService.getOfferById(offerId);

    if (!offer.owner?.equals(req.user?.id)) {
        res.setError('You are not the owner of this offer!')
        return res.redirect('/404');
    }

    res.render('edit', { offer });
});

offerController.post('/edit/:offerId', isAuth, async (req, res) => {
    const offerData = req.body;
    const offerId = req.params.offerId;

    try {
        await offerService.updateOfferById(offerId, offerData);
    } catch (err) {
        return res.render('edit', { offer: offerData, error: getErrorMessage(err) });
    }

    res.redirect('/catalog');
});

offerController.get('/prefer/:offerId', isAuth, async (req, res) => {
    const offerId = req.params.offerId;

    if (offerService.isOfferOwner(offerId, req.user.id)) {
        res.setError("You cannot add your own offer to your preferred list.");
        return res.redirect('/catalog')
    }
    await offerService.addToPreferredList(offerId, req.user.id);


    return res.redirect(`/offer/details/${offerId}`);
});

offerController.get('/unprefer/:offerId', async (req, res) => {
    const offerId = req.params.offerId;

    try {
        await offerService.removeFromPreferredList(offerId, req.user.id);
    } catch (error) {
       res.setError(getErrorMessage(error));
    }

    res.redirect(`/offer/details/${offerId}`);
});

offerController.get('/catalog', async (req, res) => {
    const offers = await offerService.getAllOffers();
    res.render('catalog', { offers });
});
export default offerController;