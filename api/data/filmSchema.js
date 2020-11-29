const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const film = 'film';

const filmSchema = new Schema({
   name: { type: String, required: false },
   genre: { type: String, required: false },
});

const filmModule = mongoose.model(film, filmSchema);

module.exports = filmModule;
