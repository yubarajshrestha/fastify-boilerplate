import {
	BadGatewayError,
	BadRequestError,
	ConflictError,
	ForbiddenError,
	GatewayTimeoutError,
	InternalServerError,
	NotAcceptableError,
	NotFoundError,
	NotImplementedError,
	PaymentRequiredError,
	PreconditionFailedError,
	RequestEntityTooLargeError,
	RequestURITooLongError,
	ServiceUnavailableError,
	TooManyRequestsError,
	UnauthorizedError,
	UnprocessableEntityError,
	UnsupportedMediaTypeError,
} from '@/src/handlers/error.handler'
import { HttpStatusCode } from 'axios'

describe('error.handler', () => {
	describe('handle', () => {
		it('should throw NotFoundError', (done) => {
			const error = new NotFoundError('Resource not found')
			expect(error.name).toEqual('NotFoundError')
			expect(error.statusCode).toEqual(HttpStatusCode.NotFound)
			done()
		})

		it('should throw BadRequestError', (done) => {
			const error = new BadRequestError('Bad request')
			expect(error.name).toEqual('BadRequestError')
			expect(error.statusCode).toEqual(HttpStatusCode.BadRequest)
			done()
		})

		it('should throw UnauthorizedError', (done) => {
			const error = new UnauthorizedError('Unauthorized')
			expect(error.name).toEqual('UnauthorizedError')
			expect(error.statusCode).toEqual(HttpStatusCode.Unauthorized)
			done()
		})

		it('should throw ForbiddenError', (done) => {
			const error = new ForbiddenError('Forbidden')
			expect(error.name).toEqual('ForbiddenError')
			expect(error.statusCode).toEqual(HttpStatusCode.Forbidden)
			done()
		})

		it('should throw InternalServerError', (done) => {
			const error = new InternalServerError('Internal server error')
			expect(error.name).toEqual('InternalServerError')
			expect(error.statusCode).toEqual(HttpStatusCode.InternalServerError)
			done()
		})

		it('should throw UnprocessableEntityError', (done) => {
			const error = new UnprocessableEntityError('Unprocessable entity')
			expect(error.name).toEqual('UnprocessableEntityError')
			expect(error.statusCode).toEqual(HttpStatusCode.UnprocessableEntity)
			done()
		})

		it('should throw ConflictError', (done) => {
			const error = new ConflictError('Conflict')
			expect(error.name).toEqual('ConflictError')
			expect(error.statusCode).toEqual(HttpStatusCode.Conflict)
			done()
		})

		it('should throw TooManyRequestsError', (done) => {
			const error = new TooManyRequestsError('Too many requests')
			expect(error.name).toEqual('TooManyRequestsError')
			expect(error.statusCode).toEqual(HttpStatusCode.TooManyRequests)
			done()
		})

		it('should throw ServiceUnavailableError', (done) => {
			const error = new ServiceUnavailableError('Service unavailable')
			expect(error.name).toEqual('ServiceUnavailableError')
			expect(error.statusCode).toEqual(HttpStatusCode.ServiceUnavailable)
			done()
		})

		it('should throw GatewayTimeoutError', (done) => {
			const error = new GatewayTimeoutError('Gateway timeout')
			expect(error.name).toEqual('GatewayTimeoutError')
			expect(error.statusCode).toEqual(HttpStatusCode.GatewayTimeout)
			done()
		})

		it('should throw NotImplementedError', (done) => {
			const error = new NotImplementedError('Not implemented')
			expect(error.name).toEqual('NotImplementedError')
			expect(error.statusCode).toEqual(HttpStatusCode.NotImplemented)
			done()
		})

		it('should throw BadGatewayError', (done) => {
			const error = new BadGatewayError('Bad gateway')
			expect(error.name).toEqual('BadGatewayError')
			expect(error.statusCode).toEqual(HttpStatusCode.BadGateway)
			done()
		})

		it('should throw PaymentRequiredError', (done) => {
			const error = new PaymentRequiredError('Payment Required')
			expect(error.name).toEqual('PaymentRequiredError')
			expect(error.statusCode).toEqual(HttpStatusCode.PaymentRequired)
			done()
		})

		it('should throw PreconditionFailedError', (done) => {
			const error = new PreconditionFailedError('Precondition Failed')
			expect(error.name).toEqual('PreconditionFailedError')
			expect(error.statusCode).toEqual(HttpStatusCode.PreconditionFailed)
			done()
		})

		it('should throw RequestEntityTooLargeError', (done) => {
			const error = new RequestEntityTooLargeError('Entity too large')
			expect(error.name).toEqual('RequestEntityTooLargeError')
			expect(error.statusCode).toEqual(413)
			done()
		})

		it('should throw RequestURITooLongError', (done) => {
			const error = new RequestURITooLongError('Request URI too long')
			expect(error.name).toEqual('RequestURITooLongError')
			expect(error.statusCode).toEqual(414)
			done()
		})

		it('should throw UnsupportedMediaTypeError', (done) => {
			const error = new UnsupportedMediaTypeError('Unsupported media type')
			expect(error.name).toEqual('UnsupportedMediaTypeError')
			expect(error.statusCode).toEqual(HttpStatusCode.UnsupportedMediaType)
			done()
		})

		it('should throw NotAcceptableError', (done) => {
			const error = new NotAcceptableError('Not acceptable')
			expect(error.name).toEqual('UnAcceptedError')
			expect(error.statusCode).toEqual(HttpStatusCode.NotAcceptable)
			done()
		})
	})
})
