import compress from "@fastify/compress";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import rateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";
import SetupCors from "@/configs/cors.config";

const SetupPlugins = (server: FastifyInstance) => {
	// Compresses the response data with gzip or deflate
	server.register(compress, { encodings: ["deflate", "gzip"] });

	// Helmet helps you secure your Express apps by setting various HTTP headers.
	server.register(helmet, {
		crossOriginEmbedderPolicy: true,
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				imgSrc: ["'self'", "https://example.test", "data:"],
			},
		},
	});

	server.register(formBody);

	server.register(multipart, {
		// attachFieldsToBody: true,
		// limits: {
		//   fieldNameSize: 200,
		//   fieldSize: 200 * 1024 * 1024, // 200 MB
		//   fields: 10,
		//   fileSize: 200 * 1024 * 1024, // 200 MB
		//   files: 5,
		// },
	});

	server.register(rateLimit, {
		max: 100,
		timeWindow: "1 minute",
	});

	SetupCors(server);
};
export default SetupPlugins;
