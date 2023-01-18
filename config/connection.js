const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://ehamzapour:sardasht93@cluster0.hygsx7y.mongodb.net/test';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;