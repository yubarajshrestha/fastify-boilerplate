/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("credentials", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn("uuid_generate_v4"),
				primaryKey: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			provider: {
				type: Sequelize.STRING(50),
				allowNull: false,
				comment: "Name of the provider (e.g., google, facebook, local, etc.)",
			},
			provider_identifier: {
				type: Sequelize.STRING(100),
				allowNull: false,
				comment: "ID of the user in the provider's system or password if provider is local",
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("credentials");
	},
};
