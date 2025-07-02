import { NotFoundError } from "@/handlers/error.handler";
import FileManager from "@/helpers/filemanager.helper";
import { ApiMiddleware } from "@/middlewares/api.middleware";
import UserRepository from "@/repositories/user.repository";
import UserValidator from "@/schemas/user.validator";

// Get all users
const getUsers = async (request, reply) => {
	const users = await UserRepository.findAll(request, {
		associations: ["profile"],
		attributes: {
			include: [],
		},
	});
	return reply.send(users);
};

// Get user by id
const getUserById = async (request, reply) => {
	const { id } = request.params;
	try {
		const user = await UserRepository.findById(id);
		if (!user) throw new NotFoundError("User not found");
		return reply.send({ user });
	} catch (error) {
		return reply.status(404).send({ message: "User not found", error: error.message });
	}
};

// Create a new user
const createUser = async (request, reply) => {
	await UserValidator.create.body.validate(request.body, {
		strict: false,
		abortEarly: false,
		stripUnknown: true,
		recursive: true,
	});

	const file = request.file;

	const data = {
		name: request.body.name,
		username: request.body.username,
		email: request.body.email,
		password: request.body.password,
		profile_picture_key: file ? file.key : null,
		bio: request.body.bio,
	};

	await UserRepository.createUser(data);
	return reply.status(201).send({ message: "User created successfully" });
};

// Update user by id
const updateUser = async (request, reply) => {
	const { id } = request.params;
	await UserValidator.update.body.validate(request.body, {
		strict: false,
		abortEarly: false,
		stripUnknown: true,
		recursive: true,
	});

	const file = request.file;

	const data = {
		name: request.body.name,
		email: request.body.email,
		password: request.body.password,
		profile_picture_key: file ? file.key : null,
		bio: request.body.bio,
	};

	await UserRepository.updateUser(id, data);
	return reply.send({ message: "User updated successfully" });
};

const Controller = (app, _, done) => {
	app.addHook("preHandler", ApiMiddleware);
	app.get("/", getUsers);
	app.get("/:id", getUserById);
	app.post("/", { preHandler: [FileManager.upload.single("profilePicture")] }, createUser);
	app.put("/:id", { preHandler: [FileManager.upload.single("profilePicture")] }, updateUser);
	done();
};

export default Controller;
