import Device from "../models/Device.js";

const getAllOffers = () => {
    return Device.find({});
};

const homeService = {
    getAllOffers
}

export default homeService;