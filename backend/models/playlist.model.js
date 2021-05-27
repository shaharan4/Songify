const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playelistSchema = new Schema({
  description: { type: String},
  href: { type: String},
  id: { type: String, required: true },
  images: { type: Array},
  name: { type: String, required: true },
  owner: { type: Object, required: true },
  snapshot_id: { type: String},
  tracks: { type: Array, required: true },
  type: { type: String},
  uri: { type: String},
  views: { type: Number},
}, {
  timestamps: true,
});

const Playlist = mongoose.model('Playlist', playelistSchema);

module.exports = Playlist;