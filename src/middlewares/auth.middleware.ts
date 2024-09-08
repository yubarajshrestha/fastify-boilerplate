import { UnauthorizedError } from '@/src/handlers/error.handler'

export const AccessTokenMiddleware = async (req) => {
	const authorization = req.headers.authorization
	if (!authorization) throw new UnauthorizedError('No token provided')

	try {
		await req.authVerify()
	} catch (err) {
		throw new UnauthorizedError(err.message || 'Invalid or expired token.')
	}
}
