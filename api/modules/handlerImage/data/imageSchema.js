const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const image = 'image';

const imageSchema = new Schema({
   avatar: { type: String, required: false },
   gallery: { type: String, required: false },
});

const imageModule = mongoose.model(image, imageSchema);

module.exports = imageModule;
