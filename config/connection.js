const { connect, connection } = require('mongoose');
require('dotenv').config();


const connectionString = process.env.MONGODB_URI || 'mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hygsx7y.mongodb.net/socialDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;