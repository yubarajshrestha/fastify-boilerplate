import Fastify, { FastifyInstance } from 'fastify'
import compress from '@fastify/compress'
import helmet from '@fastify/helmet'
import formBody from '@fastify/formbody'
import multer from 'fastify-multer'
import sequelize from '@/src/configs/database.config'
import SetupRoutes from '@/src/routes'
import SetupCors from '@/src/configs/cors.config'
import RegisterPlugins from '@/src/plugins'
import { ValidatorCompiler } from '@/src/validators'
import SetupJobs from '@/src/configs/jobs.config'

const SetupApplication = () => {
	const app: FastifyInstance = Fastify({
		logger: {
			redact: ['headers.authorization'],
			level: 'info',
		},
		disableRequestLogging: true,
		requestTimeout: 20000,
	})

	app.register(compress, { encodings: ['deflate', 'gzip'] })
	app.register(helmet, {
		crossOriginEmbedderPolicy: true,
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				imgSrc: ["'self'", 'https://example.com', 'data:'],
			},
		},
	})

	app.register(formBody)
	app.register(multer.contentParser)

	RegisterPlugins(app)
	SetupCors(app)
	SetupRoutes(app)

	sequelize.authenticate().then(() => {
		app.log.info('Database connection has been established successfully.')
	})

	app.setValidatorCompiler(ValidatorCompiler)

	// Set up the error handler
	app.setErrorHandler((error, request, reply) => {
		reply.status(error?.statusCode || 400).send({
			message: error.message,
			errors: (error as any).errors || {},
		})
	})

	app.ready().then(() => SetupJobs(app))

	return app
}

export { SetupApplication }
