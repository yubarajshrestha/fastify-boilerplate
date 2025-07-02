if (process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
	require("module-alias/register");
}

import Fastify, { type FastifyInstance } from "fastify";

import "@/configs/env.config";

import sequelize from "@/configs/database.config";
import SetupPlugins from "@/plugins";
import SetupRoutes from "@/routes";
import { ValidatorCompiler } from "@/schemas";

const server: FastifyInstance = Fastify({
	logger: {
		redact: ["headers.authorization"],
		level: "info",
	},
	disableRequestLogging: true,
	requestTimeout: 20000,
});

SetupPlugins(server);
SetupRoutes(server);

sequelize.authenticate().then(() => {
	server.log.info("Database connection has been established successfully.");
});

server.setValidatorCompiler(ValidatorCompiler);

server.setErrorHandler((error, _, reply) => {
	if (error.validation) {
		return reply.status(400).send({
			message: error.message,
			errors: error.validation,
		});
	}
	if ((error as any).inner) {
		const errors: Record<string, string> = {};
		(error as any).inner.forEach((error) => {
			if (!error.path) {
				errors[error.path] = error.message;
			} else {
				errors.fields = "Invalid fields";
			}
		});
		return reply.status(400).send({
			message: error.message,
			errors: errors,
		});
	}
	return reply.status(error.statusCode || 500).send({ message: error.message });
});

try {
	server.listen({ port: 3000 });
	console.log("Server is running on http://localhost:3000");
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
