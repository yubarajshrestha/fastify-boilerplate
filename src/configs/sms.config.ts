import axios from 'axios'

const instance = (sms_token: string) => {
	return axios.create({
		baseURL: 'https://api.smssarara.app/api/v1',
		timeout: 1000,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sms_token}`,
		},
	})
}

export const sendSMS = async (sms_token: string, to: string | number, message: string) => {
	try {
		const { data } = await instance(sms_token).post('/sms', {
			smsTo: to,
			message,
		})
		return data
	} catch (err) {
		console.error(err)
	}
}
export const sendBulkSMS = async (sms_token: string, records: any) => {
	try {
		const { data } = await instance(sms_token).post('/sms/dynamic', { data: records })
		return data
	} catch (err) {
		console.error(err)
	}
}

export const sendRawSMS = async (sms_token: string, to: string | number, message: string) => {
	try {
		const { data } = await instance(sms_token).post('/sms', {
			smsTo: to,
			message,
		})
		return data
	} catch (err) {
		console.error(err)
	}
}

export const availableBalance = async (sms_token: string) => {
	try {
		const { data } = await instance(sms_token).get('/reports/balance')
		return (+data.balance / 100).toFixed(2)
	} catch (err) {
		return 0
	}
}
