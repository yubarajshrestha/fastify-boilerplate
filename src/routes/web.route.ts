import type { FastifyInstance } from "fastify";

import DefaultController from "./../controllers/web/default.controller";

const WebRoutes = async (app: FastifyInstance) => {
	app.register(DefaultController, { prefix: "/" });
};

export default WebRoutes;
