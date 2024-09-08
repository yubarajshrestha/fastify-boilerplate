import { FastifyInstance } from 'fastify'

import ApiRoute from './api.route'
import WebRoute from './web.route'
import WebHooksRoute from './webhook.route'
import DefaultController from '@/src/controllers/default.controller'

const SetupRoutes = async (app: FastifyInstance, version = 'v1') => {
	app.register(DefaultController, { prefix: '/' })
	app.register(WebRoute, { prefix: `/` })
	app.register(ApiRoute, { prefix: `/api/${version}` })
	app.register(WebHooksRoute, { prefix: `/webhooks` })
}

export default SetupRoutes
