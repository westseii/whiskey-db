const express = require("express");
const dotenv = require("dotenv").config();

const appName = "whiskey-db api";
const mongoDBConnectionString = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@sumi0.qqxpm.mongodb.net/test`;

const app = express();
const port = process.env.EXPRESS_PORT || 5000;

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
app.use("/user", require("./routes/userRoutes"));

// 404
app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
