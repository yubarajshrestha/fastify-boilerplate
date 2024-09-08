import { FastifyCookieOptions } from '@fastify/cookie'

const CookieConfig: FastifyCookieOptions = {
	secret: process.env.JWT_SECRET_KEY as string,
	hook: 'preHandler',
}

export default CookieConfig
