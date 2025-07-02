/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

require('dotenv').config();

module.exports = {
	development: {
		dialect: 'postgres',
		host: process.env.DB_HOST_WRITER || process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	},
	test: {
		dialect: 'postgres',
		host: process.env.TEST_DB_HOST,
		port: process.env.TEST_DB_PORT,
		username: process.env.TEST_DB_USER,
		password: process.env.TEST_DB_PASSWORD,
		database: process.env.TEST_DB_NAME
	},
	production: {
		dialect: 'postgres',
		host: process.env.DB_HOST_WRITER || process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	}
};
