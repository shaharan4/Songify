const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema({
    story_photo: { type: String},
    story_message: { type: String},
    story_date_created: { type: String},
    story_time_to_live: { type: Number},
    story_privacy: { type: String},
    story_id: { type: String, required: true },
    story_publisher: { type: String},
    popularity: { type: Number},
    track: {type: Object}
}, {
  timestamps: true,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;