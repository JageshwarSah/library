const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
	getAll :  Model => catchAsync (async(req, res, next) => {
		const docs = await Model.find({})
		res.status(200).json({
			status: 'ok',
			results: docs.length,
			data: {
				docs
			}
		}) 
	}),

	getOne :  Model => catchAsync (async(req, res, next) => {
		const doc = await Model.findById(req.params.id)
		res.status(200).json({
			status: 'ok',
			data: {
				doc
			}
		}) 
	}),

	createOne :  Model => catchAsync (async(req, res, next) => {
		const doc = await Model.create(req.body)
		res.status(201).json({
			status: 'ok',
			data: {
				doc
			}
		}) 
	}),
	updateOne :  Model => catchAsync (async(req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id)
		res.status(200).json({
			status: 'ok',
			data: {
				doc
			}
		}) 
	}),
	deleteOne : Model => catchAsync (async (req, res, next) => {	
		await Model.findByIdAndDelete(req.params.id)
		res,status(204).json({
			status: 'ok',
			data : null
		})
	})
}
