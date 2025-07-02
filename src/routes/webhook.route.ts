import type { FastifyInstance } from "fastify";

import DefaultController from "@/controllers/webhook/default.controller";

const WebhookRoutes = async (app: FastifyInstance) => {
	app.register(DefaultController, { prefix: "/" });
};

export default WebhookRoutes;
