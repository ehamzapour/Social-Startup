// const { Schema, Types } = require("mongoose");

// const reactionSchema = Schema(
//     {
//         reactionid: {
//             types: Schema.Types.ObjectId(),
//             default: () => new Types.ObjectId(),
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             maxlength: 200
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: (timestamp) => timestamp.toLocaleDateString(),
//         },
//     }
// );

// module.exports = reactionSchema;