import { FastifyInstance } from 'fastify'

import { fastifyRateLimit } from '@fastify/rate-limit'
import fastifyStatic from '@fastify/static'
import path from 'path'
import fastifyView from '@fastify/view'
import fastifyAuth from '@fastify/auth'
import fastifyJwt from '@fastify/jwt'
import Handlebars from 'handlebars'
import fastifySchedulePlugin from '@fastify/schedule'
import JwtConfig from '@/src/configs/jwt.config'
import fastifyCookie from '@fastify/cookie'
import CookieConfig from '@/src/configs/cookie.config'

const RegisterPlugins = async (app: FastifyInstance) => {
	// static assets plugin
	app.register(fastifyStatic, {
		root: path.join(__dirname, '../../public'),
		// prefix: '/public/', // optional: default '/'
		// constraints: { host: 'example.com' }, // optional: default {}
	})

	// rate limit plugin
	app.register(fastifyRateLimit, {
		max: 100,
		timeWindow: '1 minute',
	})

	// view plugin
	app.register(fastifyView, {
		engine: {
			handlebars: Handlebars,
		},
		root: path.join(__dirname, '../templates'),
		options: {
			helpers: {},
		},
		propertyName: 'view',
		viewExt: 'html',
	})

	Handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
		lvalue = parseFloat(lvalue)
		rvalue = parseFloat(rvalue)
		return {
			'+': lvalue + rvalue,
			'-': lvalue - rvalue,
			'*': lvalue * rvalue,
			'/': lvalue / rvalue,
			'%': lvalue % rvalue,
		}[operator]
	})

	// scheduler plugin
	app.register(fastifySchedulePlugin)

	// jwt plugin
	app.register(fastifyJwt, JwtConfig)

	// auth plugin
	app.register(fastifyAuth)

	// cookie plugin
	app.register(fastifyCookie, CookieConfig)
}

export default RegisterPlugins
