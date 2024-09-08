import nodemailer from 'nodemailer'
import logger from './logger.config'

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: parseInt(process.env.MAIL_PORT || '587'),
	secure: true,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD,
	},
})

export const sendMail = async (to: string, subject: string, html: string) => {
	try {
		const info = await transporter.sendMail({
			from: process.env.MAIL_FROM,
			to,
			subject,
			html,
		})

		logger.info(`Mail sent: ${info.messageId}`)
	} catch (err) {
		logger.error(`Mail error: ${err}`)
		throw new Error('Mail error')
	}
}
