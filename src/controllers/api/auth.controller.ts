import transaction from "@/helpers/transaction.helper";
import { Credential, User } from "@/models";
import AuthValidator from "@/schemas/auth.validator";

// Register a new user
const register = async (request, reply) => {
	const { provider, password, ...rest } = request.body;
	let email_verified_at: Date | null = null;
	let provider_identifier: string | null = null;

	switch (provider) {
		case "google":
		case "facebook":
		case "apple":
			email_verified_at = new Date();
			provider_identifier = rest.provider_token;
			break;
		case "email":
			provider_identifier = User.hashPassword(password);
			break;
		default:
			console.log("Invalid provider");
			return reply.status(400).send({
				message: "Invalid provider",
			});
	}
	try {
		await transaction(async (t) => {
			const user = await User.create({ ...rest, status: "inactive", email_verified_at }, { transaction: t });
			await Credential.create(
				{
					user_id: user.id,
					provider,
					provider_identifier,
				},
				{ transaction: t },
			);
			/// TODO: send email verification
			return user;
		});
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			const { errors } = error as any;
			const { path } = errors[0];
			return reply.status(409).send({
				message: `User with this ${path} already exists`,
			});
		}
		return reply.status(500).send({
			message: "Error creating user",
		});
	}

	return reply.status(201).send({
		message: email_verified_at != null ? "Account created" : "Account created, please verify your email",
	});
};

// login a user
const login = async (request, reply) => {
	const { provider, password, email } = request.body;

	const user = await User.findOne({
		include: [
			{
				association: "credentials",
				required: true,
				where: { provider },
			},
		],
		where: { email },
	});

	if (!user) {
		return reply.status(401).send({
			message: "Sorry, we could not find your account",
		});
	}

	switch (provider) {
		case "google":
		case "facebook":
		case "apple":
			console.log("Registering with social provider");
			break;
		case "email": {
			const credential = (user as any).credentials.pop();
			const checkIfCorrect = User.comparePassword(password, credential.provider_identifier);
			if (!checkIfCorrect) {
				return reply.status(401).send({
					message: "Invalid credentials, please try again",
				});
			}
			break;
		}
		default:
			console.log("Invalid provider");
			return reply.status(400).send({
				message: "Invalid provider",
			});
	}

	return reply.status(201).send({
		...user.generateAuthToken(),
		message: "Login successful",
	});
};

const Controller = (app, _, done) => {
	app.post("/register", { schema: AuthValidator.register }, register);
	app.post("/login", { schema: AuthValidator.login }, login);
	done();
};

export default Controller;
