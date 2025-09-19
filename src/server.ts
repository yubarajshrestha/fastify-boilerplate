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
	return reply.status(error?.statusCode || 400).send({
		status: "error",
		message: error.message,
		errors: (error as any).errors || {},
	});
});

try {
	server.listen({ port: 3000 });
	console.log("Server is running on http://localhost:3000");
} catch (err) {
	server.log.error(err);
	process.exit(1);
}
