exports.class apiError extends Error {
	constructor(message, statusCode){
		this.message = message,
		this.statusCode = statusCode

		this.isOperitional = true
		super(message)
	}
}
