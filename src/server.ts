/* eslint-disable import/first */
if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
	require('module-alias/register')
}

import '@/src/configs/env.config'
import { SetupApplication } from '@/src/application'

export const app = SetupApplication()
const port = parseInt(process.env.PORT || '3000')
const environment = process.env.NODE_ENV

if (environment !== 'test') {
	app.listen({ port, host: '127.0.0.1' })
		.then(() => {
			app.log.info(`Server is running on port ${port}`)
		})
		.catch((error: Error) => {
			app.log.error(error)
			process.exit(1)
		})
}
