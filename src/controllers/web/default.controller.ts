import { User } from "@/models";

const HomePage = async (_, reply) => {
	const version = process.env.VERSION || "1.0.0";
	const users = await User.findAll();
	const data = {
		name: "Fastify API",
		version,
		users,
	};

	return reply.send(data);
};

const Controller = (app, _, done) => {
	app.get("/", HomePage);
	done();
};

export default Controller;
