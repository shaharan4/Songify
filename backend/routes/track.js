const express = require('express');
const router = require('express').Router();
let Track = require('../models/track.model');

router.route('/').get((req, res) => {
    Track.find()
    .then(track => res.json(track))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    
  const album = req.body.album;
  const artists = req.body.artists;
  const duration_ms = req.body.duration_ms;
  const href = req.body.href;
  const id = req.body.id;
  const is_playable = req.body.is_playable;
  const name = req.body.name;
  const popularity = req.body.popularity;
  const preview_url = req.body.preview_url;
  const uri = req.body.uri;

  const newTrack = new Track({
    album,
    artists,
    duration_ms,
    href,
    id,
    is_playable,
    name,
    popularity,
    preview_url,
    uri
  });

  newTrack.save()
  .then(() => res.json('Track added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove_all').delete((req, res) => {
    Track.remove({})
      .then(() => res.json('All Tracks deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
//   router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Exercise deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
//   router.route('/update/:id').post((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => {
//         exercise.username = req.body.username;
//         exercise.description = req.body.description;
//         exercise.duration = Number(req.body.duration);
//         exercise.date = Date.parse(req.body.date);
  
//         exercise.save()
//           .then(() => res.json('Exercise updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

module.exports = router;