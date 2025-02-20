import { model, Schema } from "mongoose";

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand field is required!']
    },
    model: {
        type: String,
        required: [true, 'Model field is required!']
    },
    hardDisk: {
        type: String,
        required: [true, 'Hard disk field is required!']
    },
    screenSize: {
        type: String,
        required: [true, 'Screen size field is required!']
    },
    ram: {
        type: String,
        required: [true, 'RAM field is required!']
    },
    operatingSystem: {
        type: String,
        required: [true, 'Operating system field is required!']
    },
    cpu: {
        type: String,
        required: [true, 'CPU field is required!']
    },
    gpu: {
        type: String,
        required: [true, 'GPU field is required!']
    },
    price: {
        type: Number,
        required: [true, 'Price field is required!']
    },
    color: {
        type: String,
        required: [true, 'Color field is required!']
    },
    weight: {
        type: String,
        required: [true, 'Weight field is required!']
    },
    image: {
        type: String,
        required: [true, 'Image field is required!']
    },
    preferredList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner field is required!']
    }
});

const Device = model('Device', deviceSchema);

export default Device;
