const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectToDB = require("./config/db");

const appName = process.env.APP_NAME || "whiskey-db api";

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
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler); // keep after API routes

// 404
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
