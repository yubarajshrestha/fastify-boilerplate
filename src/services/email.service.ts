import { sendMail } from '@/src/configs/mail.config'
import Handlebars from 'handlebars'
import path from 'path'
import fs from 'fs'

class EmailService {
	templatePath: string
	to: string
	subject: string
	html: string | undefined = undefined
	data: { [key: string]: any }

	constructor(to, subject) {
		this.to = to
		this.subject = subject
	}

	template(template, data = {}) {
		const template_path = path.resolve(__dirname, '../templates/emails', template)
		const fileContent = fs.readFileSync(template_path, 'utf8')
		this.html = Handlebars.compile(fileContent)(data)
	}

	async send() {
		if (!this.html) {
			throw new Error('Email content is empty')
		}
		await sendMail(this.to, this.subject, this.html)
	}
}

export default EmailService
