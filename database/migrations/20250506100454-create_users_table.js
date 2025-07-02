/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.fn("uuid_generate_v4"),
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			username: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.STRING(50),
				allowNull: false,
				unique: true,
			},
			email_verified_at: {
				type: Sequelize.DATE,
				allowNull: true,
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
			deleted_at: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, _Sequelize) {
		await queryInterface.dropTable("users");
	},
};
