const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find() 
        .then(async (thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
          return res.status(500).json(err); 
        });
    },

    getSingleThought(req, res) {
        Thought.findOne(
            {
                _id: req.params.thoughtId
            }
        )
        .populate("reaction")
        .then(async (thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this id!"})
        : res.json(thought)
        )
        .catch((err) => {
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({ message: "No thought found with this id!"})
        : res.json(thought))
    }
}   