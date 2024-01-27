const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.mongoURI);
    console.log(
      "Connected to the database: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
