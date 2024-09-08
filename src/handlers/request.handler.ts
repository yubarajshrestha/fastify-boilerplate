import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const request = (callback) => {
	return async (req: FastifyRequest, reply: FastifyReply) => {
		try {
			await callback(req, reply)
		} catch (error: FastifyError | any) {
			const { name, errors } = error
			if (name === 'SequelizeUniqueConstraintError') {
				return reply.status(400).send({
					message: errors[0]?.message || error.message,
					errors,
				})
			} else if (name === 'SequelizeValidationError') {
				return reply.status(400).send({
					message: errors[0]?.message || error.message,
					errors,
				})
			} else {
				return reply.status(error.statusCode || 400).send({
					message: error.message,
					errors,
				})
			}
		}
	}
}
