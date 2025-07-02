import { AllowNull, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import { User } from "@/models";

export interface IUserProfile {
	id: string;
	user_id: string;
	bio: string;
	profile_picture_key: string;
}

@Table({
	tableName: "user_profiles",
	timestamps: true,
	underscored: true,
	name: {
		singular: "user_profile",
		plural: "user_profiles",
	},
	createdAt: "created_at",
	updatedAt: "updated_at",
})
class UserProfile extends Model implements IUserProfile {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column(DataType.UUID)
	declare user_id: string;

	@AllowNull(true)
	@Column(DataType.TEXT)
	declare bio: string;

	@AllowNull(true)
	@Column(DataType.STRING)
	declare profile_picture_key: string;
}

export default UserProfile;
