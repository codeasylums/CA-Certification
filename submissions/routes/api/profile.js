const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');


// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
const profile = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));



// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);











// @route   POST api/profile/coding
// @desc    Add Coding to profile
// @access  Private
router.post(
  '/coding',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
 
    const codingskill = {};
    codingskill.user = req.user.id;

    codingskill.coding = {}
    
    if (req.body.codechef) codingskill.coding.codechef = req.body.codechef;
    if (req.body.hackerearth) codingskill.coding.hackerearth = req.body.hackerearth;
    if (req.body.hackerrank) codingskill.coding.hackerrank = req.body.hackerrank;
    
    


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: codingskill },
          { new: true }
        ).then(profile => res.json(profile)
        ,console.log(profile)
        );
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(codingskill).save().then(profile => res.json(profile));
        });
      }
    });
  }
);




// @route   POST api/profile/development
// @desc    Add Development to profile
// @access  Private
router.post(
  '/development',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
 
    const develop = {};
    develop.user = req.user.id;

    develop.development = {}
    
    
    if (req.body.stackoverflow) develop.development.stackoverflow = req.body.stackoverflow;
    if (req.body.bitbucketid) develop.development.bitbucketid = req.body.bitbucketid;
    
    


    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: develop },
          { new: true }
        ).then(profile => res.json(profile)
        ,console.log(profile)
        );
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(develop).save().then(profile => res.json(profile));
        });
      }
    });
  }
);



// // @route   POST api/profile/machinelearning
// // @desc    Add ML to profile
// // @access  Private
// router.post(
//   '/machinelearning',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {


//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newML = {
//         kaggle: req.body.kaggle,
       
//       };

//       // Add to exp array
//       profile.ml.unshift(newML);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );


// // @route   POST api/profile/skillprofile
// // @desc    Add Skill to profile
// // @access  Private
// router.post(
//   '/skillprofile',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {


//     Profile.findOne({ user: req.user.id }).then(profile => {
//       const newSP = {
//         project: req.body.project,
//         certification : req.body.certification
       
//       };

//       // Add to exp array
//       profile.skillpro.unshift(newSP);

//       profile.save().then(profile => res.json(profile));
//     });
//   }
// );


// // @route   DELETE api/profile/skillprofile/:skill_id
// // @desc    Delete SKILL from profile
// // @access  Private
// router.delete(
//   '/coding/:skill_id',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.skillpro
//           .map(item => item.id)
//           .indexOf(req.params.skill_id);

//         // Splice out of array
//         profile.skillpro.splice(removeIndex, 1);

//         // Save
//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );








// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;







