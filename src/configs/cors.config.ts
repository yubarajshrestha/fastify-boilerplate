import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

const allowedOrigins = [
	"http://127.0.0.1:5173",
	"http://localhost:5173",
	"http://0.0.0.0:5173",
	"https://example.com",
];

const SetupCors = async (app: FastifyInstance) => {
	await app.register(cors, {
		// delegator: corsDelegator,
		origin: (origin, callback) => {
			const checkedOrigin = origin || "";
			if (!checkedOrigin) {
				// Allow requests with no origin (like mobile apps or curl requests)
				return callback(null, true);
			}
			const allowed =
				allowedOrigins.some((allowedOrigin) => allowedOrigin.includes(checkedOrigin)) ||
				process.env.NODE_ENV === "development";
			callback(null, allowed);
		},
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		exposedHeaders: ["Content-Disposition"],
		credentials: true,
	});
};

export default SetupCors;
