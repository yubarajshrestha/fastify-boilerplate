import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const { ENCRYPTION_KEY } = process.env

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
	throw new Error('ENCRYPTION_KEY must be a 256-bit hex string')
}

const key = crypto.createHash('sha256').update(ENCRYPTION_KEY).digest() // Ensure the key is 256 bits

export function encrypt(text: string) {
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(algorithm, key, iv)
	let encrypted = cipher.update(text)
	encrypted = Buffer.concat([encrypted, cipher.final()])
	return {
		iv: iv.toString('base64'),
		encryptedData: encrypted.toString('base64'),
	}
}

export function decrypt(encrypted: { iv: string; encryptedData: string }) {
	const iv = Buffer.from(encrypted.iv, 'base64')
	const encryptedText = Buffer.from(encrypted.encryptedData, 'base64')
	const decipher = crypto.createDecipheriv(algorithm, key, iv)
	let decrypted = decipher.update(encryptedText)
	decrypted = Buffer.concat([decrypted, decipher.final()])
	return decrypted.toString()
}

export function encryptToBase64(text: string) {
	const { iv, encryptedData } = encrypt(text)
	return Buffer.from(`${iv}:${encryptedData}`).toString('base64')
}

export function decryptFromBase64(text: string) {
	const decoded = Buffer.from(text, 'base64').toString('utf-8')
	const [iv, encryptedData] = decoded.split(':')
	return decrypt({ iv, encryptedData })
}
