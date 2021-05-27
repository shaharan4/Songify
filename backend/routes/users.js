const express = require('express');
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const account_name = req.body.account_name;
  const account_pw = req.body.account_pw;
  const account_profile_pic = req.body.account_profile_pic;
  const account_email = req.body.account_email;
  const state = req.body.state;
  const stories = req.body.stories;
  const mixtapes = req.body.mixtapes;
  const friend_system = req.body.friend_system;

  const newUser = new User({
      username, 
      password,
      account_name,
      account_pw,
      account_profile_pic,
      account_email,
      state,
      stories,
      mixtapes,
      friend_system,
      state
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove_all').delete((req, res) => {
    User.remove({})
      .then(() => res.json('All Users deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    // console.log(req.params, "bbbbbbbbbaaaaa");
    console.log(req.body, "bbbbbbbbbaaaaa");
    User.findById(req.params.id)
      .then(user => {
        // user.username = req.body.username;
        user.mixtapes = req.body.user.mixtapes;
        user.username = req.body.user.username;
        user.account_name = req.body.user.account_name;
        user.account_email = req.body.user.account_email;
        user.password = req.body.user.password;
        user.account_profile_pic = req.body.user.account_profile_pic;
        user.save()
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update_mixtape/:id').post((req, res) => {
    User.findById(req.params.id)
      .then(user => {
        // user.username = req.body.username;
        user.mixtapes = req.body.mixtapes;
        user.save()
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  })

  router.route('/accept_mixtape/:id').post((req, res) => {
    console.log("accept mixtape");
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { 'mixtapes': req.body.mixtape } }
    )
    .then((data) => res.json(data))
    .catch(err => console.log(err));
  })

  router.route('/remove_received_mixtape/:id').post((req, res) => {
    console.log("remove_received_mixtape");
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { 'friend_system.received_mixtapes': { "mixtape.id": req.body.mixtape.id } } },
      { new: true}
    )
    .then((data) => res.json(data))
    .catch(err => console.log(err));
  })

  router.route('/delete_mixtape/:id').post((req, res) => {
    console.log(req.body.mixtape.id);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { 'mixtapes': { id: req.body.mixtape.id } } },
      { new: true}
    )
    .then(() => res.json('mixtape deleted'))
    .catch(err => console.log(err));
  })
  router.route('/delete_story/:id').post((req, res) => {
    // console.log(req.body.mixtape.id);
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { 'stories': { story_id: req.body.story.story_id } } },
      { new: true}
    )
    .then(() => res.json('story deleted'))
    .catch(err => console.log(err));
  })

  router.route('/remove_from_received_request/').post((req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.from_user._id },
      { $pull: { 'friend_system.received_requests': { username: req.body.to_user.username } } },
      { new: true}
    )
    .then((data) => res.json(data))
    .catch(err => console.log(err));
    // User.find()
    // .then(() => res.json('test'))
  })

  router.route('/remove_friend/').post((req, res) => {
    console.log(req.body.from_username, req.body.to_username)
    User.findOneAndUpdate(
      { username: req.body.from_username },
      { $pull: { 'friend_system.friends': { username: req.body.to_username } } },
      { new: true}
    )
    .then((data) => res.json(data))
    .catch(err => console.log(err));
    // User.find()
    // .then(() => res.json('test'))
  })


  router.route('/add_user_to_friend_list').post((req, res) => {
    console.log(req.body.from_user._id, "remove", req.body.to_user._id)
    User.findByIdAndUpdate(req.body.from_user._id, {
      $push: 
          { 
            'friend_system.friends': 
            {
              _id: req.body.to_user._id,
              username: req.body.to_user.username,
              mixtapes: req.body.to_user.mixtapes,
              account_name: req.body.to_user.account_name,
            } 
          } 
    })
    .then(() => res.json("friend added"))
    .catch(err => res.status(400).json('Error: ' + err));
  })



  router.route('/add_story/:id').post((req, res) => {
    console.log(req.params.id, req.body.story);
    User.findByIdAndUpdate(req.params.id, {
      $push: {
        "stories": req.body.story
      }
    })
    .then(() => res.json("story added"))
    .catch(err => res.status(400).json('Error: ' + err));
  })

  router.route('/send_friend_request').post((req, res) => {
    // console.log(req.body);
    User.findByIdAndUpdate(req.body.to_user._id, {
      $push: {
        "friend_system.received_requests": {
          username: req.body.from_user.username,
          account_name: req.body.from_user.account_name,
          state: req.body.from_user.state,
          mixtapes: req.body.from_user.mixtapes,
          _id:req.body.from_user._id
        }
      }
    })
    .then(() => {
      User.findByIdAndUpdate(req.body.from_user._id, {
        $push: {
          "friend_system.sent_requests": {
            username: req.body.to_user.username,
            account_name: req.body.to_user.account_name,
            state: req.body.to_user.state,
            mixtapes: req.body.to_user.mixtapes,
            _id:req.body.to_user._id
          }
        }
      })
      .then(() => res.json('friend request sent!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
  })



  router.route('/send_mixtape').post((req, res) => {
    console.log(req.body.to_user.username);
    console.log(req.body.from_user.username);
    User.findOneAndUpdate(
      { username: req.body.from_user.username },
      { $push: { 'friend_system.sent_mixtapes': { 
        mixtape: req.body.mixtape,
        to: req.body.to_user.username
      } } }
    )
    .then(() => {
      User.findOneAndUpdate(
        { username: req.body.to_user.username },
        { $push: { 'friend_system.received_mixtapes': { 
          mixtape: req.body.mixtape,
          from: req.body.from_user.username
        } } }
      )
      .then((data) => {res.json(data)})
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  })




  router.route('/find_username').get((req, res) => {
      // console.log(req.query.username, "aaaaaaaaaaaaaaaaaa");
      // console.log(req.body, "aaaaaaaaaaaaaaaaaa");
    User.find({
        "username": req.query.username,
     })
      .then((user) => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/find_account_name').get((req, res) => {
  User.find({
      "account_name": req.query.account_name,
  })
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/find_user_ID/:id').get((req, res) => {
    // console.log(req, "dddddddddddddd");
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/find').get((req, res) => {
    // console.log(req, "dddddddddddddd");
    User.find({
        "username": req.query.username,
        "password": req.query.password
     })
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/login').get((req, res) => {
    // console.log(req.query, "bbbbbbbbbbbbbb");
    User.find({
        "username": req.query.username,
        "password": req.query.password
     })
      .then((user) => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/test').get((req, res) => {
  // console.log(req.query, "bbbbbbbbbbbbbb");
  User.find({
    "username": "abc123"
  })
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;