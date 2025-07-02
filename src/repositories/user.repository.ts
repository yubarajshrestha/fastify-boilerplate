import type { Includeable, Order, WhereOptions } from "sequelize";
import { NotFoundError } from "@/handlers/error.handler";
import { paginated, paginatedData } from "@/helpers/pagination.helper";
import transaction from "@/helpers/transaction.helper";
import { User, UserProfile } from "@/models";

const UserRepository = {
	/**
	 * Finds all users.
	 * @returns A promise that resolves to an array of users.
	 * @throws Will throw an error if the retrieval fails.
	 */
	async findAll(
		request,
		{ associations = [], attributes = undefined, filters = {} }: PaginatedQueryType = {},
	): Promise<PaginatedData<User>> {
		const include: Includeable[] = [...associations];
		const order: Order = [["created_at", "DESC"]];
		const where: WhereOptions | any = {
			...filters,
		};

		const { limit, offset } = paginated(request);
		const users = await User.findAndCountAll({
			include,
			attributes,
			where,
			limit,
			offset,
			order,
		});
		return paginatedData(users, request);
	},

	/**
	 * Finds a user by their ID.
	 * @param id - The ID of the user to find.
	 * @returns A promise that resolves to the user if found, or null if not found.
	 */
	async findById(id: string): Promise<User | null> {
		try {
			return User.findByPk(id);
		} catch (error) {
			console.error("Error finding user by ID:", error);
			return null;
		}
	},

	/**
	 * Finds a user by their email.
	 * @param email - The email of the user to find.
	 * @returns A promise that resolves to the user if found, or null if not found.
	 */
	async findByEmail(email: string): Promise<User | null> {
		try {
			return User.findOne({ where: { email } });
		} catch (error) {
			console.error("Error finding user by email:", error);
			return null;
		}
	},

	/**
	 * Creates a new user.
	 * @param data - The data for the new user.
	 * @returns A promise that resolves to the created user if successful, or null if not.
	 * @throws Will throw an error if the creation fails.
	 */
	async createUser(data: any): Promise<User | null> {
		try {
			const user = await transaction(async (t) => {
				const userData = {
					name: data.name,
					username: data.username,
					email: data.email,
					password: User.hashPassword(data.password),
				};
				const user = await User.create(userData, { transaction: t });
				await UserProfile.create(
					{
						user_id: user.id,
						bio: data.bio,
						profile_picture_key: data.profile_picture_key,
					},
					{ transaction: t },
				);
				// TODO: Send User Email Verification
				return user;
			});
			return user;
		} catch (error) {
			console.error("Error creating user:", error);
			throw new Error("Failed to create user");
		}
	},

	async updateUser(id: string, data: any): Promise<User | null> {
		try {
			const user = await transaction(async (t) => {
				if (data.profile_picture_key) {
					delete data.profile_picture_key;
				}

				if (data.password) {
					data.password = User.hashPassword(data.password);
				}

				const user = await UserRepository.findById(id);

				if (!user) throw new NotFoundError("User not found");

				await user.update(data, { transaction: t });

				if (data.profile_picture_key) {
					// TODO: Delete old profile picture from storage
					await UserProfile.update(
						{ profile_picture_key: data.profile_picture_key },
						{ where: { user_id: id }, transaction: t },
					);
				}
				return user;
			});
			return user;
		} catch (error) {
			console.error("Error creating user:", error);
			throw new Error("Failed to create user");
		}
	},
};

export default UserRepository;
