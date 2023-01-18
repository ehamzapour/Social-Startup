const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select("-_V")
        .populate("friends")
        .populate("thoughts")
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No user found with this id!"})
        : res.json(user)
        )
        .catch((err)=> res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : Thought.deleteMany({ username: user.username })
        )
        .then(() => res.json({ message: "User deleted" }))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No user found with this id!" })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId }},
            { new: true }
        )
        .then((user) => res.json(user))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    deleteFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true }
        )

        .then(() => res.json({ message: "Friend deleted!" }))
        .catch((err) => res.status(500).json(err));
    },
};