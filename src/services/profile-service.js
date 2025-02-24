import Device from "../models/Device.js";

const getOffersCreatedByUser = (userId) => {
    return Device.find({ owner: userId });
}

const getPreferredOffersByUser = (userId) => {
    return Device.find({ preferredList: userId });
}

const profileService = {
    getOffersCreatedByUser,
    getPreferredOffersByUser
}

export default profileService;