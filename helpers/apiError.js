module.exports = class apiError extends Error {
	constructor(message, statusCode){
		super(message)

		this.message = message,
		this.statusCode = statusCode

		this.isOperitional = true
	}
}
