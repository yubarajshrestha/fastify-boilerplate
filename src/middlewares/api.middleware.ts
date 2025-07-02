import { UnauthorizedError } from "@/handlers/error.handler";
import { decryptFromHex } from "@/helpers/encryption.helper";
import UserRepository from "@/repositories/user.repository";

export const ApiMiddleware = async (req) => {
	const authorization = req.headers.authorization;
	if (!authorization) throw new UnauthorizedError("Authorization token is missing");

	try {
		const payload = authorization.split(" ").pop();
		if (!payload) throw new UnauthorizedError("Authorization token is missing");

		const userId = decryptFromHex(payload);
		if (!userId) throw new UnauthorizedError("Authorization token is invalid");
		const user = await UserRepository.findById(userId);
		req.user = user;
	} catch (err) {
		console.log("Error in ApiMiddleware", err);
		throw new UnauthorizedError("Authorization token is invalid");
	}
};
