import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions, HookHandlerDoneFunction, FastifyRequest, FastifyReply } from 'fastify'
import { request } from '@/src/handlers/request.handler'

/**************************
 * * Get Default Page
 * ! GET /
 **************************/
const DefaultPage = request(async (_: FastifyRequest, reply: FastifyReply) => {
	return reply.send({
		version: '1.0.0',
	})
})

const Controller: FastifyPluginCallback = (app: FastifyInstance, _: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
	app.get('/', DefaultPage)
	done()
}

export default Controller
