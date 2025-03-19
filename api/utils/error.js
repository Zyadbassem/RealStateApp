export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode || 500;
  error.message = message || "intenal server error";
  throw error;
};
