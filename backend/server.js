const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectToDB = require("./config/db");

const appName = "whiskey-db api";
const mongoDBConnectionString = process.env.MONGO_URI;

connectToDB();

const app = express();
const port = process.env.EXPRESS_PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Express server (${appName}) listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: appName,
    status: "ok",
  });
});

// use routes
app.use("/test", require("./routes/testRoutes"));

app.use(errorHandler);

// 404
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
