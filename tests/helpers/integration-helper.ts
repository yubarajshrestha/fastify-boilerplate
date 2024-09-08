import '@/src/configs/env.config'
import { FastifyInstance } from 'fastify'
import { SetupApplication } from '@/src/application'
import logger from '@/src/configs/logger.config'
import { exec } from 'node:child_process'
import { encryptToBase64 } from '@/src/helpers/encryption.helper'
import DateTime from '@/src/configs/dayjs.config'

/* istanbul ignore next */
export class RequestHelper {
	public static getAuthToken = () => {
		const token = encryptToBase64(
			JSON.stringify({
				userId: 1,
				platform: 'web',
				expiresIn: DateTime().add(7, 'day').unix(),
			})
		)
		return token
	}
}

/* istanbul ignore next */
export default class IntegrationHelper {
	public static appInstance
	public static authToken

	public static async getApp() {
		if (this.appInstance) {
			return this.appInstance
		}
		const app: FastifyInstance = SetupApplication()
		await app.ready()

		this.authToken = RequestHelper.getAuthToken()

		this.appInstance = app.server
		return this.appInstance
	}

	public static async seed() {
		logger.info('Seeding database')
		// Seed database
		exec('npm run seed', (error, stdout, stderr) => {
			if (error) {
				logger.error(`error: ${error.message}`)
				return
			}
			if (stderr) {
				logger.error(`stderr: ${stderr}`)
				return
			}
			logger.info(`stdout: ${stdout}`)
		})
	}

	public clearDatabase(): void {
		logger.info('Clearing database')
	}
}
