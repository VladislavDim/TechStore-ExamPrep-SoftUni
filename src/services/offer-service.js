import Device from "../models/Device.js";

const createOffer = (offerData, ownerId) => {
    return Device.create({
        ...offerData,
        owner: ownerId
    });
};
const isOfferOwner = async (offerId, userId) => {
    const offer = await getOfferById(offerId);
    return offer.owner === userId;
};
const getOfferById = (offerId) => {
    return Device.findById(offerId);
};

const getAllOffers = () => {
    return Device.find();
};

const deleteOffer = (offerId) => {
    return Device.findByIdAndDelete(offerId);
};

const updateOfferById = (offerId, offerData) => {
    return Device.findByIdAndUpdate(offerId, offerData, { runValidators: true })
};

const addToPreferredList = (offerId, userId) => {
    return Device.findByIdAndUpdate(offerId, {
        $addToSet: { preferredList: userId }
    });
};

const removeFromPreferredList = (offerId, userId) => {
    return Device.findByIdAndUpdate(offerId, {
        $pull: { preferredList: userId }
    });
};

const offerService = {
    createOffer,
    getOfferById,
    deleteOffer,
    updateOfferById,
    addToPreferredList,
    removeFromPreferredList,
    getAllOffers,
    isOfferOwner
}

export default offerService;