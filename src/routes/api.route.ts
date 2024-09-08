import { FastifyPluginCallback, FastifyInstance, FastifyPluginOptions } from 'fastify'

import UserController from '@/src/controllers/api/user.controller'

const ApiRoute: FastifyPluginCallback = (fastify: FastifyInstance, opts: FastifyPluginOptions, done) => {
	fastify.register(UserController, { prefix: '/users' })
	done()
}

export default ApiRoute
