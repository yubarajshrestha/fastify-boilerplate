import { FastifyInstance } from 'fastify'
import ExampleJob from '@/src/jobs/example.job'

const SetupJobs = (app: FastifyInstance) => {
	app.scheduler.addCronJob(ExampleJob)
}

export default SetupJobs
