export const ValidatorOptions = {
	// when true, parsing is skipped and the input is validated "as-is"
	strict: false,
	// Throw on the first error or collect and return all
	abortEarly: false,
	// Remove unspecified keys from objects
	stripUnknown: true,
	// when `false` validations will be performed shallowly
	recursive: true,
};

export const ValidatorCompiler = ({ schema }) => {
	return (data) => {
		try {
			const result = schema.validateSync(data, ValidatorOptions);
			return { value: result };
		} catch (e) {
			const errors: Record<string, string> = {};
			e.inner.forEach((error) => {
				if (error.path) {
					errors[error.path] = error.message;
				} else {
					errors.fields = "Invalid fields";
				}
			});
			e.validation = errors;
			e.message = "Request validation failed";
			return { error: e };
		}
	};
};
