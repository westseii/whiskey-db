const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    // requires server restart
    stack: process.env.NODE_ENV === "prod" ? "production" : err.stack,
  });
};

module.exports = {
  errorHandler,
};
