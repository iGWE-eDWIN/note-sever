const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;

// creating a new schema
noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

// Creating a collection
const Note = model('Note', noteSchema);

module.exports = Note;
