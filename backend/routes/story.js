const express = require('express');
const router = require('express').Router();
let Story = require('../models/story.model');

router.route('/').get((req, res) => {
    Story.find()
    .then(track => res.json(track))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    
  const story_photo = req.body.story_photo;
  const story_message = req.body.story_message;
  const story_date_created = req.body.story_date_created;
  const story_time_to_live = req.body.story_time_to_live;
  const story_privacy = req.body.story_privacy;
  const story_id = req.body.story_id;
  const story_publisher = req.body.story_publisher;
  const popularity = req.body.popularity;
  const track = req.body.track;

  const newStory = new Story({
    story_photo,
    story_message,
    story_date_created,
    story_time_to_live,
    story_privacy,
    story_id,
    story_publisher,
    popularity,
    track
  });

  newStory.save()
  .then(() => res.json('Story added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/remove_all').delete((req, res) => {
    Story.remove({})
      .then(() => res.json('All Story deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete_story').post((req, res) => {
  // console.log(req.body.mixtape.id);
  Story.deleteOne(
    { story_id: req.body.story.story_id }
  )
  .then(() => res.json('story deleted'))
  .catch(err => console.log(err));
})

router.route('/get_random_stories').get((req, res) => {
  console.log(req.query.num, req.query.random )
  // Story.find().limit(req.query.num).skip(req.query.random)
  Story.find().limit(parseInt(req.query.num)).skip(parseInt(req.query.random))
  .then((data) => res.json(data))
  .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;