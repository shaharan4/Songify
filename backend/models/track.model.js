const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackSchema = new Schema({
    album: { type: Object},
    artists: { type: Array},
    duration_ms: { type: Number, required: true },
    href: { type: String},
    id: { type: String, required: true },
    is_playable: { type: Boolean, required: true },
    name: { type: String},
    popularity: { type: Number, required: true },
    preview_url: { type: String},
    uri: { type: String},
}, {
  timestamps: true,
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;