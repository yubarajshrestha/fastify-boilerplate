export const request = (callback) => {
	return async (req, reply) => {
		try {
			await callback(req, reply);
		} catch (error: unknown) {
			if (typeof error === "object" && error !== null && "name" in error && "errors" in error) {
				const { name, errors } = error as { name: string; errors: any[]; message?: string; statusCode?: number };
				if (name === "SequelizeUniqueConstraintError") {
					return reply.status(400).send({
						message: errors[0]?.message || (error as any).message,
						errors,
					});
				} else if (name === "SequelizeValidationError") {
					return reply.status(400).send({
						message: errors[0]?.message || (error as any).message,
						errors,
					});
				} else {
					return reply.status((error as any).statusCode || 400).send({
						message: (error as any).message,
						errors,
					});
				}
			} else {
				return reply.status(400).send({
					message: "An unknown error occurred.",
				});
			}
		}
	};
};
