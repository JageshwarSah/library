module.exports = globalErrorHandler = (err, req, res, next) => {
	err.message =  err.message || "Not defined"

	res.status(500).json({
		status: 'error',
		message: err.message,
		err
	})
}

