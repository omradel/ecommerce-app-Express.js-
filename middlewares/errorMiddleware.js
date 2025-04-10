const globalErrorHndler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    devError(err, res, statusCode, status);
  }

  if (process.env.NODE_ENV === "production") {
    proError(err, res, statusCode, status);
  }
};

const devError = (err, res, statusCode, status) => {
  return res.status(statusCode).json({
    statusCode,
    status,
    err,
    message: err.message,
    stack: err.stack,
  });
};

const proError = (err, res, statusCode) => {
  return res.status(statusCode).json({
    statusCode,
    message: err.message,
  });
};

export default globalErrorHndler;
