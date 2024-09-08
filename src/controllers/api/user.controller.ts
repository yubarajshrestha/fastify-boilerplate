import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, HookHandlerDoneFunction, FastifyRequest, FastifyReply } from 'fastify'
import { request } from '@/src/handlers/request.handler'
import UserRepository from '@/src/repositories/user.repo'
import { paginatedData } from '@/src/helpers/pagination.helper'
import { NotFoundError } from '@/src/handlers/error.handler'
import UserValidator from '@/src/validators/user.validator'
import { AccessTokenMiddleware } from '@/src/middlewares/auth.middleware'

/**************************
 * * Get users
 * ! GET /
 **************************/
const allRecords = request(async (req: FastifyRequest, reply: FastifyReply) => {
	const records = await UserRepository.getAllRecords({ req })
	return reply.send(paginatedData(records, req))
})

/**************************
 * * Get user by ID
 * ! GET /:id
 * @param id User ID
 * @returns {User}
 * @throws {NotFoundError}
 **************************/
const recordById = request(async (req: FastifyRequest, reply: FastifyReply) => {
	const record = await UserRepository.getRecordById(parseInt((req.params as any).id as string))
	if (!record) throw new NotFoundError('User not found')
	return reply.send(record)
})

/**************************
 * * Create user
 * ! POST /
 **************************/
const createRecord = request(async (req: FastifyRequest, reply: FastifyReply) => {
	const record = await UserRepository.createRecord(req.body)
	return reply.status(201).send(record)
})

/**************************
 * * Update user
 * ! PUT /:id
 * @param id User ID
 * @returns {User}
 * @throws {NotFoundError}
 **************************/
const updateRecord = request(async (req: FastifyRequest, reply: FastifyReply) => {
	const record = await UserRepository.updateRecord(parseInt((req.params as any).id as string), req.body)
	return reply.send(record)
})

/**************************
 * * Delete user
 * ! DELETE /:id
 * @param id User ID
 * @throws {NotFoundError}
 **************************/
const deleteRecord = request(async (req: FastifyRequest, reply: FastifyReply) => {
	await UserRepository.deleteRecord(parseInt((req.params as any).id as string))
	return reply.status(204).send()
})

const Controller: FastifyPluginCallback = (app: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
	// app.get('/', { preHandler: AccessTokenMiddleware }, allRecords)
	// app.get('/:id', { preHandler: AccessTokenMiddleware }, recordById)
	// app.post('/', { preHandler: AccessTokenMiddleware, schema: UserValidator }, createRecord)
	// app.put('/:id', { preHandler: AccessTokenMiddleware, schema: UserValidator }, updateRecord)
	// app.delete('/:id', { preHandler: AccessTokenMiddleware }, deleteRecord)

	app.get('/', allRecords)
	app.get('/:id', recordById)
	app.post('/', { schema: UserValidator }, createRecord)
	app.put('/:id', { schema: UserValidator }, updateRecord)
	app.delete('/:id', deleteRecord)

	done()
}

export default Controller
