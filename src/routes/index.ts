import type { FastifyInstance } from "fastify";
import APIRoutes from "./api.route";
import WebRoutes from "./web.route";
import WebhookRoutes from "./webhook.route";

const SetupRoutes = async (app: FastifyInstance) => {
	app.register(WebRoutes, { prefix: "/" });
	app.register(APIRoutes, { prefix: "/api/v1" });
	app.register(WebhookRoutes, { prefix: "/webhooks" });
};

export default SetupRoutes;
