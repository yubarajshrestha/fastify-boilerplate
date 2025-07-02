import type { FastifyInstance } from "fastify";
import AuthController from "@/controllers/api/auth.controller";
import DefaultController from "@/controllers/api/default.controller";
import ProfileController from "@/controllers/api/profile.controller";
import UserController from "@/controllers/api/user.controller";

const APIRoutes = async (app: FastifyInstance) => {
	app.register(DefaultController, { prefix: "/" });
	app.register(AuthController, { prefix: "/auth" });
	app.register(ProfileController, { prefix: "/profile" });
	app.register(UserController, { prefix: "/users" });
};

export default APIRoutes;
