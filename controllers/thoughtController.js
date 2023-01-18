const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
    getThoughts(req, res) {
        Thought.find() 
        .then(async (thoughts) => {
            return res.json(thoughts);
        })
        .catch((err) => {
            console.log(err);
          return res.status(500).json(err); 
        });
    },

    getSingleThought(req, res) {
        Thought.findOne(
            {
                _id: req.params.thoughtId
            }
        )
        .select("-_v")
        .then(async (thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this id!"})
        : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
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
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought (req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => 
        !thought 
        ? res.status(404).json({ message: "No thought found!" })
        : User.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
        ))
        .then((user) => 
        !user
        ? res.status(404).json({ message: "Thought deleted." })
        : res.json({ message: "Thought deleted!" })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addReaction(req, res) {
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true}
        )
        .then((thought) =>
        !thought
        ? res.status(404).json({ message: "No thought found with this id!" })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !this.getSingleThought
        ? res.status(404).json({ message: "No thought found with this id!" })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};   