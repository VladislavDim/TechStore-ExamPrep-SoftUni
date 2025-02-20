import Device from "../models/Device.js";

const getAllItems = () => {
    return Device.find({});
};

const homeService = {
    getAllItems
}

export default homeService;