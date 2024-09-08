import { Model, AllowNull, Column, NotEmpty, Table, Unique, DataType } from 'sequelize-typescript'
import bcrypt from 'bcryptjs'

export interface IUser {
	name: string
	email: string
	password: string
	email_verified_at: Date
	password_reset_token: string
}

@Table({
	tableName: 'users',
	timestamps: true,
	paranoid: true,
	underscored: true,
	name: {
		singular: 'user',
		plural: 'users',
	},
	createdAt: 'created_at',
	updatedAt: 'updated_at',
	deletedAt: 'deleted_at',
})
class User extends Model implements IUser {
	@AllowNull(false)
	@Column(DataType.STRING)
	declare name: string

	@AllowNull(true)
	@NotEmpty
	@Unique
	@Column(DataType.STRING)
	declare email: string

	@AllowNull(true)
	@Column(DataType.DATE)
	declare email_verified_at: Date

	@AllowNull(true)
	@Column(DataType.STRING)
	declare password: string

	@AllowNull(true)
	@Column(DataType.STRING)
	declare password_reset_token: string

	async checkPassword(password: string) {
		return await bcrypt.compare(password, this.password)
	}
}

export default User
