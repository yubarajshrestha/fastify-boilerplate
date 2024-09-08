import { HttpStatusCode } from 'axios'

export class NotFoundError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'NotFoundError'
		this.statusCode = HttpStatusCode.NotFound
	}
}

export class BadRequestError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'BadRequestError'
		this.statusCode = HttpStatusCode.BadRequest
	}
}

export class UnauthorizedError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'UnauthorizedError'
		this.statusCode = HttpStatusCode.Unauthorized
	}
}

export class ForbiddenError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'ForbiddenError'
		this.statusCode = HttpStatusCode.Forbidden
	}
}

export class InternalServerError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'InternalServerError'
		this.statusCode = HttpStatusCode.InternalServerError
	}
}

export class UnprocessableEntityError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'UnprocessableEntityError'
		this.statusCode = HttpStatusCode.UnprocessableEntity
	}
}

export class ConflictError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'ConflictError'
		this.statusCode = HttpStatusCode.Conflict
	}
}

export class TooManyRequestsError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'TooManyRequestsError'
		this.statusCode = HttpStatusCode.TooManyRequests
	}
}

export class ServiceUnavailableError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'ServiceUnavailableError'
		this.statusCode = HttpStatusCode.ServiceUnavailable
	}
}

export class GatewayTimeoutError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'GatewayTimeoutError'
		this.statusCode = HttpStatusCode.GatewayTimeout
	}
}

export class NotImplementedError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'NotImplementedError'
		this.statusCode = HttpStatusCode.NotImplemented
	}
}

export class BadGatewayError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'BadGatewayError'
		this.statusCode = HttpStatusCode.BadGateway
	}
}

export class PaymentRequiredError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'PaymentRequiredError'
		this.statusCode = HttpStatusCode.PaymentRequired
	}
}

export class PreconditionFailedError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'PreconditionFailedError'
		this.statusCode = HttpStatusCode.PreconditionFailed
	}
}

export class RequestEntityTooLargeError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'RequestEntityTooLargeError'
		this.statusCode = 413
	}
}

export class RequestURITooLongError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'RequestURITooLongError'
		this.statusCode = 414
	}
}

export class UnsupportedMediaTypeError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'UnsupportedMediaTypeError'
		this.statusCode = HttpStatusCode.UnsupportedMediaType
	}
}

export class NotAcceptableError extends Error {
	statusCode: number
	constructor(message: string) {
		super(message)
		this.name = 'UnAcceptedError'
		this.statusCode = HttpStatusCode.NotAcceptable
	}
}
