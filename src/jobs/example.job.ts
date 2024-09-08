import { AsyncTask, CronJob } from 'toad-scheduler'
import DateTime from '@/src/configs/dayjs.config'
import logger from '@/src/configs/logger.config'

// https://github.com/fastify/fastify-schedule
const ExampleJobTask = new AsyncTask(
	'ExampleJobTask',
	async () => {
		logger.info(`ExampleJobTask started at: ${DateTime().format()}`)
		try {
			// Your logic here
			logger.info('ExampleJobTask')
		} catch (err) {
			console.error('Error in ExampleJobTask:', err)
		}
	},
	(err) => {
		logger.error('Error in ExampleJobTask:', err)
	}
)

const ExampleJobJob = new CronJob(
	{
		// run every 5 minutes
		cronExpression: '*/1 * * * *',
		timezone: 'Asia/Kathmandu',
	},
	ExampleJobTask,
	{
		id: 'ExampleJobJob',
		preventOverrun: true,
	}
)

export default ExampleJobJob
