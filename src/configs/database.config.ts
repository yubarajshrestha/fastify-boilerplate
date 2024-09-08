import { Sequelize } from 'sequelize-typescript'
import * as models from '@/src/models'
import pg from 'pg'
import logger from './logger.config'

let dbName = (process.env.DB_NAME as string) || 'hiki'
let dbUser = process.env.DB_USER as string
let dbHost = process.env.DB_HOST as string
let dbPort = process.env.DB_PORT as string
let dbPassword = process.env.DB_PASSWORD as string

let logging = process.env.DEBUG === 'True' ? (message: object | string | number | undefined) => logger.silly(message) : false

if (process.env.NODE_ENV === 'test') {
	dbName = (process.env.TEST_DB_NAME as string) ?? 'hiki_test'
	dbHost = (process.env.TEST_DB_HOST as string) ?? 'localhost'
	dbUser = (process.env.TEST_DB_USER as string) ?? 'postgres'
	dbPort = (process.env.TEST_DB_PORT as string) ?? '5432'
	dbPassword = (process.env.TEST_DB_PASSWORD as string) ?? 'postgres'
	logging = false
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	dialect: 'postgres',
	host: dbHost,
	port: parseInt(dbPort),
	replication: {
		read: [
			{
				host: dbHost,
				username: dbUser,
				password: dbPassword,
			},
		],
		write: {
			host: dbHost,
			username: dbUser,
			password: dbPassword,
		},
	},
	dialectOptions: {
		supportBigNumbers: true,
		parseInt: true,
		decimalNumbers: true,
	},
	logging,
	// validateOnly: process.env.NODE_ENV === 'test',
})

sequelize.addModels(Object.values(models))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
sequelize.addHook('beforeCount', (options: any) => {
	if (options.include && Array.isArray(options.include) && options.include.length > 0) {
		options.distinct = true
	}
})

pg.defaults.parseInt8 = true

export default sequelize
