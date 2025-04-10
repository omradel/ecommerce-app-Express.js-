class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "faild" : "error";
    this.isOperetional = true;
  }
}

export default ApiError;
