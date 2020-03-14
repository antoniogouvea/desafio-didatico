module.exports = (error, req, res, next) => {

  const { statusCode = 500, message, data, validation } = error

  res.status(statusCode).json({
    message,
    data,
    validation
  })

}