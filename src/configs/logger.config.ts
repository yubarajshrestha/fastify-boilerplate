import winston from 'winston'
const { combine, timestamp, label, printf } = winston.format

const CATEGORY = 'application'

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
	silly: 5,
}

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'blue',
	silly: 'sky',
}

winston.addColors(colors)

const customFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`
})

const queryFormatPrint = printf(({ message, label, timestamp }) => {
	return `${timestamp} [${label}] Query: ${message}`
})

const errorFilter = winston.format((info: any, opts: any) => {
	return info.level === 'error' ? info : false
})

const fileFormat = combine(label({ label: CATEGORY }), timestamp(), customFormat)

const queryFormat = combine(label({ label: CATEGORY }), timestamp(), queryFormatPrint)

const consoleFormat = combine(winston.format.colorize({ all: true }), label({ label: CATEGORY }), timestamp(), customFormat)

const transports = [
	// - Write to all logs with level `info` and below to `combined.log`
	// - Write all logs error (and below) to `error.log`.
	new winston.transports.File({
		filename: 'logs/error.log',
		level: 'error',
		format: combine(errorFilter(), timestamp()),
	}),
	new winston.transports.File({
		filename: 'logs/database.log',
		level: 'silly',
		format: queryFormat,
	}),
	new winston.transports.File({ filename: 'logs/all.log', level: 'debug' }),
]

const logger = winston.createLogger({
	level: 'debug',
	levels,
	format: fileFormat,
	transports,
})

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: consoleFormat,
			level: 'debug',
		}),
	)
}

/******************************
 * * Logging middleware for express to log all requests
 ******************************/
export const LoggingMiddleware = (req: any, res: any, next: any) => {
	const { method, url, headers } = req
	const { statusCode } = res
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	const userAgent = headers['user-agent']
	const protocol = req.protocol
	const date = new Date().toISOString()
	const log = `${ip} - - [${date}] "${method} ${url} ${protocol}" ${statusCode} - "-" "${userAgent}"`
	logger.http(log)
	next()
}

// do not log when testing
if (process.env.NODE_ENV === 'test') {
	logger.transports.forEach((t: any) => (t.silent = true))
}

export default logger
