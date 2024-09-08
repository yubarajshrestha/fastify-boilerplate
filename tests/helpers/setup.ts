import { execSync } from 'child_process'

module.exports = async function (globalConfig, projectConfig) {
	execSync('NODE_ENV=test npm run migrate:refresh && npm run seed')
}
