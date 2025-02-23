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

const offerService = {
    createOffer,
    getOfferById,
    deleteOffer
}

export default offerService;