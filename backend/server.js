const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const colors = require("colors");
const connectDB = require("./Config/db");
const { errorHandler } = require("./Middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./Routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
