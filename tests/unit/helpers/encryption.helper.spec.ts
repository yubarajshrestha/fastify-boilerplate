import { decrypt, decryptFromBase64, encrypt, encryptToBase64 } from '@/src/helpers/encryption.helper'

describe('encryption.helper', () => {
	describe('encrypttion and descryption', () => {
		it('should check encryption and descryption', () => {
			const code = encrypt('Hello World')
			expect(code).toBeInstanceOf(Object)
			expect(code).toHaveProperty('iv')
			expect(code).toHaveProperty('encryptedData')
			const text = decrypt(code)
			expect(text).toBe('Hello World')
		})
	})

	describe('base64 encryption and description', () => {
		it('should check base64 encryption and descryption', () => {
			const encrypted = encryptToBase64('Hello World')
			const text = decryptFromBase64(encrypted)
			expect(text).toBe('Hello World')
		})
	})
})
