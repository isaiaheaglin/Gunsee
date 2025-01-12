const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firearmSchema = new Schema({

    socialsecurity: {
        type: String,
        required: true
    },

    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    },

    firstname: {
        type: String,
        required: true
    },

    middlename: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    gunname: {
        type: String,
        required: true
    },

    serialnumber: {
        type: String,
        required: true
    },

    locationbought: {
        type: String,
        required: true
    },

    dealername: {
        type: String,
        required: true
    },
})

const Firearm = mongoose.model('Firearm', firearmSchema);
module.exports = Firearm;


