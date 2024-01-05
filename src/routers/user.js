'use strict';

const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create new user
router.post('/users', async (req, res) => {
  console.log(req.body);
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

// login user
router.post('/users/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);

    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

// get users
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
  // const user = req.user;
  // await user.populate('notes');
  // res.send(user.notes);
});

// delete user
router.delete('/users/me', auth, async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findByIdAndRemove(id);

    console.log(user);

    // console.log(req.user);
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

// logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logout all
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
