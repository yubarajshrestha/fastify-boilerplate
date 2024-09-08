import sequelize from '@/src/configs/database.config'
import { Transaction } from 'sequelize'

/**
 * The `transaction` function wraps a callback function in a database transaction, committing the
 * changes if successful or rolling back if an error occurs.
 * @param {Callback} handler - The `handler` parameter is a callback function that takes in a
 * transaction object (`t`) as its argument. This callback function is responsible for performing the
 * desired actions within the transaction.
 * @returns The `transaction` function returns the result of the `handler` function that is passed as
 * an argument.
 */
const transaction = async <T>(handler: (t: Transaction) => Promise<T>) => {
	const t = await sequelize.transaction()
	try {
		const action = await handler(t)
		await t.commit()
		return action
	} catch (error) {
		await t.rollback()
		throw error
	}
}
export default transaction
