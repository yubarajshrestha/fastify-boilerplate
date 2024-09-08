export const ValidatorOptions = {
	strict: false,
	abortEarly: false, // return all errors
	stripUnknown: true, // remove additional properties
	recursive: true,
}

export const ValidatorCompiler = ({ schema, method, url, httpPart }) => {
	return function (data) {
		try {
			const result = schema.validateSync(data, ValidatorOptions)
			return { value: result }
		} catch (e) {
			const errors = {}
			e.inner.forEach((error) => {
				if (error.path != '') {
					errors[error.path] = error.message
				} else {
					errors['fields'] = 'Invalid fields'
				}
			})
			e.errors = errors
			e.message = 'Request validation failed'
			return {
				error: e,
			}
		}
	}
}
