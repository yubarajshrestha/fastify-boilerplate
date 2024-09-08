import cors from '@fastify/cors'
import { FastifyInstance, FastifyRequest } from 'fastify'

const allowedHosts = ['127.0.0.1:5173', 'localhost:5173', 'portal.basisthan.com']

const corsOptionsDelegate = function(req: FastifyRequest, callback: Function) {
  let corsOptions = { origin: false }
  const origin = req.headers.origin
  if (
    origin !== undefined &&
    allowedHosts.some((domain) => origin.includes(domain)) &&
    (corsOptions = { origin: true })
  ) {
    corsOptions = { origin: true }
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const SetupCors = async (app: FastifyInstance) => {
  await app.register(cors, {
    hook: 'preHandler',
    delegator: corsOptionsDelegate,
  })
}

export default SetupCors
