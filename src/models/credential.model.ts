import { AllowNull, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "@/models";

export interface ICredential {
	id: string;
	user_id: string;
	provider: string;
	provider_identifier: string;
}

@Table({
	tableName: "credentials",
	timestamps: true,
	underscored: true,
	name: {
		singular: "credential",
		plural: "credentials",
	},
	createdAt: "created_at",
	updatedAt: "updated_at",
})
class Credential extends Model implements ICredential {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	declare id: string;

	@ForeignKey(() => User)
	@AllowNull(false)
	@Column(DataType.UUID)
	declare user_id: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare provider: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	declare provider_identifier: string;
}

export default Credential;
