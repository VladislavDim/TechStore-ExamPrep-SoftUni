import Device from "../models/Device.js";

const createOffer = (offerData, ownerId) => {
    return Device.create({
        ...offerData,
        owner: ownerId
    });
};

const getOfferById = (offerId) => {
    return Device.findById(offerId);
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

const offerService = {
    createOffer,
    getOfferById,
    deleteOffer,
    updateOfferById,
    addToPreferredList
}

export default offerService;