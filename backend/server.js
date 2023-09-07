const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./Config/db");
const { errorHandler } = require("./Middleware/errorMiddleware");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./Routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
