const express = require('express');
const router = require('express').Router();
let Playlist = require('../models/playlist.model');

router.route('/').get((req, res) => {
  Playlist.find()
    .then(playlist => res.json(playlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    
  const description = req.body.description;
  const href = req.body.href;
  const id = req.body.id;
  const images = req.body.images;
  const name = req.body.name;
  const owner = req.body.owner;
  const snapshot_id = req.body.snapshot_id;
  const tracks = req.body.tracks;
  const type = req.body.type;
  const uri = req.body.uri;
  const views = req.body.views;

  const newPlaylist = new Playlist({
    description,
    href,
    id,
    images,
    name,
    owner,
    snapshot_id,
    tracks,
    type,
    uri,
    views,
  });

  newPlaylist.save()
  .then(() => res.json('Playlist added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove_all').delete((req, res) => {
    Playlist.remove({})
      .then(() => res.json('Playlist deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update_views/:id').post((req, res) => {
  Playlist.findById(req.params.id)
    .then(playlist => {
      // user.username = req.body.username;
      playlist.views = req.body.views;
      playlist.save()
        .then(() => res.json('views updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

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