import { FastifyPluginCallback, FastifyInstance, FastifyPluginOptions } from 'fastify'

const ApiRoute: FastifyPluginCallback = (fastify: FastifyInstance, opts: FastifyPluginOptions, done) => {
	done()
}

export default ApiRoute
