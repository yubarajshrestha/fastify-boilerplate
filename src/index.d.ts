/* eslint-disable no-unused-vars */
import { FastifyRedis } from '@fastify/redis'
import { FastifyJwtNamespace } from '@fastify/auth'
declare module 'fastify' {
	interface FastifyInstance {}

	interface FastifyRequest {
		user?: User
	}

	interface FastifyReply {
		getRenderedHTML: (view: string, data: Record<string, any>) => Promise<string>
	}

	interface FastifyInstance
		extends FastifyJwtNamespace<{ namespace: 'auth' }> {}
}
