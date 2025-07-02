import bcrypt from "bcrypt";
import {
	AllowNull,
	Column,
	DataType,
	Default,
	HasMany,
	HasOne,
	Model,
	PrimaryKey,
	Table,
	Unique,
} from "sequelize-typescript";
import DateTime from "@/configs/dayjs.config";
import { encryptToHex } from "@/helpers/encryption.helper";
import { Credential, UserProfile } from "@/models";

export interface IUser {
	id: string;
	name: string;
	username: string;
	email: string;
	email_verified_at: Date;
}

@Table({
	tableName: "users",
	timestamps: true,
	paranoid: true,
	underscored: true,
	name: {
		singular: "user",
		plural: "users",
	},
	createdAt: "created_at",
	updatedAt: "updated_at",
	deletedAt: "deleted_at",
	defaultScope: {
		attributes: { exclude: ["deleted_at", "created_at", "updated_at"] },
	},
})
class User extends Model implements IUser {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare name: string;

	@Unique
	@AllowNull(false)
	@Column(DataType.STRING)
	declare username: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare email: string;

	@AllowNull(true)
	@Column(DataType.DATE)
	declare email_verified_at: Date;

	@HasOne(() => UserProfile, {
		foreignKey: "user_id",
		sourceKey: "id",
		as: "profile",
	})
	profile: UserProfile;

	@HasMany(() => Credential, {
		foreignKey: "user_id",
		sourceKey: "id",
		as: "credentials",
	})
	credential: Credential[];

	@Column(DataType.VIRTUAL)
	get profile_picture_url(): string | null {
		const profile = this.getDataValue("profile")?.dataValues;
		if (!profile || !profile.profile_picture_key) return null;

		return `${process.env.AWS_CDN_ENDPOINT}/${profile?.profile_picture_key}`;
	}

	@Column(DataType.VIRTUAL)
	get registered_at_formatted(): string {
		return DateTime(this.createdAt).format("MMM DD, YYYY hh:mm A");
	}

	/// Hash Password
	static hashPassword(password: string): string {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	}

	/// Compare Password
	static comparePassword(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}

	/// Generate authentication token
	generateAuthToken(): { token: string; refreshToken: string } {
		const token = encryptToHex(this.id);
		const refreshToken = encryptToHex(this.id);
		return {
			token,
			refreshToken,
		};
	}
}

User.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());
	delete values.deleted_at;
	delete values.created_at;
	delete values.updated_at;
	delete values.profile;
	return values;
};

export default User;
