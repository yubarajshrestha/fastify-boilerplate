import { FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { Op, Includeable, Order, WhereOptions, FindAttributeOptions } from 'sequelize'

import { NotFoundError } from '@/src/handlers/error.handler'
import { User } from '@/src/models'
import { paginated } from '@/src/helpers/pagination.helper'

/**
 * The function `getAllRecords` retrieves and counts user records based on specified criteria such as
 * search term, pagination, and sorting.
 * @param  - - `req`: FastifyRequest object containing the request details.
 * @returns The function `getAllRecords` is returning a Promise that resolves to the result of calling
 * the `User.findAndCountAll` method with the specified attributes, includes, order, where conditions,
 * limit, and offset. The function is fetching records from the User model based on the provided
 * criteria and returning the result along with the total count of matching records.
 */
const getAllRecords = async ({ req }: { req: FastifyRequest }) => {
	const include: Includeable[] = []
	const order: Order = [['created_at', 'desc']]
	const where: WhereOptions | any = {}
	const attrs: FindAttributeOptions = []

	const { limit, offset } = paginated(req)

	const { search } = req.query as any

	if (search) {
		where[Op.or] = [{ name: { [Op.iLike]: `%${search}%` } }, { email: { [Op.iLike]: `%${search}%` } }]
	}

	return User.findAndCountAll({
		attributes: {
			include: attrs,
		},
		include,
		order,
		where,
		limit,
		offset,
	})
}

/**
 * This TypeScript function retrieves a user record by its ID from a database.
 * @param {number} id - The `id` parameter is a number that is used to find a record in the database.
 * In the provided code snippet, it is used to construct a `where` condition to search for a user
 * record with the specified `id`.
 * @returns The `getRecordById` function is returning a Promise that resolves to a User object found in
 * the database based on the provided `id`. The function uses Sequelize ORM to query the database for a
 * User record with the specified `id`, including any specified attributes and associations.
 */
const getRecordById = async (id: number) => {
	const include: Includeable[] = []
	const attrs: FindAttributeOptions = []

	const where: WhereOptions = { id }

	return User.findOne({
		attributes: {
			include: attrs,
		},
		include,
		where,
	})
}

/**
 * The function `createRecord` asynchronously creates a user record with hashed password using bcrypt.
 * @param {any} data - The `data` parameter in the `createRecord` function is an object containing
 * information needed to create a new user record. This data typically includes properties such as
 * username, email, and password.
 * @returns The `createRecord` function is returning a Promise that resolves to a `User` object after
 * creating a new user record in the database with the provided data and a hashed password.
 */
const createRecord = async (data: any): Promise<User> => {
	const user = await User.create({
		...data,
		password: bcrypt.hashSync(data.password, 10),
	})

	return user
}

/**
 * The function `updateRecord` updates a user record by hashing the password if provided and then saves
 * the updated data.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
 * user record that needs to be updated.
 * @param {any} data - The `data` parameter in the `updateRecord` function represents the information
 * that you want to update for a user. This data can include various fields such as name, email,
 * password, etc. If the `data` object contains a `password` field, the function will hash the password
 * using
 * @returns The `updateRecord` function returns a Promise that resolves to a `User` object after
 * updating the user record with the provided data.
 */
const updateRecord = async (id: number, data: any): Promise<User> => {
	const user = await getRecordById(id)
	if (!user) throw new NotFoundError('User not found')
	if (data.password) {
		data.password = bcrypt.hashSync(data.password, 10)
	}
	await user.update(data)
	return user
}

/**
 * This function deletes a record by its ID after checking if it exists.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
 * record that needs to be deleted from the database.
 * @returns The `deleteRecord` function is returning a Promise that resolves to `void`.
 */
const deleteRecord = async (id: number): Promise<void> => {
	const user = await getRecordById(id)
	if (!user) throw new NotFoundError('User not found')
	return user.destroy()
}

const UserRepository = {
	getAllRecords,
	getRecordById,
	createRecord,
	updateRecord,
	deleteRecord,
}

export default UserRepository
