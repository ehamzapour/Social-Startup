const router = require("express").Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updatedUser,
    createFriend,
    deleteFriend,
} = require("../../controllers/userController");

router.route("/")
.get(getUsers)
.post(createUser);

router.route("/:userId")
.get(getSingleUser)
.put(updatedUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId")
.post(createFriend)
.delete(deleteFriend);

module.exports = router;