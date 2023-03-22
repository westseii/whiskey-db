require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const appName = "whiskey-db api";
const port = process.env.EXPRESS_PORT || 5000;

connectToMongoDB();
const app = express();

// middleware, keep first
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

// 404, keep last
app.use((req, res, next) => {
  res.status(404);
  throw new Error("404 Not Found. The server cannot find the requested resource");
});

app.use(errorHandler); // keep after api routes
