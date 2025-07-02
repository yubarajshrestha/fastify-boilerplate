import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";

const allowedHosts = ["127.0.0.1:5173", "localhost:5173", "swaranga.com"];

const corsOptionsDelegate = (req, callback) => {
	const origin = req.headers.origin;
	if (origin && allowedHosts.some((domain) => origin.includes(domain))) {
		// If the origin is in the allowedHosts, allow it
		callback(null, { origin: true });
	} else {
		// Deny the request from any other origin
		callback(null, { origin: false });
	}
};

const SetupCors = async (app: FastifyInstance) => {
	await app.register(cors, {
		delegator: corsOptionsDelegate,
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		exposedHeaders: ["Content-Disposition"],
		credentials: true,
	});
};

export default SetupCors;
