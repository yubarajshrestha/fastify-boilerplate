import { generateCode, generatePassword, parseJSON, slugify } from '@/src/helpers/app.helper'

describe('app.helper', () => {
	describe('generateCode', () => {
		it('should return string', () => {
			const code = generateCode(10)
			expect(code).toHaveLength(10)
		})
	})

	describe('generatePassword', () => {
		it('should return string', () => {
			const password = generatePassword()
			expect(password).toHaveLength(10)
		})

		it('should return string', () => {
			const password = generatePassword(20, false)
			expect(password).toHaveLength(20)
		})
	})

	describe('slugify', () => {
		it('should return string', () => {
			const slug = slugify('Hello World')
			expect(slug).toBe('hello-world')
		})
	})
})
