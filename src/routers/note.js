const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create a new note
router.post('/notes', auth, async (req, res) => {
  // console.log(req.user);
  //   console.log(req.body);
  try {
    const note = new Note({
      ...req.body,
      owner: req.user._id,
    });
    await note.save();
    res.send(note);
  } catch (error) {
    console.log(error);
  }
});

// get notes
router.get('/notes', auth, async (req, res) => {
  try {
    const note = await Note.find({ owner: req.user._id });
    res.send(note);
  } catch (error) {
    res.status(500).send();
  }
});

// Update note
router.patch('/notes/:id', auth, async (req, res) => {
  console.log(req.body);
  //   const id = req.params;
  //   console.log(id);
  //   res.send(id);

  const updates = Object.keys(req.body);
  //   console.log(updates);
  const allowedUpdates = ['title', 'content'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  //   console.log(isValidOperation);

  if (!isValidOperation)
    return res.status(404).send({ error: 'Invalid updates' });

  const id = req.params.id;
  //   console.log(id);
  try {
    // const note = await Note.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // console.log(note);
    // if (!note) return res.status(404).send();
    const note = await Note.findOne({ _id: id, owner: req.user._id });
    if (!note) return res.status(404).send();

    updates.forEach((update) => (note[update] = req.body[update]));
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Deleting note
router.delete('/notes/:id', auth, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const note = await Note.findOneAndDelete({ _id: id, owner: req.user._id });
    console.log(note);
    if (!note) return res.status(404).send();
    res.send(note);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
