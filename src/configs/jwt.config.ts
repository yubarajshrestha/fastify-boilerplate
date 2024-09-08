import { FastifyJWTOptions } from '@fastify/jwt'

const JwtConfig: FastifyJWTOptions = {
	secret: process.env.JWT_SECRET_KEY as string,
	namespace: 'auth',
	jwtVerify: 'authVerify',
	jwtSign: 'authSign',
	messages: {
		badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
		badCookieRequestErrorMessage: 'Cookie could not be parsed in request',
		noAuthorizationInHeaderMessage:
			'No Authorization was found in request.headers',
		noAuthorizationInCookieMessage:
			'No Authorization was found in request.cookies',
		authorizationTokenExpiredMessage: 'Authorization token expired',
		authorizationTokenUntrusted: 'Untrusted authorization token',
		authorizationTokenUnsigned: 'Unsigned authorization token',
		authorizationTokenInvalid: (err) => {
			return `Authorization token is invalid: ${err.message}`
		},
	},
	cookie: {
		cookieName: 'refreshToken',
		signed: true,
	},
}

export default JwtConfig
