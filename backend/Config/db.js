const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //mongodb+srv://moneebbhatti987:<password>@mernapp.paudc9e.mongodb.net/
    console.log(
      `MongoDB Connected Succesfuuly ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
