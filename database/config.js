const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log(`MongoDB connected: ${db.connection.host}`);
    }
    catch (err) {
        console.error(err);
        throw new Error('Error connecting to database');
    }
};

module.exports = {
    dbConnection
};