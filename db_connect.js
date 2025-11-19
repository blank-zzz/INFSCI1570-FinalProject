const mongoose = require("mongoose");

let mongoDB = ("mongodb+srv://" +
    process.env.DB_USERNAME +
    ":"
    + process.env.DB_PASSWORD +
    "@"
    + process.env.HOST +
    "/"
    + process.env.DATABASE);
console.log(mongoDB);

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        const conn = await mongoose.connect(mongoDB, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = {connectDB};